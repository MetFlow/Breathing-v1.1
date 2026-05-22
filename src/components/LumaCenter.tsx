import { motion } from 'framer-motion'
import { getPhaseTransition } from '../breathing/constants'
import type { ArcStyleId, BreathPhase } from '../breathing/types'
import { getArcVariant, getContainerSize } from './arcs'
import { LumaOrb } from './LumaOrb'

export function LumaCenter({
  label,
  targetScale,
  phaseId,
  idlePulse,
  showLabel,
  arcPhaseKey,
  showArc,
  arcStyleId = 1,
  phaseDurationSec = 4,
  immersive = false,
}: {
  label?: string
  targetScale: number
  phaseId?: BreathPhase
  idlePulse: boolean
  showLabel: boolean
  arcPhaseKey?: string
  showArc: boolean
  arcStyleId?: ArcStyleId
  phaseDurationSec?: number
  immersive?: boolean
}) {
  const variant = getArcVariant(arcStyleId)
  const ArcComponent = variant.Component
  const containerSize = getContainerSize(arcStyleId)
  const showLegacyArc =
    showArc && arcStyleId !== 8 && arcPhaseKey && phaseId
  const animateBreath = !!phaseId && !idlePulse

  const arcProps = showLegacyArc
    ? {
        phaseId,
        phaseKey: arcPhaseKey,
        targetScale,
        transition: getPhaseTransition(phaseId, phaseDurationSec),
      }
    : null

  const inner = (
    <div
      className="relative flex items-center justify-center"
      style={{ width: containerSize, height: containerSize }}
    >
      {showLegacyArc && arcProps && <ArcComponent {...arcProps} />}
      <LumaOrb label={label} showLabel={showLabel} immersive={immersive} />
    </div>
  )

  if (animateBreath) {
    return (
      <motion.div
        className="flex origin-center items-center justify-center will-change-transform"
        style={{ transformOrigin: 'center center' }}
        animate={{ scale: targetScale }}
        transition={getPhaseTransition(phaseId, phaseDurationSec)}
      >
        {inner}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex origin-center items-center justify-center will-change-transform"
      style={{ transformOrigin: 'center center' }}
      animate={idlePulse ? { scale: [1, 1.04, 1] } : { scale: 1 }}
      transition={
        idlePulse
          ? {
              duration: 4,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }
          : { duration: 0.3 }
      }
    >
      {inner}
    </motion.div>
  )
}
