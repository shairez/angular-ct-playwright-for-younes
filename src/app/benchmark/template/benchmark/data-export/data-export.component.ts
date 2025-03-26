import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BenchmarkFilter } from '../benchmark.component';

@Component({
  selector: 'app-data-export',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold mb-4">Export Data</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Export as CSV -->
        <div class="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" (click)="exportData('csv')">
          <div class="flex items-center mb-2">
            <span class="material-icons text-green-600 mr-2">description</span>
            <h3 class="font-medium">CSV</h3>
          </div>
          <p class="text-sm text-gray-600">Export data as CSV for use in spreadsheet applications</p>
        </div>
        
        <!-- Export as JSON -->
        <div class="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" (click)="exportData('json')">
          <div class="flex items-center mb-2">
            <span class="material-icons text-blue-600 mr-2">code</span>
            <h3 class="font-medium">JSON</h3>
          </div>
          <p class="text-sm text-gray-600">Export raw data in JSON format for developers</p>
        </div>
        
        <!-- Export as PDF Report -->
        <div class="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" (click)="exportData('pdf')">
          <div class="flex items-center mb-2">
            <span class="material-icons text-red-600 mr-2">picture_as_pdf</span>
            <h3 class="font-medium">PDF Report</h3>
          </div>
          <p class="text-sm text-gray-600">Generate a formatted PDF report with charts and analysis</p>
        </div>
      </div>
      
      <!-- Export history -->
      <div class="mt-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Recent Exports</h3>
        <div class="border rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filters</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              @for (export of exportHistory; track export.id) {
                <tr>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ export.date }}</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <span 
                      class="px-2 py-1 text-xs rounded-full"
                      [class.bg-green-100]="export.format === 'csv'"
                      [class.text-green-800]="export.format === 'csv'"
                      [class.bg-blue-100]="export.format === 'json'"
                      [class.text-blue-800]="export.format === 'json'"
                      [class.bg-red-100]="export.format === 'pdf'"
                      [class.text-red-800]="export.format === 'pdf'"
                    >
                      {{ export.format.toUpperCase() }}
                    </span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ export.filters }}</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      class="text-blue-600 hover:text-blue-800 mr-2"
                      (click)="downloadExport(export)"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              }
              
              @if (exportHistory.length === 0) {
                <tr>
                  <td colspan="4" class="px-4 py-4 text-sm text-gray-500 text-center">
                    No recent exports
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Export in progress indicator -->
      @if (isExporting) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-sm mx-auto text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 class="text-lg font-medium mb-2">Preparing Export</h3>
            <p class="text-gray-600">Your {{ currentExportFormat.toUpperCase() }} export is being generated...</p>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataExportComponent {
  @Input() filters!: BenchmarkFilter;
  @Input() isLoading = false;
  
  isExporting = false;
  currentExportFormat = '';
  
  // Sample export history
  exportHistory = [
    { 
      date: '2023-06-15 14:32', 
      format: 'csv', 
      filters: 'Last 30 days, Performance metrics', 
      id: '1234' 
    },
    { 
      date: '2023-06-10 09:15', 
      format: 'pdf', 
      filters: 'Last 90 days, All metrics', 
      id: '1235' 
    },
    { 
      date: '2023-05-28 16:45', 
      format: 'json', 
      filters: 'Custom range, CPU metrics', 
      id: '1236' 
    }
  ];
  
  exportData(format: 'csv' | 'json' | 'pdf'): void {
    if (this.isLoading || this.isExporting) return;
    
    this.isExporting = true;
    this.currentExportFormat = format;
    
    // Simulate export process
    setTimeout(() => {
      // In a real app, this would generate and download the file
      
      // Add to export history
      const newExport = {
        date: this.formatDate(new Date()),
        format,
        filters: this.getFilterSummary(),
        id: Math.random().toString(36).substring(2, 8)
      };
      
      this.exportHistory = [newExport, ...this.exportHistory];
      
      // Complete export
      this.isExporting = false;
      this.currentExportFormat = '';
      
      // Simulate download
      this.downloadExport(newExport);
    }, 2000);
  }
  
  downloadExport(exportItem: any): void {
    // In a real app, this would download the actual file
    // For demo purposes, we'll just show an alert
    alert(`Downloading ${exportItem.format.toUpperCase()} export from ${exportItem.date}`);
  }
  
  private getFilterSummary(): string {
    const dateStart = this.formatDateShort(this.filters.dateRange.start);
    const dateEnd = this.formatDateShort(this.filters.dateRange.end);
    const categories = this.filters.categories.length > 2 
      ? `${this.filters.categories.slice(0, 2).join(', ')} +${this.filters.categories.length - 2} more`
      : this.filters.categories.join(', ');
    
    return `${dateStart} to ${dateEnd}, ${categories}`;
  }
  
  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date).replace(',', '');
  }
  
  private formatDateShort(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
} 