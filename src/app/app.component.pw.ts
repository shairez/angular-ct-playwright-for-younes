import { expect, test } from '@jscutlery/playwright-ct-angular';
import { AppComponent } from './app.component';

test(`GreetingsComponent should be polite`, async ({ page, mount }) => {
  await mount(AppComponent);
  await expect(page.getByRole('heading')).toHaveText('👋 Hello Brother!');
});
