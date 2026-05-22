import type { ArcStyleId } from '../breathing/types'

export const ARC_STORAGE_KEY = 'luma-arc-style'

const VALID_IDS: ArcStyleId[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
]

export function getStoredArcStyle(): ArcStyleId {
  try {
    const raw = localStorage.getItem(ARC_STORAGE_KEY)
    const n = Number(raw)
    if (VALID_IDS.includes(n as ArcStyleId)) return n as ArcStyleId
  } catch {
    /* ignore */
  }
  return 1
}

export function setStoredArcStyle(id: ArcStyleId): void {
  try {
    localStorage.setItem(ARC_STORAGE_KEY, String(id))
  } catch {
    /* ignore */
  }
}
