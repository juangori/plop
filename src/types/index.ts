export interface BristolType {
  type: number;
  emoji: string;
  name: string;
  desc: string;
  health: 'healthy' | 'warning' | 'alert' | 'constipated';
}

export interface QuickTag {
  id: string;
  emoji: string;
  label: string;
}

export interface LogEntry {
  id: string;
  type: number;
  time: string;
  tags: string[];
  notes?: string;
  createdAt: number;
}

export interface DayData {
  date: string;
  entries: LogEntry[];
}

export interface Stats {
  streak: number;
  weekCount: number;
  avgType: string;
  healthScore: number;
}
