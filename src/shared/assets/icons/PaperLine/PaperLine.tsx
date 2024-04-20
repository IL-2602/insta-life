import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill={'none'} height={24} width={24} xmlns={'http://www.w3.org/2000/svg'}>
    <path
      d={
        'M21 4a1.307 1.307 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A.995.995 0 0 0 21 4Zm-4.7 2.29-5.57 5.57L5.16 10 16.3 6.29ZM14 18.84l-1.86-5.57 5.57-5.57L14 18.84Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const PaperLine = memo(SvgComponent)
