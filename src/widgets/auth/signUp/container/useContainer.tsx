import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useOAuthGoogleMutation, useSignUpMutation } from '@/services/authService/authEndpoints'
import { authActions } from '@/services/authService/store/slice/authEndpoints.slice'
import { FRONTEND_URL } from '@/shared/constants/frontendUrl'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { passwordRegExp, userNameRegExp } from '@/shared/regexps'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import removeFromLocalStorage from '@/shared/utils/localStorage/removeFromLocalStorage'
import saveToLocalStorage from '@/shared/utils/localStorage/saveToLocalStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { z } from 'zod'

const signUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .max(30, 'Maximum number of characters 30')
      .email('The email must match the format example@example.com'),
    password: z
      .string()
      .trim()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        passwordRegExp,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    passwordConfirmation: z
      .string()
      .regex(passwordRegExp)
      .trim()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20'),
    termsAgreement: z.boolean(),
    userName: z
      .string()
      .regex(userNameRegExp, 'UserName must contain a-z, A-Z, 0-9')
      .trim()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

export type SignUpFormSchema = z.infer<typeof signUpSchema>

export const useContainer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [oAuthGoogle, { isLoading: isLoadingGoogle }] = useOAuthGoogleMutation()

  const {
    control,
    formState: { dirtyFields, errors, isDirty },
    getValues,
    handleSubmit,
    setError,
  } = useForm<SignUpFormSchema>({
    defaultValues: {
      email: getFromLocalStorage('savedEmail', ''),
      password: getFromLocalStorage('savedPassword', ''),
      passwordConfirmation: getFromLocalStorage('savedPasswordConfirmation', ''),
      termsAgreement: false,
      userName: getFromLocalStorage('savedUserName', ''),
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const { email, password, passwordConfirmation, userName } = getValues()

  saveToLocalStorage('savedEmail', email)
  saveToLocalStorage('savedPassword', password)
  saveToLocalStorage('savedPasswordConfirmation', passwordConfirmation)
  saveToLocalStorage('savedUserName', userName)

  const userNameErrorMessage = errors.userName?.message
  const emailErrorMessage = errors.email?.message
  const passwordErrorMessage = errors.password?.message
  const passwordConfirmationErrorMessage = errors.passwordConfirmation?.message

  const allErrors =
    userNameErrorMessage ||
    emailErrorMessage ||
    passwordErrorMessage ||
    passwordConfirmationErrorMessage

  const [signUp, { isLoading }] = useSignUpMutation()
  const isFormValid =
    (Object.keys(errors).length === 0 && isDirty && dirtyFields.termsAgreement) || isLoading

  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const onSubmit = handleSubmit((data: SignUpFormSchema) => {
    const { email, password, userName } = data

    signUp({ baseUrl: FRONTEND_URL, email, password, userName })
      .unwrap()
      .then(() => {
        setIsOpen(true)
        removeFromLocalStorage('savedEmail')
        removeFromLocalStorage('savedPassword')
        removeFromLocalStorage('savedUserName')
        removeFromLocalStorage('savedPasswordConfirmation')
      })
      .catch(err => {
        const isEmailExist =
          err?.data?.messages[0].message === 'User with this email is already exist'
            ? 'User with this email is already registered'
            : err?.data?.messages[0].message

        setError(err.data.messages[0].field, {
          message: isEmailExist,
        })
      })
  })

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: googleResponse => {
      const data = {
        code: googleResponse.code,
      }

      oAuthGoogle(data)
        .unwrap()
        .then(res => {
          dispatch(authActions.setEmail(res.email!))
        })
        .catch(err => {
          console.log(err)

          void push(ROUTES.REGISTER)
        })
    },
  })

  const handleCloseModal = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  const pointerOutsideClickHandler = () => setIsOpen(false)

  return {
    allErrors,
    control,
    email,
    emailErrorMessage,
    googleLogin,
    handleCloseModal,
    isFormValid,
    isLoading,
    isLoadingGoogle,
    isOpen,
    onSubmit,
    passwordConfirmationErrorMessage,
    passwordErrorMessage,
    pointerOutsideClickHandler,
    t,
    userNameErrorMessage,
  }
}
