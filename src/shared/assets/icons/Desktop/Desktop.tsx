import * as React from 'react'
import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" ref={ref} {...props}>
    <path
      fill="#fff"
      d="M31.5 3h-27c-1.65 0-3 1.35-3 3v18c0 1.65 1.35 3 3 3H15l-3 4.5V33h12v-1.5L21 27h10.5c1.65 0 3-1.35 3-3V6c0-1.65-1.35-3-3-3zm0 18h-27V6h27v15z"
    />
  </svg>
)
export const DesktopIcon = memo(forwardRef(SvgComponent))
