import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={26} fill="none" {...props}>
    <rect width={16} height={24} x={1} y={1} stroke="currentColor" strokeWidth={2} rx={2} />
  </svg>
)
export const RectangleVertical = memo(SvgComponent)
