## ADDED Requirements

### Requirement: Multi-step wizard with 4 sequential steps
The system SHALL present a wizard with exactly 4 steps in fixed order: (1) Brand Guidelines, (2) Format Selection, (3) Business Goals, (4) Image Upload. The wizard SHALL display a progress indicator showing the current step and total steps.

#### Scenario: User navigates through all steps
- **WHEN** the user completes each step and clicks "Next"
- **THEN** the wizard advances to the next step and updates the progress indicator

#### Scenario: User navigates backward
- **WHEN** the user clicks "Back" on any step after Step 1
- **THEN** the wizard returns to the previous step with all previously entered data preserved

### Requirement: Step 1 — Brand Guidelines input
The system SHALL provide text input fields for the user to enter brand guidelines including: primary brand colors (hex values), typography rules, tone/voice descriptors, and any additional brand constraints. All fields are required except additional constraints.

#### Scenario: User enters brand guidelines
- **WHEN** the user fills in brand color, typography, and tone fields
- **THEN** the "Next" button becomes enabled

#### Scenario: User attempts to proceed without required fields
- **WHEN** the user clicks "Next" with empty required fields
- **THEN** the system SHALL highlight the missing fields and prevent navigation

### Requirement: Step 2 — Format selection
The system SHALL present exactly 3 format options: Banner, Social Media, and Thumbnail. The user MUST select exactly one format before proceeding.

#### Scenario: User selects a format
- **WHEN** the user clicks on a format card (Banner, Social Media, or Thumbnail)
- **THEN** that card is visually highlighted as selected and the "Next" button becomes enabled

#### Scenario: User changes format selection
- **WHEN** the user clicks a different format card after already selecting one
- **THEN** the previous selection is deselected and the new one is highlighted

### Requirement: Step 3 — Business goals (optional)
The system SHALL provide a text area for the user to optionally enter conversion targets or business goals. This step SHALL allow proceeding without any input.

#### Scenario: User skips business goals
- **WHEN** the user clicks "Next" without entering any business goals
- **THEN** the wizard advances to Step 4 with business goals stored as empty/null

#### Scenario: User enters business goals
- **WHEN** the user types conversion targets or goals into the text area
- **THEN** the input is stored in wizard state and carried to the review payload

### Requirement: Step 4 — Image upload with preview
The system SHALL provide a drag-and-drop zone and a file picker button for uploading a single image. Accepted formats SHALL be PNG, JPG, and WebP. Maximum file size SHALL be 4MB. The system SHALL display a preview of the uploaded image before submission.

#### Scenario: User uploads a valid image via drag-and-drop
- **WHEN** the user drags a PNG/JPG/WebP file under 4MB into the drop zone
- **THEN** the system displays a preview of the image and enables the "Submit for Review" button

#### Scenario: User uploads via file picker
- **WHEN** the user clicks the upload button and selects a valid image file
- **THEN** the system displays a preview and enables the "Submit for Review" button

#### Scenario: User uploads an invalid file
- **WHEN** the user uploads a file that is not PNG/JPG/WebP or exceeds 4MB
- **THEN** the system displays an error message specifying the constraint violated and does not accept the file

#### Scenario: User replaces an uploaded image
- **WHEN** the user uploads a new image after one is already previewed
- **THEN** the old preview is replaced with the new image

### Requirement: Wizard state persistence across steps
The system SHALL preserve all user input across wizard steps within a single session. Navigating backward and forward SHALL NOT clear previously entered data.

#### Scenario: Data preserved on back navigation
- **WHEN** the user is on Step 3 and navigates back to Step 1
- **THEN** Step 1 displays the previously entered brand guidelines exactly as entered

### Requirement: Submit triggers AI review
The system SHALL send the complete wizard payload (brand guidelines, format, business goals, image) to the AI review engine when the user clicks "Submit for Review" on Step 4. The system SHALL display a loading state during the review process.

#### Scenario: Successful submission
- **WHEN** the user clicks "Submit for Review" with a valid image uploaded
- **THEN** the system displays a loading indicator and sends the payload to the review engine

#### Scenario: Review completes
- **WHEN** the AI review engine returns results
- **THEN** the system transitions from the wizard view to the Analysis Dashboard
