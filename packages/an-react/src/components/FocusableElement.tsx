import React, { createElement } from 'react'
import type {
  FocusEventResult,
  FocusableByDirection,
  FocusableElement as IFocusableElement,
  FocusableElementOptions
} from '@arrow-navigation/core'
import { useFocusableElement } from '..'

export type Options = {
  order?: FocusableElementOptions['order']
  onFocus?: FocusableElementOptions['onFocus']
  onBlur?: FocusableElementOptions['onBlur']
  nextUp?: FocusableByDirection['up']
  nextDown?: FocusableByDirection['down']
  nextLeft?: FocusableByDirection['left']
  nextRight?: FocusableByDirection['right']
}

export type ElementFocusEventResult = FocusEventResult<IFocusableElement>
export type ElementFocusEvent = (event: ElementFocusEventResult) => void
export type ElementBlurEventResult = FocusEventResult<IFocusableElement>
export type ElementBlurEvent = (event: ElementBlurEventResult) => void

type FocusableElementWithoutFocusAndBlur = Omit<React.HTMLAttributes<HTMLDivElement>, 'onFocus' | 'onBlur'>

type Props = {
  id: string
  children?: React.ReactNode
  as?: React.ElementType
} & Options & FocusableElementWithoutFocusAndBlur

export default function FocusableElement({
  children,
  id,
  as = 'button',
  onFocus,
  onBlur,
  order,
  nextDown,
  nextLeft,
  nextRight,
  nextUp,
  ...props
}: Props) {
  useFocusableElement({
    id,
    nextDown,
    nextLeft,
    nextRight,
    nextUp,
    onFocus,
    onBlur,
    order
  })

  return createElement(
    as,
    { ...props, id },
    children
  )
}
