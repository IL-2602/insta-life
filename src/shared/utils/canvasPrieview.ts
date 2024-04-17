import { PixelCrop } from 'react-image-crop'

export async function canvasPreview2(
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  aspect: number,
  scale = 1
) {
  if (!image || !canvas) {
    throw new Error('Image element is null')
  }

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const { naturalWidth, naturalHeight } = image

  let newWidth = naturalWidth
  let newHeight = naturalHeight

  // Проверяем желаемое соотношение сторон
  if (naturalWidth / aspect > naturalHeight) {
    newWidth = naturalHeight * aspect
  } else {
    newHeight = naturalWidth / aspect
  }

  // Проверяем масштаб
  if (newWidth < naturalWidth * scale && newHeight < naturalHeight * scale) {
    newWidth = Math.min(naturalWidth * scale, newWidth)
    newHeight = Math.min(naturalHeight * scale, newHeight)
  }

  // Создаем новое изображение и центрируем его
  canvas.width = newWidth
  canvas.height = newHeight
  ctx.drawImage(
    image,
    (naturalWidth - newWidth) / 2,
    (naturalHeight - newHeight) / 2,
    newWidth,
    newHeight,
    0,
    0,
    newWidth,
    newHeight
  )

  ctx.restore()
}

export async function canvasPreview(
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  crop: PixelCrop,
  scale = 1
) {
  if (!image || !canvas) {
    throw new Error('Image element is null')
  }

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  ctx.save()

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  )

  ctx.restore()
}
