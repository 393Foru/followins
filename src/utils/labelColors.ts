export type LabelColor = 'blue' | 'purple' | 'slate' | 'rose' | 'teal';

export const getLabelColor = (label: string): LabelColor => {
  const lower = label.toLowerCase();
  
  if (lower.includes('teman') || lower.includes('friend') || lower.includes('sahabat') || lower.includes('sd') || lower.includes('smp') || lower.includes('sma') || lower.includes('kampus')) {
    return 'blue';
  }
  
  if (lower.includes('keluarga') || lower.includes('family') || lower.includes('saudara')) {
    return 'purple';
  }
  
  if (lower.includes('abaikan') || lower.includes('ignore') || lower.includes('biarkan')) {
    return 'slate';
  }
  
  if (lower.includes('unfollow') || lower.includes('sudah') || lower.includes('done') || lower.includes('hapus')) {
    return 'rose';
  }
  
  // Default color
  return 'teal';
};

export const getColorClasses = (color: LabelColor): string => {
  switch (color) {
    case 'blue':
      return 'bg-blue-50 text-blue-700 border-blue-100';
    case 'purple':
      return 'bg-purple-50 text-purple-700 border-purple-100';
    case 'slate':
      return 'bg-slate-50 text-slate-700 border-slate-200';
    case 'rose':
      return 'bg-rose-50 text-rose-700 border-rose-100';
    case 'teal':
    default:
      return 'bg-teal-50 text-teal-700 border-teal-100';
  }
};
