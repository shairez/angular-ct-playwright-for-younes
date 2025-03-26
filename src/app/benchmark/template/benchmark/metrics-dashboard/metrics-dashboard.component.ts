import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { BenchmarkFilter } from '../benchmark.component';

interface MetricCard {
  title: string;
  value: number;
  unit: string;
  change: number;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-metrics-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="metrics-dashboard">
      <h2 class="text-lg font-semibold mb-4">Key Metrics</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (metric of filteredMetrics(); track metric.title) {
          <div 
            class="bg-white rounded-lg shadow p-4 border-l-4"
            [class.border-green-500]="metric.change > 0"
            [class.border-red-500]="metric.change < 0"
            [class.border-gray-300]="metric.change === 0"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500">{{ metric.title }}</p>
                <div class="flex items-baseline">
                  <p class="text-2xl font-semibold">{{ metric.value }}</p>
                  <span class="ml-1 text-sm text-gray-500">{{ metric.unit }}</span>
                </div>
              </div>
              <div 
                class="p-2 rounded-full"
                [class.bg-green-100]="metric.change > 0"
                [class.bg-red-100]="metric.change < 0"
                [class.bg-gray-100]="metric.change === 0"
              >
                <span 
                  class="material-icons text-xl"
                  [class.text-green-500]="metric.change > 0"
                  [class.text-red-500]="metric.change < 0"
                  [class.text-gray-500]="metric.change === 0"
                >
                  {{ metric.icon }}
                </span>
              </div>
            </div>
            
            <div class="mt-2 flex items-center">
              <span 
                class="text-sm font-medium"
                [class.text-green-600]="metric.change > 0"
                [class.text-red-600]="metric.change < 0"
                [class.text-gray-600]="metric.change === 0"
              >
                {{ metric.change > 0 ? '+' : '' }}{{ metric.change }}%
              </span>
              <span class="text-sm text-gray-500 ml-1">vs. previous period</span>
            </div>
          </div>
        }
        
        @empty {
          <div class="col-span-4 p-6 text-center">
            <p class="text-gray-500">No metrics available for the selected filters.</p>
          </div>
        }
      </div>
      
      @if (isLoading) {
        <div class="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    </div>
  `,
  styles: [`
    .metrics-dashboard {
      position: relative;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsDashboardComponent {
  @Input() set filters(value: BenchmarkFilter) {
    this._filters.set(value);
  }
  
  @Input() set isLoading(value: boolean) {
    this._isLoading.set(value);
  }
  
  get isLoading(): boolean {
    return this._isLoading();
  }
  
  private _filters = signal<BenchmarkFilter | null>(null);
  private _isLoading = signal<boolean>(false);
  
  // Sample metrics data
  private metrics = signal<MetricCard[]>([
    {
      title: 'Average Load Time',
      value: 1.8,
      unit: 'sec',
      change: -12.5,
      icon: 'speed',
      category: 'Performance'
    },
    {
      title: 'Response Time',
      value: 245,
      unit: 'ms',
      change: -8.2,
      icon: 'timer',
      category: 'Performance'
    },
    {
      title: 'CPU Usage',
      value: 42,
      unit: '%',
      change: 5.3,
      icon: 'memory',
      category: 'CPU'
    },
    {
      title: 'Memory Usage',
      value: 3.2,
      unit: 'GB',
      change: 2.1,
      icon: 'storage',
      category: 'Memory'
    },
    {
      title: 'Error Rate',
      value: 0.8,
      unit: '%',
      change: -15.4,
      icon: 'error_outline',
      category: 'Performance'
    },
    {
      title: 'Throughput',
      value: 1250,
      unit: 'req/s',
      change: 18.7,
      icon: 'swap_horiz',
      category: 'Performance'
    },
    {
      title: 'Database Queries',
      value: 845,
      unit: 'per min',
      change: 3.2,
      icon: 'storage',
      category: 'Database'
    },
    {
      title: 'Network Latency',
      value: 68,
      unit: 'ms',
      change: -5.1,
      icon: 'wifi',
      category: 'Network'
    }
  ]);
  
  // Computed metrics based on filters
  filteredMetrics = computed(() => {
    const filters = this._filters();
    if (!filters) return this.metrics();
    
    return this.metrics().filter(metric => 
      filters.categories.includes(metric.category)
    );
  });
} 