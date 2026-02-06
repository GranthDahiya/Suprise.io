"use client";




function ValentineBackground() {
  // lightweight: fixed number of elements (no random runtime needed)
  const hearts = Array.from({ length: 10 });
  const roses = Array.from({ length: 14 });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft base gradient + subtle noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.22),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,126,179,0.18),transparent_45%),linear-gradient(180deg,#ffe2f0_0%,#ffeaf5_45%,#fff5fa_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.25%22/%3E%3C/svg%3E')]" />

      {/* Floating hearts (balloons) */}
      {hearts.map((_, i) => (
        <span key={`h-${i}`} className={`v-heart v-heart-${i + 1}`} />
      ))}

      {/* Roses */}
      {roses.map((_, i) => (
        <span key={`r-${i}`} className={`v-rose v-rose-${i + 1}`}>
          🌹
        </span>
      ))}

      <style jsx>{`
        /* Heart shape */
        .v-heart {
          position: absolute;
          width: 18px;
          height: 18px;
          background: rgba(255, 102, 153, 0.75);
          transform: rotate(45deg);
          border-radius: 4px;
          filter: drop-shadow(0 10px 18px rgba(255, 20, 147, 0.12));
          animation: floatUp var(--dur) linear infinite;
          opacity: 0;
        }
        .v-heart::before,
        .v-heart::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          background: rgba(255, 102, 153, 0.75);
          border-radius: 50%;
        }
        .v-heart::before {
          top: -9px;
          left: 0;
        }
        .v-heart::after {
          left: -9px;
          top: 0;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(110vh) rotate(45deg);
            opacity: 0;
          }
          15% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(-20vh) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes driftX {
          0% {
            transform: translateX(-12vw) translateY(var(--y));
          }
          50% {
            transform: translateX(112vw) translateY(calc(var(--y) + 6vh));
          }
          100% {
            transform: translateX(-12vw) translateY(calc(var(--y) + 12vh));
          }
        }

        /* Heart placement (10) */
        .v-heart-1 { left: 8%;  --dur: 14s; animation-delay: 0s; }
        .v-heart-2 { left: 18%; --dur: 18s; animation-delay: 3s; transform: rotate(45deg) scale(0.9); }
        .v-heart-3 { left: 28%; --dur: 16s; animation-delay: 6s; transform: rotate(45deg) scale(1.1); }
        .v-heart-4 { left: 38%; --dur: 20s; animation-delay: 1s; transform: rotate(45deg) scale(0.85); }
        .v-heart-5 { left: 50%; --dur: 17s; animation-delay: 8s; transform: rotate(45deg) scale(1.2); }
        .v-heart-6 { left: 62%; --dur: 22s; animation-delay: 4s; transform: rotate(45deg) scale(0.95); }
        .v-heart-7 { left: 72%; --dur: 15s; animation-delay: 10s; transform: rotate(45deg) scale(1.05); }
        .v-heart-8 { left: 82%; --dur: 19s; animation-delay: 7s; transform: rotate(45deg) scale(0.9); }
        .v-heart-9 { left: 90%; --dur: 21s; animation-delay: 2s; transform: rotate(45deg) scale(1.15); }
        .v-heart-10 { left: 45%; --dur: 24s; animation-delay: 12s; transform: rotate(45deg) scale(0.8); }
        .v-heart-10 { left: 45%; --dur: 24s; animation-delay: 12s; transform: rotate(45deg) scale(0.8); }
        .v-heart-10 { left: 45%; --dur: 24s; animation-delay: 12s; transform: rotate(45deg) scale(0.8); }
        .v-heart-10 { left: 45%; --dur: 24s; animation-delay: 12s; transform: rotate(45deg) scale(0.8); }
        .v-heart-10 { left: 45%; --dur: 24s; animation-delay: 12s; transform: rotate(45deg) scale(0.8); }
        .v-heart-10 { left: 45%; --dur: 24s; animation-delay: 12s; transform: rotate(45deg) scale(0.8); }

      `}</style>
    </div>
  );
}


export default function ValentineLandingPage() {
 

 

  return (
<main className="relative min-h-screen text-slate-900">
  <ValentineBackground />

  {/* Centered glass wrapper */}
  <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
    <div
      className="
        relative
        w-[90%] h-[90vh] max-w-5xl
        rounded-[32px]

        /* glass background */
        bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.16))]
        backdrop-blur-2xl

        /* border & depth */
        border border-white/40
        ring-1 ring-white/20
        shadow-[0_30px_80px_rgba(255,105,180,0.28)]
      "
    >
      {/* glass highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/90 via-transparent to-pink-300/2~git0" />

      {/* content */}
      <div className="relative p-6 sm:p-8 md:p-12 flex justify-center items-center">
    hi
      </div>
    </div>
  </div>
</main>


  );
}
