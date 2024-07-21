import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { SignUpConfirmationProps } from '@/widgets/auth/signUpConfirmation/container'
import Image from 'next/image'
import Link from 'next/link'

import s from './SignUpConfirmation.module.scss'

import img from '../../../../../public/assets/congratulation.svg'

export const SignUpConfirmation = ({ t }: SignUpConfirmationProps) => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'}>{t.auth.congratulationPage.title}</Typography>
      <Typography className={s.text} variant={'regular16'}>
        {t.auth.congratulationPage.congratulationText}
      </Typography>
      <div className={s.wrap}>
        <Button onClick={() => {}} variant={'primary'}>
          <Link href={ROUTES.LOGIN}>
            <Typography color={'light'} variant={'h3'}>
              {t.auth.button.signInButton}
            </Typography>
          </Link>
        </Button>
        <Image alt={'Congratulation! Email confirmed'} height={352} src={img.src} width={473} />
      </div>
    </div>
  )
}
