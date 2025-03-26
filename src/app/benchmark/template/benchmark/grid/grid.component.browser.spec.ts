import { describe, expect, test } from '@testUtils/vitest';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  test('should render', async ({ mount }) => {
    const { component, fixture } = await mount(GridComponent);

    await expect.element(component.getByText('shai')).toBeVisible();
    // debugger;
    // const firstRow = component.getByRole('row').first();
    // await expect.element(firstRow).toBeVisible();
    // const modelCell = firstRow.getByRole('gridcell').nth(1);
    // await expect.element(modelCell).toContain('Model Y');

    // await component.getByText('Model').click();

    // await expect.element(modelCell).toContain('1500');
  });
});
