import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={30} width={70} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      clipRule={'evenodd'}
      d={
        'M37.906 4.418 33.03 5.464V1.511L37.906.483v3.935Zm10.142 2.19c-1.904 0-3.128.891-3.808 1.512l-.253-1.202h-4.274v22.598l4.857-1.027.02-5.485c.699.504 1.729 1.221 3.438 1.221 3.478 0 6.645-2.79 6.645-8.934-.02-5.621-3.225-8.683-6.625-8.683ZM46.882 19.96c-1.146 0-1.826-.406-2.293-.91l-.019-7.19c.505-.563 1.205-.95 2.312-.95 1.768 0 2.992 1.976 2.992 4.515 0 2.597-1.205 4.535-2.992 4.535Zm23.1-4.477c0-4.961-2.408-8.876-7.013-8.876-4.624 0-7.422 3.915-7.422 8.838 0 5.833 3.303 8.78 8.044 8.78 2.312 0 4.06-.524 5.382-1.26v-3.877c-1.322.66-2.837 1.066-4.76 1.066-1.885 0-3.556-.659-3.77-2.946h9.501c0-.106.007-.349.015-.628.011-.38.024-.829.024-1.097Zm-9.597-1.84c0-2.19 1.34-3.102 2.565-3.102 1.185 0 2.448.911 2.448 3.101h-5.013ZM33.03 6.936h4.876v16.959H33.03V6.937Zm-5.537 0 .31 1.435c1.147-2.094 3.42-1.667 4.042-1.435v4.458c-.602-.213-2.545-.484-3.692 1.008v11.493h-4.857V6.937h4.197Zm-9.404-4.205-4.74 1.007-.02 15.525c0 2.868 2.157 4.98 5.032 4.98 1.593 0 2.759-.29 3.4-.639v-3.934c-.622.252-3.691 1.143-3.691-1.725v-6.88h3.691V6.937H18.07l.019-4.205ZM6.607 10.814c-1.03 0-1.651.29-1.651 1.046 0 .825 1.07 1.189 2.397 1.639 2.164.734 5.012 1.7 5.024 5.28 0 3.47-2.778 5.466-6.82 5.466A13.5 13.5 0 0 1 .255 23.14v-4.613c1.632.892 3.691 1.55 5.304 1.55 1.088 0 1.865-.29 1.865-1.182 0-.913-1.16-1.331-2.56-1.836C2.73 16.291.04 15.322.04 12.093c0-3.43 2.623-5.485 6.567-5.485 1.613 0 3.206.252 4.818.891v4.555c-1.476-.795-3.342-1.24-4.818-1.24Z'
      }
      fill={'#6461FC'}
      fillRule={'evenodd'}
    />
  </svg>
)

export const Stripe = memo(SvgComponent)
