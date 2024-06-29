import { memo } from 'react'

import { Search } from '@/shared/assets/icons/SearchOutline'
import { ROUTES } from '@/shared/constants/routes'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import { SearchUserProps } from '@/widgets/search/publ/searchUser/container'
import Image from 'next/image'
import Link from 'next/link'

import s from './SearchUser.module.scss'

import noAvatar from '../../../../../../public/assets/noPhoto.svg'

export const SearchUser = memo(({ handleSearchInput, search, t, users }: SearchUserProps) => {
  return (
    <div className={s.container}>
      <Typography as={'h1'} className={s.searchTitle} variant={'h1'}>
        {t.sidebar.search}
      </Typography>
      <TextField iconStart={<Search />} onChange={handleSearchInput} placeholder={'Search'} />
      <Typography as={'h2'} className={s.requestsTitle} variant={'bold16'}>
        {t.search.recent}
      </Typography>
      <div className={s.users}>
        {users &&
          search &&
          users.items.length > 0 &&
          users.items.map(item => {
            return (
              <Link className={s.userContainer} href={ROUTES.PROFILE + '/' + item.id} key={item.id}>
                {item.avatars.length > 0 ? (
                  <Image
                    alt={'avatar'}
                    className={s.avatar}
                    height={48}
                    src={item.avatars[0].url}
                    width={48}
                  />
                ) : (
                  <div className={s.noAvatar}>
                    <Image alt={'noAvatar'} height={24} src={noAvatar} width={24} />
                  </div>
                )}
                <div className={s.namesContainer}>
                  <Typography className={s.username} color={'light'} variant={'bold16'}>
                    {item.userName}
                  </Typography>
                  <div className={s.names}>
                    <Typography color={'form'} variant={'regular14'}>
                      {item.firstName || 'firstName'}
                    </Typography>
                    <Typography color={'form'} variant={'regular14'}>
                      {item.lastName || 'lastName'}
                    </Typography>
                  </div>
                </div>
              </Link>
            )
          })}
        {(!search || (search && Boolean(users?.items.length === 0))) && (
          <div className={s.empty}>
            <Typography color={'form'} variant={'bold14'}>
              {t.search.looksEmpty}
            </Typography>
            <Typography color={'form'} variant={'small'}>
              {t.search.noRecent}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
})
