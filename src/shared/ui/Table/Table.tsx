import { ComponentProps, ComponentPropsWithoutRef, FC } from 'react'

import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'

import s from './Table.module.scss'
export type RootProps = ComponentPropsWithoutRef<'table'>
export type HeadProps = ComponentPropsWithoutRef<'thead'>
export type BodyProps = ComponentPropsWithoutRef<'tbody'>
export type RowProps = ComponentPropsWithoutRef<'tr'>
export type HeadCellProps = ComponentPropsWithoutRef<'th'>
export type CellProps = ComponentPropsWithoutRef<'td'>

export const Root: FC<RootProps> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export const Head: FC<HeadProps> = ({ className, ...rest }) => {
  const classNames = {
    tableHead: clsx(className, s.tableHead),
  }

  return <thead className={classNames.tableHead} {...rest} />
}

export const Body: FC<BodyProps> = props => {
  return <tbody {...props} />
}

export const Row: FC<RowProps> = props => {
  return <tr {...props} />
}

export const HeadCell: FC<HeadCellProps> = ({ className, ...rest }) => {
  const classNames = {
    headCell: clsx(className, s.headCell),
  }

  return <th className={classNames.headCell} {...rest} />
}

export const Cell: FC<CellProps> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}

export const Empty: FC<{ mb?: string; mt?: string } & ComponentProps<'div'>> = ({
  className,
  mb,
  mt = '89px',
}) => {
  const classNames = {
    empty: clsx(className, s.empty),
  }

  return (
    <Typography
      className={classNames.empty}
      style={{ marginBottom: mb, marginTop: mt }}
      variant={'h2'}
    >
      There is no data here yet! :(
    </Typography>
  )
}

export const Table = {
  Body,
  Cell,
  Empty,
  Head,
  HeadCell,
  Root,
  Row,
}
