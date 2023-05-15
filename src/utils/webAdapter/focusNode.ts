import { FocusNodeOptions, FocusableElement } from '@/types'

export default function focusNode (focusable: FocusableElement, opts?: FocusNodeOptions) {
  const element = document.getElementById(focusable.id)
  element?.focus({ preventScroll: opts?.preventScroll })
}
