import { FC } from 'react'

import { useContainer } from "@/widgets/messenger/local/Chat/public/container/useContainer";
import { Chat } from "@/widgets/messenger/local/Chat/public/ui/Chat";



export const Container: FC = () => <Chat {...useContainer()} />

export type ChatProps = ReturnType<typeof useContainer>
