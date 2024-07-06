import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={22} width={12} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M2 21.5a1.5 1.5 0 0 1-1.155-2.46L7.565 11l-6.48-8.055A1.5 1.5 0 0 1 1.31.83a1.5 1.5 0 0 1 2.19.225l7.245 9a1.5 1.5 0 0 1 0 1.905l-7.5 9A1.5 1.5 0 0 1 2 21.5Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const MobileRightArrow = memo(SvgComponent)
