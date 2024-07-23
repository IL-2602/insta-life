import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={16} width={16} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M8 14a.666.666 0 0 1-.473-.193L2.347 8.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.933 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 8 14ZM4.813 4a2.133 2.133 0 0 0-1.52.627 2.16 2.16 0 0 0 0 3.046L8 12.387l4.707-4.714a2.16 2.16 0 0 0 0-3.046 2.213 2.213 0 0 0-3.04 0l-1.194 1.2a.667.667 0 0 1-.946 0l-1.194-1.2A2.133 2.133 0 0 0 4.813 4Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const SmallHeart = memo(SvgComponent)

const SvgFillHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={16} width={16} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M8 14a.666.666 0 0 1-.473-.193L2.347 8.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.933 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 8 14Z'
      }
      fill={'#CC1439'}
    />
  </svg>
)

export const FillSmallHeart = memo(SvgFillHeart)
