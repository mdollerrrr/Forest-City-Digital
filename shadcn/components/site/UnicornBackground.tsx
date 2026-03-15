"use client"

import UnicornScene from "unicornstudio-react"
import * as React from "react"

/** Replace with your Unicorn Studio project embed ID from https://unicorn.studio */
const DEFAULT_PROJECT_ID = "LcDtnUPy5YtYxLsDskNx"

export function UnicornBackground({
  projectId = DEFAULT_PROJECT_ID,
}: {
  projectId?: string
}) {
  const [coverScale, setCoverScale] = React.useState(1.2)

  React.useEffect(() => {
    let raf = 0
    const compute = () => {
      const next = Math.max(window.innerWidth / 1440, window.innerHeight / 900)
      setCoverScale(
        Number.isFinite(next) ? Math.max(0.5, Math.min(next, 3)) : 1.2
      )
    }
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener("resize", onResize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      data-label="unicorn-studio"
    >
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="origin-center opacity-90"
          style={{
            transform: `scale(${coverScale})`,
            filter: "saturate(1.04) contrast(1.03)",
            background: "transparent",
          }}
        >
          <UnicornScene
            key={DEFAULT_PROJECT_ID}
            projectId={DEFAULT_PROJECT_ID}
            width="1440px"
            height="900px"
            scale={1}
            dpi={1.5}
            lazyLoad={false}
            placeholderClassName="min-h-[900px] min-w-[1440px] bg-[radial-gradient(900px_circle_at_20%_15%,rgba(38,75,25,0.28),transparent_62%),radial-gradient(900px_circle_at_80%_0%,rgba(245,158,11,0.22),transparent_64%)]"
            showPlaceholderOnError={false}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.3/dist/unicornStudio.umd.js"
            onLoad={() => {}}
            onError={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
