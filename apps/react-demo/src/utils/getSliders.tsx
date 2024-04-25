import { Content } from '../atoms/content'
import ContentItem from '../components/common/ContentItem'
import FeaturedItem from '../components/common/FeaturedItem'
import getRandomInt from './getRandomInt'

const itemByType = {
  featured: {
    size: {
      width: '16rem',
      height: '20rem'
    },
    renderer: (item: Content) => (
      <FeaturedItem item={item} />
    )
  },
  content: {
    size: {
      width: '16rem',
      height: '14rem'
    },
    renderer: (item: Content) => (
      <ContentItem item={item} />
    )
  }
}

export interface SliderConfig {
  id: string
  title: string
  items: Content[]
  itemSize: {
    width: string
    height: string
  }
  itemRenderer: (item: Content) => JSX.Element
}

export default function getSliders() {
  return Array.from({ length: 20 }, (_, i) => {
    const rand = getRandomInt(1, 100)
    const isRandomTypeEven = rand % 2 === 0
    const type = isRandomTypeEven ? 'featured' : 'content'

    return {
      id: `slider_${i}`,
      title: `Slider ${i}`,
      items: Array.from({ length: 10 }, (__, j) => ({
        id: `item_${i}_${j}`,
        title: `Item ${i} ${j}`,
        image: `https://picsum.photos/seed/${i}-${j}`,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      })),
      itemSize: itemByType[type].size,
      itemRenderer: itemByType[type].renderer
    }
  })
}
