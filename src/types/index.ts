// Base Types
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Team Types
export interface Team extends BaseEntity {
  name: string;
  shortName: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

// Match Types
export interface Match extends BaseEntity {
  team1: Team;
  team2: Team;
  venue: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
  team1Score?: string;
  team2Score?: string;
  highlights?: string[];
  playerOfTheMatch?: string;
}

// Points Table Types
export interface PointsTableEntry extends BaseEntity {
  team: Team;
  position: number;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  points: number;
  netRunRate: number;
  form: string[];
}

// Historical Data Types
export interface HistoricalMatch extends BaseEntity {
  date: string;
  team1: string;
  team2: string;
  team1Score: string;
  team2Score: string;
  result: string;
  venue: string;
  playerOfTheMatch?: string;
  highlights: string[];
}

export interface PlayerStats extends BaseEntity {
  name: string;
  team: string;
  matches: number;
  runs: number;
  wickets: number;
  catches: number;
  strikeRate: number;
  economy: number;
  form: string[];
}

export interface TeamHistory extends BaseEntity {
  team: string;
  season: string;
  matches: number;
  wins: number;
  losses: number;
  points: number;
  netRunRate: number;
  position: number;
  playoffs: boolean;
}

export interface PerformanceMetrics extends BaseEntity {
  team: string;
  battingAverage: number;
  bowlingAverage: number;
  runRate: number;
  wicketRate: number;
  winPercentage: number;
  form: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
  cacheStatus?: 'hit' | 'miss' | 'fallback';
  cacheAge?: number;
}

export interface ScrapedData {
  liveMatch: Match | null;
  upcomingMatches: Match[];
  pointsTable: PointsTableEntry[];
  schedule: Match[];
  lastUpdated?: string;
  dataSource?: string;
  historicalMatches?: HistoricalMatch[];
  playerStats?: PlayerStats[];
  teamHistory?: TeamHistory[];
  performanceMetrics?: PerformanceMetrics[];
}

// UI Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  autoDismiss?: boolean;
  duration?: number;
}

export interface UserPreferences {
  autoRefresh: boolean;
  refreshInterval: number;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LiveMatchProps extends BaseComponentProps {
  match: Match | null;
}

export interface PointsTableProps extends BaseComponentProps {
  pointsTable: PointsTableEntry[];
}

export interface MatchScheduleProps extends BaseComponentProps {
  upcomingMatches: Match[];
  schedule: Match[];
}

export interface HistoricalDataProps extends BaseComponentProps {
  historicalMatches: HistoricalMatch[];
  playerStats: PlayerStats[];
  teamHistory: TeamHistory[];
  performanceMetrics: PerformanceMetrics[];
}

// Hook Types
export interface UseApiOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export interface UseNotificationOptions {
  duration?: number;
  autoDismiss?: boolean;
  type?: Notification['type'];
}

// Service Types
export interface ScrapingService {
  scrapeIPLOfficial(): Promise<ScrapedData>;
  scrapeESPNCricinfo(): Promise<ScrapedData>;
  scrapeCricbuzz(): Promise<ScrapedData>;
  generateFallbackData(): ScrapedData;
}

export interface CacheService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
}

export interface NotificationService {
  add(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void;
  remove(id: string): void;
  markAsRead(id: string): void;
  clearAll(): void;
  getNotifications(): Notification[];
}

// Context Types
export interface AppContextType {
  data: ScrapedData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  dataSource: string;
  cacheStatus: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

// Utility Types
export type StatusType = 'idle' | 'loading' | 'success' | 'error';

export type TabType = 'overview' | 'matches' | 'points' | 'history';

export type FilterType = 'all' | 'upcoming' | 'live' | 'completed';

export type SortDirection = 'asc' | 'desc';

export type SortField = 'position' | 'points' | 'netRunRate' | 'won' | 'lost';

// Chart Types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'area';
  data: ChartDataPoint[];
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
  height?: number;
  width?: number;
} 