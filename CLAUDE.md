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

## Testing conventions

- Test runner: Vitest with jsdom environment
- Component tests use `@testing-library/react` + `@testing-library/user-event`
- `react-redux` is always mocked with `vi.mock` in component tests; `useDispatch` and `useSelector` are mocked as `vi.fn()`
- Components that use Router hooks (`useParams`, `useSearchParams`, `NavLink`) require `<MemoryRouter>` wrapper in tests
- Thunk tests invoke the thunk directly: `thunkFn(arg)(dispatch, getState, undefined)` with a mocked `global.fetch`
- Thunks that accept objects (`loadArticlesByTag`, `loadArticlesByTopNumber`, `loadArticlesByUsername`) must be called with `{ param, page }` — the URL assertion must include `&page=`
- Add `afterEach(cleanup)` when multiple tests render the same component
