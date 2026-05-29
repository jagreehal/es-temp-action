import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const reporterPath = require.resolve('executable-stories-playwright/reporter');

export default defineConfig({
  testDir: path.join(__dirname, 'tests'),
  testMatch: '**/*.story.spec.ts',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    [
      reporterPath,
      {
        formats: ['markdown', 'html'],
        outputDir: 'reports',
        outputName: 'test-results',
        // Emit the machine-readable run JSON the Evidence Review (mode: review) consumes.
        rawRunPath: '.executable-stories/raw-run.json',
        markdown: {
          title: 'Executable Stories',
          includeStatusIcons: true,
          includeErrors: true,
          includeMetadata: true,
          sortScenarios: 'source',
        },
      },
    ],
  ],
  use: {
    ...devices['Desktop Chrome'],
    screenshot: 'on',
    video: 'on',
    trace: 'off',
  },
});
