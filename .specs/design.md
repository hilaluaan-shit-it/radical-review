## Context

This is a greenfield React web application. No existing codebase or legacy system exists. The application serves design teams who need objective, structured feedback on Key Visuals. The user interacts with a multi-step wizard to provide context, then uploads an image that gets analyzed by a vision LLM, and finally views a dense analysis dashboard with scored results and actionable fixes.

The aesthetic is modeled after GitHub's Dark Mode — high information density, monospace data presentation, and precise functional animations. The target users are designers and creative leads who are comfortable with dense, technical interfaces.

## Goals / Non-Goals

**Goals:**
- Deliver a complete Phase 1 wizard-to-dashboard flow as a single-page React app.
- Establish a strict design system with GitHub Dark Mode tokens that can be extended in future phases.
- Integrate with a Gemini vision model to produce structured, scored reviews with actionable feedback.
- Keep the architecture simple — no backend server, no database. The LLM call is a client-side utility with the API key managed via environment variables.

**Non-Goals:**
- No user authentication or accounts (Phase 2+).
- No persistent storage or review history (Phase 2+).
- No backend API server — all LLM calls are made directly from the client via a utility function.
- No PDF export or comparison mode (Phase 2+).
- No team collaboration features (Phase 3).

## Decisions

### 1. Client-side LLM calls via utility function (no backend)

**Decision**: The AI review call is made directly from the browser using a utility function that wraps the Gemini API.

**Rationale**: Phase 1 is a single-user tool. Adding a backend server would increase complexity without benefit at this stage. The API key is stored in a `.env` file and injected via Vite's `import.meta.env`.

**Alternatives considered**:
- Serverless function (Vercel/Netlify): Adds deployment complexity for Phase 1. Can migrate to this in Phase 2 when the app needs to protect the API key in production.
- Full backend: Over-engineered for a single-user tool with no persistence needs.

### 2. Zustand for wizard state management

**Decision**: Use Zustand to manage the wizard's multi-step state (brand guidelines, format, goals, uploaded image, review results).

**Rationale**: Zustand is lightweight, has no boilerplate, and works well for a flat state shape like wizard steps. React Context would work but becomes verbose with multiple update functions.

**Alternatives considered**:
- React Context + useReducer: More boilerplate, harder to split concerns.
- Redux Toolkit: Over-engineered for this scope.

### 3. Structured JSON output enforcement via system prompt

**Decision**: The LLM prompt includes a strict JSON schema definition and instructs the model to respond only with valid JSON matching the schema. The utility function parses and validates the response.

**Rationale**: Gemini supports structured output modes, but enforcing via prompt + client-side validation is more portable across models and easier to debug.

### 4. Single-page app with conditional rendering (no router)

**Decision**: The wizard and dashboard are rendered conditionally based on Zustand state. No React Router.

**Rationale**: Phase 1 has exactly two views (wizard, dashboard). A router adds complexity without benefit. Phase 2 can introduce routing when history/saved reviews create distinct pages.

### 5. Component architecture

```
src/
├── components/
│   ├── wizard/
│   │   ├── WizardShell.tsx        # Step container + navigation + progress
│   │   ├── BrandGuidelinesStep.tsx # Step 1: text inputs for brand rules
│   │   ├── FormatSelectionStep.tsx # Step 2: Banner / Social / Thumbnail
│   │   ├── BusinessGoalsStep.tsx   # Step 3: optional conversion targets
│   │   └── ImageUploadStep.tsx     # Step 4: drag-drop + preview
│   ├── dashboard/
│   │   ├── AnalysisDashboard.tsx   # Main results container
│   │   ├── ReviewTable.tsx         # 6-parameter scored table
│   │   ├── ScoreCell.tsx           # Individual score with color coding
│   │   ├── SolutionPanel.tsx       # Expandable actionable fixes
│   │   └── PriorityFixes.tsx       # Top 2 fixes callout
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── TextArea.tsx
│       ├── Badge.tsx
│       └── ProgressBar.tsx
├── store/
│   └── useReviewStore.ts          # Zustand store
├── lib/
│   └── reviewEngine.ts            # Gemini API utility
├── types/
│   └── review.ts                  # TypeScript interfaces
├── App.tsx
└── main.tsx
```

### 6. Review scoring model

Each of the 6 parameters is scored 1.0–5.0 in 0.5 increments. The response schema:

```typescript
interface ReviewResult {
  parameters: {
    name: string;           // e.g., "Typography"
    score: number;          // 1.0–5.0
    verdict: string;        // 1-sentence summary
    challenge: string;      // What's wrong (Radical Candor: direct)
    acknowledgment: string; // What's right (Radical Candor: caring)
    solution: string;       // Precise fix with specifics
  }[];
  averageScore: number;
  priorityFixes: {
    parameter: string;
    fix: string;
  }[];
}
```

## Risks / Trade-offs

- **[API key exposure in client]** → Acceptable for Phase 1 local/dev use. Mitigate in Phase 2 by moving to a serverless proxy.
- **[LLM response quality varies]** → Mitigate with a detailed system prompt, strict JSON schema, and client-side validation with retry logic.
- **[Large image uploads]** → Mitigate by resizing/compressing images client-side before sending to the API. Cap at 4MB.
- **[No persistence]** → Users lose reviews on page refresh. Acceptable for Phase 1. Phase 2 adds localStorage or database storage.
