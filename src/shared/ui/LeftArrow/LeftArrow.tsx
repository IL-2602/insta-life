import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={10} width={5} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M4.22 9.667a.667.667 0 0 1-.52-.247l-3.22-4a.667.667 0 0 1 0-.847l3.333-4a.668.668 0 0 1 1.027.854L1.86 5l2.88 3.573a.667.667 0 0 1-.52 1.094Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const LeftArrow = memo(SvgComponent)
