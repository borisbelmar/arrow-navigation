import { createContext, createElement, ReactNode, useContext, useMemo } from 'react'
import type { FocusableElementOptions, FocusEventResult, FocusableGroupConfig, BlurEventResult } from '@arrow-navigation/core'
import useFocusableGroupContext from './hooks/useFocusableGroupContext'

export type GroupFocusEventResult = FocusEventResult<FocusableGroupConfig>
export type GroupFocusEvent = (event: GroupFocusEventResult) => void
export type GroupBlurEventResult = BlurEventResult<FocusableGroupConfig>
export type GroupBlurEvent = (event: GroupBlurEventResult) => void

export type GroupOptions = {
  firstElement?: string,
  byOrder?: 'horizontal' | 'vertical' | 'grid'
  cols?: number | Record<number, number>
  saveLast?: boolean
  viewportSafe?: boolean
  threshold?: number
  onFocus?: GroupFocusEvent
  onBlur?: GroupBlurEvent
  keepFocus?: boolean
  arrowDebounce?: boolean
  nextUp?: string
  nextDown?: string
  nextLeft?: string
  nextRight?: string
}

type GroupElementWithoutFocusAndBlur = Omit<React.HTMLAttributes<HTMLDivElement>, 'onFocus' | 'onBlur'>

type Props = {
  id: string
  children: ReactNode
  as?: React.ElementType
} & GroupOptions & GroupElementWithoutFocusAndBlur

type ContextValue = {
  groupId: string
  registerElement: (id: string, options?: FocusableElementOptions) => void
  unregisterElement: (id: string) => void
}

const GroupContext = createContext<ContextValue | null>(null)

export function FocusableGroup({
  id,
  as = 'div',
  children,
  firstElement,
  byOrder,
  cols,
  saveLast,
  viewportSafe,
  threshold,
  onFocus,
  onBlur,
  keepFocus,
  arrowDebounce,
  nextUp,
  nextDown,
  nextLeft,
  nextRight,
  ...props
}: Props) {
  const {
    registerElement,
    unregisterElement
  } = useFocusableGroupContext({
    groupId: id,
    firstElement,
    nextUp,
    nextDown,
    nextLeft,
    nextRight,
    byOrder,
    cols,
    saveLast,
    viewportSafe,
    threshold,
    onFocus,
    onBlur,
    keepFocus,
    arrowDebounce
  })

  const value = useMemo(() => ({
    groupId: id,
    registerElement,
    unregisterElement
  }), [id, registerElement, unregisterElement])

  return createElement(
    as,
    {
      ...props,
      id
    },
    (
      <GroupContext.Provider value={value}>
        {children}
      </GroupContext.Provider>
    )
  )
}

export function useFocusableGroup() {
  const context = useContext(GroupContext)

  if (!context) {
    throw new Error('useFocusableGroup must be used within a FocusableGroup')
  }

  return context
}
