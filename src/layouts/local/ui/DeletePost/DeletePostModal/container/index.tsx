import { DeletePostModal } from '../ui/DeletePostModal'
import { useContainer } from './useContainer'

export const Container = () => <DeletePostModal {...useContainer()} />

export type DeletePostModalProps = ReturnType<typeof useContainer>
