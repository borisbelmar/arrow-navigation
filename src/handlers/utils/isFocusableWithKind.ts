import type { FocusableWithKind } from '@/types'

export default function getFocusableWithKind (
  focusable: FocusableWithKind | string
): FocusableWithKind {
  return typeof focusable === 'string'
    ? { id: focusable, kind: 'element' }
    : focusable
}
