import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import Image from 'next/image'
import s from './expandSize.module.scss'
import expand from '../../../../../../../../public/assets/expand-outline.svg'
import original from '../../../../../../../../public/assets/postCropping/original.svg'
import one from '../../../../../../../../public/assets/postCropping/1x1.svg'
import four from '../../../../../../../../public/assets/postCropping/4x5.svg'
import sixteen from '../../../../../../../../public/assets/postCropping/16x9.svg'
import { Typography } from '@/shared/ui/Typography'

export const ExpandSize = () => {
  return (
    <DropMenu.Menu
      align={'start'}
      side={'top'}
      sideOffset={2}
      trigger={
        <Button variant={'link'}>
          <Image alt={'Image expand'} height={24} src={expand} width={24} />
        </Button>
      }
      className={s.container}
    >
      <DropMenu.Item>
        <Typography variant={'h3'}>Original</Typography>
        <Image src={original} alt={'Original size'} height={24} width={24} />
      </DropMenu.Item>
      <DropMenu.Item>
        <Typography variant={'regular14'}>1:1</Typography>
        <Image src={one} alt={'1:1 size'} height={18} width={18} />
      </DropMenu.Item>
      <DropMenu.Item>
        <Typography variant={'regular14'}>4:5</Typography>
        <Image src={four} alt={'4:5 size'} height={26} width={18} />
      </DropMenu.Item>
      <DropMenu.Item>
        <Typography variant={'regular14'}>16:9</Typography>
        <Image src={sixteen} alt={'16:9 size'} height={18} width={26} />
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}
