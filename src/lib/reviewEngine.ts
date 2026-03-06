import type { ReviewResult, ReviewParameter, PriorityFix } from '../types/review'
import { compressImage } from './imageUtils'

const GEMINI_MODEL = 'gemini-2.0-flash'
const MAX_RETRIES = 2

interface ReviewPayload {
  imageFile: File
  brandGuidelines: {
    primaryColors: string
    typographyRules: string
    toneVoice: string
    additionalConstraints: string
  }
  format: string
  businessGoals: string
}

const SYSTEM_PROMPT = `You are Radical Review — a strict, world-class AI Art Director who evaluates Key Visual (KV) designs with Radical Candor.

Your review style:
- DIRECT and technically honest when something is wrong (the "challenge")
- CARING and specific when something is done well (the "acknowledgment")
- NEVER vague. Every critique includes a precise, actionable solution with concrete values (hex codes, pixel values, percentage adjustments, font sizes, spacing values).
- You evaluate against the provided brand guidelines, format context, and business goals.

You MUST evaluate exactly these 6 parameters:
1. Typography — font choices, sizing, weight hierarchy, readability, kerning
2. Hierarchy — visual weight distribution, reading order, focal point clarity
3. Layouting — spacing, alignment, grid usage, balance, breathing room
4. Visual Impact — contrast, color usage, attention-grabbing power, emotional response
5. Branding Feels — alignment with brand guidelines, tone consistency, brand recognition
6. Clarity of Message — message comprehension speed, CTA clarity, information density

For each parameter, provide:
- score: a number from 1.0 to 5.0 in 0.5 increments (1.0 = critical failure, 5.0 = exceptional)
- verdict: one sentence summarizing the evaluation
- challenge: what is wrong — be direct, specific, technical
- acknowledgment: what the designer did right — be genuine, specific
- solution: the exact fix — include concrete values (hex codes, px, %, font names)

Also identify the 2 lowest-scoring parameters as priority fixes with a condensed fix description.

You MUST respond with ONLY valid JSON matching this exact schema, no markdown, no explanation:
{
  "parameters": [
    {
      "name": "Typography",
      "score": 3.5,
      "verdict": "...",
      "challenge": "...",
      "acknowledgment": "...",
      "solution": "..."
    }
  ],
  "priorityFixes": [
    {
      "parameter": "...",
      "fix": "..."
    }
  ]
}`

function buildUserPrompt(payload: ReviewPayload): string {
  let prompt = `Evaluate this Key Visual for the "${payload.format}" format.\n\n`
  prompt += `BRAND GUIDELINES:\n`
  prompt += `- Primary Colors: ${payload.brandGuidelines.primaryColors}\n`
  prompt += `- Typography Rules: ${payload.brandGuidelines.typographyRules}\n`
  prompt += `- Tone/Voice: ${payload.brandGuidelines.toneVoice}\n`
  if (payload.brandGuidelines.additionalConstraints) {
    prompt += `- Additional Constraints: ${payload.brandGuidelines.additionalConstraints}\n`
  }
  if (payload.businessGoals) {
    prompt += `\nBUSINESS GOALS:\n${payload.businessGoals}\n`
  }
  prompt += `\nProvide your 6-parameter Radical Candor review as JSON.`
  return prompt
}

function validateResult(data: unknown): ReviewResult {
  if (!data || typeof data !== 'object') throw new Error('Response is not an object')

  const obj = data as Record<string, unknown>
  if (!Array.isArray(obj.parameters) || obj.parameters.length !== 6) {
    throw new Error(`Expected 6 parameters, got ${Array.isArray(obj.parameters) ? obj.parameters.length : 'none'}`)
  }

  const parameters: ReviewParameter[] = obj.parameters.map((p: unknown) => {
    const param = p as Record<string, unknown>
    const score = Number(param.score)
    if (isNaN(score) || score < 1.0 || score > 5.0) {
      throw new Error(`Invalid score: ${param.score}`)
    }
    return {
      name: String(param.name),
      score,
      verdict: String(param.verdict),
      challenge: String(param.challenge),
      acknowledgment: String(param.acknowledgment),
      solution: String(param.solution),
    }
  })

  const priorityFixes: PriorityFix[] = Array.isArray(obj.priorityFixes)
    ? obj.priorityFixes.map((f: unknown) => {
        const fix = f as Record<string, unknown>
        return { parameter: String(fix.parameter), fix: String(fix.fix) }
      })
    : extractPriorityFixes(parameters)

  const averageScore = Number(
    (parameters.reduce((sum, p) => sum + p.score, 0) / parameters.length).toFixed(1),
  )

  return { parameters, averageScore, priorityFixes }
}

function extractPriorityFixes(parameters: ReviewParameter[]): PriorityFix[] {
  return [...parameters]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map((p) => ({ parameter: p.name, fix: p.solution }))
}

async function callGemini(base64Image: string, userPrompt: string): Promise<unknown> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set in environment variables.')

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      {
        parts: [
          { text: userPrompt },
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: base64Image,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      responseMimeType: 'application/json',
    },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Gemini API error (${res.status}): ${errorText}`)
  }

  const json = await res.json()
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No text in Gemini response')

  return JSON.parse(text)
}

export async function runReview(payload: ReviewPayload): Promise<ReviewResult> {
  const base64Image = await compressImage(payload.imageFile)
  const userPrompt = buildUserPrompt(payload)

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callGemini(base64Image, userPrompt)
      return validateResult(raw)
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      if (attempt < MAX_RETRIES) continue
    }
  }

  throw lastError
}
