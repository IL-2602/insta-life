import { forwardRef } from 'react'

import { HomePosts } from '@/widgets/home/local/HomePosts/HomePosts'
import { HomeProps } from '@/widgets/home/publ/container'

import s from './Home.module.scss'

export const Home = forwardRef<HTMLDivElement, HomeProps>(({ followers }) => {
  return (
    <div className={s.container}>
      {followers?.items.map((follower, id) => <HomePosts id={follower.userId} key={id} />)}
    </div>
  )
})
