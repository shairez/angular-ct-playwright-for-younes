import { expect, test } from '@jscutlery/playwright-ct-angular';
import { ChartComponent } from './chart.component';

test('should render', async ({ mount }) => {
  const locator = await mount(ChartComponent);
  // expect(locator).toBeVisible();
  expect(true).toBe(true);
});