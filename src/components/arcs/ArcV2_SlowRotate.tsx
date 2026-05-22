import { motion } from 'framer-motion'
import {
  ARC_RADIUS,
  ARC_ROTATE_ORIGIN,
  ARC_SVG_CENTER,
} from '../../breathing/constants'
import { ArcSvgShell } from './ArcSvgShell'
import type { ArcVariantProps } from './types'
import { isHoldPhase } from './utils'

const ROTATE_BY_PHASE = {
  inhale: 72,
  'hold-in': 72,
  exhale: 200,
  'hold-out': 200,
} as const

/** V2 — ring บาง หมุนช้า, หยุดตอนกลั้น */
export function ArcV2_SlowRotate({ phaseId, transition }: ArcVariantProps) {
  const hold = isHoldPhase(phaseId)
  const targetRotate = ROTATE_BY_PHASE[phaseId]

  return (
    <ArcSvgShell>
      <motion.g
        animate={{ rotate: targetRotate }}
        transition={hold ? { duration: 0.2 } : transition}
        style={{ transformOrigin: `${ARC_SVG_CENTER}px ${ARC_SVG_CENTER}px` }}
      >
        <circle
          cx={ARC_SVG_CENTER}
          cy={ARC_SVG_CENTER}
          r={ARC_RADIUS}
          fill="none"
          stroke="#4a8fd4"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeOpacity={0.35}
          strokeDasharray="40 9999"
          transform={ARC_ROTATE_ORIGIN}
        />
      </motion.g>
    </ArcSvgShell>
  )
}
