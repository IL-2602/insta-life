import { ComponentPropsWithoutRef } from 'react'

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './Item.module.scss'

export const Item = ({ children, className, ...rest }: Props) => {
  return (
    <RadixDropdownMenu.Item className={clsx(s.item, className)} {...rest}>
      {children}
    </RadixDropdownMenu.Item>
  )
}

type Props = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
