import { ReactNode } from 'react'

import * as Popover from '@radix-ui/react-popover'

import s from './CustomPopover.module.scss'

export const CustomPopover = ({
  contentChildren,
  icon,
}: {
  contentChildren: ReactNode
  icon: ReactNode
}) => (
  <Popover.Root>
    <Popover.Trigger asChild>{icon}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={s.PopoverContent} sideOffset={0}>
        {contentChildren}
        <Popover.Arrow className={s.PopoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
)
