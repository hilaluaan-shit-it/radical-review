## Why

Design teams producing Key Visuals (KV) — banners, thumbnails, social media assets — receive feedback that is subjective, inconsistent, and rarely actionable. A reviewer might say "the layout feels off" without specifying what's wrong or how to fix it. This leads to wasted revision cycles, misaligned expectations, and designs that drift from brand guidelines. Radical Review replaces this with an AI-powered Art Director that evaluates every KV against a strict 6-parameter rubric, delivering precise, measurable, and actionable feedback in a Radical Candor tone.

## What Changes

- Introduces a new greenfield web application: **Radical Review (Key Visual AI Art Director)**.
- Adds a multi-step wizard flow for collecting brand guidelines, format context, business goals, and image uploads.
- Integrates an LLM vision model (Gemini) to analyze uploaded Key Visuals and return structured JSON reviews.
- Delivers a dense Analysis Dashboard displaying scores across 6 parameters (Typography, Hierarchy, Layouting, Visual Impact, Branding Feels, Clarity of Message), actionable solutions, an average score, and Top 2 Priority Fixes.
- Establishes a GitHub Dark Mode design system with strict color tokens, monospace data typography, and Framer Motion animations.

## Capabilities

### New Capabilities
- `wizard-flow`: Multi-step wizard (Brand Guidelines → Format Selection → Business Goals → Image Upload) managing state across steps with validation and navigation.
- `ai-review-engine`: Serverless utility that sends image + context payload to an LLM vision model, enforces structured JSON output schema, and returns a 6-parameter scored review.
- `analysis-dashboard`: Dense review results view displaying the scored parameter table, per-parameter actionable solutions, average score, and Top 2 Priority Fixes.
- `design-system`: GitHub Dark Mode design tokens, Tailwind configuration, typography system (system-ui body + monospace data), and Framer Motion animation primitives.

### Modified Capabilities
_None — this is a greenfield project._

## Impact

- **New dependencies**: React (Vite react-ts), Tailwind CSS, Framer Motion, Zustand, Lucide React, Google Generative AI SDK (or equivalent).
- **External API**: Requires a Gemini API key for vision model calls. API key management via environment variables.
- **No existing code affected** — this is a net-new application with no breaking changes to any existing system.
