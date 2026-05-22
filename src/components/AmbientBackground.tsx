export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        background:
          'radial-gradient(ellipse 90% 80% at 50% 40%, #2a3348 0%, #1e2535 50%, #181e2a 100%)',
      }}
    />
  )
}
