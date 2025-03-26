export interface BenchmarkFilter {
  dateRange: { start: Date; end: Date };
  categories: string[];
  metrics: string[];
  showOnlyFavorites: boolean;
}

export interface BenchmarkSettings {
  refreshInterval: number;
  darkMode: boolean;
  dataSource: string;
  autoRefresh: boolean;
}