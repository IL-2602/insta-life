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

  // Устанавливаем новый размер холста с учетом aspect ratio и scale
  let width = image.naturalWidth
  let height = image.naturalHeight
  const aspectRatioImage = width / height

  if (aspectRatioImage > aspect) {
    height = width / aspect
  } else {
    width = height * aspect
  }

  //

  canvas.width = width * scale
  canvas.height = height * scale

  // Центрируем изображение
  const offsetX = (canvas.width - width * scale) / 2
  const offsetY = (canvas.height - height * scale) / 2

  // Рисуем изображение на холсте
  ctx.drawImage(image, offsetX, offsetY, width * scale, height * scale)

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
