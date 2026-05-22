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

const GRADIENT_ID = 'arc-trail-gradient'

/** V5 — trail จาง ต่อเนื่องตามลมหายใจ */
export function ArcV5_FadeTrail({ targetScale, transition }: ArcVariantProps) {
  const trailLength = ARC_CIRCUMFERENCE * 0.55
  const offset = progressToDashOffset(scaleToProgress(targetScale) * 0.9)

  return (
    <ArcSvgShell>
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a8fd4" stopOpacity="0" />
          <stop offset="70%" stopColor="#6eb5f5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#9ed4ff" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke="#4a8fd4"
        strokeWidth={1}
        strokeOpacity={0.1}
      />
      <motion.circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={`${trailLength} ${ARC_CIRCUMFERENCE - trailLength}`}
        animate={{ strokeDashoffset: offset }}
        transition={transition}
        transform={ARC_ROTATE_ORIGIN}
      />
    </ArcSvgShell>
  )
}
