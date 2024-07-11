import { FillSmallHeart, SmallHeart } from '@/shared/assets/icons/SmallHeart'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from '@/widgets/home/local/PostComments/Answers/Answers.module.scss'

import noAvatar from '../../../../../../public/assets/noAvatarGroup.svg'

export const Answer = ({
  answer,
  handleDislikeAnswer,
  handleLikeAnswer,
  isOpenTextField,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.answerBlock}>
      <div className={s.answer}>
        {answer.from.avatars[0]?.url ? (
          <Image
            alt={'noAvatar'}
            className={s.avatar}
            height={24}
            src={answer.from.avatars[0].url}
            width={24}
          />
        ) : (
          <Image alt={'noAvatar'} height={24} src={noAvatar} width={24} />
        )}

        <Typography className={s.answerName} variant={'bold14'}>
          {answer.from.username}
        </Typography>
        <Typography as={'span'} className={s.answerComment} variant={'regular14'}>
          {answer.content}
        </Typography>

        <div
          className={s.smallHeart}
          onClick={
            answer.isLiked
              ? () => handleDislikeAnswer(answer.id)
              : () => handleLikeAnswer(answer.id)
          }
        >
          {answer.isLiked ? <FillSmallHeart /> : <SmallHeart />}
        </div>
      </div>
      <div className={clsx(s.answerWrap, isOpenTextField ? s.openTextField : '')}>
        <Typography as={'span'} className={s.time} color={'form'} variant={'small'}>
          <TimeDifference home postTime={answer.createdAt} />
        </Typography>
        <Typography as={'span'} className={s.like} color={'form'} variant={'bold-small'}>
          {t.post.like}: {answer.likeCount}
        </Typography>
      </div>
    </div>
  )
}

type Props = {
  answer: any
  handleDislikeAnswer: (id: number) => void
  handleLikeAnswer: (id: number) => void
  isOpenTextField: boolean
}
