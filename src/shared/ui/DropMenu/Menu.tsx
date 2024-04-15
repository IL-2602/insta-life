import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './Menu.module.scss'

export const Menu = forwardRef<ElementRef<typeof RadixDropdownMenu.Content>, MenuProps>(
  ({ children, className, modal, onOpenChange, open, portal = true, trigger, ...rest }, ref) => {
    const Content = (
      <RadixDropdownMenu.Content className={clsx(s.content, className)} ref={ref} {...rest}>
        {children}
      </RadixDropdownMenu.Content>
    )

    return (
      <RadixDropdownMenu.Root modal={modal}>
        <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>
        {portal ? <RadixDropdownMenu.Portal>{Content}</RadixDropdownMenu.Portal> : Content}
      </RadixDropdownMenu.Root>
    )
  }
)

type MenuProps = {
  modal?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  portal?: boolean
  trigger?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>, 'asChild'>
