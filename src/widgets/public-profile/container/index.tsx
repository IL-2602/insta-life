import { useContainer } from './useContainer'
import { PublicProfile } from '@/widgets/public-profile/ui'

export const Container = () => <PublicProfile {...useContainer()} />

export type PublicProfileProps = ReturnType<typeof useContainer>
