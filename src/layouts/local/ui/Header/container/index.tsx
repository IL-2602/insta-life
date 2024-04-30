import { Header } from '../ui/Header'
import { useContainer } from './useContainer'

export const Container = () => <Header {...useContainer()} />

export type HeaderProps = ReturnType<typeof useContainer>
