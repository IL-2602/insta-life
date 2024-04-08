import { Expand } from '@/shared/assets/icons/Expand'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './expandSize.module.scss'

import one from '../../../../../../../../public/assets/postCropping/1x1.svg'
import four from '../../../../../../../../public/assets/postCropping/4x5.svg'
import sixteen from '../../../../../../../../public/assets/postCropping/16x9.svg'
import original from '../../../../../../../../public/assets/postCropping/original.svg'

export const ExpandSize = () => {
  return (
    <DropMenu.Menu
      align={'start'}
      className={s.container}
      side={'top'}
      sideOffset={2}
      trigger={
        <Button className={s.button} variant={'link'}>
          <Expand />
        </Button>
      }
    >
      <DropMenu.Item>
        <Typography variant={'h3'}>Original</Typography>
        <Image alt={'Original size'} height={24} src={original} width={24} />
      </DropMenu.Item>
      <DropMenu.Item>
        <Typography variant={'regular14'}>1:1</Typography>
        <Image alt={'1:1 size'} height={18} src={one} width={18} />
      </DropMenu.Item>
      <DropMenu.Item>
        <Typography variant={'regular14'}>4:5</Typography>
        <Image alt={'4:5 size'} height={26} src={four} width={18} />
      </DropMenu.Item>
      <DropMenu.Item>
        <Typography variant={'regular14'}>16:9</Typography>
        <Image alt={'16:9 size'} height={18} src={sixteen} width={26} />
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}
