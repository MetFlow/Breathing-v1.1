import { motion } from 'framer-motion'
import {
  ARC_CIRCUMFERENCE,
  ARC_RADIUS,
  ARC_ROTATE_ORIGIN,
  ARC_SVG_CENTER,
} from '../../breathing/constants'
import { ArcSvgShell } from './ArcSvgShell'
import type { ArcVariantProps } from './types'
import { isHoldPhase, progressToDashOffset, scaleToProgress } from './utils'

/** V1 — เส้นสอดคล้องกับขนาด orb, เฟสกลั้นนิ่ง */
export function ArcV1_SyncOrb({ phaseId, targetScale, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const offset = progressToDashOffset(progress)
  const hold = isHoldPhase(phaseId)

  return (
    <ArcSvgShell>
      <motion.circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke="#4a8fd4"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={ARC_CIRCUMFERENCE}
        animate={{ strokeDashoffset: offset }}
        transition={hold ? { duration: 0.15, ease: 'easeOut' } : transition}
        transform={ARC_ROTATE_ORIGIN}
        style={{ filter: 'drop-shadow(0 0 6px rgba(74, 111, 165, 0.5))' }}
      />
    </ArcSvgShell>
  )
}
