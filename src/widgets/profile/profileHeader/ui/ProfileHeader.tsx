import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Avatar } from '@/shared/ui/Avatar'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { Typography } from '@/shared/ui/Typography'
import { ProfileHeaderProps } from '@/widgets/profile/profileHeader/container'
import { MobileHeader } from '@/widgets/profile/profileHeader/ui/ProfileInfo/MobileHeader'
import { ProfileInfo } from '@/widgets/profile/profileHeader/ui/ProfileInfo/ProfileInfo'
import { clsx } from 'clsx'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './ProfileHeader.module.scss'

export const ProfileHeader = ({
  data,
  followersCount,
  followingCount,
  isFollow,
  isFollowLoading,
  isSubscribeLoading,
  me,
  onSendMessage,
  publicationsCount,
  subscribeToUser,
  unSubscribeToUser,
}: ProfileHeaderProps) => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  if (isFollowLoading && width <= 1130) {
    return (
      <div className={s.mobileSpinner}>
        <SpinnerThreePoints />
      </div>
    )
  }

  if (data) {
    const { aboutMe, avatars, id, userName } = data

    return (
      <SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
        <section className={s.profileHeader}>
          <div className={s.wrapper}>
            <div className={clsx(s.mobileAvatarWrapper, isFollowLoading ? s.avatarNone : '')}>
              <div className={s.avatarWrapper}>
                {!isFollowLoading ? (
                  <Avatar
                    height={avatars[0]?.height}
                    userAvatar={avatars[0]?.url}
                    width={avatars[0]?.width}
                  />
                ) : (
                  <div className={s.skeleton}>
                    <Skeleton borderRadius={'50%'} height={200} width={200} />
                  </div>
                )}
              </div>
              <Typography className={s.mobileName} variant={'h1'}>
                {userName}
              </Typography>
            </div>

            <ProfileInfo
              aboutMe={aboutMe}
              followersCount={followersCount}
              followingCount={followingCount}
              isFollow={isFollow}
              isFollowLoading={isFollowLoading}
              isMe={!!me && me.userId === id}
              isSubscribeLoading={isSubscribeLoading}
              onSendMessage={onSendMessage}
              publicationsCount={publicationsCount}
              subscribeToUser={subscribeToUser}
              unSubscribeToUser={unSubscribeToUser}
              userName={userName}
            />
          </div>
          <MobileHeader
            aboutMe={aboutMe}
            isFollow={isFollow}
            isFollowLoading={isFollowLoading}
            isMe={!!me && me.userId === id}
            isSubscribeLoading={isSubscribeLoading}
            onSendMessage={onSendMessage}
            subscribeToUser={subscribeToUser}
            unSubscribeToUser={unSubscribeToUser}
          />
        </section>
      </SkeletonTheme>
    )
  }

  return null
}
