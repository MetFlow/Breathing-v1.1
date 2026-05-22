import { motion } from 'framer-motion'
import {
  ARC_CIRCUMFERENCE,
  ARC_RADIUS,
  ARC_SIZE,
  ARC_SVG_CENTER,
  SCALE_EXPANDED,
  SCALE_REST,
} from '../breathing/constants'
import type { BreathPhase } from '../breathing/types'
import type { Transition } from 'framer-motion'

const MARKER_ANGLES = [-90, 0, 90, 180]
const GAP_ARC = 18

function scaleToPhaseProgress(phaseId: BreathPhase, targetScale: number): number {
  const range = SCALE_EXPANDED - SCALE_REST
  if (range <= 0) return 0
  switch (phaseId) {
    case 'inhale':
      return Math.min(1, Math.max(0, (targetScale - SCALE_REST) / range))
    case 'exhale':
      return Math.min(1, Math.max(0, (SCALE_EXPANDED - targetScale) / range))
    default:
      return 1
  }
}

export function BreathProgressRing({
  phaseId,
  targetScale,
  phaseIndex,
  totalPhases,
  transition,
}: {
  phaseId: BreathPhase
  targetScale: number
  phaseIndex: number
  totalPhases: number
  transition: Transition
}) {
  const phaseProgress = scaleToPhaseProgress(phaseId, targetScale)
  const cycleProgress = (phaseIndex + phaseProgress) / totalPhases
  const drawLength = ARC_CIRCUMFERENCE * 0.82
  const offset = drawLength * (1 - cycleProgress)
  const handleAngle = cycleProgress * 360 - 90
  const handleRad = (handleAngle * Math.PI) / 180
  const handleX = ARC_SVG_CENTER + ARC_RADIUS * Math.cos(handleRad)
  const handleY = ARC_SVG_CENTER + ARC_RADIUS * Math.sin(handleRad)

  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width={ARC_SIZE}
      height={ARC_SIZE}
      viewBox={`0 0 ${ARC_SIZE} ${ARC_SIZE}`}
      aria-hidden
    >
      {/* วงฐานบาง */}
      <circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth={1.5}
        strokeDasharray={`${drawLength / 4 - GAP_ARC} ${GAP_ARC}`}
        transform={`rotate(-90 ${ARC_SVG_CENTER} ${ARC_SVG_CENTER})`}
      />

      {/* progress arc ฟ้าอ่อน */}
      <motion.circle
        cx={ARC_SVG_CENTER}
        cy={ARC_SVG_CENTER}
        r={ARC_RADIUS}
        fill="none"
        stroke="rgba(160, 220, 245, 0.75)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={drawLength}
        animate={{ strokeDashoffset: offset }}
        transition={transition}
        transform={`rotate(-90 ${ARC_SVG_CENTER} ${ARC_SVG_CENTER})`}
      />

      {/* markers */}
      {MARKER_ANGLES.map((deg) => {
        const rad = (deg * Math.PI) / 180
        const mx = ARC_SVG_CENTER + ARC_RADIUS * Math.cos(rad)
        const my = ARC_SVG_CENTER + ARC_RADIUS * Math.sin(rad)
        return (
          <rect
            key={deg}
            x={mx - 3}
            y={my - 1.5}
            width={6}
            height={3}
            rx={1.5}
            fill="rgba(255, 255, 255, 0.9)"
          />
        )
      })}

      {/* จุด handle */}
      <circle
        cx={handleX}
        cy={handleY}
        r={5}
        fill="white"
        style={{
          filter: 'drop-shadow(0 1px 4px rgba(100, 160, 200, 0.4))',
        }}
      />
    </svg>
  )
}
