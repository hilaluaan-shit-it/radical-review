## ADDED Requirements

### Requirement: GitHub Dark Mode color tokens
The Tailwind configuration SHALL define the following strict color tokens: canvas-default (#0D1117), canvas-subtle (#161B22), canvas-inset (#010409), border-default (#30363D), border-muted (#21262D), fg-default (#E6EDF3), fg-muted (#8B949E), accent-fg (#58A6FF), success-fg (#3FB950), attention-fg (#D29922), danger-fg (#F85149), done-fg (#A371F7). These tokens SHALL be used exclusively — no arbitrary hex values in component styles.

#### Scenario: Tailwind config includes all tokens
- **WHEN** the Tailwind configuration is loaded
- **THEN** all specified color tokens are available as utility classes (e.g., `bg-canvas-default`, `text-accent-fg`)

#### Scenario: Components use only token classes
- **WHEN** any component applies a color
- **THEN** it uses a defined token class, not an arbitrary hex value or Tailwind default color

### Requirement: Typography system with dual font stacks
The system SHALL use two font stacks: (1) `system-ui, -apple-system, sans-serif` for body text, labels, and prose, and (2) `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` for scores, data values, technical measurements, and table data. The Tailwind config SHALL define these as `font-body` and `font-mono` utilities.

#### Scenario: Body text uses system font
- **WHEN** a paragraph, label, or heading is rendered
- **THEN** it uses the `font-body` class with the system-ui font stack

#### Scenario: Data values use monospace font
- **WHEN** a score, hex code, or technical value is rendered
- **THEN** it uses the `font-mono` class with the JetBrains Mono font stack

### Requirement: Framer Motion animation primitives
The system SHALL define reusable animation variants: (1) `fadeIn` — opacity 0→1 over 300ms, (2) `slideUp` — translateY(16px)→0 + fadeIn over 400ms with ease-out, (3) `staggerChildren` — parent variant that staggers child animations by 80ms, (4) `scaleIn` — scale(0.95)→1 + fadeIn over 200ms. These SHALL be exported from a shared animation constants file.

#### Scenario: Wizard step transition uses slideUp
- **WHEN** the user navigates to a new wizard step
- **THEN** the step content animates in using the slideUp variant

#### Scenario: Review table rows use stagger animation
- **WHEN** the analysis dashboard renders
- **THEN** the review table rows animate in using staggerChildren with 80ms delay between each row

### Requirement: Base UI components with consistent styling
The system SHALL provide base UI components (Button, Card, Input, TextArea, Badge) that enforce the design system. Button SHALL support "primary" (accent-fg background) and "secondary" (border-default border, transparent background) variants. Card SHALL use canvas-subtle background with border-default border and 8px border-radius. Input and TextArea SHALL use canvas-inset background with border-default border and fg-default text.

#### Scenario: Primary button renders with accent color
- **WHEN** a Button with variant="primary" is rendered
- **THEN** it displays with accent-fg (#58A6FF) background, canvas-default text, and a focus ring using accent-fg

#### Scenario: Card renders with correct token colors
- **WHEN** a Card component is rendered
- **THEN** it has canvas-subtle (#161B22) background, border-default (#30363D) border, and 8px border-radius

### Requirement: Responsive layout constraints
The application SHALL be responsive with a max-width of 960px centered on the page. On screens below 768px, the layout SHALL stack vertically. The wizard and dashboard SHALL be fully usable on tablet-sized screens (768px+).

#### Scenario: Desktop layout
- **WHEN** the viewport is 1280px wide
- **THEN** the content is centered with a max-width of 960px

#### Scenario: Tablet layout
- **WHEN** the viewport is 768px wide
- **THEN** the layout adapts to full-width with appropriate padding and remains fully functional
