"use client";

import React, { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";

/** ✅ Same hearts background from your current page */
function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(() => {
    let seed = 9876543;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    return Array.from({ length: count }, (_, i) => {
      const left = rand() * 100;
      const delay = rand() * 10;
      const duration = 10 + rand() * 12;
      const size = 12 + rand() * 14;
      const drift = (rand() - 0.5) * 80;
      const emoji = rand() > 0.65 ? "💗" : "❤️";
      return { id: i, left, delay, duration, size, drift, emoji };
    });
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="fh"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
            ["--drift" as any]: `${h.drift}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}

      <style jsx>{`
        .fh {
          position: absolute;
          bottom: -40px;
          opacity: 0;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.18));
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(0.85);
            opacity: 0;
          }
          12% {
            opacity: 0.55;
          }
          50% {
            transform: translateY(-55vh) translateX(var(--drift)) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-115vh)
              translateX(calc(var(--drift) * -0.6))
              scale(1.08);
            opacity: 0;
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

/** ✅ Glass modal (center) */
function GlassModal({
  open,
  title,
  message,
  onClose,
  actions,
}: {
  open: boolean;
  title: string;
  message: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // close only when clicking the backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-[520px] rounded-[18px] border border-white/20 bg-white/15 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.45)] text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.18),transparent_55%)]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border border-white/25 bg-white/10 p-2 text-white/90 hover:bg-white/15 active:scale-[0.98]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-6 py-6 md:px-7">
          <h3 className="text-[18px] md:text-[20px] font-semibold">{title}</h3>
          <div className="mt-3 text-white/90 text-[13px] md:text-[14px] leading-relaxed">
            {message}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
            {actions ?? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 active:scale-[0.98]"
              >
                Okay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type ModalType = "yes" | "no" | null;

export default function ValentineAskPage() {
  const router = useRouter();

  const [yesMode, setYesMode] = useState(false);

  // ✅ modal state
  const [modal, setModal] = useState<{ type: ModalType; open: boolean }>({
    type: null,
    open: false,
  });

  // ✅ disable No while sound plays
  const [isNoDisabled, setIsNoDisabled] = useState(false);

  // ✅ reliable audio (no <audio> tag needed)
  const noAudio = useRef<HTMLAudioElement | null>(null);

  const openModal = (type: Exclude<ModalType, null>) =>
    setModal({ type, open: true });

  const closeModal = () => setModal({ type: null, open: false });

  const handleNoClick = async () => {
    openModal("no");

    try {
      setIsNoDisabled(true);

      if (!noAudio.current) {
        noAudio.current = new Audio("/sounds/no.mp3");
      }

      noAudio.current.pause();
      noAudio.current.currentTime = 0;

      noAudio.current.onended = () => setIsNoDisabled(false);
      noAudio.current.onerror = () => setIsNoDisabled(false);

      await noAudio.current.play();
    } catch (err) {
      console.log("Audio play error:", err);
      setIsNoDisabled(false);
    }
  };

  const handleYesClick = () => {
    setYesMode(true);
    openModal("yes");
  };

  const modalTitle =
    modal.type === "yes" ? "Awwww 🥹❤️" : modal.type === "no" ? "Oh no 😭💔" : "";

  const modalMessage =
    modal.type === "yes" ? (
      <>
        Okay wow. You said <b>YES</b>. I’m smiling like an idiot now.
        <br />
        Consider this official: you’re my favorite person, in every timezone. 💗
      </>
    ) : modal.type === "no" ? (
      <>
        You pressed <b>NO</b>… and now you must listen to the consequences. 😌
        <br />
        (Button will re-enable when the sound ends.)
      </>
    ) : null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* same background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff5db1_17%,#ef017c_100%)]" />

      {/* center */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="relative w-full max-w-[360px] md:max-w-[520px] lg:max-w-[900px]">
          {/* Card */}
          <div
            className="
              relative
              rounded-[18px]
              overflow-hidden
              border border-white/25
              bg-white/10
              backdrop-blur-xl
              shadow-[0_28px_80px_rgba(0,0,0,0.30)]
              text-center
              px-7 py-10 md:px-10 md:py-14
              text-white
            "
          >
            <FloatingHearts count={22} />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.22),transparent_48%)]" />

            {/* content */}
            <div className="relative motion-safe:animate-[popIn_.55s_ease-out_both]">
              {/* GIF */}
              <div className="relative mx-auto mb-5 h-[110px] w-[110px] overflow-hidden rounded-full">
                <div className="absolute inset-0 rounded-full bg-white/30 blur-xl" />
                <img
                  src="/Cat Love GIF by CC0 Studios.gif"
                  alt="Love gif"
                  className="relative h-full w-full object-cover rounded-full"
                />
              </div>

              <h1 className="text-[26px] md:text-[34px] font-semibold tracking-tight drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                Okay… one question. <span className="align-middle">💌</span>
              </h1>

              <p className="mt-4 text-white/90 leading-relaxed text-[14px] md:text-[16px] max-w-[520px] mx-auto">
                Today is Valentine’s Day, and I’ve decided I don’t want to stay quiet anymore. The
                truth is, I’m not perfect. I don’t know poetry, and I don’t have movie-style dialogues
                ready. But somehow, when you’re in front of me, everything feels simple and real.
                <br />
                <br />
                I love your smile — the kind that happens without trying. I love the calm I feel just
                by being around you, like the world slows down for a moment when you’re close. Being
                with you feels easy, comforting, and safe in a way I never had to explain.
                <br />
                <br />
                You once thought I was getting annoyed with you — never. Not even for a second. How
                could I be annoyed with someone I care about so deeply? And honestly, if I’m not there
                for you during your hard days, then what’s the meaning of being there only for the happy ones?
                <br />
                <br />
                You’re far away from me right now, and I miss you more than I usually say. I miss the
                small things, the quiet moments, the feeling of having you close. Distance hasn’t changed
                what I feel — it’s only made me realize how important you truly are to me.
                <br />
                <br />
                I may not always say things perfectly, but my feelings have always been real, steady,
                and honest. And today, I don’t just want to feel them quietly anymore.
                <br />
                <br />
                I want to ask you something.
                <br />
                Just something simple… but extremely important.
              </p>

              <p className="mt-6 text-[18px] md:text-[20px] font-semibold text-white">
                Will you be my Valentine? <span className="align-middle">❤️</span>
              </p>

              {/* Buttons */}
              <div className="relative mt-8 mx-auto w-full max-w-[520px]">
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={isNoDisabled}
                    onClick={handleNoClick}
                    className={`
                      rounded-full
                      bg-white/15
                      border border-white/25
                      backdrop-blur-md
                      px-6 py-2
                      text-sm font-semibold
                      text-white
                      shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                      transition
                      hover:bg-white/20
                      active:scale-[0.98]
                      ${isNoDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {isNoDisabled ? "No… (listening) 💔" : "No 💔"}
                  </button>

                  <button
                    type="button"
                    onClick={handleYesClick}
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      bg-[linear-gradient(180deg,#ff2b75,#ff145f)]
                      px-6 py-2
                      text-sm font-semibold
                      text-white
                      shadow-[0_16px_40px_rgba(255,20,95,0.35)]
                      transition
                      hover:-translate-y-0.5
                      active:translate-y-0
                      active:scale-[0.98]
                    "
                  >
                    Yes ❤️ <Heart className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-4 text-white/70 text-[12px]">
                  (Now both buttons come with a popup 😌)
                </p>
              </div>

              {/* Yes state */}
              {yesMode && (
                <div className="mt-8 rounded-[16px] border border-white/20 bg-white/10 backdrop-blur-xl px-5 py-4 text-left">
                  <p className="text-white font-semibold text-[14px] md:text-[15px]">
                    Okay wow. You said yes. I’m smiling like an idiot now. 🥹
                  </p>
                  <p className="mt-2 text-white/85 text-[13px] md:text-[14px] leading-relaxed">
                    Consider this official: you’re my favorite person, in every timezone.
                    <br />
                    Now come here (virtually) so I can annoy you properly. 😌💗
                  </p>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="
                        inline-flex items-center gap-2
                        rounded-full
                        border border-white/25
                        bg-white/10
                        px-4 py-2
                        text-sm font-semibold
                        text-white
                        transition
                        hover:bg-white/15
                        active:scale-[0.98]
                      "
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="
                        inline-flex items-center gap-2
                        rounded-full
                        bg-white/15
                        border border-white/25
                        px-4 py-2
                        text-sm font-semibold
                        text-white
                        transition
                        hover:bg-white/20
                        active:scale-[0.98]
                      "
                    >
                      Home
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* bottom glow */}
          <div className="pointer-events-none absolute -inset-x-6 -bottom-10 h-24 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>

      {/* ✅ Center modal for both Yes/No */}
      <GlassModal
        open={modal.open}
        title={modalTitle}
        message={modalMessage ?? ""}
        onClose={closeModal}
      />
    </main>
  );
}
