import { useId } from 'react'
import { motion } from 'framer-motion'
import { VISUAL_CENTER } from '../../../breathing/constants'
import type { ArcVariantProps } from '../types'
import { scaleToProgress } from '../utils'
import { VisualSvgShell } from '../VisualShell'

const BLOBS = [
  { ox: 0, oy: 0, hue: '#6eb5f5' },
  { ox: 18, oy: -12, hue: '#4a8fd4' },
  { ox: -14, oy: 16, hue: '#9ed4ff' },
  { ox: 10, oy: 14, hue: '#3d7ec8' },
]

/** V11 — blob morph นุ่ม */
export function ArcV11_NoiseBlob({ targetScale, transition }: ArcVariantProps) {
  const progress = scaleToProgress(targetScale)
  const base = 38 + progress * 28
  const filterId = useId().replace(/:/g, '')

  return (
    <VisualSvgShell>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {BLOBS.map((b, i) => (
          <motion.ellipse
            key={i}
            fill={b.hue}
            fillOpacity={0.12 + progress * 0.18}
            animate={{
              cx: VISUAL_CENTER + b.ox * (0.6 + progress * 0.4),
              cy: VISUAL_CENTER + b.oy * (0.6 + progress * 0.4),
              rx: base * (0.85 + i * 0.08),
              ry: base * (0.7 + i * 0.06),
            }}
            transition={transition}
          />
        ))}
      </g>
    </VisualSvgShell>
  )
}
