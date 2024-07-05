import { KeyboardEvent, forwardRef, useRef } from 'react'
import { Control } from 'react-hook-form'

import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { getUserProfileResponse } from '@/services/publicService/lib/publicEndpoints.types'
import { ImageIcon } from '@/shared/assets/icons/Image'
import { MicroIcon } from '@/shared/assets/icons/Micro'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { ControlledFileUploader } from '@/shared/ui/controlledInsta/ControlledFileUploader/ControlledFileUploader'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { OwnerMessage } from '@/widgets/messenger/local/messages/ownerMessage/OwnerMessage'
import { ReceiverMessage } from '@/widgets/messenger/local/messages/receiverMessage/ReceiverMessage'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './ChatBody.module.scss'

import { Local } from '../../../../../../../locales/en'

//** Переключение между типами и кнопка отправить **//
export const ChatBody = forwardRef<HTMLDivElement, Props>(
  (
    {
      control,
      dialogPartner,
      extraActionsUserPhoto,
      image,
      imageError,
      isLoadingChat,
      message,
      messages,
      onSendMsg,
      t,
      userId,
    },
    ref
  ) => {
    const viewportRef = useRef<HTMLDivElement>(null)
    const avatar = dialogPartner?.avatars[0]?.url

    const onEnterHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        onSendMsg()
      }
    }

    if (!userId || !dialogPartner?.userName) {
      return (
        <div className={s.noMsg}>
          <Typography variant={'medium14'}>Choose who you would like to talk to</Typography>
        </div>
      )
    }

    // @ts-ignore
    return (
      <div className={clsx(s.root, (image || imageError) && s.rootWithImage)}>
        <ScrollArea.Root
          className={clsx(s.scroll, (image || imageError) && s.scrollWithImage)}
          type={'hover'}
        >
          <ScrollArea.Viewport className={s.view} dir={'ltr'} ref={viewportRef}>
            <div className={s.body}>
              {messages?.map((msg, idx) => {
                const length = messages?.length

                if (length === idx + 1 && length > 14) {
                  return msg.ownerId === userId ? (
                    <OwnerMessage key={msg.id} message={msg} ref={ref} />
                  ) : (
                    <ReceiverMessage key={msg.id} message={msg} partnerAvatar={avatar} ref={ref} />
                  )
                }

                return msg.ownerId === userId ? (
                  <OwnerMessage key={msg.id} message={msg} />
                ) : (
                  <ReceiverMessage key={msg.id} message={msg} partnerAvatar={avatar} />
                )
              })}
              {isLoadingChat && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minWidth: '100%',
                  }}
                >
                  <Spinner />
                </div>
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className={s.scrollbar} orientation={'vertical'}>
            <ScrollArea.Thumb className={s.thumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        <div className={s.footer}>
          {image && (
            <div className={s.imageWrapper}>
              <Image alt={'User Image'} height={36} objectFit={'cover'} src={image} width={36} />
            </div>
          )}
          {imageError && (
            <div className={s.imageWrapper}>
              <Typography color={'error'} variant={'error'}>
                {t.messenger[imageError as keyof typeof t.messenger]}
              </Typography>
            </div>
          )}
          <div className={s.textAreaWrapper}>
            <ControlledTextAreaField
              control={control}
              name={'message'}
              onKeyDown={onEnterHandler}
              placeholder={'Type Message'}
              textAreaClassName={s.textArea}
            />
            <div className={s.btnWrapper}>
              {message || image ? (
                <Button className={s.sendBtn} onClick={onSendMsg} variant={'noStyle'}>
                  <Typography color={'primary'} variant={'h3'}>
                    Send Message
                  </Typography>{' '}
                </Button>
              ) : (
                <>
                  <Button className={s.icons} variant={'noStyle'}>
                    <MicroIcon />
                  </Button>
                  <ControlledFileUploader
                    className={s.userPhoto}
                    control={control}
                    extraActions={extraActionsUserPhoto}
                    name={'userPhoto'}
                  >
                    <ImageIcon />
                  </ControlledFileUploader>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

type Props = {
  control: Control<{ message: string; searchName: string; userPhoto?: File | undefined }, any>
  dialogPartner?: getUserProfileResponse
  extraActionsUserPhoto: () => void
  image?: string
  imageError?: string
  isLoadingChat?: boolean
  message?: string
  messages?: Omit<Message, 'avatars' | 'userName'>[]
  onSendMsg: () => void
  t: Local
  userId?: number
}
