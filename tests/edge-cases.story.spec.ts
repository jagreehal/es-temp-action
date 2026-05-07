import { expect, test } from '@playwright/test';
import { story } from 'executable-stories-playwright';

test.describe('Edge cases', () => {
  test('No-screenshot scenario renders cleanly', async ({ page }, testInfo) => {
    story.init(testInfo);

    story.given('a story with no screenshots');
    await page.setContent('<h1>Plain</h1>');

    story.when('the action posts the comment');
    await expect(page.locator('h1')).toHaveText('Plain');

    story.then('the markdown contains no base64');
    story.and('no placeholder is needed');
  });

  test('Deliberate failure surfaces error in report', async ({ page }, testInfo) => {
    story.init(testInfo);

    story.given('a story that asserts the wrong thing');
    await page.setContent('<h1>Actual</h1>');

    story.when('the assertion runs');
    story.then('it should fail and the action should still post a comment');

    await expect(page.locator('h1')).toHaveText('Expected', { timeout: 1000 });
  });

  test('Many small screenshots in one scenario', async ({ page }, testInfo) => {
    story.init(testInfo);

    story.given('a scenario that captures multiple screenshots');
    await page.setContent('<h1>Multi-shot</h1>');

    for (let i = 1; i <= 4; i++) {
      story.when(`step ${i}: capture screenshot`);
      const shotPath = testInfo.outputPath(`multi-${i}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      story.screenshot({ path: shotPath, alt: `Multi-shot ${i}` });
    }

    story.then('all screenshots become placeholders in the comment');
  });
});
