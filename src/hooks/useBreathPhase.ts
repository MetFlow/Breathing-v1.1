import { useEffect, useState } from 'react'
import type { PhaseStep } from '../breathing/patterns'
import { DEFAULT_DEMO_STEPS } from '../breathing/patterns'

export function useBreathPhase(
  active: boolean,
  steps: PhaseStep[] = DEFAULT_DEMO_STEPS,
  patternKey = 'default',
) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  const safeSteps = steps.length > 0 ? steps : DEFAULT_DEMO_STEPS
  const currentPhase = safeSteps[phaseIndex % safeSteps.length]
  const arcPhaseKey = `${cycleCount}-${phaseIndex}-${currentPhase.id}`

  useEffect(() => {
    setPhaseIndex(0)
    setCycleCount(0)
  }, [patternKey])

  useEffect(() => {
    if (!active) {
      setPhaseIndex(0)
      setCycleCount(0)
      return
    }

    const phaseTimer = setTimeout(() => {
      setPhaseIndex((prev) => {
        const next = (prev + 1) % safeSteps.length
        if (next === 0) setCycleCount((c) => c + 1)
        return next
      })
    }, currentPhase.durationMs)

    return () => clearTimeout(phaseTimer)
  }, [active, phaseIndex, cycleCount, safeSteps.length, currentPhase.durationMs])

  return {
    currentPhase,
    phaseIndex,
    cycleCount,
    arcPhaseKey,
    targetScale: currentPhase.toScale,
    phaseId: currentPhase.id,
    durationSec: currentPhase.durationMs / 1000,
  }
}
