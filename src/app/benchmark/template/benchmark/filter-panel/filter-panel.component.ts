import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BenchmarkFilter } from '../benchmark.component';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="filter-panel">
      <h2 class="text-lg font-semibold mb-4">Filter Data</h2>
      
      <form [formGroup]="filterForm" (ngSubmit)="applyFilters()">
        <!-- Date Range -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-500">Start</label>
              <input 
                type="date" 
                formControlName="startDate"
                class="w-full border rounded p-2 text-sm"
              >
            </div>
            <div>
              <label class="block text-xs text-gray-500">End</label>
              <input 
                type="date" 
                formControlName="endDate"
                class="w-full border rounded p-2 text-sm"
              >
            </div>
          </div>
        </div>
        
        <!-- Categories -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Categories</label>
          <div class="space-y-2 max-h-40 overflow-y-auto p-2 border rounded">
            @for (category of availableCategories; track category) {
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  [id]="'category-' + category"
                  [value]="category"
                  (change)="toggleCategory(category)"
                  [checked]="isSelectedCategory(category)"
                  class="mr-2"
                >
                <label [for]="'category-' + category" class="text-sm">{{ category }}</label>
              </div>
            }
          </div>
        </div>
        
        <!-- Metrics -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Metrics</label>
          <div class="space-y-2 max-h-40 overflow-y-auto p-2 border rounded">
            @for (metric of availableMetrics; track metric) {
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  [id]="'metric-' + metric"
                  [value]="metric"
                  (change)="toggleMetric(metric)"
                  [checked]="isSelectedMetric(metric)"
                  class="mr-2"
                >
                <label [for]="'metric-' + metric" class="text-sm">{{ metric }}</label>
              </div>
            }
          </div>
        </div>
        
        <!-- Show only favorites -->
        <div class="mb-4">
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="favorites"
              formControlName="showOnlyFavorites"
              class="mr-2"
            >
            <label for="favorites" class="text-sm font-medium text-gray-700">Show only favorites</label>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="flex justify-between">
          <button 
            type="button"
            (click)="resetFilters()"
            class="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
            Reset
          </button>
          <button 
            type="submit"
            class="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent {
  @Input() filters!: BenchmarkFilter;
  @Output() filtersChanged = new EventEmitter<Partial<BenchmarkFilter>>();
  
  filterForm!: FormGroup;
  
  // Available options for filters
  availableCategories = [
    'Performance', 
    'Memory', 
    'CPU', 
    'Network', 
    'Disk I/O', 
    'Database', 
    'Frontend', 
    'Backend'
  ];
  
  availableMetrics = [
    'Load Time', 
    'Response Time', 
    'Throughput', 
    'Error Rate', 
    'CPU Usage', 
    'Memory Usage', 
    'Network Latency', 
    'Database Queries', 
    'Cache Hit Rate'
  ];
  
  private selectedCategories: string[] = [];
  private selectedMetrics: string[] = [];
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    // Initialize form with current filter values
    this.filterForm = this.fb.group({
      startDate: [this.formatDate(this.filters.dateRange.start)],
      endDate: [this.formatDate(this.filters.dateRange.end)],
      showOnlyFavorites: [this.filters.showOnlyFavorites]
    });
    
    // Initialize selected categories and metrics
    this.selectedCategories = [...this.filters.categories];
    this.selectedMetrics = [...this.filters.metrics];
  }
  
  isSelectedCategory(category: string): boolean {
    return this.selectedCategories.includes(category);
  }
  
  isSelectedMetric(metric: string): boolean {
    return this.selectedMetrics.includes(metric);
  }
  
  toggleCategory(category: string): void {
    if (this.isSelectedCategory(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }
  
  toggleMetric(metric: string): void {
    if (this.isSelectedMetric(metric)) {
      this.selectedMetrics = this.selectedMetrics.filter(m => m !== metric);
    } else {
      this.selectedMetrics.push(metric);
    }
  }
  
  applyFilters(): void {
    if (this.filterForm.valid) {
      const formValues = this.filterForm.value;
      
      const newFilters: Partial<BenchmarkFilter> = {
        dateRange: {
          start: new Date(formValues.startDate),
          end: new Date(formValues.endDate)
        },
        categories: this.selectedCategories,
        metrics: this.selectedMetrics,
        showOnlyFavorites: formValues.showOnlyFavorites
      };
      
      this.filtersChanged.emit(newFilters);
    }
  }
  
  resetFilters(): void {
    // Reset to default values
    const defaultFilters: BenchmarkFilter = {
      dateRange: { 
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        end: new Date() 
      },
      categories: ['Performance', 'Memory', 'CPU'],
      metrics: ['Load Time', 'Response Time', 'Throughput'],
      showOnlyFavorites: false
    };
    
    // Update form
    this.filterForm.patchValue({
      startDate: this.formatDate(defaultFilters.dateRange.start),
      endDate: this.formatDate(defaultFilters.dateRange.end),
      showOnlyFavorites: defaultFilters.showOnlyFavorites
    });
    
    // Update selected categories and metrics
    this.selectedCategories = [...defaultFilters.categories];
    this.selectedMetrics = [...defaultFilters.metrics];
    
    // Emit changes
    this.filtersChanged.emit(defaultFilters);
  }
  
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
} 