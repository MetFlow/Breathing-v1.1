import { useEffect, useRef } from 'react'
import { VISUAL_SIZE } from '../../../breathing/constants'
import type { ArcVariantProps } from '../types'
import { scaleToProgress } from '../utils'
import { smoothNoise } from './noise'
import { VisualCanvasShell } from '../VisualShell'

/** V14 — canvas noise mesh */
export function ArcV14_NoiseMesh({ targetScale, phaseKey }: ArcVariantProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progress = scaleToProgress(targetScale)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let raf = 0
    const seed = phaseKey.split('').reduce((a, c) => a + c.charCodeAt(0), 0)

    const draw = () => {
      frame += 0.004
      const w = VISUAL_SIZE
      const h = VISUAL_SIZE
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      for (let layer = 0; layer < 4; layer++) {
        const radius = 40 + progress * 50 + layer * 18
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        const n = smoothNoise(frame + layer, seed * 0.01, seed)
        const alpha = (0.04 + progress * 0.08) * (1 - layer * 0.15)
        grad.addColorStop(0, `rgba(158, 212, 255, ${alpha * (0.6 + n)})`)
        grad.addColorStop(0.5, `rgba(74, 143, 212, ${alpha * 0.5})`)
        grad.addColorStop(1, 'rgba(30, 74, 154, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx + Math.sin(frame + layer) * 8, cy + Math.cos(frame * 0.7 + layer) * 6, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      const img = ctx.getImageData(0, 0, w, h)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const x = (i / 4) % w
        const y = Math.floor(i / 4 / w)
        const n = smoothNoise(x * 0.02 + frame, y * 0.02 + frame, seed) * 0.06 * progress
        d[i] = Math.min(255, d[i] + n * 80)
        d[i + 1] = Math.min(255, d[i + 1] + n * 100)
        d[i + 2] = Math.min(255, d[i + 2] + n * 140)
      }
      ctx.putImageData(img, 0, 0)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [progress, phaseKey])

  return (
    <VisualCanvasShell>
      <canvas
        ref={canvasRef}
        width={VISUAL_SIZE}
        height={VISUAL_SIZE}
        className="h-full w-full"
      />
    </VisualCanvasShell>
  )
}
