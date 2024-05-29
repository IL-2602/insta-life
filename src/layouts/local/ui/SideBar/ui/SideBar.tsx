import { CreatePost } from '@/layouts/local/ui/CreatePost/CreatePost'
import { CreatePostModal } from '@/layouts/local/ui/CreatePost/CreatePostModal'
import { PostCropping } from '@/layouts/local/ui/CreatePost/PostCropping'
import { PostFilter } from '@/layouts/local/ui/CreatePost/PostFilter'
import { PostPublication } from '@/layouts/local/ui/CreatePost/PostPublication'
import { SideBarProps } from '@/layouts/local/ui/SideBar/container'
import { BookMark } from '@/shared/assets/icons/asideIcons/bookmarkIcon/BookmarkIcon'
import { CreateIcon } from '@/shared/assets/icons/asideIcons/createIcon/CreateIcon'
import { HomeIcon } from '@/shared/assets/icons/asideIcons/homeIcon'
import { LogOutIcon } from '@/shared/assets/icons/asideIcons/logOutIcon'
import { MessengerIcon } from '@/shared/assets/icons/asideIcons/messengerIcon'
import { ProfileIcon } from '@/shared/assets/icons/asideIcons/profileIcon'
import { SearchIcon } from '@/shared/assets/icons/asideIcons/searchIcon'
import { StatisticsIcon } from '@/shared/assets/icons/asideIcons/statisticsIcon'
import { ROUTES } from '@/shared/constants/routes'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './SideBar.module.scss'

export const SideBar = ({
  handleActiveLink,
  handleLogOut,
  isCreatePostModal,
  isOpen,
  me,
  pathname,
  setIsOpen,
  t,
  uploadPostPhoto,
}: SideBarProps) => {
  return (
    <aside className={s.aside}>
      <Link className={handleActiveLink(ROUTES.HOME) ? s.activeLink : ''} href={ROUTES.HOME}>
        <HomeIcon className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.home}
        </Typography>
      </Link>
      <button
        className={clsx(isCreatePostModal ? s.activeLink : '', s.btnCreate)}
        onClick={uploadPostPhoto}
      >
        <CreateIcon className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.create}
        </Typography>
      </button>
      <Link
        className={pathname.startsWith(ROUTES.PROFILE) ? s.activeLink : ''}
        href={`${ROUTES.PROFILE}/${me?.userId}`}
      >
        <ProfileIcon className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.myProfile}
        </Typography>
      </Link>
      <Link
        className={handleActiveLink(ROUTES.MESSENGER) ? s.activeLink : ''}
        href={ROUTES.MESSENGER}
      >
        <MessengerIcon className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.messenger}
        </Typography>
      </Link>
      <Link className={handleActiveLink(ROUTES.SEARCH) ? s.activeLink : ''} href={ROUTES.SEARCH}>
        <SearchIcon className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.search}
        </Typography>
      </Link>
      <Link
        className={handleActiveLink(ROUTES.STATISTICS) ? s.activeLink : ''}
        href={ROUTES.STATISTICS}
      >
        <StatisticsIcon className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.statistics}
        </Typography>
      </Link>
      <Link
        className={handleActiveLink(ROUTES.FAVORITES) ? s.activeLink : ''}
        href={ROUTES.FAVORITES}
      >
        <BookMark className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.favourites}
        </Typography>
      </Link>
      <button className={s.btnCreate} onClick={() => setIsOpen(true)}>
        <LogOutIcon className={s.navIcon} />
        <Typography className={s.navLink} color={'light'} variant={'medium14'}>
          {t.sidebar.logOut}
        </Typography>
      </button>
      <Modal
        logOut
        modalHandler={() => setIsOpen(false)}
        onSubmit={handleLogOut}
        open={isOpen}
        title={t.auth.modal.notification}
      >
        <Typography variant={'regular16'}>
          {t.auth.modal.modalLogOutText.getEmail(me?.email)}
        </Typography>
      </Modal>
      <CreatePost />
    </aside>
  )
}
