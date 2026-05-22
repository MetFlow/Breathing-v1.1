import { motion } from 'framer-motion'
import {
  ARC_CIRCUMFERENCE,
  ARC_RADIUS,
  ARC_ROTATE_ORIGIN,
  ARC_SVG_CENTER,
} from '../../breathing/constants'
import { ArcSvgShell } from './ArcSvgShell'
import type { ArcVariantProps } from './types'
import { progressToDashOffset, scaleToProgress } from './utils'

/** V7 — เส้นบาง ไม่มี glow สงบ */
export function ArcV7_Minimal({ targetScale, transition }: ArcVariantProps) {
  const offset = progressToDashOffset(scaleToProgress(targetScale))

  return (
    <ArcSvgShell>
      <motion.circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke="rgba(80, 160, 220, 0.45)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeDasharray={ARC_CIRCUMFERENCE}
        animate={{ strokeDashoffset: offset }}
        transition={transition}
        transform={ARC_ROTATE_ORIGIN}
      />
    </ArcSvgShell>
  )
}
