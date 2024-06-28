import { useTranslation } from '@/shared/hooks/useTranslation'
import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { Description } from '@/widgets/profile/profileHeader/ui/ProfileInfo/Description'
import { UserStat } from '@/widgets/profile/profileHeader/ui/ProfileInfo/UserStat'

import s from './ProfileInfo.module.scss'

export const ProfileInfo = ({ aboutMe, isMe = false, onSendMessage, userName }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <Typography className={s.name} variant={'h1'}>
          {userName}
        </Typography>
        {isMe ? (
          <Button as={'a'} className={s.button} href={'/profile/settings'} variant={'secondary'}>
            {t.button.profileSettings}
          </Button>
        ) : (
          <div className={s.btnContainer}>
            <Button className={s.button}>{t.button.follow}</Button>
            <Button className={s.button} onClick={onSendMessage} variant={'secondary'}>
              {t.button.sendMessage}
            </Button>
          </div>
        )}
      </div>

      <div className={s.stat}>
        <UserStat count={2218} title={'Following'} />
        <UserStat count={2218} title={'Followers'} />
        <UserStat count={2218} title={'Publications'} />
      </div>
      <Description text={aboutMe} />
    </div>
  )
}

type Props = {
  isMe?: boolean
  onSendMessage: () => void
} & Pick<Profile, 'aboutMe' | 'userName'>
