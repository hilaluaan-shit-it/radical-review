import { create } from 'zustand'
import type { BrandGuidelines, FormatType, ReviewResult, WizardState } from '../types/review'

const initialWizardState: WizardState = {
  currentStep: 1,
  brandGuidelines: {
    primaryColors: '',
    typographyRules: '',
    toneVoice: '',
    additionalConstraints: '',
  },
  format: null,
  businessGoals: '',
  imageFile: null,
  imagePreviewUrl: null,
}

interface ReviewStore {
  // Wizard state
  wizard: WizardState
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setBrandGuidelines: (guidelines: Partial<BrandGuidelines>) => void
  setFormat: (format: FormatType) => void
  setBusinessGoals: (goals: string) => void
  setImage: (file: File, previewUrl: string) => void

  // Review state
  reviewResult: ReviewResult | null
  isLoading: boolean
  error: string | null
  setReviewResult: (result: ReviewResult) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Actions
  reset: () => void
}

export const useReviewStore = create<ReviewStore>((set) => ({
  wizard: { ...initialWizardState },

  setStep: (step) =>
    set((state) => ({ wizard: { ...state.wizard, currentStep: step } })),

  nextStep: () =>
    set((state) => ({
      wizard: { ...state.wizard, currentStep: Math.min(state.wizard.currentStep + 1, 4) },
    })),

  prevStep: () =>
    set((state) => ({
      wizard: { ...state.wizard, currentStep: Math.max(state.wizard.currentStep - 1, 1) },
    })),

  setBrandGuidelines: (guidelines) =>
    set((state) => ({
      wizard: {
        ...state.wizard,
        brandGuidelines: { ...state.wizard.brandGuidelines, ...guidelines },
      },
    })),

  setFormat: (format) =>
    set((state) => ({ wizard: { ...state.wizard, format } })),

  setBusinessGoals: (goals) =>
    set((state) => ({ wizard: { ...state.wizard, businessGoals: goals } })),

  setImage: (file, previewUrl) =>
    set((state) => ({
      wizard: { ...state.wizard, imageFile: file, imagePreviewUrl: previewUrl },
    })),

  reviewResult: null,
  isLoading: false,
  error: null,

  setReviewResult: (result) => set({ reviewResult: result, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading, error: null }),
  setError: (error) => set({ error, isLoading: false }),

  reset: () =>
    set({
      wizard: { ...initialWizardState },
      reviewResult: null,
      isLoading: false,
      error: null,
    }),
}))
