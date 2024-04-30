import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={14} width={7} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M5.83 14a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 0 1 1.54 1.28L2.29 7l4.32 5.36A1 1 0 0 1 5.83 14Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const PrevPublicPhotoArrow = memo(SvgComponent)
