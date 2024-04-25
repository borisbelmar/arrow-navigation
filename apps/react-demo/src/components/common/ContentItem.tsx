import type { Content } from "../../atoms/content"

interface ContentItemProps {
  item: Content
}

export default function ContentItem({ item }: ContentItemProps) {
  return (
    <div className="text-start rounded overflow-hidden">
      <img className="block" src={`${item.image}/320/180`} alt={item.title} />
      <div className="p-2">
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

