import { SignIn } from '../ui'
import { useContainer } from './useContainer'

export const Container = () => <SignIn {...useContainer()} />

export type SignInProps = ReturnType<typeof useContainer>
