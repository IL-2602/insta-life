import React from 'react'

import { Typography } from '@/shared/ui/Typography'

import s from './FilterPreviewButton.module.scss'

export const FilterPreviewButton = ({ applyFilter, filter, imageUrl, label }: Props) => {
  const styles: { [key: string]: React.CSSProperties } = {
    clarendon: {
      filter: 'contrast(1.1) brightness(1.2)',
    },
    gingham: {
      filter: 'sepia(0.1) contrast(0.9) brightness(1.1) saturate(0.75)',
    },
    grayscale: {
      filter: 'grayscale(1)',
    },
    juno: {
      filter: 'contrast(1.2) saturate(1.5) brightness(1.05)',
    },
    lark: {
      filter: 'brightness(1.1) contrast(1.1) saturate(1.2) hue-rotate(-10deg)',
    },
    moon: {
      filter: 'grayscale(1) contrast(1.05) brightness(1.1)',
    },
    negative: {
      filter: 'invert(1)',
    },
    original: {
      filter: 'none',
    },
    sepia: {
      filter: 'sepia(1)',
    },
  }

  return (
    <div
      onClick={() => applyFilter(styles[filter]?.filter || '')}
      style={{ cursor: 'pointer', display: 'inline-block', margin: '5px' }}
    >
      <img
        alt={label}
        className={s.root}
        src={imageUrl}
        style={styles[filter]}
        title={label} // Используем label как заголовок для удобства
      />
      <Typography className={s.label} variant={'regular16'}>
        {label}
      </Typography>
      {/* Отображаем название фильтра под миниатюрой */}
    </div>
  )
}

type Props = {
  applyFilter: (filter: string) => void
  filter: string
  imageUrl: string
  label: string
}
