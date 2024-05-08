import React from 'react'

import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField'
import { CreateNewPasswordProps } from '@/widgets/auth/createNewPassword/container'

import s from './CreateNewPassword.module.scss'

export const CreateNewPassword = ({
  code,
  codeError,
  control,
  errorPassword,
  errorPasswordConfirmation,
  handleFormSubmit,
  isDisabled,
  t,
}: CreateNewPasswordProps) => {
  return (
    <>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {t.auth.createNewPassword.title}
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <ControlledTextField
            className={s.password}
            control={control}
            //@ts-ignore
            errorMessage={errorPassword && t.auth.error[errorPassword]}
            label={t.auth.form.newPassword}
            name={'password'}
            type={'password'}
          />
          <ControlledTextField
            className={s.confirmPassword}
            control={control}
            //@ts-ignore
            errorMessage={errorPasswordConfirmation && t.auth.error[errorPasswordConfirmation]}
            label={t.auth.form.passwordConfirmation}
            name={'passwordConfirmation'}
            type={'password'}
          />
          <Typography as={'p'} variant={'regular14'} />
          <Button className={s.submitButton} disabled={isDisabled} fullWidth type={'submit'}>
            <Typography as={'span'} color={!codeError ? 'inherit' : 'error'} variant={'h3'}>
              {code && !codeError ? t.auth.button.createNewPassword : codeError || 'Invalid code'}
            </Typography>
          </Button>
        </form>
      </Card>
    </>
  )
}
