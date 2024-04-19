import { PixelCrop } from 'react-image-crop'

export async function canvasPreviewWithOutCrop(
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  aspect: number,
  zoom: number = 1
) {
  if (!image || !canvas) {
    throw new Error('Image element is null')
  }
  const scale = 1
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const { naturalHeight, naturalWidth } = image

  let newWidth = naturalWidth
  let newHeight = naturalHeight
  const scaledWidth = naturalWidth * scale * zoom
  const scaledHeight = naturalHeight * scale * zoom

  if (aspect > 0) {
    if (naturalWidth / aspect > naturalHeight) {
      newWidth = naturalHeight * aspect
    } else {
      newHeight = naturalWidth / aspect
    }
  }

  if (newWidth < scaledWidth && newHeight < scaledHeight) {
    newWidth = Math.min(scaledWidth, newWidth)
    newHeight = Math.min(scaledHeight, newHeight)
  }

  canvas.width = newWidth
  canvas.height = newHeight
  ctx.save()

  ctx.translate(newWidth / 2, newHeight / 2) // переносим центр координат в центр canvas
  ctx.scale(zoom, zoom) // применяем масштабирование
  ctx.translate(-newWidth / 2, -newHeight / 2) // возращаем  координаты
  ctx.save()

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
