import type { BreathPhase } from './types'

export const SESSION_DURATION_MS = 3 * 60 * 1000

export const SCALE_REST = 1
export const SCALE_EXPANDED = 1.38

export const EASE_INHALE = [0.42, 0, 0.18, 1] as const
export const EASE_EXHALE = [0.33, 0, 0.22, 1] as const
export const EASE_HOLD = [0.4, 0, 0.6, 1] as const

export function getPhaseTransition(phaseId: BreathPhase, durationSec: number) {
  switch (phaseId) {
    case 'inhale':
      return { duration: durationSec, ease: EASE_INHALE }
    case 'exhale':
      return { duration: durationSec, ease: EASE_EXHALE }
    default:
      return { duration: durationSec, ease: EASE_HOLD }
  }
}

export const ORB_SIZE = 128
export const ARC_RADIUS = ORB_SIZE / 2 + 14
export const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS
export const ARC_SIZE = (ARC_RADIUS + 12) * 2
export const ARC_SVG_CENTER = ARC_SIZE / 2

export const ARC_ROTATE_ORIGIN = `rotate(-90 ${ARC_SVG_CENTER} ${ARC_SVG_CENTER})`

export const VISUAL_SIZE = 300
export const VISUAL_CENTER = VISUAL_SIZE / 2
