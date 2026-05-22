import { useEffect, useRef } from 'react'

type Blob = {
  rgb: [number, number, number]
  phase: number
  speed: number
  orbit: number
  size: number
  alpha: number
}

/** โทนพาสเทล — สงบ ผ่อนคลาย */
const BLOBS: Blob[] = [
  { rgb: [165, 185, 235], phase: 0, speed: 0.38, orbit: 0.28, size: 0.52, alpha: 0.38 },
  { rgb: [150, 210, 225], phase: 1.4, speed: 0.32, orbit: 0.24, size: 0.48, alpha: 0.35 },
  { rgb: [210, 185, 220], phase: 2.8, speed: 0.4, orbit: 0.26, size: 0.46, alpha: 0.32 },
  { rgb: [175, 220, 210], phase: 4.2, speed: 0.3, orbit: 0.22, size: 0.44, alpha: 0.3 },
  { rgb: [230, 210, 195], phase: 5.6, speed: 0.35, orbit: 0.2, size: 0.36, alpha: 0.26 },
  { rgb: [190, 180, 235], phase: 3.5, speed: 0.34, orbit: 0.3, size: 0.5, alpha: 0.34 },
]

export function IridescentFluidCanvas({
  size,
  active = true,
}: {
  size: number
  active?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const baseR = size * 0.48

    const draw = () => {
      if (!active) return
      timeRef.current += 0.008
      const t = timeRef.current

      ctx.clearRect(0, 0, size, size)

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2)
      ctx.clip()

      // พื้นอ่อน — lavender dusk
      const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR)
      base.addColorStop(0, '#5a6890')
      base.addColorStop(0.45, '#4a5878')
      base.addColorStop(1, '#3d4a68')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, size, size)

      ctx.globalCompositeOperation = 'lighter'

      for (const blob of BLOBS) {
        const angle = t * blob.speed + blob.phase
        const bx = cx + Math.cos(angle) * baseR * blob.orbit
        const by = cy + Math.sin(angle * 0.85 + blob.phase) * baseR * blob.orbit
        const r = baseR * blob.size

        const g = ctx.createRadialGradient(bx, by, 0, bx, by, r)
        const [r8, g8, b8] = blob.rgb
        const a = blob.alpha
        g.addColorStop(0, `rgba(${r8},${g8},${b8},${a})`)
        g.addColorStop(0.5, `rgba(${r8},${g8},${b8},${a * 0.4})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(bx, by, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'

      // ไฮไลท์นุ่ม — แสงสว่างอ่อน
      const hi = ctx.createRadialGradient(
        cx - baseR * 0.15,
        cy - baseR * 0.2,
        0,
        cx,
        cy,
        baseR,
      )
      hi.addColorStop(0, 'rgba(255, 255, 255, 0.22)')
      hi.addColorStop(0.4, 'rgba(220, 230, 255, 0.1)')
      hi.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hi
      ctx.beginPath()
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // ขอบเรืองแสงอ่อน
      const edge = ctx.createRadialGradient(cx, cy, baseR * 0.78, cx, cy, baseR * 1.08)
      edge.addColorStop(0, 'rgba(255,255,255,0)')
      edge.addColorStop(0.55, 'rgba(200, 210, 245, 0.2)')
      edge.addColorStop(1, 'rgba(180, 200, 240, 0.28)')
      ctx.fillStyle = edge
      ctx.beginPath()
      ctx.arc(cx, cy, baseR * 1.08, 0, Math.PI * 2)
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [size, active])

  return (
    <canvas
      ref={canvasRef}
      className="rounded-full"
      aria-hidden
    />
  )
}
