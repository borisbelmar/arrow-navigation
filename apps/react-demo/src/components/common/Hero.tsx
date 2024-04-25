import { FocusableElement, FocusableGroup } from '@arrow-navigation/react'

interface HeroProps {
  heroId: number
}

export default function Hero({ heroId }: HeroProps) {
  return (
    <FocusableGroup id={`hero-${heroId}`} className="flex-none h-96 relative">
      <img
        alt="hero"
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="https://picsum.photos/seed/hero-content/1920/800"
      />
      <div className="flex flex-col h-full w-full justify-end z-10 relative">
        <div className="flex flex-row justify-end space-x-2 p-8">
          <FocusableElement
            id={`hero-${heroId}-btn-1`}
            className="bg-gray-500 w-40 h-16 rounded focus:bg-yellow-500 disabled:opacity-25 flex-none"
          />
          <FocusableElement
            id={`hero-${heroId}-btn-2`}
            className="bg-gray-700 w-40 h-16 rounded focus:bg-yellow-500 disabled:opacity-25 flex-none"
          />
        </div>
      </div>
    </FocusableGroup>
  )
}
