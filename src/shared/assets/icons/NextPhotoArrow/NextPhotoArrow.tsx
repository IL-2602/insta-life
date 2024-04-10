import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={29} width={15} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M2 29a2 2 0 0 1-1.54-3.28L9.42 15 .78 4.26a2 2 0 0 1 .3-2.82 2 2 0 0 1 2.92.3l9.66 12a2 2 0 0 1 0 2.54l-10 12A2 2 0 0 1 2 29Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const NextPhotoArrow = memo(SvgComponent)
