import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SESSION_DURATION_MS } from '../breathing/constants'
import {
  DEFAULT_DEMO_STEPS,
  EMOTION_CONFIGS,
  type EmotionId,
  getEmotionConfig,
} from '../breathing/patterns'
import { useBreathPhase } from '../hooks/useBreathPhase'
import { MeadowBackground } from './MeadowBackground'
import { LumaCenter } from './LumaCenter'

type AppState = 'onboarding' | 'main' | 'breathing'

const ONBOARDING_MESSAGES = [
  'สวัสดี ฉันชื่อ Luma 🤍',
  'ที่นี่เป็นพื้นที่ของเธอคนเดียว',
  'แค่หายใจ ก็ดูแลตัวเองได้แล้ว',
  'พร้อมแล้วเราไปด้วยกันเลย',
] as const

const fadeVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function VisualBreathing() {
  const [appState, setAppState] = useState<AppState>('onboarding')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [showStartButton, setShowStartButton] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const [activeEmotion, setActiveEmotion] = useState<EmotionId | null>(null)

  const emotionConfig = activeEmotion ? getEmotionConfig(activeEmotion) : null
  const breathSteps = emotionConfig?.steps ?? DEFAULT_DEMO_STEPS
  const isBreathing = sessionActive && appState === 'breathing' && !!emotionConfig

  const { currentPhase, durationSec } = useBreathPhase(
    isBreathing,
    breathSteps,
    activeEmotion ?? 'idle',
  )

  const endSession = useCallback(() => {
    setSessionActive(false)
    setActiveEmotion(null)
    setAppState('main')
  }, [])

  useEffect(() => {
    if (appState !== 'onboarding') return

    if (onboardingStep < ONBOARDING_MESSAGES.length - 1) {
      const timer = setTimeout(() => {
        setOnboardingStep((s) => s + 1)
      }, 2800)
      return () => clearTimeout(timer)
    }

    const buttonTimer = setTimeout(() => setShowStartButton(true), 2200)
    return () => clearTimeout(buttonTimer)
  }, [appState, onboardingStep])

  useEffect(() => {
    if (!sessionActive || appState !== 'breathing') return

    const sessionTimer = setTimeout(endSession, SESSION_DURATION_MS)
    return () => clearTimeout(sessionTimer)
  }, [sessionActive, appState, endSession])

  const startBreathing = (emotionId: EmotionId) => {
    setActiveEmotion(emotionId)
    setSessionActive(true)
    setAppState('breathing')
  }

  return (
    <div
      className="relative mx-auto flex min-h-svh w-full max-w-md flex-col overflow-hidden font-sans text-[#dce8ef]"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <MeadowBackground />

      <div
        className={`relative z-10 flex min-h-0 flex-1 flex-col px-6 py-10 ${
          appState === 'breathing' ? '' : 'items-center justify-center'
        }`}
      >
        <AnimatePresence mode="wait">
          {appState === 'onboarding' && (
            <motion.div
              key="onboarding"
              className="flex w-full flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <LumaCenter
                  idlePulse
                  showLabel={false}
                  targetScale={1}
                  showArc={false}
                  immersive
                />
              </div>

              <div className="flex min-h-[4.5rem] items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={onboardingStep}
                    className="max-w-xs text-lg leading-relaxed text-[#e8f2f6]"
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                  >
                    {ONBOARDING_MESSAGES[onboardingStep]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showStartButton && (
                  <motion.button
                    type="button"
                    className="mt-10 rounded-full border border-white/25 bg-white/12 px-10 py-3 text-base font-medium text-[#e8f2f6] shadow-sm backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    onClick={() => setAppState('main')}
                  >
                    เริ่มเลย
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {appState === 'main' && (
            <motion.div
              key="main"
              className="flex w-full flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <LumaCenter
                  idlePulse
                  showLabel={false}
                  targetScale={1}
                  showArc={false}
                  immersive
                />
              </div>

              <motion.h1
                className="mb-8 text-center text-xl font-medium leading-snug text-[#e8f2f6]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                ตอนนี้ข้างในรู้สึกยังไงบ้าง?
              </motion.h1>

              <ul className="flex w-full max-w-xs flex-col gap-3">
                {EMOTION_CONFIGS.map((emotion, i) => (
                  <motion.li
                    key={emotion.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  >
                    <button
                      type="button"
                      className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-left shadow-sm backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/16 active:scale-[0.98]"
                      onClick={() => startBreathing(emotion.id)}
                    >
                      <span className="block text-base font-medium text-[#e8f2f6]">
                        {emotion.label}
                      </span>
                      <span className="mt-1 block text-xs text-[#a8c0cc]">
                        {emotion.patternName} · {emotion.rhythmLabel}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <Link
                to="/arc-demo"
                className="mt-8 text-xs text-[#a8c0cc] transition-colors hover:text-[#dce8ef]"
              >
                ทดลองสไตล์เส้นรอบวง →
              </Link>
            </motion.div>
          )}

          {appState === 'breathing' && emotionConfig && (
            <motion.div
              key="breathing"
              className="flex min-h-0 w-full flex-1 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <header className="shrink-0 pt-2 text-center">
                <p className="text-sm font-medium text-[#dce8ef]">
                  {emotionConfig.label}
                </p>
                <p className="mt-1 text-xs text-[#a8c0cc]">
                  {emotionConfig.patternName} · {emotionConfig.rhythmLabel}
                </p>
              </header>

              <div className="flex min-h-0 flex-1 items-center justify-center">
                <LumaCenter
                  label={currentPhase.label}
                  targetScale={currentPhase.toScale}
                  phaseId={currentPhase.id}
                  phaseDurationSec={durationSec}
                  idlePulse={false}
                  showLabel
                  showArc={false}
                  immersive
                />
              </div>

              <footer className="flex shrink-0 justify-center pb-2 pt-6">
                <motion.button
                  type="button"
                  className="flex h-[47px] w-[178px] items-center justify-center rounded-full border border-white/25 bg-white/12 px-[23px] text-sm font-medium text-[#dce8ef] shadow-sm backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  onClick={endSession}
                >
                  กลับไปเลือกโหมด
                </motion.button>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
