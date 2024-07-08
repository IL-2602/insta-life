import * as React from 'react'
import { SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill={'currentColor'} height={12} width={14} xmlns={'http://www.w3.org/2000/svg'}>
    <path
      d={
        'M7 12a.666.666 0 0 1-.474-.193L1.346 6.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.934 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 7 12ZM3.813 2a2.133 2.133 0 0 0-1.52.627 2.16 2.16 0 0 0 0 3.046L7 10.387l4.706-4.714a2.16 2.16 0 0 0 0-3.046 2.213 2.213 0 0 0-3.04 0l-1.193 1.2a.667.667 0 0 1-.947 0l-1.193-1.2A2.133 2.133 0 0 0 3.813 2Z'
      }
      fill={'currentColor'}
    />
  </svg>
)

export const HeartFullIcon = memo(forwardRef(SvgComponent))
