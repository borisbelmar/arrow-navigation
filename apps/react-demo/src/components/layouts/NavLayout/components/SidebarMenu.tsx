import { FocusableGroup, FocusableElement } from '@arrow-navigation/react'

const elements = Array.from({ length: 5 }, (_, i) => i)

export default function SidebarMenu() {
  return (
    <FocusableGroup
      id="sidebar-menu"
      className="bg-gray-800 flex flex-col p-4 space-y-4 flex-grow-0 h-screen items-center justify-center fixed top-0 left-0"
    >
      {elements.map(id => (
        <FocusableElement
          key={id}
          id={`sidebar-menu-item-${id}`}
          className="bg-gray-500 w-16 h-16 rounded focus:bg-yellow-500"
        />
      ))}
    </FocusableGroup>
  )
}
