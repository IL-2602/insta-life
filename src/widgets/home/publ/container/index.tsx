import { FC } from 'react'

import { useContainer } from '@/widgets/home/publ/container/useContainer'
import { Home } from '@/widgets/home/publ/ui/Home'

export const Container: FC = () => <Home {...useContainer()} />

export type HomeProps = ReturnType<typeof useContainer>
