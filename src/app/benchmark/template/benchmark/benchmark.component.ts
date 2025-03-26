import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { ComparisonToolComponent } from './comparison-tool/comparison-tool.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { GridComponent } from './grid/grid.component';
import { MetricsDashboardComponent } from './metrics-dashboard/metrics-dashboard.component';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
import { BenchmarkFilter, BenchmarkSettings } from './types';


@Component({
  selector: 'app-benchmark',
  imports: [
    ChartComponent, 
    GridComponent, 
    FilterPanelComponent,
    MetricsDashboardComponent,
    ComparisonToolComponent,
    SettingsPanelComponent,
  ],
  template: `
    <div class="flex flex-col gap-6 p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Performance Benchmark Dashboard</h1>
        <div class="flex gap-2">
          <button 
            (click)="toggleSettings()" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Settings
          </button>
          <button 
            (click)="refreshData()" 
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            [disabled]="isLoading()">
            {{ isLoading() ? 'Refreshing...' : 'Refresh Data' }}
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Left sidebar with filters -->
        <div class="lg:col-span-1 bg-white rounded-lg shadow p-4">
          <app-filter-panel 
            [filters]="filters()" 
            (filtersChanged)="updateFilters($event)">
          </app-filter-panel>
        </div>
        
        <!-- Main content area -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          <!-- Metrics cards -->
          <app-metrics-dashboard 
            [isLoading]="isLoading()" 
            [filters]="filters()">
          </app-metrics-dashboard>
          
          <!-- Charts section -->
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-xl font-semibold mb-4">Performance Trends</h2>
            <app-chart ></app-chart>
          </div>
          
          <!-- Comparison tool -->
            <app-comparison-tool [filters]="filters()"></app-comparison-tool>
          
          <!-- Data grid -->
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-xl font-semibold mb-4">Detailed Data</h2>
            <app-grid ></app-grid>
          </div>
  
        </div>
      </div>
      
      <!-- Settings panel  -->
        <app-settings-panel 
          [settings]="settings()" 
          (settingsChanged)="updateSettings($event)"
          (close)="toggleSettings()">
        </app-settings-panel>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenchmarkComponent { 
  // State management with signals
  filters = signal<BenchmarkFilter>({
    dateRange: { 
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date() 
    },
    categories: ['Performance', 'Memory', 'CPU'],
    metrics: ['Load Time', 'Response Time', 'Throughput'],
    showOnlyFavorites: false
  });
  
  settings = signal<BenchmarkSettings>({
    refreshInterval: 5,
    darkMode: false,
    dataSource: 'production',
    autoRefresh: true
  });
  
  isLoading = signal<boolean>(false);
  showSettings = signal<boolean>(false);
  showComparison = signal<boolean>(false);
  
  constructor() {
    // Initialize component
    this.setupAutoRefresh();
  }
  
  updateFilters(newFilters: Partial<BenchmarkFilter>): void {
    this.filters.update(current => ({
      ...current,
      ...newFilters
    }));
    this.refreshData();
  }
  
  updateSettings(newSettings: Partial<BenchmarkSettings>): void {
    this.settings.update(current => ({
      ...current,
      ...newSettings
    }));
    
    // If auto-refresh setting changed, update the refresh behavior
    this.setupAutoRefresh();
  }
  
  toggleSettings(): void {
    this.showSettings.update(current => !current);
  }
  
  toggleComparison(): void {
    this.showComparison.update(current => !current);
  }
  
  refreshData(): void {
    this.isLoading.set(true);
    
    // Simulate data fetching
    setTimeout(() => {
      // Data fetching logic would go here
      this.isLoading.set(false);
    }, 1500);
  }
  
  private setupAutoRefresh(): void {
    // Clear any existing interval
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = null;
    }
    
    // Set up new interval if auto-refresh is enabled
    if (this.settings().autoRefresh) {
      const intervalMs = this.settings().refreshInterval * 60 * 1000;
      this._refreshInterval = setInterval(() => this.refreshData(), intervalMs);
    }
  }
  
  private _refreshInterval: ReturnType<typeof setInterval> | null = null;
  
  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }
  }
}
