import { FC } from 'react'

import {useContainer} from "@/widgets/messenger/public/container/useContainer";
import { Messenger } from '@/widgets/messenger/public/ui/Messenger'

export const Container: FC = () => <Messenger {...useContainer()} />

export type MessengerProps = ReturnType<typeof useContainer>
