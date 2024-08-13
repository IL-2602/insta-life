import { forwardRef, memo } from 'react'
import Skeleton from 'react-loading-skeleton'

import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { AnswersListProps } from '@/widgets/posts/local/AnswersList/publ/container'
import { Comment } from 'src/widgets/posts/local/Comment'

import s from './AnswersList.module.scss'

export const AnswerList = memo(
  ({
    answers,
    answersTotalCount,
    isFetchingAnswers,
    isLoadingAnswers,
    isOpen,
    lastElRef,
    onClickOpenCloseAnswerHandler,
  }: AnswersListProps) => {
    const answersLength = answers?.length

    if (!answersTotalCount) {
      return null
    }

    return (
      <>
        <div className={s.answersWrapper}>
          <Button
            className={s.answersButton}
            onClick={onClickOpenCloseAnswerHandler}
            variant={'noStyle'}
          >
            <Typography variant={'small'}>{`${isOpen} Answers (${answersTotalCount})`}</Typography>
          </Button>
        </div>
        <div>
          {isLoadingAnswers && <Skeleton count={answersTotalCount} height={64} width={'100%'} />}
        </div>
        {isOpen === 'Hide' &&
          answers?.map((a, idx) => {
            if (answersLength === idx + 1) {
              return <Comment.widget comment={a} isComment={false} key={a.id} lastRef={lastElRef} />
            }

            return <Comment.widget comment={a} isComment={false} key={a.id} />
          })}
        {isFetchingAnswers && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: '100%',
            }}
          >
            <Spinner />
          </div>
        )}
      </>
    )
  }
)
