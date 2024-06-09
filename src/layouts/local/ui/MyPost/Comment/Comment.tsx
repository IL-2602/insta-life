import { Answer } from '@/layouts/local/ui/MyPost/Answer/Answer'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { Like } from '@/shared/ui/Like'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from '@/layouts/local/ui/MyPost/MyPostModal/ui/PostSide/PostSide.module.scss'

import noPhoto from '../../../../../../public/assets/noPhoto.svg'

export const Comment = ({
  answerCommentSend,
  answerCommentText,
  answerCommentTextHandler,
  answers,
  changeIsLikedStatus,
  commentId = 0,
  createdAt,
  isAnswers,
  openedComment,
  photo,
  postDescription,
  postId = 0,
  profile,
  setCreateAnswer,
  uAvatar,
  uComment,
  uId,
  uIsLiked = false,
  uLikesCount,
  uName,
}: Props) => {
  return (
    <div className={s.userCommentContainer}>
      <div className={s.userPhotoWrapper}>
        <div className={s.photo}>
          {(profile && profile?.avatars[0].url === undefined) || !photo ? (
            <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
          ) : (
            <Image
              alt={'userPhoto'}
              height={36}
              src={profile?.avatars[0].url! ?? uAvatar}
              width={36}
            />
          )}
        </div>
        <div className={s.commentText}>
          <Typography as={'b'} variant={'bold14'}>
            {profile?.userName ? profile.userName : uName}
            <Typography variant={'regular14'}>
              {postDescription ? postDescription : uComment}
            </Typography>
          </Typography>
          <div className={s.commentInfo}>
            <Typography className={s.createCommentTime} color={'tertiary'} variant={'small'}>
              {createdAt ? <TimeDifference postTime={createdAt} /> : '2 hours ago'}
            </Typography>
            <Typography className={s.commentLikes} color={'tertiary'} variant={'small'}>
              {uLikesCount ? `Like:${uLikesCount}` : ''}
            </Typography>
            <Typography
              as={'button'}
              className={s.commentAnswer}
              color={'tertiary'}
              onClick={() => setCreateAnswer!(true, commentId)}
              variant={'small'}
            >
              Answer
            </Typography>
          </div>
        </div>
        <div className={s.commentLike}>
          <Like
            onClick={() => changeIsLikedStatus(Number(uId), uIsLiked ? 'DISLIKE' : 'LIKE', postId)}
            uIsLiked={uIsLiked}
          />
        </div>
      </div>

      {isAnswers && (
        <div className={s.addCommentAnswer}>
          <Typography
            as={'p'}
            className={s.answerButtonHide}
            onClick={() => setCreateAnswer(false, commentId)}
            variant={'small'}
          >
            <Typography className={s.buttonHide} variant={'small'}>
              --- Hide Answers
            </Typography>
            <Answer
              answerCommentTextHandler={answerCommentTextHandler}
              answers={answers}
              changeIsLikedStatus={changeIsLikedStatus}
              sendAnswerComment={answerCommentSend}
              setCreateAnswer={setCreateAnswer}
            />
          </Typography>

          <textarea
            onChange={(e: any) => answerCommentTextHandler!(e.currentTarget.value)}
            placeholder={'Add answer...'}
            rows={3}
            style={{ backgroundColor: 'var(--color-dark-500)', padding: '5px' }}
            value={answerCommentText}
          />
          <Button
            className={s.sendAnswerButton}
            //disabled={false}
            onClick={() => answerCommentSend!(postId, commentId)}
            variant={'secondary'}
          >
            <Typography variant={'h3'}>send</Typography>
          </Button>
        </div>
      )}
    </div>
  )
}

type Props = {
  answerCommentSend?: (postId: number, commentId: number) => void
  answerCommentText?: string
  answerCommentTextHandler: (answerText: string) => void
  answers?: any
  changeIsLikedStatus: (commentId: number, isLiked: string, postId: number) => void
  commentId?: number
  createdAt?: string
  isAnswers?: boolean
  openedComment?: number | undefined
  photo?: string
  postDescription?: null | string
  postId?: number
  profile?: Profile
  setAnswerCommentText?: (answerText: string) => void
  setCreateAnswer: (value: boolean, commentId: number) => void
  uAvatar?: string
  uComment?: string
  uId?: string
  uIsLiked?: boolean
  uLikesCount?: number
  uName?: number
}
