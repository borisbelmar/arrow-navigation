import { useSelectedContentValue } from '../../atoms/content'

export default function ActiveContentHero() {
  const activeContent = useSelectedContentValue()

  return (
    <div key={activeContent?.id} className="flex-none h-96 relative">
      <img
        alt={activeContent?.title}
        className="absolute top-0 left-0 h-full w-full object-cover"
        src={`${activeContent?.image}/1280/500`}
      />
      <div className="flex flex-col h-full w-full justify-end z-10 relative bg-gradient-to-t from-gray-700 to-slate-900/0 from-5%" />
      <div className="flex flex-col h-full w-full justify-end z-20 absolute top-0 left-0">
        <div className="flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold text-white">{activeContent?.title}</h1>
          <p className="text-lg text-white">{activeContent?.description}</p>
        </div>
      </div>
    </div>
  )
}
