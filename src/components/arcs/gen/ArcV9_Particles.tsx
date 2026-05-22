import { motion } from 'framer-motion'
import { VISUAL_CENTER } from '../../../breathing/constants'
import type { ArcVariantProps } from '../types'
import { scaleToProgress } from '../utils'
import { VisualSvgShell } from '../VisualShell'

const COUNT = 36
const BASE_RADIUS = 72

const particles = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2
  return { angle, phase: i * 0.17 }
})

/** V9 — ละอองนุ่มรอบ orb */
export function ArcV9_Particles({ targetScale, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const spread = BASE_RADIUS + progress * 28

  return (
    <VisualSvgShell>
      {particles.map((p, i) => {
        const x = VISUAL_CENTER + Math.cos(p.angle) * spread
        const y = VISUAL_CENTER + Math.sin(p.angle) * spread
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={1.2 + progress * 0.8}
            fill="#9ed4ff"
            animate={{
              opacity: 0.15 + progress * 0.55,
              cx: x,
              cy: y,
            }}
            transition={transition}
          />
        )
      })}
    </VisualSvgShell>
  )
}
