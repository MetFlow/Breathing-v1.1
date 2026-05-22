export function hash2(x: number, y: number, seed = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 43.758) * 43758.5453
  return n - Math.floor(n)
}

export function smoothNoise(x: number, y: number, seed = 0): number {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const a = hash2(ix, iy, seed)
  const b = hash2(ix + 1, iy, seed)
  const c = hash2(ix, iy + 1, seed)
  const d = hash2(ix + 1, iy + 1, seed)
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
