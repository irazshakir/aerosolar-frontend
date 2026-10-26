# Sial Chatbot FE — Project Blueprint

> Source of truth for scaffolding the reusable SaaS frontend theme.
> Last updated: 2026-10-25
> Keep this file in the repo. A new Qoder task should read it before creating anything.

> **Implementation status (verified 2026-10-25):**
> - **Phase 1 (Foundation)** and **Phase 2 (Primitives and example features)** are **complete**.
> - Every file in the section 5 tree exists and matches its section 6 responsibility.
> - `npm run build` passes (feature pages split into separate chunks, `antd` isolated in its own chunk).
> - `npm run lint` passes with zero errors.
> - **API integration layer is ready for FastAPI:** centralized `endpoints.ts`, typed `http.ts` helpers, and a snake_case ↔ camelCase transform at the boundary. Flip `VITE_USE_MOCK_API=false` to hit the backend.
> - **Phase 3 (real API)** and **Phase 4 (polish)** are still pending (out of scope for now).
> - Section headings below are marked `✅ Completed` where the code matches the spec.

---

## 1. Purpose — ✅ Completed (reference)

Build a **reusable, light, fast SaaS admin frontend** that can be re-skinned for future products by editing one brand file. The first consumer is the Sial chatbot product, but the shell, theme, and UI primitives must stay product-agnostic.

