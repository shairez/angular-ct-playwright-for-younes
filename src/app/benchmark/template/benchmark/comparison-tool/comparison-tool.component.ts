import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BenchmarkFilter } from '../benchmark.component';

interface ComparisonData {
  metric: string;
  baseline: number;
  comparison: number;
  unit: string;
  percentChange: number;
}

@Component({
  selector: 'app-comparison-tool',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold mb-4">Benchmark Comparison</h2>
      
      <form [formGroup]="comparisonForm" class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Baseline selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Baseline</label>
            <select 
              formControlName="baseline"
              class="w-full border rounded p-2 text-sm"
            >
              @for (option of baselineOptions; track option.value) {
                <option [value]="option.value">
                  {{ option.label }}
                </option>
              }
            </select>
          </div>
          
          <!-- Comparison selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Compare With</label>
            <select 
              formControlName="comparison"
              class="w-full border rounded p-2 text-sm"
            >
              @for (option of comparisonOptions; track option.value) {
                <option [value]="option.value">
                  {{ option.label }}
                </option>
              }
            </select>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button 
            type="button"
            (click)="compareData()"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Compare
          </button>
        </div>
      </form>
      
      <!-- Comparison results -->
      @if (comparisonResults().length > 0) {
        <div class="mt-4">
          <h3 class="text-lg font-medium mb-3">Results</h3>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ comparisonForm.value.baseline }} (Baseline)
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ comparisonForm.value.comparison }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difference
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                @for (result of comparisonResults(); track result.metric) {
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ result.metric }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ result.baseline }} {{ result.unit }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ result.comparison }} {{ result.unit }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span 
                        [class.text-green-600]="result.percentChange < 0"
                        [class.text-red-600]="result.percentChange > 0"
                        [class.text-gray-600]="result.percentChange === 0"
                      >
                        {{ result.percentChange > 0 ? '+' : '' }}{{ result.percentChange }}%
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          
          <div class="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Summary</h4>
            <p class="text-sm text-gray-600">
              {{ generateSummary() }}
            </p>
          </div>
        </div>
      }
      
      <!-- Empty state -->
      @if (comparisonResults().length === 0 && hasCompared) {
        <div class="mt-4 p-6 text-center bg-gray-50 rounded">
          <p class="text-gray-500">No comparison data available for the selected options.</p>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonToolComponent {
  @Input() filters!: BenchmarkFilter;
  
  comparisonForm: FormGroup;
  hasCompared = false;
  
  // Options for baseline and comparison
  baselineOptions = [
    { value: 'current', label: 'Current Version (v2.5.0)' },
    { value: 'previous', label: 'Previous Version (v2.4.0)' },
    { value: 'legacy', label: 'Legacy Version (v1.9.0)' }
  ];
  
  comparisonOptions = [
    { value: 'previous', label: 'Previous Version (v2.4.0)' },
    { value: 'legacy', label: 'Legacy Version (v1.9.0)' },
    { value: 'competitor', label: 'Competitor A' }
  ];
  
  // Comparison results
  private _comparisonResults = signal<ComparisonData[]>([]);
  comparisonResults = this._comparisonResults.asReadonly();
  
  constructor(private fb: FormBuilder) {
    this.comparisonForm = this.fb.group({
      baseline: ['current'],
      comparison: ['previous']
    });
  }
  
  compareData(): void {
    this.hasCompared = true;
    const { baseline, comparison } = this.comparisonForm.value;
    
    // In a real app, this would fetch actual comparison data
    // For demo purposes, we'll generate some sample data
    if (baseline === 'current' && comparison === 'previous') {
      this._comparisonResults.set([
        { metric: 'Load Time', baseline: 1.8, comparison: 2.1, unit: 'sec', percentChange: -14.3 },
        { metric: 'Response Time', baseline: 245, comparison: 267, unit: 'ms', percentChange: -8.2 },
        { metric: 'Throughput', baseline: 1250, comparison: 1050, unit: 'req/s', percentChange: 19.0 },
        { metric: 'Error Rate', baseline: 0.8, comparison: 1.2, unit: '%', percentChange: -33.3 },
        { metric: 'CPU Usage', baseline: 42, comparison: 45, unit: '%', percentChange: -6.7 }
      ]);
    } else if (baseline === 'current' && comparison === 'legacy') {
      this._comparisonResults.set([
        { metric: 'Load Time', baseline: 1.8, comparison: 3.5, unit: 'sec', percentChange: -48.6 },
        { metric: 'Response Time', baseline: 245, comparison: 420, unit: 'ms', percentChange: -41.7 },
        { metric: 'Throughput', baseline: 1250, comparison: 780, unit: 'req/s', percentChange: 60.3 },
        { metric: 'Error Rate', baseline: 0.8, comparison: 2.5, unit: '%', percentChange: -68.0 },
        { metric: 'CPU Usage', baseline: 42, comparison: 65, unit: '%', percentChange: -35.4 }
      ]);
    } else if (baseline === 'current' && comparison === 'competitor') {
      this._comparisonResults.set([
        { metric: 'Load Time', baseline: 1.8, comparison: 2.2, unit: 'sec', percentChange: -18.2 },
        { metric: 'Response Time', baseline: 245, comparison: 230, unit: 'ms', percentChange: 6.5 },
        { metric: 'Throughput', baseline: 1250, comparison: 1350, unit: 'req/s', percentChange: -7.4 },
        { metric: 'Error Rate', baseline: 0.8, comparison: 0.7, unit: '%', percentChange: 14.3 },
        { metric: 'CPU Usage', baseline: 42, comparison: 38, unit: '%', percentChange: 10.5 }
      ]);
    } else {
      // Default empty state
      this._comparisonResults.set([]);
    }
  }
  
  generateSummary(): string {
    const results = this.comparisonResults();
    if (results.length === 0) return '';
    
    const improvements = results.filter(r => r.percentChange < 0).length;
    const regressions = results.filter(r => r.percentChange > 0).length;
    
    const { baseline, comparison } = this.comparisonForm.value;
    const baselineLabel = this.baselineOptions.find(o => o.value === baseline)?.label || baseline;
    const comparisonLabel = this.comparisonOptions.find(o => o.value === comparison)?.label || comparison;
    
    if (improvements > regressions) {
      return `${baselineLabel} shows overall improvement compared to ${comparisonLabel} with ${improvements} metrics showing better performance.`;
    } else if (regressions > improvements) {
      return `${baselineLabel} shows some performance regressions compared to ${comparisonLabel} with ${regressions} metrics showing worse performance.`;
    } else {
      return `${baselineLabel} and ${comparisonLabel} show mixed results with equal improvements and regressions.`;
    }
  }
} 