import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={10} width={5} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M.667 9.667a.667.667 0 0 1-.514-1.094L3.14 5 .26 1.42a.667.667 0 0 1 .1-.94.667.667 0 0 1 .973.1l3.22 4a.667.667 0 0 1 0 .847l-3.333 4a.667.667 0 0 1-.553.24Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const RightArrow = memo(SvgComponent)
