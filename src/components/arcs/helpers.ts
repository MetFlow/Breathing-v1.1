import { ARC_SIZE, ORB_SIZE, VISUAL_SIZE } from '../../breathing/constants'

const ORB_GLOW_CONTAINER = ORB_SIZE + 56 * 2
import type { ArcStyleId } from '../../breathing/types'

export function isGenerativeStyle(id: ArcStyleId): boolean {
  return id >= 9 && id <= 15
}

export function getContainerSize(id: ArcStyleId): number {
  if (isGenerativeStyle(id)) return VISUAL_SIZE
  return Math.max(ARC_SIZE, ORB_GLOW_CONTAINER)
}
