interface FeaturedItemProps {
  item: {
    id: string
    title: string
    image: string
    description: string
  }
}

export default function FeaturedItem({ item }: FeaturedItemProps) {
  return (
    <div className="text-start rounded overflow-hidden relative w-full h-full">
      <img className="block absolute top-0 left-0 h-full w-full object-cover" src={`${item.image}/320/320`} alt={item.title} />
      <div className="p-4 flex flex-col justify-end relative z-10 w-full h-full bg-black/25">
        <h3 className="font-bold">
          {item.title}
        </h3>
        <p className="text-xs">
          {item.description}
        </p>
      </div>
    </div>
  )
}
