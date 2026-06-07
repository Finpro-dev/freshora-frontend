## Naming Conventions

- Components: PascalCase (ProductCard.tsx)
- Pages/Routes: kebab-case based on App Router page (/user-profile/page.tsx)

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
  - feat/feature-name (new feature)
  - fix/bug-name (bug fixing)
  - ref/section-or-service-name (fixing code structure)
  - chore/setup-description (setting up structure)
  - wip/progress (work in progress)

- Commit message
  - feat: adding authentication

## Naming

- ComponentPascalCase.tsx (for components)
- action-kebab-case.ts (for actions)
- helper-kebab-case.ts (for helper/utils)
- types-kebab-case.ts (for types)
- hooks-kebab-case.ts (for hooks)
