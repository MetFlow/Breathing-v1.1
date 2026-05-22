import { AnimatePresence, motion } from 'framer-motion'
import { ORB_SIZE } from '../breathing/constants'

const GLOW_PAD = 48

const fadeVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

export function LumaOrb({
  label,
  showLabel,
  immersive = false,
}: {
  label?: string
  showLabel: boolean
  immersive?: boolean
}) {
  const showPhaseLabel = showLabel && !!label
  const container = ORB_SIZE + GLOW_PAD * 2

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: container, height: container }}
    >
      {/* cyan pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ORB_SIZE + 12 + i * 14,
            height: ORB_SIZE + 12 + i * 14,
            background: `radial-gradient(circle, rgba(200, 235, 255, ${0.35 - i * 0.1}) 0%, transparent 70%)`,
          }}
          animate={
            immersive
              ? {
                  scale: [1, 1.06 + i * 0.02, 1],
                  opacity: [0.5 - i * 0.12, 0.75 - i * 0.1, 0.5 - i * 0.12],
                }
              : { scale: 1, opacity: 0.4 - i * 0.1 }
          }
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      {/* วงขาว + glow ฟ้าอ่อน */}
      <div
        className="relative flex items-center justify-center rounded-full bg-white"
        style={{
          width: ORB_SIZE,
          height: ORB_SIZE,
          boxShadow: [
            '0 0 0 1px rgba(180, 220, 245, 0.5)',
            '0 0 24px rgba(160, 220, 255, 0.55)',
            '0 0 48px rgba(140, 200, 240, 0.25)',
          ].join(', '),
        }}
      >
        <AnimatePresence mode="wait">
          {showPhaseLabel ? (
            <motion.span
              key={label}
              className="px-3 text-center text-[15px] font-normal tracking-wide text-[#7a9aad]"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              {label}
            </motion.span>
          ) : (
            <motion.span
              key="luma-brand"
              className="select-none text-sm font-medium tracking-[0.35em] text-[#8aa8b8]"
              style={{ paddingLeft: '0.35em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              LUMA
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
