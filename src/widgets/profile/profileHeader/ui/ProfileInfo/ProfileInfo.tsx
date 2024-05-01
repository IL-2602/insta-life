import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { Description } from '@/widgets/profile/profileHeader/ui/ProfileInfo/Description'
import { UserStat } from '@/widgets/profile/profileHeader/ui/ProfileInfo/UserStat'

import s from './ProfileInfo.module.scss'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const ProfileInfo = ({ aboutMe, userName, isMe = false }: Props) => {
  const { t } = useTranslation()
  return (
    <div className={s.profileInfo}>
      <div className={s.mainWrapper}>
        <div className={s.titleAndStat}>
          <div className={s.titleAndStatHeader}>
            <Typography variant={'h1'}>{userName}</Typography>
            {isMe && (
              <Button
                as={'a'}
                className={s.button}
                href={'/profile/settings'}
                variant={'secondary'}
              >
                {t.button.profileSettings}
              </Button>
            )}
          </div>

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

type Props = Pick<Profile, 'aboutMe' | 'userName'> & { isMe?: boolean }
