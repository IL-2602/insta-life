import s from './PostLikeCounter.module.scss'

export const PostLikeCounter = ({ likes = 2000 }: Props) => {
  const date = new Date().toLocaleDateString()

  return (
    <div className={s.container}>
      <div className={s.likesContainer}>
        <div className={s.avatars}></div>
        <div className={s.likeCounter}>
          <span>{likes}</span>
          <span>{`"Like"`}</span>
        </div>
      </div>
      <div className={s.date}>{date}</div>
    </div>
  )
}

type Props = {
  date?: string
  likes?: number
}
