import { FC } from 'react'

import { useContainer } from '@/widgets/messenger/local/usersList/public/container/useContainer'
import { UsersList } from '@/widgets/messenger/local/usersList/public/ui/UsersList'

export const Container: FC = () => <UsersList {...useContainer()} />

export type UsersListProps = ReturnType<typeof useContainer>
