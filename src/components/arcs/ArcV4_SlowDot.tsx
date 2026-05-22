import { motion } from 'framer-motion'
import {
  ARC_CIRCUMFERENCE,
  ARC_RADIUS,
  ARC_ROTATE_ORIGIN,
  ARC_SVG_CENTER,
} from '../../breathing/constants'
import { ArcSvgShell } from './ArcSvgShell'
import type { ArcVariantProps } from './types'

const DOT_LENGTH = ARC_CIRCUMFERENCE * 0.06

/** V4 — จุดสั้นเดินรอบช้า, หายใจออกนานกว่า */
export function ArcV4_SlowDot({ phaseId, phaseKey, transition }: ArcVariantProps) {
  const baseDuration =
    typeof transition.duration === 'number' ? transition.duration : 4
  const t =
    phaseId === 'exhale'
      ? { ...transition, duration: baseDuration * 1.5 }
      : transition

  return (
    <ArcSvgShell>
      <motion.circle
        key={phaseKey}
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke="#9ed4ff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={`${DOT_LENGTH} ${ARC_CIRCUMFERENCE - DOT_LENGTH}`}
        initial={{ strokeDashoffset: ARC_CIRCUMFERENCE }}
        animate={{ strokeDashoffset: 0 }}
        transition={t}
        transform={ARC_ROTATE_ORIGIN}
        style={{ filter: 'drop-shadow(0 0 4px rgba(138, 180, 232, 0.6))' }}
      />
    </ArcSvgShell>
  )
}
