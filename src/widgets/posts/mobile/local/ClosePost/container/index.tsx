import { useContainer } from '@/widgets/posts/local/ClosePost/container/useContainer'

import { MobileClosePostModal } from '../ui/MobileClosePostModal'

export const Container = () => <MobileClosePostModal {...useContainer()} />
