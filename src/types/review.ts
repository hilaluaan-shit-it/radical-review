export type FormatType = 'banner' | 'social-media' | 'thumbnail'

export interface BrandGuidelines {
  primaryColors: string
  typographyRules: string
  toneVoice: string
  additionalConstraints: string
}

export interface ReviewParameter {
  name: string
  score: number
  verdict: string
  challenge: string
  acknowledgment: string
  solution: string
}

export interface PriorityFix {
  parameter: string
  fix: string
}

export interface ReviewResult {
  parameters: ReviewParameter[]
  averageScore: number
  priorityFixes: PriorityFix[]
}

export interface WizardState {
  currentStep: number
  brandGuidelines: BrandGuidelines
  format: FormatType | null
  businessGoals: string
  imageFile: File | null
  imagePreviewUrl: string | null
}
