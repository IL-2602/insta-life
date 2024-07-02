import { ProfileHeader } from '../ui/ProfileHeader'
import { useContainer } from './useContainer'

export const Container = () => <ProfileHeader {...useContainer()} />
export type ProfileHeaderProps = ReturnType<typeof useContainer>
