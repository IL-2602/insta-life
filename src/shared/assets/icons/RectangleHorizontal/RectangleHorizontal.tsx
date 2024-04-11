import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={20} fill="none" {...props}>
    <rect
      width={18}
      height={24}
      x={25}
      y={1}
      stroke="currentColor"
      strokeWidth={2}
      rx={2}
      transform="rotate(90 25 1)"
    />
  </svg>
)
export const RectangleHorizontal = memo(SvgComponent)
