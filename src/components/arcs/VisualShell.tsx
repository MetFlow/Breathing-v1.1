import type { ReactNode } from 'react'
import { ARC_SIZE, VISUAL_SIZE } from '../../breathing/constants'

type ShellSize = 'arc' | 'visual'

export function VisualSvgShell({
  children,
  size = 'visual',
}: {
  children: ReactNode
  size?: ShellSize
}) {
  const dim = size === 'arc' ? ARC_SIZE : VISUAL_SIZE
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width={dim}
      height={dim}
      viewBox={`0 0 ${dim} ${dim}`}
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function VisualCanvasShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: VISUAL_SIZE, height: VISUAL_SIZE }}
      aria-hidden
    >
      {children}
    </div>
  )
}
