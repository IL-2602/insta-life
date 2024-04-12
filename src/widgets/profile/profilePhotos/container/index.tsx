import { FC } from 'react'

import { ProfilePhotos } from '../ui/ProfilePhotos'
import { useContainer } from './useContainer'

export const Container = () => <ProfilePhotos {...useContainer()} />

export type ProfilePhotosProps = ReturnType<typeof useContainer>
