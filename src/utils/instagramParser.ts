import JSZip from 'jszip';
import { obfuscate } from './crypto';

export interface ParseResult {
  unfollowers: string[];
  fans: string[];
  mutuals: string[];
  totalUnfollowersCount: number;
  totalFansCount: number;
  totalMutualsCount: number;
  followersCount: number;
  followingCount: number;
  timeline: { date: string, followers: number, following: number }[];
  cohortData: { year: string, fans: number, mutuals: number, unfollowers: number }[];
  mutualStats: { youFirst: number, themFirst: number, sameDay: number };
  seasonalityData: { month: string, followers: number }[];
  ownerUsername?: string;
  oldestFollowers: { username: string; timestamp: number }[];
  pendingRequests: { username: string; timestamp: number }[];
}

// Extract usernames and timestamps robustly from variable Instagram JSON structures
const extractUsersWithTime = (data: any): { username: string, timestamp: number }[] => {
  const users: { username: string, timestamp: number }[] = [];
  
  const traverse = (obj: any) => {
    if (obj == null) return;
    if (Array.isArray(obj)) {
      obj.forEach(traverse);
    } else if (typeof obj === 'object') {
      if (Array.isArray(obj.string_list_data)) {
        const title = obj.title || "";
        obj.string_list_data.forEach((item: any) => {
          let val = item?.value || "";
          
          if (!val && title) {
            val = title;
          } else if (!val && item?.href) {
            val = item.href.replace(/\/$/, '').split('/').pop() || "";
          }
          
          if (val && typeof val === 'string') {
            users.push({
              username: val.toLowerCase().trim(),
              timestamp: item.timestamp || 0
            });
          }
        });
      }
      Object.values(obj).forEach(traverse);
    }
  };

  traverse(data);
  return users;
};

