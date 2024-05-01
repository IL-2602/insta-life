import { Fragment } from 'react'

import s from './NumberOfUsers.module.scss'

export const NumberOfUsers = (numberOfUsers: number | undefined) => {
  if (numberOfUsers) {
    const sixDigitNumber = numberOfUsers.toString().padStart(6, '0')

    return sixDigitNumber.split('').map((digit: string, index: number) => (
      <Fragment key={index}>
        {digit}
        {index < sixDigitNumber.toString().length - 1 && <span className={s.line}></span>}
      </Fragment>
    ))
  }
}
