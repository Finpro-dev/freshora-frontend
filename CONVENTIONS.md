## Naming Conventions

- Components: PascalCase (ProductCard.tsx)
- Pages/Routes: kebab-case sesuai folder App Router (/user-profile/page.tsx)
- Hooks: camelCase dengan awalan use (useLocalStorage.ts)
- Utilities: camelCase (formatCurrency.ts)

## Code Entities

- Function component - function declaration
- Util/tools function - arrow function

## Project Structure

```text
src/
├── app/                    # Routes, Layouts, & Server Components
|       dashboard           # route folder
|           page.tsx        # page for dasboard
|           _components     # specifically for dashboard
|               stats.tsx   # Stats only uses inside dashboard
├── _components/            # Shared components (Navbar, Footer)
├── _hooks/                 # Custom reusable hooks
├── _services/              # API calls (Axios/Fetch instances)
├── _store/                 # State management (Zustand)
├── _types/                 # TypeScript interfaces/types
└── _utils/                 # Helper functions & constants

```

## Styling

- Typography -> DM sans, sans - serief
- Primary color -> emerald-600
- Heading -> mist-900
- Paragraf -> mist-700
- Sub heading -> mist-600

## Git Workflow

- Branch naming
  - feat/nama-fitur (fitur baru)
  - fix/nama-bug (perbaikan bug)
  - ref/nama-bagian (perbaikan struktur kode)
  - chore/setup-description (setting up structure)

- Commit message
  - feat: adding authentication

## Naming

- ComponentPascalCase.tsx (for components)
- action-kebab-case.ts (for actions)
- helper-kebab-case.ts (for helper/utils)
