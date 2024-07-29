import { Modal } from '@/shared/ui/Modal/v2'
import { MobileComment } from '@/widgets/posts/mobile/local/Comment'
import { CommentsType } from '@/widgets/posts/mobile/local/Comments/container'

import s from './Comments.module.scss'

export const Comments = ({ comments, onOpen, open }: CommentsType) => {
  return (
    <Modal
      bodyClassName={s.body}
      contentClassName={s.content}
      onOpen={onOpen}
      open={open}
      title={'Comments'}
    >
      {comments?.map(c => <MobileComment.widget comment={c} isComment key={c.id} />)}
    </Modal>
  )
}
