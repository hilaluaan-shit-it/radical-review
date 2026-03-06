import { useCallback, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

interface ImageUploadStepProps {
  onSubmit?: () => void
}

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_SIZE = 4 * 1024 * 1024 // 4MB

export function ImageUploadStep({ onSubmit }: ImageUploadStepProps) {
  const { imageFile, imagePreviewUrl } = useReviewStore((s) => s.wizard)
  const setImage = useReviewStore((s) => s.setImage)
  const prevStep = useReviewStore((s) => s.prevStep)
  const isLoading = useReviewStore((s) => s.isLoading)

  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    (file: File) => {
      setError(null)

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Invalid file type. Please upload PNG, JPG, or WebP.')
        return
      }
      if (file.size > MAX_SIZE) {
        setError('File exceeds 4MB limit. Please upload a smaller image.')
        return
      }

      const url = URL.createObjectURL(file)
      setImage(file, url)
    },
    [setImage],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const clearImage = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
    setImage(null as unknown as File, null as unknown as string)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <Card className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Upload Key Visual</h2>
      <p className="text-sm text-fg-muted">
        Upload the Key Visual image you want reviewed. Accepted formats: PNG, JPG, WebP (max 4MB).
      </p>

      {imagePreviewUrl ? (
        <div className="relative">
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="max-h-[400px] w-full rounded-lg border border-border-default object-contain bg-canvas-inset"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 rounded-full bg-canvas-default/80 p-1.5 text-fg-muted hover:text-fg-default transition-colors"
          >
            <X size={16} />
          </button>
          <p className="mt-2 text-xs text-fg-muted font-mono">
            {imageFile?.name} ({((imageFile?.size ?? 0) / 1024).toFixed(0)} KB)
          </p>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-12 transition-colors ${
            isDragging
              ? 'border-accent-fg bg-accent-fg/5'
              : 'border-border-default bg-canvas-inset hover:border-border-muted'
          }`}
        >
          <Upload size={32} className="text-fg-muted" />
          <p className="text-sm text-fg-muted">
            Drag & drop your image here, or <span className="text-accent-fg">browse</span>
          </p>
          <p className="text-xs text-fg-muted">PNG, JPG, WebP — max 4MB</p>
        </div>
      )}

      {error && <p className="text-sm text-danger-fg">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex justify-between pt-2">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={onSubmit} disabled={!imageFile || isLoading}>
          {isLoading ? 'Analyzing...' : 'Submit for Review'}
        </Button>
      </div>
    </Card>
  )
}
