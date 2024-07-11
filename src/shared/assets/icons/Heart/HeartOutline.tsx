import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill={'none'} height={24} width={24} xmlns={'http://www.w3.org/2000/svg'}>
    <path
      d={
        'M8 14a.666.666 0 0 1-.474-.193L2.346 8.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.934 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 8 14z'
      }
      fill={'currentColor'}
    />
  </svg>
)

export const HeartOutline = memo(SvgComponent)
