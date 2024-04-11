import { FC } from 'react'

import { ProfilePhotos } from '../ui/ProfilePhotos'
import { useContainer } from './useContainer'

export const Container: FC<ProfilePhotosProps> = () => <ProfilePhotos {...useContainer()} />

export type ProfilePhotosProps = ReturnType<typeof useContainer>
