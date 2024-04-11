import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={28} width={15} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M12.66 28a2 2 0 0 1-1.56-.74l-9.66-12a2 2 0 0 1 0-2.54l10-12a2.003 2.003 0 0 1 3.08 2.56L5.58 14l8.64 10.72A1.999 1.999 0 0 1 12.66 28Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const PrevPhotoArrow = memo(SvgComponent)
