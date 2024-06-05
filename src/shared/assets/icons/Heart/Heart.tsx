import * as React from 'react'
import { SVGProps, forwardRef, memo } from 'react'

type HeartProps = SVGProps<SVGSVGElement> & {}

const SvgComponent = forwardRef<SVGSVGElement, HeartProps>(({ ...props }, ref) => {
  const [hovered, setHovered] = React.useState(false)

  const heartStyles: React.CSSProperties = {
    fill: '#fff',
    transition: 'fill 0.3s ease-in-out',
  }

  const hoverStyles: React.CSSProperties = {
    fill: 'red',
  }

  return (
    <svg
      {...props}
      height={12}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      style={hovered ? { ...heartStyles, ...hoverStyles } : heartStyles}
      width={14}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <path
        d={
          'M7 12a.666.666 0 0 1-.474-.193L1.346 6.62a3.507 3.507 0 0 1 0-4.933 3.493 3.493 0 0 1 4.934 0l.72.72.72-.72a3.493 3.493 0 0 1 4.933 0 3.506 3.506 0 0 1 0 4.933l-5.18 5.187A.667.667 0 0 1 7 12ZM3.813 2a2.133 2.133 0 0 0-1.52.627 2.16 2.16 0 0 0 0 3.046L7 10.387l4.706-4.714a2.16 2.16 0 0 0 0-3.046 2.213 2.213 0 0 0-3.04 0l-1.193 1.2a.667.667 0 0 1-.947 0l-1.193-1.2A2.133 2.133 0 0 0 3.813 2Z'
        }
      />
    </svg>
  )
})

export const Heart = memo(SvgComponent)
