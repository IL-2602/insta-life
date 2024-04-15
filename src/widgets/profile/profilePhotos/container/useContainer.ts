import { useAppSelector } from '@/app/store/hooks/useAppSelector'

export const useContainer = () => {
  const postPhotos = useAppSelector(state => state.postReducer.postPhotos)

  return { postPhotos }
}
