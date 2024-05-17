import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg height={36} ref={ref} width={36} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M36 18a17.95 17.95 0 0 1-6.004 13.418c-4.621 2.25-8.926.676-10.344-.309 4.535-.992 7.957-6.476 7.957-13.105 0-6.629-3.425-12.113-7.957-13.113 1.426-.985 5.73-2.559 10.34-.309-2.11-1.398-4.57-2.203-7.203-2.203-4.289 0-8.129 2.121-10.719 5.476h.004c-1.992 2.348-3.277 5.82-3.363 9.727v.848c.086 3.894 1.379 7.37 3.371 9.718 2.578 3.356 6.418 5.477 10.707 5.477 2.637 0 5.106-.8 7.215-2.2a17.978 17.978 0 0 1-12.86 4.555C7.603 35.531 0 27.656 0 18 0 8.059 8.059 0 18 0h.07a17.884 17.884 0 0 1 11.934 4.586l-.008-.004A17.966 17.966 0 0 1 36 18.004zm0 0'
      }
      fill={'currentColor'}
      fillOpacity={'1'}
      fillRule={'evenodd'}
      stroke={'none'}
    />
  </svg>
)

export const OperaIcon = memo(forwardRef(SvgComponent))
