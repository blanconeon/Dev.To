# Dev.to Clone

A React app that clones a subset of [dev.to](https://dev.to) functionality, consuming the dev.to public API.

## Features

- Browse the latest developer articles with pagination
- Filter by tag, trending (top 7 / top 30), or username
- Search by tag or username via the SearchBar
- Read full articles with comments
- View developer profiles with their article history
- Error messages for failed API calls

## Tech Stack

- **React** with React Router v6
- **Redux Toolkit** — 3 slices: articles, comments, profile
- **Vite** for bundling and dev server
- **Vitest** + **Testing Library** for unit and component tests
- **Playwright** for end-to-end browser tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # eslint
npm test          # run all unit/component tests (Vitest, watch mode)
npm run coverage  # test coverage report
```

## Testing

### Unit & Component Tests (Vitest)

```bash
npm test                                              # all tests, watch mode
npx vitest run src/components/SearchBar.test.jsx      # run a single file
npm run coverage                                      # coverage report
```

Covers reducers (pending/fulfilled/rejected), selectors, thunks (URL correctness, API errors, network errors), component rendering, loading/error/no-results states, pagination buttons, and dispatch triggering.

### End-to-End Tests (Playwright)

```bash
npx playwright test                              # all browsers, headless
npx playwright test --project=chromium           # chromium only, faster iteration
npx playwright test tests/homepage.spec.js --ui  # Playwright UI for step-through debugging
```

Real browser, real API, no mocks. Dev server starts automatically before the suite runs.

**Coverage:** HomePage (articles load, pagination), SearchBar (tag and username search), NavBar (tag links), ArticlePage (renders, tag navigation, author link), ProfilePage (profile and articles render, pagination).

## Lighthouse Scores

| Category | Score |
|----------|-------|
| Performance | 100 |
| Accessibility | 92 |
| Best Practices | 100 |
| SEO | 90 |

## API

Uses the [dev.to public API](https://dev.to/api/articles) — no authentication required.

| Endpoint | Used for |
|----------|----------|
| `GET /api/articles?page=N` | article feed |
| `GET /api/articles?tag=react&page=N` | articles by tag |
| `GET /api/articles?top=7&page=N` | trending articles |
| `GET /api/articles?username=jess&page=N` | articles by user |
| `GET /api/articles/:id` | single article with full content |
| `GET /api/comments?a_id=:id` | comments for an article |
| `GET /api/users/by_username?url=:username` | user profile |
