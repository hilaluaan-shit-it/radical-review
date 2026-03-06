## ADDED Requirements

### Requirement: Review table with 6 scored parameters
The system SHALL display a table with one row per review parameter (Typography, Hierarchy, Layouting, Visual Impact, Branding Feels, Clarity of Message). Each row SHALL display: parameter name, numeric score (out of 5.0), verdict summary, and an expandable section for challenge, acknowledgment, and solution.

#### Scenario: All 6 parameters displayed
- **WHEN** the dashboard receives review results
- **THEN** a table with exactly 6 rows is rendered, one for each parameter, displaying name, score, and verdict

#### Scenario: Rows stagger-animate on load
- **WHEN** the dashboard first renders
- **THEN** the table rows animate in sequentially with a stagger delay to create a "thorough analysis" effect

### Requirement: Score visualization with color coding
Each score cell SHALL display the numeric value and apply color coding: scores 4.0–5.0 SHALL use green (#3FB950), 2.5–3.5 SHALL use yellow (#D29922), and 1.0–2.0 SHALL use red (#F85149). Score text SHALL use monospace font.

#### Scenario: High score colored green
- **WHEN** a parameter has a score of 4.5
- **THEN** the score cell displays "4.5" in green (#3FB950) monospace text

#### Scenario: Low score colored red
- **WHEN** a parameter has a score of 1.5
- **THEN** the score cell displays "1.5" in red (#F85149) monospace text

### Requirement: Expandable solution panels
Each parameter row SHALL be expandable to reveal the full detail: challenge text, acknowledgment text, and actionable solution. The expansion SHALL animate smoothly.

#### Scenario: User expands a parameter row
- **WHEN** the user clicks on a parameter row
- **THEN** the row expands to reveal challenge, acknowledgment, and solution sections with a smooth height animation

#### Scenario: User collapses an expanded row
- **WHEN** the user clicks on an already expanded parameter row
- **THEN** the row collapses back to showing only name, score, and verdict

### Requirement: Overall average score display
The system SHALL display the average score prominently at the top of the dashboard in a large monospace font. The score SHALL be accompanied by a label "Overall Score" and use the same color coding as individual scores.

#### Scenario: Average score rendered
- **WHEN** the dashboard loads with an average score of 3.7
- **THEN** the top section displays "3.7" in large monospace text with yellow color coding and the label "Overall Score"

### Requirement: Top 2 Priority Fixes callout
The system SHALL display a highlighted card below the average score showing the top 2 priority fixes. Each fix SHALL show the parameter name and the condensed fix description. The card SHALL use a distinct visual treatment (accent border or background) to draw attention.

#### Scenario: Priority fixes displayed
- **WHEN** the review contains priority fixes for "Layouting" and "Branding Feels"
- **THEN** a callout card displays both fixes with parameter names and fix descriptions, styled with an accent border (#58A6FF)

### Requirement: New review action
The system SHALL provide a button to start a new review. Clicking it SHALL reset the wizard state and return to Step 1.

#### Scenario: User starts a new review
- **WHEN** the user clicks "New Review" on the dashboard
- **THEN** the wizard state is cleared and the view transitions back to Step 1 of the wizard

### Requirement: Uploaded image reference on dashboard
The system SHALL display the uploaded Key Visual image alongside the review results so the user can reference the design while reading the feedback.

#### Scenario: Image shown on dashboard
- **WHEN** the dashboard renders
- **THEN** the uploaded image is displayed in a card with a subtle border, sized to fit without dominating the review content
