import { FC } from 'react'

import { useContainer } from '@/widgets/auth/signIn/container/useContainer'

import { Messenger } from '../ui/Messenger'

export const Container: FC = () => <Messenger {...useContainer()} />

export type MessengerProps = ReturnType<typeof useContainer>
