export interface HistoryRecord {
  date: string;
  unfollowers: number;
  fans: number;
  mutuals: number;
  timestamp: number;
}

export const saveHistory = (record: Omit<HistoryRecord, 'date' | 'timestamp'>): HistoryRecord[] => {
  if (typeof window === 'undefined') return [];
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' }); // ex: "Nov 23"
  
  const newRecord: HistoryRecord = {
    ...record,
    date: dateStr,
    timestamp: now.getTime()
  };

  const existingStr = localStorage.getItem('followins_history');
  let history: HistoryRecord[] = [];
  
  if (existingStr) {
    try {
      history = JSON.parse(existingStr);
    } catch (e) {
      history = [];
    }
  }

  // Update record if same month, otherwise append
  const existingIndex = history.findIndex(h => h.date === dateStr);
  if (existingIndex >= 0) {
    history[existingIndex] = newRecord;
  } else {
    history.push(newRecord);
  }

  // Keep only the last 6 entries (6 months)
  if (history.length > 6) {
    history = history.slice(history.length - 6);
  }

  localStorage.setItem('followins_history', JSON.stringify(history));
  return history;
};

export const getHistory = (): HistoryRecord[] => {
  if (typeof window === 'undefined') return [];
  const existingStr = localStorage.getItem('followins_history');
  if (existingStr) {
    try {
      return JSON.parse(existingStr);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export interface LastScanData {
  timestamp: number;
  unfollowers: string[];
  fans: string[];
  mutuals: string[];
}

export const saveLastScanData = (username: string, unfollowers: string[], fans: string[], mutuals: string[]) => {
  if (typeof window === 'undefined' || !username) return;
  const data: LastScanData = {
    timestamp: Date.now(),
    unfollowers,
    fans,
    mutuals
  };
  localStorage.setItem(`followins_scan_${username}`, JSON.stringify(data));
};

export const getLastScanData = (username: string): LastScanData | null => {
  if (typeof window === 'undefined' || !username) return null;
  const existingStr = localStorage.getItem(`followins_scan_${username}`);
  if (existingStr) {
    try {
      return JSON.parse(existingStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};
