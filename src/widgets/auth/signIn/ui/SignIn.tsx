import { memo } from 'react'

import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField'
import { SignInProps } from '@/widgets/auth/signIn/container'
import Image from 'next/image'
import Link from 'next/link'

import s from './SignIn.module.scss'

import gitLogo from '../../../../../public/assets/githubLogo.svg'
import gLogo from '../../../../../public/assets/googleLogo.svg'

export const SignIn = memo(
  ({
    control,
    errorEmail,
    errorPassword,
    isDisabled,
    isLoadingGoogle,
    login,
    onSubmit,
    signIsLoading,
    t,
  }: SignInProps) => {
    if (isLoadingGoogle) {
      return (
        <div className={s.spinner}>
          <Spinner />
        </div>
      )
    }

    return (
      <Card className={s.container}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.signInPage.title}
        </Typography>
        <div className={s.service}>
          <Button className={s.btnOAuth} onClick={login} variant={'link'}>
            <Image alt={'SignIn with google service'} height={36} src={gLogo} width={36} />
          </Button>
          <Button
            as={'a'}
            className={s.btnOAuth}
            href={'https://inctagram.work/api/v1/auth/github/login'}
            variant={'link'}
          >
            <Image alt={'SignIn with github service'} height={36} src={gitLogo} width={36} />
          </Button>
        </div>
        <form onSubmit={onSubmit}>
          <ControlledTextField
            className={s.email}
            control={control}
            //@ts-ignore
            errorMessage={errorEmail && t.auth.error[errorEmail]}
            label={t.auth.form.email}
            name={'email'}
            placeholder={'Epam@epam.com'}
          />
          <ControlledTextField
            className={s.pass}
            control={control}
            //@ts-ignore
            errorMessage={errorPassword && t.auth.error[errorPassword]}
            label={t.auth.form.password}
            name={'password'}
            placeholder={'**********'}
            type={'password'}
          />
          <div className={s.forgot}>
            <Link href={ROUTES.FORGOT_PASS}>
              <Typography color={'form'} variant={'regular14'}>
                {t.auth.signInPage.forgotPassword}
              </Typography>
            </Link>
          </div>
          <Button className={s.button} disabled={isDisabled} fullWidth isLoading={signIsLoading}>
            <Typography as={'h3'} variant={'h3'}>
              {!signIsLoading && t.auth.button.signInButton}
            </Typography>
          </Button>
          <div className={s.signup}>
            <Typography variant={'regular16'}>{t.auth.signInPage.question}</Typography>
            <Link href={ROUTES.REGISTER}>
              <Typography color={'primary'} variant={'h3'}>
                {t.auth.button.signUpButton}
              </Typography>
            </Link>
          </div>
        </form>
      </Card>
    )
  }
)
