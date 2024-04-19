import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { Heart } from '@/shared/assets/icons/Heart'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from '@/layouts/local/ui/MyPost/MyPostModal/ui/MyPostModal.module.scss'

import noPhoto from '../../../../../../public/assets/noPhoto.svg'

export const TestComment = () => {
  const { data: getProfile, isLoading: isGetUserLoading } = useGetProfileQuery()
  const comment =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua.'

  return (
    <div className={s.userCommentContainer}>
      <div className={s.userPhotoWrapper}>
        <div className={s.photo}>
          {getProfile?.avatars[0] === undefined ? (
            <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
          ) : (
            <Image alt={'userPhoto'} height={36} src={getProfile?.avatars[0].url} width={36} />
          )}
        </div>
        {/*<Typography variant={'bold14'}>{`${getProfile?.userName}  ${comment}`}comment</Typography>*/}

        <div className={s.commentText}>
          <Typography variant={'regular14'}>
            <b>{getProfile?.userName}</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod temporincididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography className={'commentTime'} color={'tertiary'} variant={'small'}>
            2 Hours ago
          </Typography>
        </div>
        <div className={s.commentLike}>
          <Heart />
        </div>
      </div>
    </div>
  )
}
