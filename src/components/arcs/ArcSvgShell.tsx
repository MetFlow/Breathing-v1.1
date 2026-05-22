import type { ReactNode } from 'react'
import { ARC_SIZE } from '../../breathing/constants'

export function ArcSvgShell({ children }: { children: ReactNode }) {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width={ARC_SIZE}
      height={ARC_SIZE}
      viewBox={`0 0 ${ARC_SIZE} ${ARC_SIZE}`}
      aria-hidden
    >
      {children}
    </svg>
  )
}
