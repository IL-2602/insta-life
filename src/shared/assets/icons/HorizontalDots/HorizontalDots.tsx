import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill={'none'} height={24} width={24} xmlns={'http://www.w3.org/2000/svg'}>
    <path
      d={
        'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'
      }
      fill={'#397DF6'}
    />
  </svg>
)

export const HorizontalDots = memo(SvgComponent)
