import { ReactNode } from 'react'

import * as Popover from '@radix-ui/react-popover'

import s from './CustomPopover.module.scss'

export const CustomPopover = ({
  contentChildren,
  icon,
  onOpenChange,
  open,
}: {
  contentChildren: ReactNode
  icon: ReactNode
  onOpenChange?: () => void
  open?: boolean
}) => (
  <Popover.Root onOpenChange={onOpenChange} open={open}>
    <Popover.Trigger asChild>{icon}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={s.PopoverContent} sideOffset={0}>
        {contentChildren}
        <Popover.Arrow className={s.PopoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
)
