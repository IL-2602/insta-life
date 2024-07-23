import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={22} width={12} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M9.745 21.5a1.5 1.5 0 0 1-1.17-.555l-7.245-9a1.5 1.5 0 0 1 0-1.905l7.5-9a1.502 1.502 0 1 1 2.31 1.92L4.435 11l6.48 8.04a1.501 1.501 0 0 1-1.17 2.46Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const MobileLeftArrow = memo(SvgComponent)
