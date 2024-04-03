import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={14} width={14} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M14 1.41 12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const Cross = memo(SvgComponent)
