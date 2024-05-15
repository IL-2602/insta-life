import { ChangeEvent } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Typography } from '@/shared/ui/Typography'
import { RadioInputsType } from '@/widgets/profile/profileSettings/ui/accountManagement/types/accountManagement.types'

import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'

type Props = {
  accountType: string
  accountTypeChange: (event: ChangeEvent<HTMLInputElement>) => void
  accountTypes: RadioInputsType[]
  isBusinessAccount: boolean
}

export const AccountType = ({
  accountType,
  accountTypeChange,
  accountTypes,
  isBusinessAccount,
}: Props) => {
  const { t } = useTranslation()

  return (
    <fieldset className={s.accountTypes}>
      <Typography as={'legend'} variant={'h3'}>
        {t.profileSettings.tab.accountManagement.accountType}
      </Typography>
      <div className={s.radioWrapper}>
        {accountTypes.map((account, index) => (
          <div key={index}>
            <input
              checked={
                isBusinessAccount ? account.value === 'business' : accountType === account.value
              }
              disabled={isBusinessAccount && account.id === 'personal-account'}
              id={account.id}
              name={account.name}
              onChange={accountTypeChange}
              type={'radio'}
              value={account.value}
            />
            <Typography as={'label'} htmlFor={account.id} variant={'regular14'}>
              {account.title}
            </Typography>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
