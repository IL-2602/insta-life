import { ReactNode } from 'react'

import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'

import s from './Modal.module.scss'

type Props = {
  bodyClassName?: string
  children: ReactNode
  contentClassName?: string
  customHeader?: ReactNode
  onOpen: () => void
  open: boolean
  title?: string
  trigger?: ReactNode
}
export const Modal = ({
  bodyClassName,
  children,
  contentClassName,
  customHeader,
  onOpen,
  open,
  title,
  trigger,
}: Props) => {
  const classNames = {
    body: clsx(bodyClassName),
    content: clsx(s.content, contentClassName),
  }

  return (
    <Dialog.Root onOpenChange={onOpen} open={open}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={classNames.content} onOpenAutoFocus={e => e.preventDefault()}>
          {customHeader ? (
            customHeader
          ) : (
            <div className={s.header}>
              <Dialog.Title className={s.title}>
                <Typography variant={'h1'}>{title}</Typography>
              </Dialog.Title>
              <Button className={s.closebtn} onClick={onOpen} variant={'noStyle'}>
                <CloseIcon />
              </Button>
            </div>
          )}

          <div className={classNames.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
