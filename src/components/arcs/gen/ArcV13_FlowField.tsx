import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { VISUAL_CENTER } from '../../../breathing/constants'
import type { ArcVariantProps } from '../types'
import { scaleToProgress } from '../utils'
import { smoothNoise } from './noise'
import { VisualSvgShell } from '../VisualShell'

const COLS = 11
const ROWS = 11
const SPACING = 22
const LINE_LEN = 10

/** V13 — flow field เส้นลม */
export function ArcV13_FlowField({ targetScale, phaseKey, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const seed = phaseKey.length * 0.1

  const flows = useMemo(() => {
    const items: { x: number; y: number; x2: number; y2: number }[] = []
    const startX = VISUAL_CENTER - ((COLS - 1) * SPACING) / 2
    const startY = VISUAL_CENTER - ((ROWS - 1) * SPACING) / 2
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = startX + col * SPACING
        const y = startY + row * SPACING
        const dx = x - VISUAL_CENTER
        const dy = y - VISUAL_CENTER
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 42 || dist > 128) continue
        const angle =
          smoothNoise(col * 0.35 + progress, row * 0.35 + progress, seed) *
            Math.PI *
            2 +
          progress * Math.PI * 0.5
        const len = LINE_LEN * (0.6 + progress * 0.5)
        items.push({
          x,
          y,
          x2: x + Math.cos(angle) * len,
          y2: y + Math.sin(angle) * len,
        })
      }
    }
    return items
  }, [progress, seed])

  return (
    <VisualSvgShell>
      {flows.map((f, i) => (
        <motion.line
          key={i}
          x1={f.x}
          y1={f.y}
          x2={f.x2}
          y2={f.y2}
          stroke="#6eb5f5"
          strokeWidth={0.9}
          strokeLinecap="round"
          animate={{ opacity: 0.15 + progress * 0.5 }}
          transition={transition}
        />
      ))}
    </VisualSvgShell>
  )
}
