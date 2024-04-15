import * as RadixSlider from '@radix-ui/react-slider'

import s from './Slider.module.scss'

export const Slider = ({
  max,
  min = 0,
  minStepsBetweenThumbs = 1,
  onValueChange,
  slidersValue,
  step = 1,
}: PropsType) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <RadixSlider.Root
          className={s.root}
          max={max}
          min={min}
          minStepsBetweenThumbs={minStepsBetweenThumbs}
          onValueChange={onValueChange}
          step={step}
          value={slidersValue}
        >
          <RadixSlider.Track className={s.track}>
            <RadixSlider.Range className={s.range} />
          </RadixSlider.Track>
          <RadixSlider.Thumb aria-label={'Volume'} className={s.thumb} />
        </RadixSlider.Root>
      </div>
    </div>
  )
}
type PropsType = {
  label?: string
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onValueChange: (slidersValue: [number]) => void
  slidersValue: [number]
  step?: number
}
