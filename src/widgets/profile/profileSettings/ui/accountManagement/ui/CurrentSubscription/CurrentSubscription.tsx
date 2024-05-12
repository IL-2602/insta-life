import { useTranslation } from '@/shared/hooks/useTranslation'
import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'
import { Typography } from '@/shared/ui/Typography'

export const CurrentSubscription = () => {
  const { t } = useTranslation()
  return (
    <fieldset className={s.accountTypes}>
      <Typography as={'legend'} variant={'h3'}>
        {t.profileSettings.tab.accountManagement.currentSubscription}
      </Typography>
      <div className={s.radioWrapper}>
        LalalalalalalalaLalalalalalalalaLalalalalalalalaLalalalalalalalaLalalalalalalala
      </div>
    </fieldset>
  )
}
