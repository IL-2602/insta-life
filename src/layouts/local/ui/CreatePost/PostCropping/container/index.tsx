import { FC } from 'react'

import { useContainer } from '@/layouts/local/ui/CreatePost/PostCropping/container/useContainer'

import { PostCropping } from '../ui/PostCropping'

export const Container: FC<Props> = () => <PostCropping {...useContainer()} />

export type Props = ReturnType<typeof useContainer>
