import { memo } from 'react'

import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import { MessengerProps } from '@/widgets/messenger/container'

import s from './Messenger.module.scss'
export const Messenger = memo(({}: MessengerProps) => {
  return (
    <div className={s.root}>
      <Typography variant={'h1'}>Messenger</Typography>
      <div className={s.messenger}>
        <div className={s.users}>
          <div className={s.search}>
            <TextField type={'search'} />
          </div>
          <div className={s.usersList}>
            <ul>
              <li>User 1</li>
              <li>User 2</li>
              <li>User 3</li>
              <li>User 4</li>
              <li>User 5</li>
            </ul>
          </div>
        </div>
        <div className={s.chat}>
          <div className={s.head}></div>
          <div className={s.body}></div>
        </div>
      </div>
    </div>
  )
})
