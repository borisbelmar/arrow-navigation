import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

export interface Content {
  id: string
  title: string
  image: string
  description: string
}

const selectedContentAtom = atom<Content | null>(null)

export const useSelectedContent = () => useAtom(selectedContentAtom)
export const useSelectedContentValue = () => useAtomValue(selectedContentAtom)
export const useSetSelectedContent = () => useSetAtom(selectedContentAtom)
