# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server
npm run build        # production build
npm run lint         # eslint
npm test             # run all tests (vitest, watch mode)
npm run test:ui      # vitest with browser UI
npm run coverage     # test coverage report
```

To run a single test file:
```bash
npx vitest run src/components/SearchBar.test.jsx
```

## Architecture

This is a React app that clones a subset of dev.to functionality, consuming the [dev.to public API](https://dev.to/api/articles).

**Dependency layers (outermost to innermost):**
```
Provider (Redux)          — src/main.jsx
  └── RouterProvider      — src/App.jsx (createBrowserRouter)
        └── Root layout   — src/layouts/Root.jsx
              ├── NavBar  — always rendered, contains SearchBar
              └── Outlet  → page routes (see below)
```

**Routes:**
- `/` → `HomePage` (index)
- `/articles` → `HomePage` — exists so NavBar links like `/articles?tag=react` don't 404; `useSearchParams` handles the query string
- `/articles/:id` → `ArticlePage` — dispatches `loadArticlesById(id)` + `loadCommentsById(id)`
- `/profile/:username` → `ProfilePage` — dispatches `loadProfileByUserName(username)` + `loadArticlesByUsername({username, page})`

**Redux store — three slices** (`src/app/store.js`):

| Slice | File | Key state |
|-------|------|-----------|
| `articles` | `src/features/articles/articlesSlice.js` | `articlesList`, `currentArticle`, `isLoading`, `error` |
| `comments` | `src/features/comments/commentsSlice.js` | `articleComments`, `isLoading`, `error` |
| `profile` | `src/features/profile/profileSlice.js` | `selectedProfile`, `isLoading`, `error` |

**`articles` slice thunks:**
- `loadArticles(page)` — default feed, paginated
- `loadArticlesByTag({ tagName, page })` — single tag, paginated
- `loadArticlesByTopNumber({ topNumber, page })` — trending by day count, paginated
- `loadArticlesByUsername({ username, page })` — exact dev.to username lookup, paginated
- `loadArticlesById(id)` — single article detail (stored in `currentArticle`)

**Routing → Redux flow:** NavBar `NavLink`s set the full URL (e.g. `/articles?tag=react`). `HomePage` reads `useSearchParams` and dispatches the right thunk in a `useEffect`. SearchBar uses `navigate('/articles?tag=...')` which also sets the full URL. `setSearchParams` is only used by pagination buttons — it merges `page` into existing params without wiping them.

**URL params in use:**
- `?tag=react` → `loadArticlesByTag`
- `?top=7` → `loadArticlesByTopNumber`
- `?username=jess` → `loadArticlesByUsername`
- `?page=2` → passed to whichever thunk is active; defaults to `1` when absent

**Pagination:**
- `HomePage` and `ProfilePage` both have Prev/Next buttons using `setSearchParams` with a merge pattern to preserve existing params while updating `page`
- `ProfilePage` uses both `useParams` (for `username` from the path) and `useSearchParams` (for `page`) — they coexist independently
- `ProfilePage` has two separate `useEffect`s: one for `[username]` (profile fetch), one for `[username, page]` (articles fetch) — prevents re-fetching the profile on every page change

**Error handling:**
- `articlesSlice` — `rejected` cases store `action.error.message` (string) in `error`; exported as `articlesSliceError` selector
- `profileSlice` — `rejected` case stores `true` in `error` (boolean, generic message shown in UI); exported as `profileSliceError` selector
- `commentsSlice` — no error selector exported; comments failure is silent (article still renders without comments)
- `HomePage` — early return order: loading → error → no results
- `ArticlePage` — early return order: loading → comments loading → error → no results
- `ProfilePage` — profile error uses early return (blocks whole page); articles error uses inline conditional `{articlesError ? <div>{articlesError}</div> : loadedArticles.map(...)}` so profile info stays visible; "No Results" check includes `!articlesError` guard to prevent both messages showing simultaneously when first load fails

## Testing conventions

- Test runner: Vitest with jsdom environment
- Component tests use `@testing-library/react` + `@testing-library/user-event`
- `react-redux` is always mocked with `vi.mock` in component tests; `useDispatch` and `useSelector` are mocked as `vi.fn()`
- Components that use Router hooks (`useParams`, `useSearchParams`, `NavLink`) require `<MemoryRouter>` wrapper in tests
- Thunk tests invoke the thunk directly: `thunkFn(arg)(dispatch, getState, undefined)` with a mocked `global.fetch`
- Thunks that accept objects (`loadArticlesByTag`, `loadArticlesByTopNumber`, `loadArticlesByUsername`) must be called with `{ param, page }` — the URL assertion must include `&page=`
- Add `afterEach(cleanup)` when multiple tests render the same component

**Test coverage per file:**

| File | Tests |
|------|-------|
| `articlesSlice.test.js` | reducer: pending/fulfilled/rejected for `loadArticles`; reducer: pending/fulfilled/rejected for `loadArticlesById` (separate because it writes to `currentArticle`, not `articlesList`); selectors: `allArticles`, `selectIsLoading`, `articlesSliceError`; thunk URL tests for all five thunks |
| `profileSlice.test.js` | reducer: pending/fulfilled/rejected for `loadProfileByUserName`; selectors: `fetchedProfile`, `selectedProfIsLoading`, `profileSliceError`; thunk URL test |
| `commentsSlice.test.js` | reducer: pending/fulfilled/rejected; no selector test (error selector not exported — comments failure is silent) |
| `HomePage.test.jsx` | renders articles; error state; no results; loading state; Prev/Next buttons (Prev disabled on page 1, Next disabled when < 30 articles) |
| `ProfilePage.test.jsx` | renders profile data; dispatch triggered; loading state; no results; profile error ("Something went wrong.."); articles error ("error message" inline, requires `selectedProfile` present); renders articles list; Prev/Next buttons |
| `ArticlePage.test.jsx` | renders article; dispatch triggered; loading state; no results; error message |
| `SearchBar.test.jsx` | renders form elements; tag search navigates to `/articles?tag=react`; username search navigates to `/articles?username=jeffrey` |

**Key testing patterns:**
- Reducer tests only include state fields relevant to the action being tested — other fields can be omitted
- `loadArticlesById` is the only thunk with both a thunk URL test AND reducer tests, because it writes to `currentArticle` while all other thunks write to `articlesList` (already covered by `loadArticles` reducer tests)
- `ProfilePage` error tests are split: one with `profile.error: true` (early return, profile section never renders), one with `profile.error: false` + populated `selectedProfile` (reaches inline articles error)
- ProfilePage button test requires `profile.selectedProfile` in fakeState — without it the component hits `!loadedProfile` early return before rendering buttons

## E2E tests (Playwright)

- Config: `playwright.config.js` at root — `testDir: './tests/'`, `baseURL: 'http://localhost:5173'`
- `webServer` block starts `npm run dev` automatically before tests run — no need to start the dev server manually
- Test files live in `tests/` at the root (not inside `src/`)
- Run with: `npx playwright test`
- Reports generated in `playwright-report/` (add to `.gitignore`)
- No mocks — real browser, real API, real user interactions
