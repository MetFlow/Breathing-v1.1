import { motion } from 'framer-motion'
import {
  ARC_CIRCUMFERENCE,
  ARC_RADIUS,
  ARC_ROTATE_ORIGIN,
  ARC_SVG_CENTER,
} from '../../breathing/constants'
import type { BreathPhase } from '../../breathing/types'
import { ArcSvgShell } from './ArcSvgShell'
import type { ArcVariantProps } from './types'
import { isHoldPhase, progressToDashOffset, scaleToProgress } from './utils'

const PHASE_STROKE: Record<BreathPhase, { color: string; opacity: number }> = {
  inhale: { color: '#9ed4ff', opacity: 0.9 },
  'hold-in': { color: '#4a8fd4', opacity: 0.45 },
  exhale: { color: '#3d7ec8', opacity: 0.75 },
  'hold-out': { color: '#4a8fd4', opacity: 0.35 },
}

/** V6 — สีและความสว่างตามเฟส */
export function ArcV6_PhaseColor({ phaseId, targetScale, transition }: ArcVariantProps) {
  const { color, opacity } = PHASE_STROKE[phaseId]
  const offset = progressToDashOffset(scaleToProgress(targetScale))
  const hold = isHoldPhase(phaseId)

  return (
    <ArcSvgShell>
      <motion.circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={ARC_CIRCUMFERENCE}
        animate={{ strokeDashoffset: offset, strokeOpacity: opacity }}
        transition={hold ? { duration: 0.2 } : transition}
        transform={ARC_ROTATE_ORIGIN}
      />
    </ArcSvgShell>
  )
}
