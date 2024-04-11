import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={26} width={18} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <rect height={24} rx={2} stroke={'currentColor'} strokeWidth={2} width={16} x={1} y={1} />
  </svg>
)

export const RectangleVertical = memo(SvgComponent)
