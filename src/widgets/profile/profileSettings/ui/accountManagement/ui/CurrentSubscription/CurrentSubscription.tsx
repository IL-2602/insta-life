import { useTranslation } from '@/shared/hooks/useTranslation'
import { Typography } from '@/shared/ui/Typography'

import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'

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
