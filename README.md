# es-temp-action

Iteration testbed for [`jagreehal/executable-stories-action`](https://github.com/jagreehal/executable-stories-action).

Each PR opens against `main` runs the action and posts a comment with the Executable Stories markdown report. We use this repo to reproduce bugs seen in real consumers (e.g. mountly) and verify fixes before tagging a new `v1`.

## Layout

- `playwright.config.ts` — Playwright with the executable-stories reporter, `screenshot: 'on'`, `video: 'on'`
- `tests/bridge.story.spec.ts` — multi-screenshot spec that produces a base64-heavy markdown report (mirrors mountly's bridge-pure-ui-libraries pattern)
- `.github/workflows/stories.yml` — runs Playwright then `jagreehal/executable-stories-action`

## How to use

1. Open a PR against `main`.
2. Wait for the workflow to finish.
3. Inspect the bot comment on the PR — that is what consumers see.
4. Compare against the HTML report artifact (`executable-stories-report`).

## Pointing at a specific action branch

To validate an unreleased fix, change the workflow's `uses:` line to the branch:

```yaml
uses: jagreehal/executable-stories-action@<branch-name>
```