export const parseInstagramZip = async (file: File): Promise<ParseResult> => {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(file);

  const followersSet = new Set<string>();
  const followingSet = new Set<string>();
  const followersList: { username: string, timestamp: number }[] = [];
  const followingList: { username: string, timestamp: number }[] = [];
  const pendingRequestsList: { username: string, timestamp: number }[] = [];
  let ownerUsername = "";

  const processFile = async (relativePath: string, fileData: JSZip.JSZipObject) => {
    const lowerPath = relativePath.toLowerCase();
    const fileName = lowerPath.split('/').pop() || lowerPath.split('\\').pop() || '';
    
    // Gunakan Regex ketat untuk memastikan kita hanya mengambil followers_*.json dan following.json
    // Ini akan menolak file seperti "following_hashtags.json" atau "recent_follow_requests.json"
    if (fileName.match(/^followers(_\d+)?\.json$/)) {
      const content = await fileData.async('string');
      try {
        const json = JSON.parse(content);
        extractUsersWithTime(json).forEach(u => {
          followersSet.add(u.username);
          followersList.push(u);
        });
      } catch (e) {
        console.error("Error parsing follower json", e);
      }
    } else if (fileName.match(/^following\.json$/)) {
      const content = await fileData.async('string');
      try {
        const json = JSON.parse(content);
        extractUsersWithTime(json).forEach(u => {
          followingSet.add(u.username);
          followingList.push(u);
        });
      } catch (e) {
        console.error("Error parsing following json", e);
      }
    } else if (fileName === 'personal_information.json' || fileName === 'profile_information.json' || fileName === 'account_information.json') {
      try {
        const content = await fileData.async('string');
        const match1 = content.match(/"Username"\s*:\s*\{[^}]*"value"\s*:\s*"([^"]+)"/i);
        const match2 = content.match(/"username"\s*:\s*"([^"]+)"/i);
        if (match1 && match1[1]) {
          ownerUsername = match1[1];
        } else if (match2 && match2[1]) {
          ownerUsername = match2[1];
        }
      } catch (e) {
        console.error("Error parsing profile info", e);
      }
    } else if (fileName.match(/^(pending|recent)_follow_requests\.json$/)) {
      try {
        const content = await fileData.async('string');
        const json = JSON.parse(content);
        extractUsersWithTime(json).forEach(u => {
          pendingRequestsList.push(u);
        });
      } catch (e) {
        console.error("Error parsing pending follow requests", e);
      }
    }
  };

  const promises: Promise<void>[] = [];
  loadedZip.forEach((relativePath, fileData) => {
    if (!fileData.dir) {
      promises.push(processFile(relativePath, fileData));
    }
  });

  await Promise.all(promises);

  const unfollowers = Array.from(followingSet).filter(u => !followersSet.has(u));
  const fans = Array.from(followersSet).filter(u => !followingSet.has(u));
  const mutuals = Array.from(followingSet).filter(u => followersSet.has(u));

  const monthlyData: Record<string, { followers: number, following: number }> = {};
  
  const processList = (list: { username: string, timestamp: number }[], type: 'followers' | 'following') => {
    list.forEach(item => {
      if (!item.timestamp) return;
      const date = new Date(item.timestamp * 1000);
      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthStr]) {
        monthlyData[monthStr] = { followers: 0, following: 0 };
      }
      monthlyData[monthStr][type]++;
    });
  };

  processList(followersList, 'followers');
  processList(followingList, 'following');

  const timeline = Object.keys(monthlyData)
    .sort()
    .map(month => ({
      date: month,
      followers: monthlyData[month].followers,
      following: monthlyData[month].following
    }));

  // 1. Cohort Data (Fans vs Mutuals vs Unfollowers by Year)
  const cohortMap: Record<string, { fans: number, mutuals: number, unfollowers: number }> = {};
  
  followersList.forEach(f => {
    if (!f.timestamp) return;
    const year = new Date(f.timestamp * 1000).getFullYear().toString();
    if (!cohortMap[year]) cohortMap[year] = { fans: 0, mutuals: 0, unfollowers: 0 };
    if (followingSet.has(f.username)) {
      cohortMap[year].mutuals++;
    } else {
      cohortMap[year].fans++;
    }
  });

  followingList.forEach(f => {
    if (!f.timestamp) return;
    if (!followersSet.has(f.username)) {
      // Ini berarti unfollower (kita follow, dia tidak)
      const year = new Date(f.timestamp * 1000).getFullYear().toString();
      if (!cohortMap[year]) cohortMap[year] = { fans: 0, mutuals: 0, unfollowers: 0 };
      cohortMap[year].unfollowers++;
    }
  });

  const cohortData = Object.keys(cohortMap).sort().map(year => ({
    year,
    fans: cohortMap[year].fans,
    mutuals: cohortMap[year].mutuals,
    unfollowers: cohortMap[year].unfollowers
  }));

  // 2. Who Followed First (Mutuals)
  let youFirst = 0;
  let themFirst = 0;
  let sameDay = 0;
  const followerTimeMap = new Map<string, number>();
  followersList.forEach(f => followerTimeMap.set(f.username, f.timestamp));
  const followingTimeMap = new Map<string, number>();
  followingList.forEach(f => followingTimeMap.set(f.username, f.timestamp));

  mutuals.forEach(username => {
    const followedMeAt = followerTimeMap.get(username) || 0;
    const iFollowedAt = followingTimeMap.get(username) || 0;
    if (followedMeAt === 0 || iFollowedAt === 0) return;
    
    const diff = iFollowedAt - followedMeAt;
    if (Math.abs(diff) <= 86400) { // Within 24 hours
      sameDay++;
    } else if (iFollowedAt < followedMeAt) {
      youFirst++;
    } else {
      themFirst++;
    }
  });
  const mutualStats = { youFirst, themFirst, sameDay };

  // 3. Seasonality (Bulan paling ramai)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const seasonalityMap: Record<string, number> = {};
  months.forEach(m => seasonalityMap[m] = 0);
  followersList.forEach(f => {
    if (!f.timestamp) return;
    const monthIndex = new Date(f.timestamp * 1000).getMonth();
    seasonalityMap[months[monthIndex]]++;
  });
  const seasonalityData = months.map(month => ({
    month,
    followers: seasonalityMap[month]
  }));

  // Jika tidak ditemukan di dalam JSON (misal pengguna hanya mengunduh data followers secara parsial)
  // Coba ekstrak dari nama file ZIP yang biasanya berformat "instagram-username-tahun-bulan-tanggal..."
  if (!ownerUsername && file.name) {
    const match = file.name.match(/^instagram-([^-]+)-/i);
    if (match && match[1]) {
      ownerUsername = match[1];
    } else {
      // Format lain terkadang username_tanggal.zip
      const altMatch = file.name.match(/^([a-zA-Z0-9_.]+)_20[0-9]{2}/);
      if (altMatch && altMatch[1]) {
        ownerUsername = altMatch[1];
      }
    }
  }

  const oldestFollowers = [...followersList]
    .filter(f => f.timestamp > 0)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(0, 5)
    .map(f => ({ username: obfuscate(f.username), timestamp: f.timestamp }));

  return {
    unfollowers: unfollowers.map(obfuscate),
    fans: fans.map(obfuscate),
    mutuals: mutuals.map(obfuscate),
    totalUnfollowersCount: unfollowers.length,
    totalFansCount: fans.length,
    totalMutualsCount: mutuals.length,
    followersCount: followersSet.size,
    followingCount: followingSet.size,
    timeline,
    cohortData,
    mutualStats,
    seasonalityData,
    ownerUsername,
    oldestFollowers,
    pendingRequests: pendingRequestsList.map(f => ({ username: obfuscate(f.username), timestamp: f.timestamp }))
  };
};
