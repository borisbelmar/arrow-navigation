import { getArrowNavigation } from '@arrow-navigation/core'

export default function useArrowNavigation() {
  const navigationApi = getArrowNavigation()

  return navigationApi
}
