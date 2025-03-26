import { expect, test } from '@jscutlery/playwright-ct-angular';
import { GridComponent } from './grid.component';

test('should render', async ({ mount }) => {
  const locator = await mount(GridComponent);
  expect(locator.getByText('shai')).toBeVisible();
  
});