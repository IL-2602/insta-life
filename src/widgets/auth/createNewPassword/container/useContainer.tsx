import { useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation } from '@/services/authService/authEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { passwordRegExp } from '@/shared/regexps'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { useState } from 'react'

export const useContainer = () => {
  const { t } = useTranslation()

  const [codeError, setCodeError] = useState('')

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

  const isDisabled = !isValid || !code || !!codeError

  const handleFormSubmit = handleSubmit(async data => {
    if (code && !Array.isArray(code)) {
      createNewPassword({ newPassword: data.password, recoveryCode: code })
        .unwrap()
        .then(() => void router.push(ROUTES.LOGIN))
        .catch(e => setCodeError(e.data.messages?.[0]?.message))
    }
  })

  return {
    code,
    codeError,
    control,
    errorPassword,
    errorPasswordConfirmation,
    handleFormSubmit,
    isDisabled,
    t,
  }
}
