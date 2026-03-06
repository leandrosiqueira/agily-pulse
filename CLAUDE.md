# Agily Pulse

Sistema de pesquisa de clima e cultura organizacional para a Agily Tecnologia.

## Stack

- React 19 + Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- lucide-react (icons)
- No router library — view switching via `useState` in App.jsx

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

Single-file SPA (`src/App.jsx`). All views rendered via conditional logic based on `view` state:

- `home` — landing page with access buttons
- `survey` — questionnaire form (7 categories, 23 questions + 2 open-ended)
- `success` — post-submission confirmation
- `dashboard` — password-protected admin analytics view

### Key constants (top of App.jsx)

- `QUESTIONS` — all survey questions with category assignments
- `CATEGORIES` — the 7 cultural dimensions (ce, op, lc, dc, qt, md, oc)
- `SCALE` — 1–5 Likert scale labels
- `MOCK_HISTORY` — hardcoded quarterly history data for the dashboard chart
- `MOCK_CURRENT_RESPONSES` — seeded with empty array; responses accumulate in-memory per session

### State

All state lives in the `App` component. No external state management.

- `answers` — `{ [questionId]: number }` map of survey responses
- `currentResponses` — aggregated category scores per respondent (in-memory, resets on page reload)
- `hasAnswered` — persisted in `localStorage` key `agily_survey_q4_2025_answered`
- Dashboard auth: hardcoded password check (`agily2025`), frontend-only

### Dashboard data

Computed via `useMemo` (`dashboardData`):
- Per-category averages
- Overall average
- Cultural index (average of: ce, op, qt, md, oc)
- Radar chart data
- Alerts for dimensions scoring below 3.5

## Language

UI is in Brazilian Portuguese.
