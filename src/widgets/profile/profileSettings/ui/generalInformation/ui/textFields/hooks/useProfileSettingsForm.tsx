import { useForm } from 'react-hook-form'

import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { PERMITTED_PAGE } from '@/shared/constants/calender'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { AboutMeRegExp, firstAndLastNameRegExp, userNameRegExp } from '@/shared/regexps'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = () => {
  const { t } = useTranslation()

  const profileSchema = z.object({
    aboutMe: z
      .string()
      .regex(AboutMeRegExp, t.profileSettings.tab.generalInformation.error.aboutMeDescription)
      .trim()
      .max(200, t.profileSettings.tab.generalInformation.error.aboutMeValueMax)
      .nullable(),
    calendar: z
      .date()
      .nullable()
      .refine(calendar => {
        if (!calendar) {
          return true
        }
        const currentDate = new Date()

        currentDate.setFullYear(currentDate.getFullYear() - PERMITTED_PAGE)

        return calendar < currentDate
      }, t.profileSettings.tab.generalInformation.error.calender),
    firstName: z
      .string()
      .regex(
        firstAndLastNameRegExp,
        t.profileSettings.tab.generalInformation.error.firstNameDescription
      )
      .trim()
      .min(1, t.profileSettings.tab.generalInformation.error.firstNameMin)
      .max(50, t.profileSettings.tab.generalInformation.error.firstNameMax)
      .nullable(),
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

  const { data: profile, isLoading: isGetProfileLoading } = useGetProfileQuery()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    watch,
  } = useForm<profileFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(profileSchema),
  })

  return {
    control,
    errors,
    handleSubmit,
    isGetProfileLoading,
    profile,
    register,
    reset,
    setError,
    watch,
  }
}
