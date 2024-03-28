import { memo } from 'react'

import { GeneralInformationProps } from '@/widgets/profile/profileSettings/ui/generalInformation/container'
import { TextFields } from '@/widgets/profile/profileSettings/ui/generalInformation/ui/textFields'
import { UploadUserPhoto } from '@/widgets/profile/uploadUserPhoto'

import s from './GeneralInformation.module.scss'

export const GeneralInformation = memo(({ t }: GeneralInformationProps) => {
  return (
    <section className={s.section}>
      <div className={s.container}>
        {<UploadUserPhoto.widget />}
        {<TextFields.widget />}
      </div>
    </section>
  )
})
