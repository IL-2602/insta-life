import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={24} width={24} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
      }
      fill={'#fff'}
    />
    <path
      d={
        'M19.07 4.93a10 10 0 0 0-16.28 11c.096.199.128.422.09.64L2 20.8a1 1 0 0 0 .606 1.13A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28l-.05-.02Zm.83 8.36a8 8 0 0 1-11 6.08 3.261 3.261 0 0 0-1.25-.26 3.435 3.435 0 0 0-.56.05l-2.82.57.57-2.82a3.09 3.09 0 0 0-.21-1.81 8 8 0 0 1 9.827-10.72 8 8 0 0 1 5.444 8.91Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const PostMsg = memo(SvgComponent)
