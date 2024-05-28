import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import s from './Modal.module.scss'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import { clsx } from 'clsx'

type Props = {
  trigger?: ReactNode
  title?: string
  open: boolean
  onOpen: () => void
  customHeader?: ReactNode
  children: ReactNode
  contentClassName?: string
  bodyClassName?: string
}
export const Modal = ({
  trigger,
  title,
  onOpen,
  open,
  customHeader,
  children,
  contentClassName,
  bodyClassName,
}: Props) => {
  const classNames = {
    content: clsx(s.content, contentClassName),
    body: clsx(bodyClassName),
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpen}>
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
              <Button variant={'noStyle'} className={s.closebtn} onClick={onOpen}>
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
