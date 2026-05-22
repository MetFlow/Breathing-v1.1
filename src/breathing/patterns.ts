import { SCALE_EXPANDED, SCALE_REST } from './constants'
import type { BreathPhase } from './types'

export type PhaseStep = {
  id: BreathPhase
  label: string
  durationMs: number
  fromScale: number
  toScale: number
}

export type EmotionId = 'stress' | 'anxiety' | 'sadness' | 'anger' | 'insomnia'

export type EmotionConfig = {
  id: EmotionId
  label: string
  patternName: string
  rhythmLabel: string
  evidence: string
  steps: PhaseStep[]
}

const inhale = (sec: number): PhaseStep => ({
  id: 'inhale',
  label: 'หายใจเข้า',
  durationMs: sec * 1000,
  fromScale: SCALE_REST,
  toScale: SCALE_EXPANDED,
})

const holdIn = (sec: number): PhaseStep => ({
  id: 'hold-in',
  label: 'กลั้น',
  durationMs: sec * 1000,
  fromScale: SCALE_EXPANDED,
  toScale: SCALE_EXPANDED,
})

const exhale = (sec: number): PhaseStep => ({
  id: 'exhale',
  label: 'หายใจออก',
  durationMs: sec * 1000,
  fromScale: SCALE_EXPANDED,
  toScale: SCALE_REST,
})

const holdOut = (sec: number): PhaseStep => ({
  id: 'hold-out',
  label: 'กลั้น',
  durationMs: sec * 1000,
  fromScale: SCALE_REST,
  toScale: SCALE_REST,
})

/** Box Breathing — เข้า 4 / กลั้น 4 / ออก 4 / กลั้น 4 */
const BOX_STEPS: PhaseStep[] = [
  inhale(4),
  holdIn(4),
  exhale(4),
  holdOut(4),
]

/** Extended Exhale — เข้า 4 / ออก 8 */
const EXTENDED_EXHALE_STEPS: PhaseStep[] = [inhale(4), exhale(8)]

/** Triangular — เข้า 4 / กลั้น 4 / ออก 4 */
const TRIANGULAR_STEPS: PhaseStep[] = [inhale(4), holdIn(4), exhale(4)]

/** 4-7-8 — เข้า 4 / กลั้น 7 / ออก 8 */
const FOUR_SEVEN_EIGHT_STEPS: PhaseStep[] = [inhale(4), holdIn(7), exhale(8)]

export const EMOTION_CONFIGS: EmotionConfig[] = [
  {
    id: 'stress',
    label: 'เครียด',
    patternName: 'Box Breathing',
    rhythmLabel: 'เข้า 4 / กลั้น 4 / ออก 4 / กลั้น 4',
    evidence: 'ลดคอร์ติซอล — ใช้โดย Navy SEALs',
    steps: BOX_STEPS,
  },
  {
    id: 'anxiety',
    label: 'วิตกกังวล',
    patternName: 'Extended Exhale',
    rhythmLabel: 'เข้า 4 / ออก 8',
    evidence: 'กระตุ้น vagus nerve ส่งสัญญาณความปลอดภัย',
    steps: EXTENDED_EXHALE_STEPS,
  },
  {
    id: 'sadness',
    label: 'เศร้า',
    patternName: 'Triangular Breathing',
    rhythmLabel: 'เข้า 4 / กลั้น 4 / ออก 4',
    evidence: 'แก้รูปแบบหายใจที่กลั้นปอดนานโดยไม่รู้ตัว',
    steps: TRIANGULAR_STEPS,
  },
  {
    id: 'anger',
    label: 'โกรธ',
    patternName: 'Extended Exhale',
    rhythmLabel: 'เข้า 4 / ออก 8',
    evidence: 'ลดระบบประสาทฝ่ายเร้า (sympathetic) ที่ทำงานเกิน',
    steps: EXTENDED_EXHALE_STEPS,
  },
  {
    id: 'insomnia',
    label: 'นอนไม่หลับ',
    patternName: '4-7-8',
    rhythmLabel: 'เข้า 4 / กลั้น 7 / ออก 8',
    evidence: 'มีประสิทธิภาพเมื่อใช้บ่อย — ไม่ทนต่อยาเหมือน sleeping pill',
    steps: FOUR_SEVEN_EIGHT_STEPS,
  },
]

export const DEFAULT_DEMO_STEPS = BOX_STEPS

export function getEmotionConfig(id: EmotionId): EmotionConfig {
  return EMOTION_CONFIGS.find((e) => e.id === id) ?? EMOTION_CONFIGS[0]
}
