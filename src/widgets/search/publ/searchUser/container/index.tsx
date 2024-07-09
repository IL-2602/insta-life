import { SearchUser } from '../ui/SearchUser'
import { useContainer } from './useContainer'

export const Container = () => <SearchUser {...useContainer()} />

export type SearchUserProps = ReturnType<typeof useContainer>
