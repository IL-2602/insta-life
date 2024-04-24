import { AppStore } from '@/app/store/types/appStore'

export type RootState = ReturnType<AppStore['getState']>
