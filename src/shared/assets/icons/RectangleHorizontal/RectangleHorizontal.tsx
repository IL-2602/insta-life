import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={20} width={26} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <rect
      height={24}
      rx={2}
      stroke={'currentColor'}
      strokeWidth={2}
      transform={'rotate(90 25 1)'}
      width={18}
      x={25}
      y={1}
    />
  </svg>
)

export const RectangleHorizontal = memo(SvgComponent)
