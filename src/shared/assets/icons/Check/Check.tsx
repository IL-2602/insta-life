import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={'M4 12.611 8.923 17.5 20 6.5'}
      stroke={'currentColor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
  </svg>
)

export const CheckIcon = memo(forwardRef(SvgComponent))
