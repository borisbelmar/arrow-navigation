import { ArrowNavigationState } from '@/types'

const getCurrentElement = (state: ArrowNavigationState) => (
  state.elements.get(state.currentElement as string) || null
)

export default getCurrentElement
