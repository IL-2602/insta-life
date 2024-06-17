import { MobileSideBar } from '../ui'
import { useContainer } from './useContainer'

export const Container = () => <MobileSideBar {...useContainer()} />

export type SideBarProps = ReturnType<typeof useContainer>
