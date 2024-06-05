import * as React from 'react'
import { SVGProps, forwardRef, memo } from 'react'

type HeartProps = SVGProps<SVGSVGElement> & {}
const SvgComponent = forwardRef<SVGSVGElement, HeartProps>(({ ...props }, ref) => (
  <svg fill={'none'} height={'1em'} width={'1em'} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M7 12a.666.666 0 0 1-.474-.193L1.346 6.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.934 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 7 12Z'
      }
      fill={'#CC1439'}
    />
  </svg>
))
const Memo = memo(SvgComponent)

export default Memo
