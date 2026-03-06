## ADDED Requirements

### Requirement: Structured review payload construction
The system SHALL construct an API payload containing: the uploaded image (as base64), brand guidelines text, selected format type, and optional business goals. The payload SHALL be sent to a Gemini vision model endpoint.

#### Scenario: Payload includes all wizard data
- **WHEN** the wizard submits for review
- **THEN** the payload includes the base64-encoded image, brand guidelines, format ("banner" | "social-media" | "thumbnail"), and business goals (or null if not provided)

### Requirement: System prompt enforces Radical Candor tone
The system prompt SHALL instruct the LLM to evaluate the image as a strict Art Director using Radical Candor — delivering direct, technically honest challenges paired with acknowledgment of correct design intentions. The prompt SHALL prohibit vague or abstract advice and require specific, actionable solutions with concrete values (hex codes, pixel values, percentage adjustments).

#### Scenario: Review tone matches Radical Candor
- **WHEN** the AI returns a review
- **THEN** each parameter entry contains a direct "challenge" identifying what's wrong and an "acknowledgment" recognizing what the designer did correctly

### Requirement: Structured JSON output with 6 parameters
The system SHALL enforce a strict JSON response schema. The response MUST contain exactly 6 scored parameters: Typography, Hierarchy, Layouting, Visual Impact, Branding Feels, and Clarity of Message. Each parameter MUST include: score (number, 1.0–5.0 in 0.5 increments), verdict (string), challenge (string), acknowledgment (string), and solution (string).

#### Scenario: Valid structured response
- **WHEN** the LLM returns a response
- **THEN** the utility function parses the response and validates it contains exactly 6 parameters with all required fields and scores within the 1.0–5.0 range

#### Scenario: Invalid response handling
- **WHEN** the LLM returns a response that does not match the expected JSON schema
- **THEN** the system SHALL retry the request up to 2 additional times before displaying an error to the user

### Requirement: Average score calculation
The system SHALL calculate the average score from the 6 parameter scores, rounded to one decimal place.

#### Scenario: Average computed correctly
- **WHEN** the 6 parameter scores are [4.0, 3.5, 2.0, 4.5, 3.0, 5.0]
- **THEN** the average score SHALL be 3.7

### Requirement: Top 2 Priority Fixes identification
The system SHALL instruct the LLM to identify the 2 lowest-scoring parameters and return them as priority fixes with a specific, condensed fix description for each.

#### Scenario: Priority fixes correspond to lowest scores
- **WHEN** the review result contains parameters with scores [4.0, 3.5, 2.0, 4.5, 3.0, 5.0]
- **THEN** the priority fixes SHALL reference "Layouting" (2.0) and "Branding Feels" (3.0)

### Requirement: Image compression before API call
The system SHALL compress and resize images exceeding 2MB client-side before sending to the API. The maximum dimension SHALL be 2048px on the longest side, preserving aspect ratio. Output format SHALL be JPEG at 85% quality.

#### Scenario: Large image is compressed
- **WHEN** the user uploads a 3.8MB PNG at 4000x3000px
- **THEN** the system resizes to 2048x1536px and compresses to JPEG before including in the API payload

#### Scenario: Small image is not modified
- **WHEN** the user uploads a 500KB JPG at 1200x800px
- **THEN** the system sends the image as-is without compression

### Requirement: Loading state with progress indication
The system SHALL display a loading state while waiting for the AI review. The loading state SHALL show an animated indicator and a message indicating the review is in progress.

#### Scenario: Loading state displayed during review
- **WHEN** the user submits for review
- **THEN** the system displays a loading animation with the text "Analyzing your Key Visual..." until results are returned or an error occurs
