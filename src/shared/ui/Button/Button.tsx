import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import Link from 'next/link'

import s from './Button.module.scss'

import { Spinner } from '../Spinner/Spinner'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  isLoading?: boolean
  variant?: 'link' | 'noStyle' | 'outlined' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

// С помощью Omit мы убираем из пропсов переданного компонента все пропсы,
// которые уже есть в наших кастомных пропсах, тем самым избегая коллизий.
export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    isLoading,
    variant = 'primary',
    ...rest
  } = props

  if (Component === 'a') {
    return (
      <Link
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        href={rest.href}
        {...rest}
      >
        {children}
        {isLoading && <Spinner />}
      </Link>
    )
  }

  return (
    <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest}>
      {children}
      {isLoading && <Spinner />}
    </Component>
  )
}
