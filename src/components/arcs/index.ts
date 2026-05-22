import type { ComponentType } from 'react'
import type { ArcStyleCategory, ArcStyleId } from '../../breathing/types'
import { ArcV1_SyncOrb } from './ArcV1_SyncOrb'
import { ArcV2_SlowRotate } from './ArcV2_SlowRotate'
import { ArcV3_PulseRing } from './ArcV3_PulseRing'
import { ArcV4_SlowDot } from './ArcV4_SlowDot'
import { ArcV5_FadeTrail } from './ArcV5_FadeTrail'
import { ArcV6_PhaseColor } from './ArcV6_PhaseColor'
import { ArcV7_Minimal } from './ArcV7_Minimal'
import { ArcV8_None } from './ArcV8_None'
import { ArcV9_Particles } from './gen/ArcV9_Particles'
import { ArcV10_Lissajous } from './gen/ArcV10_Lissajous'
import { ArcV11_NoiseBlob } from './gen/ArcV11_NoiseBlob'
import { ArcV12_RadialLines } from './gen/ArcV12_RadialLines'
import { ArcV13_FlowField } from './gen/ArcV13_FlowField'
import { ArcV14_NoiseMesh } from './gen/ArcV14_NoiseMesh'
import { ArcV15_Ripple } from './gen/ArcV15_Ripple'
import type { ArcVariantProps } from './types'

export type { ArcVariantProps } from './types'
export { isGenerativeStyle, getContainerSize } from './helpers'

export type ArcVariantMeta = {
  id: ArcStyleId
  slug: string
  label: string
  description: string
  category: ArcStyleCategory
  Component: ComponentType<ArcVariantProps>
}

export const ARC_VARIANTS: ArcVariantMeta[] = [
  {
    id: 1,
    slug: 'sync-orb',
    label: 'ตามลมหายใจ',
    description: 'เส้นสอดคล้อง orb — กลั้นนิ่ง',
    category: 'arc',
    Component: ArcV1_SyncOrb,
  },
  {
    id: 2,
    slug: 'slow-rotate',
    label: 'ลมหมุนรอบ',
    description: 'ring บาง หมุนช้า',
    category: 'arc',
    Component: ArcV2_SlowRotate,
  },
  {
    id: 3,
    slug: 'pulse-ring',
    label: 'คลื่นนุ่ม',
    description: 'วง pulse ขยาย-หด',
    category: 'arc',
    Component: ArcV3_PulseRing,
  },
  {
    id: 4,
    slug: 'slow-dot',
    label: 'จุดช้า',
    description: 'จุดสั้นเดินรอบนุ่ม',
    category: 'arc',
    Component: ArcV4_SlowDot,
  },
  {
    id: 5,
    slug: 'fade-trail',
    label: 'เงาจาง',
    description: 'gradient trail ต่อเนื่อง',
    category: 'arc',
    Component: ArcV5_FadeTrail,
  },
  {
    id: 6,
    slug: 'phase-color',
    label: 'สีตามเฟส',
    description: 'สีเปลี่ยนตามจังหวะ',
    category: 'arc',
    Component: ArcV6_PhaseColor,
  },
  {
    id: 7,
    slug: 'minimal',
    label: 'มินิมอล',
    description: 'เส้นบาง ไม่มี glow',
    category: 'arc',
    Component: ArcV7_Minimal,
  },
  {
    id: 8,
    slug: 'none',
    label: 'ไม่มีเส้น',
    description: 'เหลือแค่ orb',
    category: 'arc',
    Component: ArcV8_None,
  },
  {
    id: 9,
    slug: 'particles',
    label: 'ละอองนุ่ม',
    description: 'particle field รอบ orb',
    category: 'generative',
    Component: ArcV9_Particles,
  },
  {
    id: 10,
    slug: 'lissajous',
    label: 'สายโค้ง',
    description: 'Lissajous organic curves',
    category: 'generative',
    Component: ArcV10_Lissajous,
  },
  {
    id: 11,
    slug: 'noise-blob',
    label: 'Blob',
    description: 'blob morph นุ่ม',
    category: 'generative',
    Component: ArcV11_NoiseBlob,
  },
  {
    id: 12,
    slug: 'radial-lines',
    label: 'รัศมี',
    description: 'เส้นรัศมีหมุนช้า',
    category: 'generative',
    Component: ArcV12_RadialLines,
  },
  {
    id: 13,
    slug: 'flow-field',
    label: 'ลมไหล',
    description: 'flow field เส้นสั้น',
    category: 'generative',
    Component: ArcV13_FlowField,
  },
  {
    id: 14,
    slug: 'noise-mesh',
    label: 'Noise mesh',
    description: 'canvas gradient + noise',
    category: 'generative',
    Component: ArcV14_NoiseMesh,
  },
  {
    id: 15,
    slug: 'ripple',
    label: 'คลื่น',
    description: 'ripple ขยายแล้วจาง',
    category: 'generative',
    Component: ArcV15_Ripple,
  },
]

export const ARC_VARIANTS_CLASSIC = ARC_VARIANTS.filter((v) => v.category === 'arc')
export const ARC_VARIANTS_GENERATIVE = ARC_VARIANTS.filter(
  (v) => v.category === 'generative',
)

export function getArcVariant(id: ArcStyleId) {
  return ARC_VARIANTS.find((v) => v.id === id) ?? ARC_VARIANTS[0]
}
