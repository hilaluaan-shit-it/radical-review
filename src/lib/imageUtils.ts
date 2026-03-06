const MAX_DIMENSION = 2048
const COMPRESS_THRESHOLD = 2 * 1024 * 1024 // 2MB
const JPEG_QUALITY = 0.85

export async function compressImage(file: File): Promise<string> {
  if (file.size <= COMPRESS_THRESHOLD) {
    return fileToBase64(file)
  }

  const bitmap = await createImageBitmap(file)
  const { width, height } = bitmap

  let newWidth = width
  let newHeight = height

  if (Math.max(width, height) > MAX_DIMENSION) {
    if (width > height) {
      newWidth = MAX_DIMENSION
      newHeight = Math.round((height / width) * MAX_DIMENSION)
    } else {
      newHeight = MAX_DIMENSION
      newWidth = Math.round((width / height) * MAX_DIMENSION)
    }
  }

  const canvas = new OffscreenCanvas(newWidth, newHeight)
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, newWidth, newHeight)
  bitmap.close()

  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: JPEG_QUALITY })
  return blobToBase64(blob)
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
