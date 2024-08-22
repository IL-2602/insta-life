import { useContainer } from '@/widgets/posts/local/EditPost/container/useContainer'

import { MobileEditPost } from '../ui/MobileEditPost'

export const Container = () => <MobileEditPost {...useContainer()} />
