## Naming Conventions

- Components: PascalCase (ProductCard.tsx)
- Pages/Routes: kebab-case sesuai folder App Router (/user-profile/page.tsx)

## Code Entities

- Function component - function declaration
- Util/tools function - arrow function

## Project Structure

```text
src/
├── app/                    # Routes, Layouts, & Server Components
|       dashboard           # route folder
|           page.tsx        # page for dasboard
|           _components     # specifically for dashboard (private folder)
|               stats.tsx   # Stats only uses inside dashboard
├── components/             # Shared components (Navbar, Footer)
├── hooks/                  # Custom reusable hooks
├── services/               # API calls (Axios/Fetch instances)
├── store/                  # State management (Zustand)
├── types/                  # TypeScript interfaces/types
└── shared/utils/           # Helper functions & constants

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
- types-kebab-case.ts (for types)
- hooks-kebab-case.ts (for hooks)
