import { PublicProfileProps } from '@/widgets/public-profile/container'
import Image from 'next/image'

export const PublicProfile = ({ publicProfile }: PublicProfileProps) => {
  if (!publicProfile) return <div>NOTHING</div>
  return (
    <div>
      <h1>{publicProfile?.id}</h1>
      <h1>{publicProfile?.aboutMe}</h1>
      <h1>{publicProfile?.userName}</h1>
      <Image
        src={publicProfile.avatars[0]?.url}
        alt={''}
        width={publicProfile.avatars[0]?.width}
        height={publicProfile.avatars[0]?.height}
      />
      <Image
        src={publicProfile.avatars[1]?.url}
        alt={''}
        width={publicProfile.avatars[1]?.width}
        height={publicProfile.avatars[1]?.height}
      />
    </div>
  )
}
