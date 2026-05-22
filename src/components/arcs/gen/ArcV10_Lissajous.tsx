import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { VISUAL_CENTER } from '../../../breathing/constants'
import type { ArcVariantProps } from '../types'
import { scaleToProgress } from '../utils'
import { VisualSvgShell } from '../VisualShell'

function buildLissajousPath(progress: number, phaseShift: number): string {
  const A = 55 + progress * 22
  const B = 48 + progress * 18
  const a = 3
  const b = 4
  const steps = 120
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const x = VISUAL_CENTER + A * Math.sin(a * t + phaseShift)
    const y = VISUAL_CENTER + B * Math.sin(b * t)
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
  }
  return d
}

/** V10 — สายโค้ง Lissajous */
export function ArcV10_Lissajous({ phaseId, targetScale, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const phaseShift =
    phaseId === 'inhale' ? 0 : phaseId === 'exhale' ? Math.PI * 0.5 : Math.PI * 0.25

  const path = useMemo(
    () => buildLissajousPath(progress, phaseShift),
    [progress, phaseShift],
  )

  return (
    <VisualSvgShell>
      <motion.path
        d={path}
        fill="none"
        stroke="#6eb5f5"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeOpacity={0.35 + progress * 0.45}
        animate={{ d: path }}
        transition={transition}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#9ed4ff"
        strokeWidth={0.6}
        strokeOpacity={0.2 + progress * 0.3}
        transform={`translate(4, -3)`}
        animate={{ d: path }}
        transition={transition}
      />
    </VisualSvgShell>
  )
}
