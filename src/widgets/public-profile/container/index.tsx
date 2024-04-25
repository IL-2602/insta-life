import { PublicProfile } from '@/widgets/public-profile/ui'

import { useContainer } from './useContainer'

export const Container = () => <PublicProfile {...useContainer()} />

export type PublicProfileProps = ReturnType<typeof useContainer>
