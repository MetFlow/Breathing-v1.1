import type { Transition } from 'framer-motion'
import type { BreathPhase } from '../../breathing/types'

export type ArcVariantProps = {
  phaseId: BreathPhase
  phaseKey: string
  targetScale: number
  transition: Transition
}
