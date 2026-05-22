import { motion } from 'framer-motion'
import { VISUAL_CENTER } from '../../../breathing/constants'
import type { ArcVariantProps } from '../types'
import { isHoldPhase, scaleToProgress } from '../utils'
import { VisualSvgShell } from '../VisualShell'

const LINE_COUNT = 48
const INNER = 58
const OUTER = 118

/** V12 — เส้นรัศมีหมุนช้า */
export function ArcV12_RadialLines({ phaseId, targetScale, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const hold = isHoldPhase(phaseId)
  const rotation =
    phaseId === 'inhale' ? 15 + progress * 40 : phaseId === 'exhale' ? 55 + progress * 30 : 40

  const lines = Array.from({ length: LINE_COUNT }, (_, i) => {
    const angle = (i / LINE_COUNT) * Math.PI * 2
    const len = INNER + progress * (OUTER - INNER)
    return {
      x1: VISUAL_CENTER + Math.cos(angle) * INNER * 0.55,
      y1: VISUAL_CENTER + Math.sin(angle) * INNER * 0.55,
      x2: VISUAL_CENTER + Math.cos(angle) * len,
      y2: VISUAL_CENTER + Math.sin(angle) * len,
    }
  })

  return (
    <VisualSvgShell>
      <motion.g
        animate={{ rotate: rotation }}
        transition={hold ? { duration: 0.25 } : transition}
        style={{ transformOrigin: `${VISUAL_CENTER}px ${VISUAL_CENTER}px` }}
      >
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#4a8fd4"
            strokeWidth={0.8}
            strokeOpacity={0.12 + progress * 0.35}
            strokeLinecap="round"
          />
        ))}
      </motion.g>
    </VisualSvgShell>
  )
}
