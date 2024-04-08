import React, { ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphComponentPropsWithRef } from '@/shared/types/polymorfic/polymorfic'
import Link from 'next/link'

import s from './Button.module.scss'

import { Spinner } from '../Spinner/Spinner'

export type CustomProps<T extends ElementType = 'button'> = {
  className?: string
  fullWidth?: boolean
  isLoading?: boolean
  variant?: 'link' | 'outlined' | 'primary' | 'secondary'
}

export type Props<T extends ElementType> = PolymorphComponentPropsWithRef<T, CustomProps>

type ButtonComponent = <T extends ElementType = 'button'>(props: Props<T>) => ReactNode
export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(props: Props<T>, ref: ElementRef<T>) => {
    const {
      asComponent: Component = 'button',
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
)
