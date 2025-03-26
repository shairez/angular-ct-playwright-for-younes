import { describe, expect, test } from '@testUtils/vitest';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  test('should render', async ({ mount }) => {
    const { component } = await mount(ChartComponent);
    const chart = component.getByTestId('chart');
    // await chart.hover({ position: { x: 100, y: 100 } });
    await expect.element(chart).toBeVisible();
  });
});
