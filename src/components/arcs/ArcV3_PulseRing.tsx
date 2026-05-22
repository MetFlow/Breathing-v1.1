import { motion } from 'framer-motion'
import { ARC_RADIUS, ARC_SVG_CENTER } from '../../breathing/constants'
import { ArcSvgShell } from './ArcSvgShell'
import type { ArcVariantProps } from './types'
import { scaleToProgress } from './utils'

/** V3 — คลื่นวงขยาย-หดตามลมหายใจ */
export function ArcV3_PulseRing({ targetScale, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const ringScale = 1 + progress * 0.12
  const opacity = 0.2 + progress * 0.35

  return (
    <ArcSvgShell>
      <motion.circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke="#6eb5f5"
        strokeWidth={2}
        animate={{ scale: ringScale, opacity }}
        transition={transition}
        style={{ transformOrigin: `${ARC_SVG_CENTER}px ${ARC_SVG_CENTER}px` }}
      />
      <motion.circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS + 6}
        fill="none"
        stroke="#4a8fd4"
        strokeWidth={1}
        animate={{ scale: 1 + progress * 0.08, opacity: opacity * 0.5 }}
        transition={transition}
        style={{ transformOrigin: `${ARC_SVG_CENTER}px ${ARC_SVG_CENTER}px` }}
      />
    </ArcSvgShell>
  )
}
