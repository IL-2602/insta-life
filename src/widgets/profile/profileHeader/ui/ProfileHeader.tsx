import { Avatar } from '@/shared/ui/Avatar'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { ProfileHeaderProps } from '@/widgets/profile/profileHeader/container'
import { MobileHeader } from '@/widgets/profile/profileHeader/ui/ProfileInfo/MobileHeader'
import { ProfileInfo } from '@/widgets/profile/profileHeader/ui/ProfileInfo/ProfileInfo'

import s from './ProfileHeader.module.scss'

export const ProfileHeader = ({
  data,
  followersCount,
  followingCount,
  isFollow,
  isFollowLoading,
  isLoading,
  isSubscribeLoading,
  me,
  onSendMessage,
  publicationsCount,
  subscribeToUser,
  unSubscribeToUser,
}: ProfileHeaderProps) => {
  if (isLoading) {
    return <Spinner />
  }

  if (data) {
    const { aboutMe, avatars, id, userName } = data

    return (
      <section className={s.profileHeader}>
        <div className={s.wrapper}>
          <div className={s.mobileAvatarWrapper}>
            <div className={s.avatarWrapper}>
              <Avatar
                height={avatars[0]?.height}
                userAvatar={avatars[0]?.url}
                width={avatars[0]?.width}
              />
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
    )
  }

  return null
}
