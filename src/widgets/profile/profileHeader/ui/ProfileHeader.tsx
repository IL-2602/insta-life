import { Avatar } from '@/shared/ui/Avatar'
import { Spinner } from '@/shared/ui/Spinner'
import { ProfileHeaderProps } from '@/widgets/profile/profileHeader/container'
import { ProfileInfo } from '@/widgets/profile/profileHeader/ui/ProfileInfo/ProfileInfo'

import s from './ProfileHeader.module.scss'

export const ProfileHeader = (props: ProfileHeaderProps) => {
  const { data, isLoading, me } = props

  if (isLoading) {
    return <Spinner />
  }
  if (data) {
    const { aboutMe, avatars, id, userName } = data

    return (
      <div className={s.wrapper}>
        <div className={s.avatarWrapper}>
          <Avatar
            height={avatars[0]?.height}
            userAvatar={avatars[0]?.url}
            width={avatars[0]?.width}
          />
        </div>
        <ProfileInfo aboutMe={aboutMe} isMe={!!me && me.userId === id} userName={userName} />
      </div>
    )
  }

  return null
}
