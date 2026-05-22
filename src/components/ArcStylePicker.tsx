import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ArcStyleId } from '../breathing/types'
import { useBreathPhase } from '../hooks/useBreathPhase'
import { getStoredArcStyle, setStoredArcStyle } from '../lib/arcStorage'
import {
  ARC_VARIANTS_CLASSIC,
  ARC_VARIANTS_GENERATIVE,
} from './arcs'
import { AmbientBackground } from './AmbientBackground'
import { LumaCenter } from './LumaCenter'

function StyleButton({
  id,
  label,
  isSelected,
  isSaved,
  onSelect,
}: {
  id: ArcStyleId
  label: string
  isSelected: boolean
  isSaved: boolean
  onSelect: (id: ArcStyleId) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`rounded-xl border px-3 py-2.5 text-left transition-all active:scale-[0.98] ${
        isSelected
          ? 'border-white/40 bg-white/20 text-white'
          : 'border-white/20 bg-white/8 text-white/75 hover:border-white/30 hover:bg-white/14'
      }`}
    >
      <span className="text-xs font-semibold text-[#9ed4ff]">
        {id}
        {isSaved ? ' ✓' : ''}
      </span>
      <span className="mt-0.5 block text-sm font-medium leading-tight">{label}</span>
    </button>
  )
}

export default function ArcStylePicker() {
  const [selectedId, setSelectedId] = useState<ArcStyleId>(() => getStoredArcStyle())
  const [savedId, setSavedId] = useState<ArcStyleId>(() => getStoredArcStyle())
  const { currentPhase, arcPhaseKey, targetScale, phaseId, durationSec } =
    useBreathPhase(true)

  const handleSelect = useCallback((id: ArcStyleId) => {
    setSelectedId(id)
  }, [])

  const handleSave = useCallback(() => {
    setStoredArcStyle(selectedId)
    setSavedId(selectedId)
  }, [selectedId])

  const currentVariant =
    [...ARC_VARIANTS_CLASSIC, ...ARC_VARIANTS_GENERATIVE].find(
      (v) => v.id === selectedId,
    )!

  return (
    <div
      className="relative mx-auto flex min-h-svh w-full max-w-md flex-col overflow-hidden font-sans text-white"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <AmbientBackground />

      <header className="relative z-10 flex items-center justify-between px-5 pt-6">
        <Link
          to="/"
          className="text-sm text-white/50 transition-colors hover:text-white/80"
        >
          ← กลับแอป
        </Link>
        <span className="text-xs font-medium uppercase tracking-wider text-white/40">
          Visual Demo
        </span>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-4">
        <p className="mb-2 text-center text-xs text-white/50">
          เฟส: {currentPhase.label}
        </p>

        <LumaCenter
          label={currentPhase.label}
          targetScale={targetScale}
          phaseId={phaseId}
          phaseDurationSec={durationSec}
          idlePulse={false}
          showLabel
          showArc
          arcPhaseKey={arcPhaseKey}
          arcStyleId={selectedId}
          immersive
        />

        <motion.p
          key={selectedId}
          className="mt-4 text-center text-sm text-white/70"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-medium text-white/90">
            {selectedId}. {currentVariant.label}
          </span>
          <span className="mt-1 block text-xs text-white/50">
            {currentVariant.description}
          </span>
          {currentVariant.category === 'generative' && (
            <span className="mt-1 block text-[10px] uppercase tracking-wider text-[#9ed4ff]/70">
              Generative art
            </span>
          )}
        </motion.p>
      </div>

      <div className="relative z-10 max-h-[42vh] overflow-y-auto border-t border-white/20 bg-[#1a4a9a]/40 px-4 pb-8 pt-4 backdrop-blur-md">
        <p className="mb-2 text-center text-xs font-medium text-white/50">
          เส้นรอบวง (1–8)
        </p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {ARC_VARIANTS_CLASSIC.map((variant) => (
            <StyleButton
              key={variant.id}
              id={variant.id}
              label={variant.label}
              isSelected={selectedId === variant.id}
              isSaved={savedId === variant.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <p className="mb-2 text-center text-xs font-medium text-[#9ed4ff]/70">
          Generative art (9–15)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ARC_VARIANTS_GENERATIVE.map((variant) => (
            <StyleButton
              key={variant.id}
              id={variant.id}
              label={variant.label}
              isSelected={selectedId === variant.id}
              isSaved={savedId === variant.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mt-4 w-full rounded-full border border-white/30 bg-white/15 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25 active:scale-[0.98]"
        >
          ใช้แบบนี้ (บันทึก localStorage)
        </button>

        {savedId === selectedId && (
          <p className="mt-2 text-center text-xs text-[#9ed4ff]/90">
            บันทึกแล้ว — แอปหลักจะใช้แบบ {savedId}
          </p>
        )}
      </div>
    </div>
  )
}
