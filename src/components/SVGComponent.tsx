const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={512}
    height={512}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="title desc"
    {...props}
  >
    <title id="title">Arc styled raid planner icon</title>
    <desc id="desc">
      A neon radar disc with three energy arcs and a raider
      triangle, on a dark rounded square.
    </desc>
    <defs>
      <linearGradient
        id="bgGradient"
        x1={0}
        y1={0}
        x2={1}
        y2={1}
      >
        <stop offset="0%" stopColor="#040712" />
        <stop offset="50%" stopColor="#050a1a" />
        <stop offset="100%" stopColor="#02030a" />
      </linearGradient>
      <radialGradient id="radarGlow" cx="50%" cy="45%" r="55%">
        <stop
          offset="0%"
          stopColor="#25f0ff"
          stopOpacity={0.3}
        />
        <stop
          offset="40%"
          stopColor="#25f0ff"
          stopOpacity={0.05}
        />
        <stop
          offset="100%"
          stopColor="#25f0ff"
          stopOpacity={0}
        />
      </radialGradient>
      <linearGradient
        id="arcStroke"
        x1={0}
        y1={0}
        x2={1}
        y2={0}
      >
        <stop offset="0%" stopColor="#25f0ff" />
        <stop offset="50%" stopColor="#82ffe6" />
        <stop offset="100%" stopColor="#f6ffb5" />
      </linearGradient>
    </defs>
    <rect
      x={32}
      y={32}
      width={448}
      height={448}
      rx={96}
      fill="url(#bgGradient)"
    />
    <rect
      x={36}
      y={36}
      width={440}
      height={440}
      rx={92}
      fill="none"
      stroke="#1ef2ff"
      strokeOpacity={0.35}
      strokeWidth={2}
    />
    <circle cx={256} cy={228} r={150} fill="url(#radarGlow)" />
    <circle
      cx={256}
      cy={228}
      r={132}
      fill="#040815"
      stroke="#25f0ff"
      strokeWidth={4}
      strokeOpacity={0.6}
    />
    <line
      x1={256}
      y1={108}
      x2={256}
      y2={348}
      stroke="#25f0ff"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <line
      x1={136}
      y1={228}
      x2={376}
      y2={228}
      stroke="#25f0ff"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <circle
      cx={256}
      cy={228}
      r={96}
      fill="none"
      stroke="#25f0ff"
      strokeOpacity={0.25}
      strokeWidth={2}
    />
    <circle
      cx={256}
      cy={228}
      r={56}
      fill="none"
      stroke="#25f0ff"
      strokeOpacity={0.3}
      strokeWidth={2}
    />
    <path
      d="M 193 160 A 96 96 0 0 1 230 140"
      fill="none"
      stroke="url(#arcStroke)"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <path
      d="M 230 130 A 120 120 0 0 1 282 124"
      fill="none"
      stroke="url(#arcStroke)"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <path
      d="M 282 140 A 96 96 0 0 1 319 160"
      fill="none"
      stroke="url(#arcStroke)"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <path
      d="M256 228 L 348 160"
      stroke="#a4ffe0"
      strokeOpacity={0.75}
      strokeWidth={3}
      strokeLinecap="round"
    />
    <polygon
      points="352,156 338,162 346,146"
      fill="#f6ffb5"
      fillOpacity={0.9}
    />
    <circle cx={205} cy={190} r={4} fill="#25f0ff" />
    <circle cx={310} cy={248} r={3} fill="#a4ffe0" />
    <circle cx={232} cy={280} r={3} fill="#25f0ff" />
    <text
      x={256}
      y={400}
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      fontSize={26}
      letterSpacing={4}
      fill="#8df7ff"
      fillOpacity={0.85}
    >
      SOLO OPS
    </text>
    <text
      x={256}
      y={424}
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      fontSize={13}
      letterSpacing={3}
      fill="#52d7ff"
      fillOpacity={0.6}
    >
      RAID PLANNER
    </text>
  </svg>
);

export default SVGComponent;