Design reference: [ignitionapp.com](https://www.ignitionapp.com/) — light canvas, white cards, purple accent, left sidebar, generous whitespace, Inter-style typography.

---

## 2. Design direction — ✅ Completed

- **Light and airy:** `#F7F8FA` page canvas, white surfaces, subtle 1px borders, no heavy shadows.
- **One accent color:** purple `#6C4DF6` for primary actions, active nav, links, focus rings.
- **Rounded but professional:** 10px default radius, 14px cards, 16px modals/drawers.
- **Typography:** Inter Variable, 14px base, 600 weight for headings and KPI values.
- **Layout:** fixed 248px sidebar (collapses to 72px), 64px header, 24px content padding, max content width 1440px.
- **Responsive:** below 992px the sidebar becomes a Drawer triggered from the header.
- **No visual experiments in shared components.** Product-specific styling stays inside feature folders.

---

## 3. Tech stack — ✅ Completed

| Concern | Choice | Notes |
| --- | --- | --- |
| UI runtime | React 19 | Function components only |
| Language | TypeScript (strict) | No `any` in API DTOs |
| Build | Vite (latest stable) | `@vitejs/plugin-react` |
| Components | **Ant Design v6** + `@ant-design/icons` v6 | v6 supports React 19 natively; no v5 patch package |
| Routing | React Router v7 (`react-router-dom`) | `createBrowserRouter`, route-level lazy loading |
| Server state | TanStack Query v5 | Caching, `keepPreviousData`, mutations |
| Client state | Zustand v5 | Auth session and UI preferences only |
| HTTP | Axios | One shared instance, interceptors |
| Dates | dayjs | Already used by Ant Design |
| Font | `@fontsource-variable/inter` | Self-hosted, no Google Fonts request |
| Charts | Not installed initially | Add Recharts/ECharts later, lazy-loaded per route |
| Chat UI | Not installed initially | Add `@ant-design/x` later, lazy-loaded on chat routes only |

**Do not add:** Redux, Tailwind, moment, styled-components, a second UI library, MSW, or per-feature Axios instances.

---

## 4. Bootstrap commands — ✅ Completed

Run from the repo root (the folder containing this file).

```bash
npm create vite@latest . -- --template react-ts
```

If Vite reports that the current directory is not empty because this file exists, choose **Ignore files and continue**. **Never choose "Remove existing files".**

```bash
npm install antd @ant-design/icons @tanstack/react-query axios react-router-dom zustand dayjs @fontsource-variable/inter
npm install -D prettier eslint-config-prettier
```

After scaffolding, initialize git so later agent changes are reviewable:

```bash
git init
git add .
git commit -m "chore: scaffold vite react ts baseline"
```

---

## 5. Folder structure — ✅ Completed

```text
sialChatbotFE/
├─ .env.example
├─ .gitignore
├─ .prettierrc
├─ eslint.config.js
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ PROJECT_STRUCTURE.md
└─ src/
   ├─ main.tsx
   ├─ vite-env.d.ts
   ├─ app/
   │  ├─ App.tsx
   │  ├─ providers/
   │  │  ├─ AppProviders.tsx
   │  │  ├─ ThemeProvider.tsx
   │  │  └─ QueryProvider.tsx
   │  └─ router/
   │     ├─ index.tsx
   │     └─ ProtectedRoute.tsx
   ├─ theme/
   │  ├─ brand.ts
   │  ├─ tokens.ts
   │  ├─ antdTheme.ts
   │  └─ global.css
   ├─ layouts/
   │  ├─ AppLayout/
   │  │  ├─ index.tsx
   │  │  ├─ AppSidebar.tsx
   │  │  ├─ AppHeader.tsx
   │  │  ├─ AppBreadcrumbs.tsx
   │  │  └─ PageContainer.tsx
   │  └─ AuthLayout/
   │     └─ index.tsx
   ├─ components/
   │  ├─ ui/
   │  │  ├─ DataTable.tsx
   │  │  ├─ PageHeader.tsx
   │  │  ├─ StatCard.tsx
   │  │  ├─ StatusTag.tsx
   │  │  ├─ FilterBar.tsx
   │  │  ├─ FormDrawer.tsx
   │  │  ├─ EmptyState.tsx
   │  │  └─ ConfirmDelete.tsx
   │  └─ feedback/
   │     ├─ ErrorBoundary.tsx
   │     ├─ FullPageLoader.tsx
   │     └─ ResultPage.tsx
   ├─ features/
   │  ├─ auth/
   │  │  ├─ api.ts
   │  │  ├─ hooks.ts
   │  │  ├─ types.ts
   │  │  ├─ pages/LoginPage.tsx
   │  │  ├─ pages/SignUpPage.tsx
   │  │  └─ routes.tsx
   │  ├─ dashboard/
   │  │  ├─ api.ts
   │  │  ├─ hooks.ts
   │  │  ├─ components/KpiGrid.tsx
   │  │  ├─ components/ActivityTable.tsx
   │  │  ├─ pages/DashboardPage.tsx
   │  │  └─ routes.tsx
   │  └─ chatbots/
   │     ├─ api.ts
   │     ├─ mock.ts
   │     ├─ hooks.ts
   │     ├─ types.ts
   │     ├─ components/ChatbotFilters.tsx
   │     ├─ components/ChatbotFormDrawer.tsx
   │     ├─ pages/ChatbotsPage.tsx
   │     └─ routes.tsx
   ├─ lib/
   │  ├─ api/
   │  │  ├─ client.ts
   │  │  ├─ endpoints.ts
   │  │  ├─ errors.ts
   │  │  ├─ http.ts
   │  │  ├─ queryClient.ts
   │  │  └─ transform.ts
   │  ├─ auth/
   │  │  └─ tokenStore.ts
   │  ├─ hooks/
   │  │  └─ useDebouncedValue.ts
   │  └─ utils/
   │     └─ format.ts
   ├─ store/
   │  ├─ authStore.ts
   │  └─ uiStore.ts
   ├─ config/
   │  ├─ env.ts
   │  └─ navigation.ts
   └─ types/
      └─ api.ts
```

### Dependency direction (hard rule)

```text
app → features → components / lib → theme
```

- `theme/`, `components/ui/`, and `layouts/` must never import from `features/`.
- A feature must never import from another feature. Share through `components/ui` or `lib`.
- Only `features/*/api.ts` talks HTTP. Components never import Axios.
- No barrel `index.ts` files. Import files directly; barrels hurt tree-shaking and HMR.

---

## 6. File responsibilities — ✅ Completed

### 6.1 Root config

| File | Responsibility |
| --- | --- |
| `vite.config.ts` | React plugin, `@` → `./src` alias, manual chunks (`react`, `antd`, `query`), dev server on 5173 |
| `tsconfig.app.json` | `strict: true`, `baseUrl: "."`, `paths: { "@/*": ["src/*"] }`, `noUnusedLocals`, `noUncheckedIndexedAccess` |
| `.env.example` | Documents the three env vars in section 13 |
| `index.html` | Title, meta description, `theme-color` `#6C4DF6`, `<div id="root">` |
| `.prettierrc` | `semi: false`, `singleQuote: true`, `printWidth: 100` |
| `eslint.config.js` | Extend the Vite React-TS template; add `eslint-config-prettier` last |

> Note: the shipped `tsconfig.app.json` omits the `baseUrl: "."` listed above — TypeScript 6
> no longer allows `baseUrl`, and `paths: { "@/*": ["./src/*"] }` resolves correctly without it.
> All other listed options (`strict`, `noUnusedLocals`, `noUncheckedIndexedAccess`) are present.

### 6.2 `src/app/`

| File | Responsibility |
| --- | --- |
| `main.tsx` | Import `@fontsource-variable/inter`, `theme/global.css`; render `<App />` in `StrictMode` |
| `App.tsx` | `ErrorBoundary` → `AppProviders` → `RouterProvider` |
| `providers/AppProviders.tsx` | Compose `QueryProvider` + `ThemeProvider` |
| `providers/QueryProvider.tsx` | `QueryClientProvider` with the shared client from `lib/api/queryClient.ts` |
| `providers/ThemeProvider.tsx` | `ConfigProvider theme={antdTheme}` + Ant Design `App` wrapper; supports light/dark algorithm from `uiStore` |
| `router/index.tsx` | `createBrowserRouter`; public login and sign-up routes; protected layout route; compose feature routes; catch-all 404 |
| `router/ProtectedRoute.tsx` | Reads `authStore`; `idle` → loader, `unauthenticated` → redirect `/login` with `from` state, authenticated → children |

### 6.3 `src/theme/` — the reusable design system

| File | Responsibility |
| --- | --- |
| `brand.ts` | Only per-product file: `appName`, `shortName`, `primaryColor`, `logoUrl`, `supportEmail`, `favicon` |
| `tokens.ts` | Raw palette, spacing scale, radii, font stack. No Ant Design imports |
| `antdTheme.ts` | Builds `ThemeConfig` from `brand` + `tokens`; token and component overrides in section 7 |
| `global.css` | Minimal reset, `html/body/#root` height, body background, scrollbar styling, focus-visible outline |

To create a new SaaS from this template: edit `brand.ts`, replace `features/*`, keep everything else.

### 6.4 `src/layouts/`

| File | Responsibility |
| --- | --- |
| `AppLayout/index.tsx` | Ant Design `Layout`; Sider on desktop, Drawer on mobile; `Suspense` around `<Outlet />` with `FullPageLoader` |
| `AppLayout/AppSidebar.tsx` | Logo block, `Menu` built from `config/navigation.ts`, collapse control, user card at bottom |
| `AppLayout/AppHeader.tsx` | Mobile menu button, breadcrumbs, global search (visual only for now), notifications badge, avatar dropdown |
| `AppLayout/AppBreadcrumbs.tsx` | Derives breadcrumbs from the current path and navigation tree |
| `AppLayout/PageContainer.tsx` | Standard page wrapper: max-width, padding, optional `PageHeader` |
| `AuthLayout/index.tsx` | Centered card, logo, max-width 420px, subtle radial gradient background |

### 6.5 `src/components/`

`ui/` holds theme-aware primitives only — no product logic.

| File | Responsibility |
| --- | --- |
| `DataTable.tsx` | Typed Ant Design Table wrapper; server pagination, sort callbacks, toolbar slot, loading, empty state, `scroll={{ x: 'max-content' }}`, optional `virtual` |
| `PageHeader.tsx` | Title, subtitle, actions slot, optional breadcrumbs |
| `StatCard.tsx` | KPI label/value/delta/icon, skeleton loading state |
| `StatusTag.tsx` | Central status → color mapping (`active`, `paused`, `draft`, `error`) |
| `FilterBar.tsx` | Search input, selects, reset button; emits a filter object |
| `FormDrawer.tsx` | Generic create/edit Drawer with Ant Design Form, submit footer, loading and error states |
| `EmptyState.tsx` | Ant Design `Empty` with title, description, action |
| `ConfirmDelete.tsx` | `Popconfirm` + async confirm handler with loading |
| `feedback/ErrorBoundary.tsx` | Class component; renders `ResultPage status="500"` |
| `feedback/FullPageLoader.tsx` | Centered `Spin` for route/auth loading |
| `feedback/ResultPage.tsx` | `Result` for 403, 404, 500 with optional home action |

### 6.6 `src/features/`

Each feature is a vertical slice with the same shape:

```text
features/<name>/
├─ api.ts        # async request functions only
├─ mock.ts       # local fixture data while the backend is absent
├─ hooks.ts      # query key factory + useQuery/useMutation
├─ types.ts      # DTOs and form value types
├─ components/   # feature-only components
├─ pages/        # route-level pages (default export)
└─ routes.tsx    # RouteObject[] with React.lazy pages
```

Initial features:

- **auth** — login page, sign-up page (name, organization name, phone, email, password, terms), mock login/register, auth store integration, redirect to `from` after login.
- **dashboard** — four KPI cards, recent activity table, mock data. Proves the shell and stat-card patterns.
- **chatbots** — full CRUD example with mock data: list + search/filter + create/edit drawer + delete confirm. Proves `DataTable`, `FilterBar`, `FormDrawer`, `ConfirmDelete`, and query invalidation.

### 6.7 `src/lib/`, `src/store/`, `src/config/`, `src/types/`

| File | Responsibility |
| --- | --- |
| `lib/api/client.ts` | Axios instance: `baseURL` from env, `withCredentials: true`, 15s timeout, bearer access token from `tokenStore`, single-flight 401 refresh + retry, normalized errors |
| `lib/api/endpoints.ts` | Single route registry for every FastAPI endpoint (auth, dashboard, chatbots). No route string is written inline elsewhere |
| `lib/api/http.ts` | Typed `get/post/put/patch/delete` helpers: serialize camelCase → snake_case, unwrap `{ data, message? }`, return camelCase domain DTOs |
| `lib/api/transform.ts` | `toCamelCaseDeep` / `toSnakeCaseDeep` key converters — the only place wire casing is handled |
| `lib/api/errors.ts` | `ApiError` type, `toApiError`, safe message extraction for UI |
| `lib/api/queryClient.ts` | Defaults: `staleTime: 30_000`, `gcTime: 5 * 60_000`, `retry: 1`, `refetchOnWindowFocus: false` |
| `lib/auth/tokenStore.ts` | In-memory access token get/set/clear. Never write access tokens to localStorage |
| `lib/hooks/useDebouncedValue.ts` | 300ms debounced value for search inputs |
| `lib/utils/format.ts` | `formatDate`, `formatRelative`, `formatNumber`, `formatCurrency` |
| `store/authStore.ts` | Zustand: user, status, `setSession`, `clearSession` |
| `store/uiStore.ts` | Zustand + `persist`: sidebar collapsed, theme mode. UI preferences only |
| `config/env.ts` | Typed, validated `VITE_*` exports; throws on missing API URL in production |
| `config/navigation.ts` | Single source for sidebar menu, breadcrumbs, and page titles. Typed `NavItem` tree |
| `types/api.ts` | `ApiEnvelope<T>`, `Paginated<T>`, `ListParams`, `SortOrder` |

---

## 7. Theme specification — ✅ Completed

### 7.1 Global tokens

```ts
// theme/antdTheme.ts (shape, not final code)
const theme: ThemeConfig = {
  token: {
    colorPrimary: '#6C4DF6',
    colorLink: '#6C4DF6',
    colorSuccess: '#12B76A',
    colorWarning: '#F79009',
    colorError: '#F04438',
    colorInfo: '#6C4DF6',
    colorText: '#101828',
    colorTextSecondary: '#667085',
    colorBorder: '#EAECF0',
    colorBorderSecondary: '#F2F4F7',
    colorBgLayout: '#F7F8FA',
    colorBgContainer: '#FFFFFF',
    borderRadius: 10,
    borderRadiusLG: 14,
    borderRadiusSM: 8,
    controlHeight: 40,
    fontSize: 14,
    fontFamily: "'Inter Variable', Inter, system-ui, -apple-system, sans-serif",
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: '#FFFFFF',
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: '#FFFFFF',
      bodyBg: '#F7F8FA',
    },
    Menu: {
      itemBg: 'transparent',
      subMenuItemBg: 'transparent',
      itemSelectedBg: '#F1EEFF',
      itemSelectedColor: '#6C4DF6',
      itemBorderRadius: 10,
      itemHeight: 42,
      itemMarginInline: 12,
      iconSize: 18,
    },
    Button: {
      controlHeight: 40,
      borderRadius: 10,
      primaryShadow: 'none',
      defaultShadow: 'none',
    },
    Table: {
      headerBg: '#FAFAFB',
      headerColor: '#667085',
      headerSplitColor: 'transparent',
      rowHoverBg: '#F9FAFB',
      cellPaddingBlock: 14,
      borderColor: '#EAECF0',
    },
    Card: {
      bodyPadding: 24,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 10,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 10,
    },
    Drawer: {
      paddingLG: 24,
    },
    Tag: {
      borderRadiusSM: 6,
    },
  },
}
```

Rules:

- Colors used by components come from Ant Design tokens, not hard-coded hex values. The hex values above exist only in `tokens.ts`.
- Ant Design v6 uses CSS variables by default. Keep runtime theming so `brand.primaryColor` can change per deployment.
- Do not enable `zeroRuntime` or static style extraction in the initial build; it conflicts with runtime brand switching.
- Do not import legacy Ant Design CSS files or component-level styles.

### 7.2 Branding

```ts
// theme/brand.ts
export const brand = {
  appName: 'Sial Chatbot',
  shortName: 'Sial',
  primaryColor: '#6C4DF6',
  logoUrl: '/logo.svg',
  supportEmail: 'support@sial.example',
}
```

---

## 8. Navigation and routing — ✅ Completed

### 8.1 Navigation config

```ts
export interface NavItem {
  key: string
  label: string
  path: string
  icon: ReactNode
  children?: NavItem[]
  hidden?: boolean
}
```

Initial items: Dashboard (`/dashboard`), Chatbots (`/chatbots`). Sidebar, breadcrumbs, and document titles all read from this config.

### 8.2 Route tree

```text
/login                  AuthLayout + LoginPage
/signup                 AuthLayout + SignUpPage
/                        ProtectedRoute + AppLayout
  index                  redirect → /dashboard
  /dashboard             DashboardPage
  /chatbots              ChatbotsPage
*                        ResultPage 404
```

- Pages are lazy-loaded with `React.lazy` inside each feature's `routes.tsx`.
- One `Suspense` boundary in `AppLayout` around `<Outlet />`.
- `ProtectedRoute` shows `FullPageLoader` while the auth state is `idle`.
- Route elements and menu entries must stay in sync through `config/navigation.ts`.

---

## 9. Data layer contract — ✅ Completed

### 9.1 API client

- One Axios instance in `lib/api/client.ts`.
- Base URL from `VITE_API_BASE_URL`; `withCredentials: true`.
- Request interceptor adds `Authorization: Bearer <accessToken>` when a token exists.
- Response interceptor on 401 performs one refresh request, retries the original request once, and otherwise clears the session and redirects to `/login`.
- All failures are converted to `ApiError` with `status`, `code`, and a user-safe `message`.
- Feature `api.ts` files call the typed helpers in `lib/api/http.ts`, which unwrap the envelope and convert casing. They never touch the Axios instance directly.

### 9.2 Types

Domain DTOs are hand-written in camelCase. The backend contract is snake_case; the
boundary transform in `lib/api/http.ts` bridges the two.

```ts
// Domain shape handed to the UI (camelCase)
export interface ApiEnvelope<T> {
  data: T
  message?: string
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface ListParams {
  page?: number
  pageSize?: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
  [filter: string]: unknown
}

// Wire shape as FastAPI returns it (snake_case) — documented reference
export interface WirePaginated<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}
```

- `PageSize` is the only field that changes name across the boundary (`page_size` ↔ `pageSize`); every other paging field is identical.
- `http.ts` accepts both a `{ data, message? }` envelope and a bare payload, so the backend can add or drop the envelope without touching feature code.
- Adjust DTOs in each feature's `types.ts` and the envelope in `types/api.ts`; change them in one place only.

### 9.3 Query hooks

- Query key factory per feature:
  ```ts
  export const chatbotKeys = {
    all: ['chatbots'] as const,
    list: (params: ListParams) => [...chatbotKeys.all, 'list', params] as const,
    detail: (id: string) => [...chatbotKeys.all, 'detail', id] as const,
  }
  ```
- List queries use `placeholderData: keepPreviousData` so pagination does not flash.
- Mutations invalidate the feature's key root on success and surface errors through Ant Design's message API.
- Components call hooks only; they never call `api.ts` directly.

### 9.4 Mock mode

- `VITE_USE_MOCK_API=true` keeps the app fully usable before the backend exists.
- Mock data lives in `features/<name>/mock.ts` with realistic latency (300–600ms) to exercise loaders.
- Mocks return the same camelCase domain types as the real branch, so switching does not touch hooks or components.
- When the backend is ready, set the flag to `false` and confirm the route/DTO mapping; no component changes.

### 9.5 Endpoint registry and backend contract

All FastAPI routes live in `lib/api/endpoints.ts`, relative to `VITE_API_BASE_URL` (which already includes `/api`). No feature writes a route string inline.

| Feature | Method | Path | Returns |
| --- | --- | --- | --- |
| auth | POST | `/auth/login` | `AuthSession` |
| auth | POST | `/auth/register` | `AuthUser` |
| auth | POST | `/auth/refresh` | `AuthSession` (httpOnly refresh cookie) |
| auth | POST | `/auth/logout` | `204` |
| auth | GET | `/auth/me` | `AuthUser` |
| dashboard | GET | `/dashboard/kpis` | `Kpi[]` |
| dashboard | GET | `/dashboard/activity` | `ActivityItem[]` |
| chatbots | GET | `/chatbots?page&page_size&search&status&sort&order` | `Paginated<Chatbot>` |
| chatbots | POST | `/chatbots` | `Chatbot` |
| chatbots | GET | `/chatbots/{id}` | `Chatbot` |
| chatbots | PUT | `/chatbots/{id}` | `Chatbot` |
| chatbots | DELETE | `/chatbots/{id}` | `204` |

Contract rules:

- JSON is `snake_case` on the wire; `lib/api/transform.ts` converts keys to camelCase in both directions.
- Successful bodies may be bare or wrapped in `{ "data": ..., "message": ... }`; `http.ts` accepts both.
- Errors use `{ "message": string, "code"?: string }` with a non-2xx status; `errors.ts` normalizes them to `ApiError`.
- Auth is JWT: access token in memory + `Authorization: Bearer`; refresh token in an httpOnly cookie handled by `withCredentials`.

Swapping mock for real, per feature:

1. Set `VITE_USE_MOCK_API=false`.
2. Confirm the path in `endpoints.ts` matches the FastAPI router.
3. Confirm the camelCase DTO in `features/<name>/types.ts` matches the Pydantic schema (snake_case on the wire).
4. Keep `mock.ts` in place; it remains useful for tests and offline demos.

---

## 10. Shared component contracts — ✅ Completed

### DataTable

```ts
interface DataTableProps<T> {
  columns: ColumnsType<T>
  data: T[] | undefined
  loading?: boolean
  total?: number
  page?: number
  pageSize?: number
  onPageChange?: (page: number, pageSize: number) => void
  onSortChange?: (field: string, order: 'asc' | 'desc') => void
  toolbar?: ReactNode
  rowKey: keyof T | ((row: T) => string)
  empty?: ReactNode
  scrollX?: number | string
  virtual?: boolean
}
```

### FormDrawer

```ts
interface FormDrawerProps<T> {
  open: boolean
  title: string
  initialValues?: Partial<T>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: T) => Promise<void> | void
  children: ReactNode
  width?: number
}
```

- Both components are generic and theme-aware, with no imports from `features/`.
- All eight UI primitives must be used by at least one initial feature so they are verified.

---

## 11. Conventions — ✅ Completed

1. **TypeScript strict**, no `any` in request/response types. Use `unknown` + narrowing where needed.
2. **Named exports** for primitives and hooks; **default exports** for pages and layouts.
3. **File naming:** components and pages `PascalCase.tsx`; everything else `camelCase.ts`.
4. **Imports:** always `@/...`; never traverse more than one level with `../`.
5. **No cross-feature imports.** No exceptions.
6. **No business logic in `components/ui/`.** If a primitive needs product data, the feature composes it.
7. **No inline hex colors** in feature code. Use Ant Design tokens or CSS variables.
8. **No `useEffect` data fetching.** Server state belongs to TanStack Query.
9. **No localStorage auth tokens.** Access token in memory, refresh token in an httpOnly cookie.
10. **One feature per task.** Keep changes reviewable.

---

## 12. Performance requirements — ✅ Completed

- Route-level code splitting for every feature page.
- Manual vendor chunks: `react`, `antd`, `@tanstack`, `zustand`, `axios`.
- Server-side pagination, filtering, and sorting for every table. Never fetch all rows and filter in the browser.
- Debounce search inputs at 300ms; cancel stale requests via TanStack Query keys.
- Query defaults from section 9.3, and avoid global `refetchInterval`.
- Use Ant Design Table `virtual` only for lists over ~200 rendered rows; otherwise paginate.
- Import icons individually (`import { PlusOutlined } from '@ant-design/icons'`); never namespace-import.
- No moment.js, no full lodash import, no barrel files.
- Add `rollup-plugin-visualizer` as a dev dependency and a `build:analyze` script; check the bundle at each phase.
- Target: initial route JS under ~500KB gzip, with Ant Design isolated in its own cached chunk.

---

## 13. Environment variables — ✅ Completed

```dotenv
VITE_APP_NAME=Sial Chatbot
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK_API=true
```

- Copy `.env.example` to `.env.local` for local development.
- `config/env.ts` exposes typed values and throws when `VITE_API_BASE_URL` is missing in a production build.
- Never commit `.env.local`.

---

## 14. Build order — ✅ Phase 1 & 2 Completed

### Phase 1 — Foundation (initial task) — ✅ Completed

1. Scaffold Vite + React + TypeScript.
2. Configure alias, strict TS, Prettier, env files.
3. Build `theme/` (brand, tokens, Ant Design theme, global CSS).
4. Build providers (`ThemeProvider`, `QueryProvider`, `AppProviders`).
5. Build app shell (`AppLayout`, sidebar, header, breadcrumbs, auth layout).
6. Build navigation config, router, protected route.
7. Build login page with mock auth.
8. Verify: `npm run dev` renders the shell; `npm run build` passes.

### Phase 2 — Primitives and example features — ✅ Completed

1. Build all `components/ui/` primitives and feedback components.
2. Build the dashboard with KPI cards and activity table.
3. Build the chatbots CRUD slice with mock data.
4. Verify all primitives are exercised; run build and lint.

### Phase 3 — Real API integration — ⏳ Pending (client scaffolding ready)

1. Replace mock branches with real endpoints feature by feature.
2. Align `types/api.ts` with the backend envelope.
3. Verify 401 refresh, error messaging, pagination, and mutation invalidation.

### Phase 4 — Polish — ⏳ Pending

1. Bundle analysis and chunk tuning.
2. Optional dark theme via `theme.darkAlgorithm`.
3. Optional charts (lazy) and `@ant-design/x` chat UI (lazy, chat route only).
4. Optional Vitest smoke tests for shared primitives.

---

## 15. Acceptance checklist — ✅ Completed

- [x] `npm run dev` starts without console errors.
- [x] Login works in mock mode and redirects to `/dashboard`.
- [x] Sidebar navigation, active state, collapse, and mobile drawer work.
- [x] Breadcrumbs match the current route.
- [x] Changing `brand.primaryColor` updates the whole UI without touching components.
- [x] Dashboard KPIs and activity table render with loading states.
- [x] Chatbots list supports search, filter, pagination, create, edit, delete.
- [x] `npm run build` and `npm run lint` pass with zero errors.
- [x] Feature pages are split into separate JS chunks.
- [x] No feature imports another feature; no UI primitive imports a feature.
- [x] No `any` in API types; no inline hex colors in feature code.

> Verified 2026-10-25: `npm run build` and `npm run lint` were executed (both pass); the
> dev server started cleanly; the build emitted separate `LoginPage` / `DashboardPage` /
> `ChatbotsPage` chunks with `antd` isolated. Behavioural items (login redirect, sidebar,
> breadcrumbs, mock CRUD) were confirmed by code inspection of the corresponding files.

---

## 16. Prompt to use in a new Qoder task — ✅ Completed (reference)

Open a new task with this folder as the workspace, attach this file (`@PROJECT_STRUCTURE.md`), and send:

```text
Read @PROJECT_STRUCTURE.md and implement Phase 1 and Phase 2 exactly as specified.

Rules:
- Do not delete PROJECT_STRUCTURE.md.
- If `npm create vite` asks about the non-empty directory, choose "Ignore files and continue".
- Follow the folder tree and dependency direction exactly.
- Use Ant Design v6 with the token values in section 7.
- Mock the auth and chatbots data as described; do not invent backend endpoints.
- Run `npm run build` and `npm run lint`, fix all errors, and report the results.
- Do not add libraries that section 3 excludes.
```

For later tasks, keep the same prompt but replace the scope with `Phase 3` or a single feature.

---

## 17. Out of scope (for now) — ⏳ Not started

- Real backend endpoints and authentication flows.
- Billing, subscriptions, and onboarding wizards.
- Charts and analytics beyond static KPI cards.
- Chat conversation UI (`@ant-design/x`).
- i18n, dark mode, and white-label tenant switching.
- Unit and E2E test suites.
