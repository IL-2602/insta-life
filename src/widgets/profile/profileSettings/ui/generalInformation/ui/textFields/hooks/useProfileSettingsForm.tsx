import { useForm } from 'react-hook-form'

import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = () => {
  const { t } = useTranslation()

  const userNameRegExp = RegExp(/^[0-9A-Za-z_-]+$/)
  const firstAndLastNameRegExp = RegExp(/^[A-Za-zА-Яа-я]*$/)
  const AboutMeRegExp = RegExp(/^[0-9A-Za-zА-Яа-я\W\s]*$/)

  const profileSchema = z.object({
    aboutMe: z
      .string()
      .regex(AboutMeRegExp, t.profileSettings.tab.generalInformation.error.aboutMeDescription)
      .trim()
      .max(200, t.profileSettings.tab.generalInformation.error.aboutMeValueMax),
    dateOfBirth: z.string().trim(),
    firstName: z
      .string()
      .regex(
        firstAndLastNameRegExp,
        t.profileSettings.tab.generalInformation.error.firstNameDescription
      )
      .trim()
      .min(1, t.profileSettings.tab.generalInformation.error.firstNameMin)
      .max(50, t.profileSettings.tab.generalInformation.error.firstNameMax),
    lastName: z
      .string()
      .regex(
        firstAndLastNameRegExp,
        t.profileSettings.tab.generalInformation.error.lastNameDescription
      )
      .trim()
      .min(1, t.profileSettings.tab.generalInformation.error.lastNameMin)
      .max(50, t.profileSettings.tab.generalInformation.error.lastNameMax),
    userName: z
      .string()
      .regex(userNameRegExp, t.profileSettings.tab.generalInformation.error.userNameDescription)
      .trim()
      .min(6, t.profileSettings.tab.generalInformation.error.userNameMin)
      .max(30, t.profileSettings.tab.generalInformation.error.userNameMax),
  })

  type profileFormSchema = z.infer<typeof profileSchema>

  const { data: profile } = useGetProfileQuery()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm<profileFormSchema>({
    defaultValues: {
      aboutMe: profile ? profile.aboutMe : '',
      dateOfBirth: profile ? profile.dateOfBirth : '',
      firstName: profile ? profile.firstName : '',
      lastName: profile ? profile.lastName : '',
      userName: profile ? profile.userName : '',
    },
    mode: 'onTouched',
    resolver: zodResolver(profileSchema),
  })

  return {
    control,
    errors,
    handleSubmit,
    watch,
  }
}
