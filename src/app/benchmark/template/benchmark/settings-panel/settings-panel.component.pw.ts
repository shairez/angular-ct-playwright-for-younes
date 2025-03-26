import { test } from '@jscutlery/playwright-ct-angular';
import { SettingsPanelComponent } from './settings-panel.component';

test('should render', async ({ mount }) => {
  const locator = await mount(SettingsPanelComponent);
  // const autoRefreshCheckbox = locator.getByLabel(/Enable Auto-Refresh/i);
  // await autoRefreshCheckbox.fill('4');
  // await expect(autoRefreshCheckbox).toBeChecked();
});
