import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BenchmarkSettings } from '../types';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Dashboard Settings</h2>
          <button 
            (click)="close.emit()"
            class="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form [formGroup]="settingsForm" (ngSubmit)="saveSettings()">
          <!-- Data Source -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
            <select 
              formControlName="dataSource"
              class="w-full border rounded p-2 text-sm"
            >
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
              <option value="local">Local</option>
            </select>
            <p class="mt-1 text-xs text-gray-500">Select the environment to pull benchmark data from</p>
          </div>
          
          <!-- Refresh Interval -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Auto-Refresh Interval (minutes)
            </label>
            <input 
              type="number" 
              formControlName="refreshInterval"
              min="1"
              max="60"
              class="w-full border rounded p-2 text-sm"
            >
            <p class="mt-1 text-xs text-gray-500">How often the dashboard should automatically refresh data</p>
          </div>
          
          <!-- Auto Refresh Toggle -->
          <div class="mb-4">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="autoRefresh"
                formControlName="autoRefresh"
                class="mr-2 h-4 w-4"
              >
              <label for="autoRefresh" class="text-sm font-medium text-gray-700">
                Enable Auto-Refresh
              </label>
            </div>
            <p class="mt-1 text-xs text-gray-500 ml-6">
              When enabled, data will refresh automatically at the specified interval
            </p>
          </div>
          
          <!-- Dark Mode Toggle -->
          <div class="mb-6">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="darkMode"
                formControlName="darkMode"
                class="mr-2 h-4 w-4"
              >
              <label for="darkMode" class="text-sm font-medium text-gray-700">
                Dark Mode
              </label>
            </div>
            <p class="mt-1 text-xs text-gray-500 ml-6">
              Switch between light and dark theme for the dashboard
            </p>
          </div>
          
          <!-- Action buttons -->
          <div class="flex justify-end space-x-3">
            <button 
              type="button"
              (click)="resetToDefaults()"
              class="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              Reset to Defaults
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent {
  settings = input<BenchmarkSettings>();
  @Output() settingsChanged = new EventEmitter<Partial<BenchmarkSettings>>();
  @Output() close = new EventEmitter<void>();
  
  settingsForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    // Initialize form with current settings
    this.settingsForm = this.fb.group({
      refreshInterval: [this.settings()?.refreshInterval],
      darkMode: [this.settings()?.darkMode],
      dataSource: [this.settings()?.dataSource],
      autoRefresh: [this.settings()?.autoRefresh]
    });
  }
  
  saveSettings(): void {
    if (this.settingsForm.valid) {
      this.settingsChanged.emit(this.settingsForm.value);
      this.close.emit();
    }
  }
  
  resetToDefaults(): void {
    // Default settings
    const defaultSettings: BenchmarkSettings = {
      refreshInterval: 5,
      darkMode: false,
      dataSource: 'production',
      autoRefresh: true
    };
    
    // Update form
    this.settingsForm.patchValue(defaultSettings);
  }
} 