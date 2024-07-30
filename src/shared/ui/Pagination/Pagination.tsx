import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { LeftArrow } from '@/shared/ui/LeftArrow'
import { RightArrow } from '@/shared/ui/RightArrow'
import { SelectComponent } from '@/shared/ui/Select'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'

import s from './Pagination.module.scss'

type Props = {
  currentPage: number
  currentSize: string
  handlePageNumber: (pageNumber: number) => void
  handlePageSize: (pageSize: string) => void
  pagesCount: number
  totalCount: number
}

export const Pagination = ({
  currentPage,
  currentSize,
  handlePageNumber,
  handlePageSize,
  pagesCount,
  totalCount,
}: Props) => {
  const selectPageSizes = () => {
    switch (true) {
      case totalCount <= 10:
        return [{ title: '10' }]
      case totalCount <= 20:
        return [{ title: '10' }, { title: `${totalCount}` }]
      case totalCount > 20 && totalCount <= 30:
        return [{ title: '10' }, { title: '20' }, { title: `${totalCount}` }]
      case totalCount > 30 && totalCount <= 40:
        return [{ title: '10' }, { title: '20' }, { title: '30' }, { title: `${totalCount}` }]
      default:
        return [
          { title: '10' },
          { title: '20' },
          { title: '30' },
          { title: '40' },
          { title: '50' },
          { title: `${totalCount}` },
        ]
    }
  }

  const { t } = useTranslation()

  const pageNumbers: number[] = []

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i)
  }

  const isDisabledLeftArrow = currentPage === 1 || totalCount === 0
  const isDisabledRightArrow = currentPage === pageNumbers.length || totalCount === 0

  return (
    <div className={s.container}>
      <Button
        className={s.btnArrow}
        disabled={isDisabledLeftArrow}
        onClick={() => handlePageNumber(currentPage - 1)}
        variant={'noStyle'}
      >
        <LeftArrow />
      </Button>
      {pageNumbers.map(pageNumber => (
        <Button
          className={clsx(s.btnNumber, currentPage === pageNumber ? s.active : '')}
          key={pageNumber}
          onClick={() => handlePageNumber(pageNumber)}
          variant={'noStyle'}
        >
          <Typography color={'light'} variant={'regular14'}>
            {pageNumber}
          </Typography>
        </Button>
      ))}
      <Button
        className={s.btnArrow}
        disabled={isDisabledRightArrow}
        onClick={() => handlePageNumber(currentPage + 1)}
        variant={'noStyle'}
      >
        <RightArrow />
      </Button>
      <div className={s.select}>
        <Typography color={'light'} variant={'regular14'}>
          321
        </Typography>
        <SelectComponent
          className={s.selectComponent}
          currentValue={{ title: currentSize }}
          onValueChange={handlePageSize}
          selectItems={selectPageSizes()}
        ></SelectComponent>
        <Typography color={'light'} variant={'regular14'}>
          123
        </Typography>
      </div>
    </div>
  )
}
