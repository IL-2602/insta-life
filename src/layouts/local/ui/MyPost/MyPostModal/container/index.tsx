import { MyPostModal } from '../ui/MyPostModal'
import { useContainer } from './useContainer'

export const Container = () => <MyPostModal {...useContainer()} />

export type MyPostModalProps = ReturnType<typeof useContainer>
