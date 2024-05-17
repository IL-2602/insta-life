import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={36} width={36} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      clipRule={'evenodd'}
      d={
        'M.578 18C.578 8.379 8.375.578 17.988.578c9.617 0 17.41 7.8 17.41 17.422 0 9.621-7.793 17.422-17.41 17.422S.578 27.622.578 18zm6.227-7.46L9.89 7.452l8.113 8.113 8.113-8.113 3.086 3.086-9.012 9.012v10.738h-4.363V19.562zm0 0'
      }
      fill={'currentColor'}
      fillRule={'evenodd'}
    />
  </svg>
)

export const YandexIcon = memo(forwardRef(SvgComponent))
