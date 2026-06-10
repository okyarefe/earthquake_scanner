# Earthquake Scanner

Live earthquake dashboard backed by the USGS public feed.

## Stack

**React 19 + TypeScript + Vite**
Typed UI, native ESM dev server, fast HMR.

**TanStack Query v5**
Handles all server state: caching, polling, request deduplication, retries, refetch-on-focus. Removes the boilerplate of writing `useEffect` + `fetch` + manual loading/error state in every component. Cache entries become a single source of truth shared across the app.

**Zod**
Runtime validation at the API boundary. TypeScript only enforces types at compile time — once the response arrives from USGS, only Zod can verify the shape is actually what we expect. The schema is the source of truth; TS types are inferred from it via `z.infer<>`, so the type system and the runtime check cannot drift.

**Vite + pnpm**
Build/dev tooling. ESLint with the typescript-eslint and react-hooks plugins.

## Architecture

**Feature-based folders** (`src/features/<feature>/...`). Each feature owns its `api`, `types`, and `components`. Cross-feature coupling happens through public exports only.

**Query factory pattern.** Each feature exports a `queryOptions()` factory (e.g. `quakeFeedQuery`). Hooks, `invalidateQueries`, and `prefetchQuery` all consume the same factory — the query key and fetcher live in exactly one file. Eliminates the class of bugs where hand-typed keys drift across consumers.

**Boundary validation with transform.** USGS responses are parsed through a Zod schema with `.transform()` mapping the raw GeoJSON shape into the app's domain model (`Quake`). Components consume the domain shape, never the wire format. Upstream API changes localize to the transform.

**Per-item resilience.** Feed items are parsed individually with `safeParse`. Malformed records are dropped and logged for observability — one bad record doesn't take down the list.

**Tuned cache defaults.** `refetchInterval`, `staleTime`, `placeholderData: keepPreviousData`, and `retry` are set centrally in the query factory. Consumers can spread-and-override at the call site when they need different behavior.

## Setup

```
pnpm install
pnpm dev
```
# earthquake_scanner
