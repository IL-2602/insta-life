import { useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation } from '@/services/authService/authEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { passwordRegExp } from '@/shared/regexps'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()

  const CreateNewPasswordSchema = z
    .object({
      password: z
        .string()
        .trim()
        .min(6, 'passwordMin')
        .max(20, 'passwordMax')
        .regex(passwordRegExp, 'passwordRegex'),
      passwordConfirmation: z.string().trim().min(6, 'passwordMin').max(20, 'passwordMax'),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: 'passwordsMustMatch',
      path: ['passwordConfirmation'],
    })

  type FormType = z.infer<typeof CreateNewPasswordSchema>

  const [createNewPassword] = useCreateNewPasswordMutation()
  const router = useRouter()
  const { code } = router.query

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormType>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(CreateNewPasswordSchema),
  })

  const errorPassword = errors.password?.message
  const errorPasswordConfirmation = errors.passwordConfirmation?.message

  const handleFormSubmit = handleSubmit(async data => {
    if (code && !Array.isArray(code)) {
      try {
        await createNewPassword({ newPassword: data.password, recoveryCode: code })
        await router.push(ROUTES.LOGIN)
      } catch (e) {
        console.log(e)
      }
    }
  })

  return {
    control,
    errorPassword,
    errorPasswordConfirmation,
    handleFormSubmit,
    isValid,
    t,
  }
}
