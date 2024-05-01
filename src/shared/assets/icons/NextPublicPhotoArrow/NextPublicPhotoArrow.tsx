import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={15} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M1 15a1 1 0 0 1-.77-1.64L4.71 8 .39 2.63a1 1 0 0 1 .15-1.41A1 1 0 0 1 2 1.37l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 1 15Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const NextPublicPhotoArrow = memo(SvgComponent)
