import { motion } from 'framer-motion'
import { VISUAL_CENTER } from '../../../breathing/constants'
import type { ArcVariantProps } from '../types'
import { scaleToProgress } from '../utils'
import { VisualSvgShell } from '../VisualShell'

const RIPPLES = [0, 1, 2]

/** V15 — คลื่นขยายแล้วจาง */
export function ArcV15_Ripple({ phaseId, targetScale, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const baseR = 48 + progress * 42

  return (
    <VisualSvgShell>
      {RIPPLES.map((i) => {
        const delay = i * 0.35
        const r = baseR * (1 + progress * 0.35 + i * 0.12)
        const opacity =
          phaseId === 'exhale'
            ? 0.35 - i * 0.1
            : phaseId === 'inhale'
              ? 0.15 + progress * 0.25 - i * 0.06
              : 0.12 - i * 0.03

        return (
          <motion.circle
            key={i}
            cx={VISUAL_CENTER}
            cy={VISUAL_CENTER}
            fill="none"
            stroke="#6eb5f5"
            strokeWidth={1.2}
            initial={false}
            animate={{
              r,
              opacity: Math.max(0, opacity),
            }}
            transition={{
              ...transition,
              delay,
            }}
          />
        )
      })}
    </VisualSvgShell>
  )
}
