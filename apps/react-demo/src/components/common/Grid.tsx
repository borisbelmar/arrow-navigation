import { useMemo } from 'react'
import { FocusableElement, FocusableGroup } from '@arrow-navigation/react'

interface GridProps {
  qty?: number
  gridId: string
}

export default function Grid({ qty = 20, gridId }: GridProps) {
  const items = useMemo(() => Array.from({ length: qty }, (_, i) => i), [qty])

  return (
    <FocusableGroup
      id={`grid-${gridId}`}
      className="grid grid-cols-3 space-x-2 space-y-2 transition duration-150 w-full"
      viewportSafe={false}
    >
      {items.map((val, idx) => (
        <FocusableElement
          key={val}
          id={`grid-${gridId}-item-${idx}`}
          className="bg-gray-500 h-40 rounded focus:bg-yellow-500 disabled:opacity-25"
        />
      ))}
    </FocusableGroup>
  )
}
