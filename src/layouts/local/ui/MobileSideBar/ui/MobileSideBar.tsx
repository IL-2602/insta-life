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

import s from './MobileSideBar.module.scss'

export const MobileSideBar = ({
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
      </Link>
      <button
        className={clsx(isCreatePostModal ? s.activeLink : '', s.btnCreate)}
        onClick={uploadPostPhoto}
      >
        <CreateIcon className={s.navIcon} />
      </button>
      <Link
        className={pathname.startsWith(ROUTES.PROFILE) ? s.activeLink : ''}
        href={`${ROUTES.PROFILE}/${me?.userId}`}
      >
        <ProfileIcon className={s.navIcon} />
      </Link>
      <Link
        className={handleActiveLink(ROUTES.MESSENGER) ? s.activeLink : ''}
        href={ROUTES.MESSENGER}
      >
        <MessengerIcon className={s.navIcon} />
      </Link>
      <Link className={handleActiveLink(ROUTES.SEARCH) ? s.activeLink : ''} href={ROUTES.SEARCH}>
        <SearchIcon className={s.navIcon} />
      </Link>
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
      <CreatePostModal.widget />
      <PostPublication.widget />
      <PostCropping.widget />
      <PostFilter.widget />
    </aside>
  )
}
