import { expect, test } from '@jscutlery/playwright-ct-angular';
import { ChartComponent } from './chart.component';

test('should render', async ({ mount }) => {
  const locator = await mount(ChartComponent);
  await expect(locator.locator('.ag-charts-series-area')).toBeVisible();
});
