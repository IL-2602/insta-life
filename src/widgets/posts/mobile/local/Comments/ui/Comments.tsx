import { forwardRef } from 'react'

import { Modal } from '@/shared/ui/Modal/v2'
import { Spinner } from '@/shared/ui/Spinner'
import { CommentProps } from '@/widgets/posts/local/Comment/container'
import { MobileComment } from '@/widgets/posts/mobile/local/Comment'
import { CommentsType } from '@/widgets/posts/mobile/local/Comments/container'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { clsx } from 'clsx'

import s from './Comments.module.scss'

export const Comments = forwardRef<HTMLDivElement, CommentsType>(
  ({ comments, isFetchingComments, onOpen, open }, ref) => {
    const commentsLength = comments?.length

    return (
      <Modal
        bodyClassName={s.body}
        contentClassName={s.content}
        onOpen={onOpen}
        open={open}
        title={'Comments'}
      >
        <div className={s.root}>
          <ScrollArea.Root className={s.scroll} type={'always'}>
            <ScrollArea.Viewport className={s.view} dir={'ltr'} ref={null}>
              {comments?.map((c, idx) => {
                if (commentsLength === idx + 1) {
                  return <MobileComment.widget comment={c} isComment key={c.id} lastRef={ref} />
                }

                return <MobileComment.widget comment={c} isComment key={c.id} />
              })}
              {isFetchingComments && (
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
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className={s.scrollbar} orientation={'vertical'}>
              <ScrollArea.Thumb className={s.thumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </Modal>
    )
  }
)
