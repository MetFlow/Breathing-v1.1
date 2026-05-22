import { ARC_CIRCUMFERENCE, SCALE_EXPANDED, SCALE_REST } from '../../breathing/constants'

export function scaleToProgress(scale: number): number {
  const range = SCALE_EXPANDED - SCALE_REST
  if (range <= 0) return 0
  return Math.min(1, Math.max(0, (scale - SCALE_REST) / range))
}

export function progressToDashOffset(progress: number): number {
  return ARC_CIRCUMFERENCE * (1 - progress)
}

export function isHoldPhase(phaseId: string): boolean {
  return phaseId === 'hold-in' || phaseId === 'hold-out'
}
