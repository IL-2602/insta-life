import { ClosePostModal } from '../ui/ClosePostModal'
import { useContainer } from './useContainer'

export const Container = () => <ClosePostModal {...useContainer()} />

export type ClosePostProps = ReturnType<typeof useContainer>
