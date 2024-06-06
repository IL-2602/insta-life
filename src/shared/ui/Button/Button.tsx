import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'

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

const ButtonPolymorph = <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: any) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    isLoading,
    rounded,
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
    <Component
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
      ref={ref}
    >
      {children}
      {isLoading && <Spinner />}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => ReturnType<typeof ButtonPolymorph>
