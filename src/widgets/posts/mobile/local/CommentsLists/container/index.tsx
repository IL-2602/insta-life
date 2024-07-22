import { useContainer } from '@/widgets/posts/local/CommentsLists/container/useContainer'

import { MobileCommentsList } from '../ui/MobileCommentsList'

export const Container = () => <MobileCommentsList {...useContainer()} />
