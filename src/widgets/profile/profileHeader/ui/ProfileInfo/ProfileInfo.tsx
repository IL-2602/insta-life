import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { Description } from '@/widgets/profile/profileHeader/ui/ProfileInfo/Description'
import { UserStat } from '@/widgets/profile/profileHeader/ui/ProfileInfo/UserStat'
import { clsx } from 'clsx'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './ProfileInfo.module.scss'

export const ProfileInfo = ({
  aboutMe,
  followersCount,
  followingCount,
  isFollow,
  isFollowLoading,
  isMe = false,
  isSubscribeLoading,
  onSendMessage,
  publicationsCount,
  subscribeToUser,
  unSubscribeToUser,
  userName,
}: Props) => {
  const { t } = useTranslation()

  return (
    <SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
      <div className={s.container}>
        <div className={s.wrap}>
          {isFollowLoading ? (
            <Skeleton height={30} width={200} />
          ) : (
            <Typography className={s.name} variant={'h1'}>
              {userName}
            </Typography>
          )}

          {isMe ? (
            <div className={s.btnContainer}>
              <Button
                as={'a'}
                className={s.button}
                href={'/profile/settings'}
                variant={'secondary'}
              >
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
        </div>

        <div className={s.stat}>
          <UserStat count={followingCount} isFollowLoading={isFollowLoading} title={'Following'} />
          <UserStat count={followersCount} isFollowLoading={isFollowLoading} title={'Followers'} />
          <UserStat
            count={publicationsCount}
            isFollowLoading={isFollowLoading}
            title={'Publications'}
          />
        </div>

        {isFollowLoading ? (
          <Skeleton height={50} width={700} />
        ) : (
          <div className={s.description}>
            <Description text={aboutMe} />
          </div>
        )}
      </div>
    </SkeletonTheme>
  )
}

type Props = {
  followersCount: number | undefined
  followingCount: number | undefined
  isFollow: boolean
  isFollowLoading: boolean
  isMe?: boolean
  isSubscribeLoading: boolean
  onSendMessage: () => void
  publicationsCount: number | undefined
  subscribeToUser: () => void
  unSubscribeToUser: () => void
} & Pick<Profile, 'aboutMe' | 'userName'>
