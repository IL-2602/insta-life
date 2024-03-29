import { Spinner } from '@/shared/ui/Spinner'
import { ProfileHeaderProps } from '@/widgets/profile/profileHeader/container'
import { Avatar } from '@/widgets/profile/profileHeader/ui/Avatar'
import { ProfileInfo } from '@/widgets/profile/profileHeader/ui/ProfileInfo/ProfileInfo'

import s from './ProfileHeader.module.scss'

export const ProfileHeader = (props: ProfileHeaderProps) => {
  const { data, isError, isLoading } = props

  if (isLoading) {
    return <Spinner />
  }
  if (data) {
    const { aboutMe, avatars, userName } = data

    return (
      <div className={s.wrapper}>
        <Avatar avatar={avatars[0]} />
        <ProfileInfo aboutMe={aboutMe} userName={userName} />
      </div>
    )
  }

  return null
}
