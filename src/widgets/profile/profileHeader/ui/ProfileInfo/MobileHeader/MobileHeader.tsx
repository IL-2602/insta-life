import Skeleton from 'react-loading-skeleton'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Description } from '@/widgets/profile/profileHeader/ui/ProfileInfo/Description'
import { clsx } from 'clsx'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './MobileHeader.module.scss'

export const MobileHeader = ({
  aboutMe,
  isFollow,
  isFollowLoading,
  isMe,
  isSubscribeLoading,
  onSendMessage,
  subscribeToUser,
  unSubscribeToUser,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.mobileContainer}>
      {isMe ? (
        <div className={s.btnContainer}>
          <Button as={'a'} className={s.button} href={'/profile/settings'} variant={'secondary'}>
            {t.button.profileSettings}
          </Button>
        </div>
      ) : (
        <>
          {isFollowLoading ? (
            <Skeleton height={30} width={250} />
          ) : (
            <div className={s.btnContainer}>
              {isFollow && (
                <Button
                  className={clsx(s.button, isSubscribeLoading ? s.btnLoading : '')}
                  onClick={unSubscribeToUser}
                  variant={'outlined'}
                >
                  {t.button.unfollow}
                </Button>
              )}

              {!isFollow && (
                <Button
                  className={clsx(s.button, isSubscribeLoading ? s.btnLoading : '')}
                  onClick={subscribeToUser}
                >
                  {t.button.follow}
                </Button>
              )}

              <Button className={s.button} onClick={onSendMessage} variant={'secondary'}>
                {t.button.sendMessage}
              </Button>
            </div>
          )}
        </>
      )}
      {isFollowLoading ? (
        <Skeleton height={20} width={100} />
      ) : (
        <div className={s.description}>
          <Description text={aboutMe} />
        </div>
      )}
    </div>
  )
}

type Props = {
  aboutMe: string
  isFollow: boolean
  isFollowLoading: boolean
  isMe: boolean
  isSubscribeLoading: boolean
  onSendMessage: () => void
  subscribeToUser: () => void
  unSubscribeToUser: () => void
}
