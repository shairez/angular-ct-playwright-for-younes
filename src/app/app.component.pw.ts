import { expect, test } from '@jscutlery/playwright-ct-angular';
import { AppComponent } from './app.component';

test(`GreetingsComponent should be polite`, async ({ mount }) => {
  const locator = await mount(AppComponent);
  expect(locator).toHaveText('👋 Hello!');
});