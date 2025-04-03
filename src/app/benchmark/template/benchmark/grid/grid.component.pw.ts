import { expect, MountResult, test } from '@jscutlery/playwright-ct-angular';
import { GridComponent } from './grid.component';

test('should render', async ({ mount }) => {
  const componentUnderTest = await mount(GridComponent);
  const driver = createGridDriver(componentUnderTest);
  await driver.getColumnHeaderByTitle('Model').click();

  await expect(
    componentUnderTest.locator(
      'div:nth-child(2) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label'
    )
  ).toBeVisible();
  await expect(
    componentUnderTest.locator(
      'div:nth-child(2) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label'
    )
  ).toBeVisible();
  await expect(componentUnderTest.locator('ag-grid-angular')).toContainText(
    '1500'
  );
});

function createGridDriver(component: MountResult<GridComponent>) {
  return {
    getColumnHeaderByTitle: (title: string) => {
      return component.getByRole('columnheader', { name: title });
    },
  };
}
