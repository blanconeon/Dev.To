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
              └── Outlet  → HomePage (index route "/")
```

**State management:** Single Redux slice `articles` (`src/features/articles/articlesSlice.js`) with four async thunks:
- `loadArticles` — default feed
- `loadArticlesByTag(tagName)` — single tag (multi-tag not supported by API)
- `loadArticlesByTopNumber(topNumber)` — trending by day count (e.g. `7`, `30`)
- `loadArticlesByUsername(username)` — exact dev.to username lookup

**Routing → Redux flow:** NavBar `NavLink`s change the URL. `HomePage` reads `useSearchParams` and dispatches the right thunk in a `useEffect`. SearchBar dispatches directly on form submit without touching the URL.

**URL params in use:**
- `?tag=react` → `loadArticlesByTag`
- `?top=7` → `loadArticlesByTopNumber`
- SearchBar dispatches by tag or username directly (no URL param)

## Testing conventions

- Test runner: Vitest with jsdom environment
- Component tests use `@testing-library/react` + `@testing-library/user-event`
- `react-redux` is always mocked with `vi.mock` in component tests; `useDispatch` and `useSelector` are mocked as `vi.fn()`
- Components that use Router hooks require `<MemoryRouter>` wrapper in tests
- Thunk tests invoke the thunk directly: `thunkFn(arg)(dispatch, getState, undefined)` with a mocked `global.fetch`
- Add `afterEach(cleanup)` when multiple tests render the same component
