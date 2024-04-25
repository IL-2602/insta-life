import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { Description } from '@/widgets/profile/profileHeader/ui/ProfileInfo/Description'
import { UserStat } from '@/widgets/profile/profileHeader/ui/ProfileInfo/UserStat'

import s from './ProfileInfo.module.scss'

export const ProfileInfo = ({ aboutMe, userName }: Props) => {
  return (
    <div className={s.profileInfo}>
      <div className={s.mainWrapper}>
        <div className={s.titleAndStat}>
          <Typography variant={'h1'}>{userName}</Typography>
          <div className={s.stat}>
            <UserStat count={2218} title={'Following'} />
            <UserStat count={2218} title={'Followers'} />
            <UserStat count={2218} title={'Publications'} />
          </div>
          <Description text={aboutMe} />
        </div>
      </div>
    </div>
  )
}

type Props = Pick<Profile, 'aboutMe' | 'userName'>
