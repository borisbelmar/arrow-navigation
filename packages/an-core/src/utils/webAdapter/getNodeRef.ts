import type { Focusable } from '@/types'

export default function getNodeRef (focusable: Focusable): unknown {
  const element = document.getElementById(focusable.id)
  return element
}
