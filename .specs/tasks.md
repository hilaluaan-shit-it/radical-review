## 1. Project Scaffolding & Configuration

- [x] 1.1 Scaffold React project with Vite react-ts template
- [x] 1.2 Install dependencies: tailwindcss, @tailwindcss/vite, framer-motion, zustand, lucide-react
- [x] 1.3 Configure Tailwind with GitHub Dark Mode color tokens (canvas-default, canvas-subtle, canvas-inset, border-default, border-muted, fg-default, fg-muted, accent-fg, success-fg, attention-fg, danger-fg, done-fg)
- [x] 1.4 Configure Tailwind font families: font-body (system-ui stack) and font-mono (JetBrains Mono stack)
- [x] 1.5 Add JetBrains Mono web font import
- [x] 1.6 Set up base CSS: canvas-default background, fg-default text, global resets
- [x] 1.7 Create project directory structure (components/wizard, components/dashboard, components/ui, store, lib, types)

## 2. Design System — Base UI Components

- [x] 2.1 Create Button component with primary and secondary variants, focus ring styling
- [x] 2.2 Create Card component with canvas-subtle background, border-default border, 8px radius
- [x] 2.3 Create Input component with canvas-inset background, border styling, focus states
- [x] 2.4 Create TextArea component matching Input styling
- [x] 2.5 Create Badge component for format labels and status indicators
- [x] 2.6 Create ProgressBar component for wizard step indicator

## 3. Animation System

- [x] 3.1 Create shared animation variants file (lib/animations.ts) with fadeIn, slideUp, staggerChildren, scaleIn
- [x] 3.2 Wire up Framer Motion AnimatePresence in App.tsx for view transitions

## 4. State Management

- [x] 4.1 Define TypeScript interfaces in types/review.ts (WizardState, ReviewResult, ReviewParameter, PriorityFix)
- [x] 4.2 Create Zustand store (store/useReviewStore.ts) with wizard state, step navigation, review results, loading/error states, and reset action

## 5. Wizard Flow

- [x] 5.1 Create WizardShell component with step rendering, progress indicator, Back/Next navigation, and step transition animations
- [x] 5.2 Create BrandGuidelinesStep (Step 1): inputs for primary colors, typography rules, tone/voice, additional constraints; required field validation
- [x] 5.3 Create FormatSelectionStep (Step 2): three selectable cards for Banner, Social Media, Thumbnail; single-select enforcement
- [x] 5.4 Create BusinessGoalsStep (Step 3): optional text area for conversion targets/business goals
- [x] 5.5 Create ImageUploadStep (Step 4): drag-and-drop zone, file picker, image preview, file type validation (PNG/JPG/WebP), 4MB size limit, replace image support
- [x] 5.6 Add "Submit for Review" button on Step 4 that triggers the AI review engine and shows loading state

## 6. AI Review Engine

- [x] 6.1 Create image compression utility (lib/imageUtils.ts): resize to max 2048px longest side, compress to JPEG 85% quality for images over 2MB
- [x] 6.2 Create review engine utility (lib/reviewEngine.ts): construct system prompt with Radical Candor instructions, 6-parameter schema, and structured JSON enforcement
- [x] 6.3 Implement Gemini API call with base64 image payload, brand guidelines, format, and business goals
- [x] 6.4 Add response parsing, JSON schema validation, and retry logic (up to 2 retries on invalid responses)
- [x] 6.5 Add average score calculation and priority fixes extraction
- [x] 6.6 Create .env.example with VITE_GEMINI_API_KEY placeholder

## 7. Analysis Dashboard

- [x] 7.1 Create AnalysisDashboard container component with overall layout (image reference + results)
- [x] 7.2 Create overall score display: large monospace number with color coding and "Overall Score" label
- [x] 7.3 Create PriorityFixes component: accent-bordered callout card showing top 2 fixes
- [x] 7.4 Create ReviewTable component: 6 rows with parameter name, score (color-coded monospace), and verdict
- [x] 7.5 Create ScoreCell component with color-coded score rendering (green/yellow/red thresholds)
- [x] 7.6 Create SolutionPanel: expandable row detail showing challenge, acknowledgment, and solution with smooth height animation
- [x] 7.7 Add stagger animation to table rows on dashboard mount
- [x] 7.8 Display uploaded image reference in a bordered card alongside review results
- [x] 7.9 Add "New Review" button that resets wizard state and returns to Step 1

## 8. Integration & Polish

- [x] 8.1 Wire App.tsx: conditional rendering between wizard view and dashboard view based on store state
- [x] 8.2 Add loading state view with animation and "Analyzing your Key Visual..." message
- [x] 8.3 Add error state handling with retry option for failed API calls
- [x] 8.4 Apply responsive layout: max-width 960px centered, stack on screens below 768px
- [x] 8.5 End-to-end manual test: full wizard flow through to dashboard with live Gemini API

## 9. Deployment

- [x] 9.1 Initialize git repository and create initial commit
- [x] 9.2 Create GitHub repository (hilaluaan-shit-it/radical-review)
- [x] 9.3 Push to GitHub main branch
- [x] 9.4 Deploy to Vercel production (radical-review.vercel.app)
- [x] 9.5 Add VITE_GEMINI_API_KEY environment variable to Vercel
