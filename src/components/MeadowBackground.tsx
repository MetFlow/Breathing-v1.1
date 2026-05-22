import { CALM } from '../breathing/theme'

/** พื้นหลังโทน Calm ทั้งหมด */
export function MeadowBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: CALM.base }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            165deg,
            ${CALM.mid} 0%,
            ${CALM.deep} 45%,
            ${CALM.base} 100%
          )`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 88% 78% at 50% 44%,
            ${CALM.glow} 0%,
            rgba(186, 214, 228, 0.06) 52%,
            transparent 82%
          )`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 105% 100% at 50% 50%,
            transparent 42%,
            ${CALM.vignette} 100%
          )`,
        }}
      />
    </div>
  )
}
