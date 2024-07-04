import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'
import { Heart } from '@/shared/assets/icons/Heart'
import { Typography } from '@/shared/ui/Typography'
import { commentsAnswersTimeConversion } from '@/shared/utils/commentsAnswersTimeConversion'
import { formatDistance } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from '@/widgets/posts/local/CommentsAnswers/ui/CommentsAnswers.module.scss'

import noPhoto from '../../../../../public/assets/noPhoto.svg'

export const TestComment = ({ commentsAnswers, photo, postDescription }: Props) => {
  const { locale } = useRouter()

  if (!commentsAnswers) {
    return null
  }

  return (
    <div className={s.userCommentContainer}>
      <div className={s.userPhotoWrapper}>
        <div className={s.photo}>
          {(commentsAnswers && commentsAnswers?.from.avatars[0] === undefined) || !photo ? (
            <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
          ) : (
            <Image
              alt={'userPhoto'}
              height={36}
              src={commentsAnswers?.from.avatars[0].url! ?? photo}
              width={36}
            />
          )}
        </div>
        <div className={s.commentText}>
          <Typography as={'b'} variant={'bold14'}>
            {commentsAnswers?.from.username}
            <Typography variant={'regular14'}>
              {postDescription ? postDescription : commentsAnswers?.content}
            </Typography>
          </Typography>
          <Typography className={'commentTime'} color={'form'} variant={'small'}>
            {commentsAnswersTimeConversion(commentsAnswers?.createdAt, locale)}
          </Typography>
        </div>
        <div className={s.commentLike}>
          <Heart />
        </div>
      </div>
    </div>
  )
}

type Props = {
  commentsAnswers?: CommentsAnswers
  photo?: string
  postDescription?: null | string
}
