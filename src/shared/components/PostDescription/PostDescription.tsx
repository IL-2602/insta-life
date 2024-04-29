import { ReactNode } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import s from '@/widgets/root/publicPosts/ui/PublicPosts.module.scss'

type Props = {
  description: string
  id: number
  openPosts: { [id: string]: boolean }
  setOpenPosts: (prevState: { [key: string]: boolean }) => { [key: string]: boolean } | void
}

export const PostDescription = ({ description, id, openPosts, setOpenPosts }: Props): ReactNode => {
  const handleToggleText = (id: string) => {
    setOpenPosts({
      [id]: !openPosts[id],
    })
  }

  const { t } = useTranslation()

  if (description.length <= 105) {
    return (
      <Typography className={s.lineClamp} variant={'regular14'}>
        {description}
      </Typography>
    )
  } else if (description.length > 105 && description.length > 320 && !openPosts[id]) {
    return (
      <Typography className={s.lineClamp} variant={'regular14'}>
        {description.slice(0, 84)} ...
        <Button className={s.btnHide} onClick={() => handleToggleText(String(id))} variant={'link'}>
          {t.button.showMore}
        </Button>
      </Typography>
    )
  } else if (description.length > 105 && description.length > 320 && openPosts[id]) {
    return (
      <Typography className={s.lineClamp} variant={'regular14'}>
        {description.slice(0, 290)} ...
        <Button className={s.btnHide} onClick={() => handleToggleText(String(id))} variant={'link'}>
          {t.button.hide}
        </Button>
      </Typography>
    )
  } else if (description.length > 105 && description.length <= 320 && !openPosts[id]) {
    return (
      <Typography>
        {description.slice(0, 84)} ...
        <Button className={s.btnMore} onClick={() => handleToggleText(String(id))} variant={'link'}>
          {t.button.showMore}
        </Button>
      </Typography>
    )
  } else if (description.length > 105 && description.length <= 320 && openPosts[id]) {
    return (
      <Typography className={s.lineClamp} variant={'regular14'}>
        {description}
        <Button className={s.btnHide} onClick={() => handleToggleText(String(id))} variant={'link'}>
          {t.button.hide}
        </Button>
      </Typography>
    )
  }
}
