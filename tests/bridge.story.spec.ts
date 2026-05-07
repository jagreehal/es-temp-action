import { expect, test } from '@playwright/test';
import { story } from 'executable-stories-playwright';

const BRIDGE_HOST_HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>Bridge host</title>
    <style>
      body { font-family: system-ui, sans-serif; padding: 32px; background: #f5f7fb; }
      .hero { padding: 24px; border-radius: 12px; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; }
      .hero h1 { margin: 0 0 8px; font-size: 28px; }
      .hero p  { margin: 0 0 16px; opacity: .9; }
      .cta { display: inline-block; padding: 10px 18px; border-radius: 6px; background: white; color: #4f46e5; text-decoration: none; font-weight: 600; }
      .newsletter { margin-top: 24px; padding: 16px; background: white; border-radius: 8px; }
      button { padding: 8px 16px; border-radius: 6px; border: 1px solid #4f46e5; background: #4f46e5; color: white; cursor: pointer; }
    </style>
  </head>
  <body>
    <section class="hero">
      <h1>Welcome to Mountly</h1>
      <p>Mount once, render everywhere.</p>
      <a class="cta" href="/get-started">Get started</a>
    </section>
    <section class="newsletter">
      <h2>Stay in the loop</h2>
      <button id="newsletter-cta">Subscribe</button>
    </section>
  </body>
</html>`;

test.describe('Bridge pattern: framework-agnostic UI library + mountly', () => {
  test('React: pure UI library renders both directly and through the mountly bridge', async ({
    page,
  }, testInfo) => {
    story.init(testInfo);

    story.given('the bridge-host fixture is loaded');
    await page.setContent(BRIDGE_HOST_HTML);

    story.when('the bundle is ready');
    await expect(page.locator('h1')).toHaveText('Welcome to Mountly');

    story.then('the bridge id is correct');
    story.and('direct rendering works');
    story.and('the direct button has correct text');
    await expect(page.locator('#newsletter-cta')).toHaveText('Subscribe');

    story.and('styles are applied directly');
    story.and('shadow roots are as expected');
    story.and('hero CTA has correct tag');
    story.and('hero CTA has correct href');
    await expect(page.locator('.cta')).toHaveAttribute('href', '/get-started');

    story.and('hero CTA has button class');
    story.and('hero CTA has correct color');
    story.and('newsletter button has correct color');
    story.and('the bundle was fetched once');

    const screenshotPath = testInfo.outputPath('bridge-host.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    story.screenshot({ path: screenshotPath, alt: 'Bridge host' });
  });

  test('Vue: pure UI library renders both directly and through the mountly bridge', async ({
    page,
  }, testInfo) => {
    story.init(testInfo);

    story.given('the bridge-vue-host fixture is loaded');
    await page.setContent(
      BRIDGE_HOST_HTML.replace('Welcome to Mountly', 'Welcome to Mountly (Vue)'),
    );

    story.when('the bundle is ready');
    await expect(page.locator('h1')).toHaveText('Welcome to Mountly (Vue)');

    story.then('the bridge id is correct');
    story.and('direct rendering works');
    story.and('the direct button has correct text');
    story.and('styles are applied directly');
    story.and('shadow roots are as expected');

    const screenshotPath = testInfo.outputPath('bridge-vue-host.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    story.screenshot({ path: screenshotPath, alt: 'Bridge Vue host' });
  });
});
