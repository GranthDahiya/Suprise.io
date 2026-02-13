"use client";

import React, { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";

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
            transform: translateY(-115vh) translateX(calc(var(--drift) * -0.6))
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

function PartySparks({
  show,
  durationMs = 5000,
  count = 180,
  onDone,
}: {
  show: boolean;
  durationMs?: number;
  count?: number;
  onDone: () => void;
}) {
  const sparks = useMemo(() => {
    let seed = 13579246;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    return Array.from({ length: count }, (_, i) => {
      const x = rand() * 100;
      const y = rand() * 100;
      const delay = rand() * 0.9;
      const angle = rand() * Math.PI * 2;
      const distance = 140 + rand() * 420;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const size = 10 + rand() * 18;
      const rotate = rand() * 360;
      const emoji = rand() > 0.55 ? "✨" : rand() > 0.2 ? "🎉" : "💫";
      return { id: i, x, y, delay, dx, dy, size, rotate, emoji };
    });
  }, [count]);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="spark"
          style={{
            left: `${s.x}vw`,
            top: `${s.y}vh`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${durationMs / 1000}s`,
            fontSize: `${s.size}px`,
            ["--dx" as any]: `${s.dx}px`,
            ["--dy" as any]: `${s.dy}px`,
            ["--rot" as any]: `${s.rotate}deg`,
          }}
        >
          {s.emoji}
        </span>
      ))}

      <span
        className="absolute left-0 top-0 h-1 w-1 opacity-0"
        style={{ animation: `done ${durationMs}ms linear forwards` }}
        onAnimationEnd={onDone}
      />

      <style jsx>{`
        .spark {
          position: absolute;
          transform: translate(-50%, -50%);
          opacity: 0;
          filter: drop-shadow(0 12px 26px rgba(0, 0, 0, 0.18));
          animation-name: sparkBurst;
          animation-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1);
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }

        @keyframes sparkBurst {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.85);
          }
          10% {
            opacity: 1;
          }
          55% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy))
              rotate(var(--rot)) scale(1.15);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%)
              translate(calc(var(--dx) * 1.2), calc(var(--dy) * 1.2))
              rotate(calc(var(--rot) * 1.4)) scale(0.9);
          }
        }

        @keyframes done {
          from {
            opacity: 0;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function GlassModal({
  open,
  type,
  title,
  message,
  onClose,
  disableActions = false,
  actions,
}: {
  open: boolean;
  type: "yes" | "no";
  title: string;
  message: React.ReactNode;
  onClose: () => void;
  disableActions?: boolean;
  actions?: React.ReactNode;
}) {
  if (!open) return null;

  const isYes = type === "yes";

  return (
    <div
      className="fixed inset-0 z-[60] px-4 py-4 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (disableActions) return;
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />

      <div className="relative w-full max-w-[520px] rounded-[18px] border border-white/20 bg-white/15 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.45)] text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.18),transparent_55%)]" />

        <button
          type="button"
          onClick={onClose}
          disabled={disableActions}
          className={`absolute right-3 top-3 rounded-full border border-white/25 bg-white/10 p-2 text-white/90 hover:bg-white/15 active:scale-[0.98]
            ${disableActions ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

      <div className="relative flex flex-col items-center px-4 py-4 h-[95vh] lg:max-h-[800px] overflow-y-auto">

          {/* ✅ TOP GIF (ONLY FOR YES) */}
          {isYes && (
            <div className="mb-4 overflow-hidden rounded-[16px] mt-2 border border-white/20">
              <div className="relative h-[180px] w-[240px] md:h-[180px]">
                <img src="/gif-top.gif" alt="Top gif" className="h-full w-full object-cover" />
              </div>
            </div>
          )}

          {/* ✅ Content */}
          <div className="relative px-6 py-6 md:px-7 w-full">
            <h3 className="text-[18px] md:text-[20px] font-semibold">{title}</h3>

            <div className="mt-3 text-white/90 text-[13px] lg:text-[26px] md:text-[14px] leading-relaxed">
              {message}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
              {actions ?? (
                <button
                  type="button"
                  onClick={onClose}
                  disabled={disableActions}
                  className={`rounded-full border border-white/25 bg-white/10 px-4 py-2 lg:text-[24px] text-sm font-semibold text-white hover:bg-white/15 active:scale-[0.98]
                    ${disableActions ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Okay
                </button>
              )}
            </div>
          </div>

          {/* ✅ BOTTOM GIF (ONLY FOR YES) */}
          {isYes && (
            <div className="mt-2 overflow-hidden rounded-[16px] border border-white/20 mb-2">
              <div className="relative h-[190px] w-[240px] md:h-[180px]">
                <img src="/gif-bottom.gif" alt="Bottom gif" className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type ModalType = "yes" | "no" | null;

export default function ValentineAskPage() {
  const router = useRouter();

  const [yesMode, setYesMode] = useState(false);

  const [modal, setModal] = useState<{ type: ModalType; open: boolean }>({
    type: null,
    open: false,
  });

  const [isNoDisabled, setIsNoDisabled] = useState(false);
  const [noClicks, setNoClicks] = useState(0);

  const [flyKey, setFlyKey] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [isFlyRunning, setIsFlyRunning] = useState(false);


  const [isPartyRunning, setIsPartyRunning] = useState(false);


  const noAudio = useRef<HTMLAudioElement | null>(null);
  const flyAudio = useRef<HTMLAudioElement | null>(null);
  const yesAudio = useRef<HTMLAudioElement | null>(null);

  const openModal = (type: Exclude<ModalType, null>) => setModal({ type, open: true });

  const closeModal = () => {
    if (isFlyRunning || isPartyRunning) return;
    setModal({ type: null, open: false });
  };

  const startFly = async () => {
    setIsFlying(true);
    setIsFlyRunning(true);
    setFlyKey((k) => k + 1);

    if (!flyAudio.current) {
      flyAudio.current = new Audio("/sounds/sad-hamster-meme-theme_R3IHfaua.mp3");
    }

    flyAudio.current.pause();
    flyAudio.current.currentTime = 0;
    flyAudio.current.play().catch(() => {});
  };

  const startParty = () => {
    setIsPartyRunning(true);

    if (!yesAudio.current) {
      yesAudio.current = new Audio("/sounds/party.mp3");
    }

    yesAudio.current.pause();
    yesAudio.current.currentTime = 0;
    yesAudio.current.play().catch(() => {});
  };

  const handleNoClick = async () => {
    const next = noClicks + 1;
    setNoClicks(next);

    openModal("no");
    setIsNoDisabled(true);

    try {
      if (next >= 2) {
        await startFly();
        return;
      }

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
    startParty();
  };

  const modalTitle =
    modal.type === "yes" ? "Awwww 🥹❤️" : modal.type === "no" ? "Oh no 😭💔" : "";

  const modalMessage =
    modal.type === "yes" ? (
      <>
        Okay wow. You said <b>YES</b>. I’m smiling like an idiot now.
        <br />
  I love you baby. Can’t wait to see you.
The distance doesn’t matter anymore you’re already mine. ❤️
      </>
    ) : modal.type === "no" ? (
      <>
        {noClicks === 1 && (
          <>
            You pressed <b>NO</b>… You have <b>2 more chances</b> left 😌
          </>
        )}

        {noClicks === 2 && (
          <>
            You pressed <b>NO</b> again… Only <b>1 chance</b> left now 😏
          </>
        )}

        {noClicks >= 3 && (
          <>
            You pressed <b>NO</b> again… So ok.... 😌
          </>
        )}
      </>
    ) : null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff5db1_17%,#ef017c_100%)]" />
      <PartySparks
        show={isPartyRunning}
        durationMs={5000}
        count={190}
        onDone={() => setIsPartyRunning(false)}
      />
      {isFlying && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          <img
            key={flyKey}
            src="/bg-mu.gif"
            alt="Flying gif"
            className="no-fly"
            onAnimationEnd={() => {
              setIsFlying(false);
              setIsFlyRunning(false);
              setIsNoDisabled(false);
            }}
          />

          <style jsx>{`
         .no-fly {
  position: absolute;
  left: -25vw;
  top: 35%;
  width: clamp(120px, 15vw, 260px);
  aspect-ratio: 16 / 10;
  border-radius: 999px;
  object-fit: cover;
  filter: drop-shadow(0 18px 35px rgba(0, 0, 0, 0.35));
  animation: flyAcross 8s ease-in-out forwards;
}


            @keyframes flyAcross {
              0% {
                transform: translateX(0) translateY(0) rotate(-6deg) scale(0.95);
              }
              15% {
                transform: translateX(18vw) translateY(-10px) rotate(3deg) scale(1);
              }
              35% {
                transform: translateX(42vw) translateY(8px) rotate(-3deg) scale(1.02);
              }
              60% {
                transform: translateX(70vw) translateY(-12px) rotate(4deg) scale(1.03);
              }
              100% {
                transform: translateX(calc(100vw + 220px)) translateY(0) rotate(0deg) scale(1);
              }
            }
          `}</style>
        </div>
      )}

      <div className="relative z-10 flex min-h-screen items-center justify-center py-4 lg:py-[40px] px-4">
        <div className="relative w-full max-w-[360px] md:max-w-[520px] lg:max-w-[900px]">
          <div className="relative rounded-[18px] overflow-hidden border border-white/25 bg-white/10 backdrop-blur-xl shadow-[0_28px_80px_rgba(0,0,0,0.30)] text-center px-7 py-10 md:px-10 md:py-14 text-white">
            <FloatingHearts count={22} />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.22),transparent_48%)]" />

            <div className="relative motion-safe:animate-[popIn_.55s_ease-out_both]">
              <div className="relative mx-auto mb-5 h-[110px] w-[110px] overflow-hidden rounded-full">
                <div className="absolute inset-0 rounded-full bg-white/30 blur-xl" />
                <img
                  src="/Cat Love GIF by CC0 Studios.gif"
                  alt="Love gif"
                  className="relative h-full w-full object-cover rounded-full"
                />
              </div>

              <h1 className="text-[26px] lg:text-[46px] md:text-[34px] font-semibold tracking-tight drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                Okay… one question. <span className="align-middle">💌</span>
              </h1>

              <p className="mt-4 text-white/90 leading-relaxed text-[14px] lg:text-[24px] md:text-[16px] min-w-[520px] mx-auto">
                I’m not the kind of person who knows how to turn feelings into perfect words. I
                don’t have big speeches ready. But what I feel for you doesn’t need decoration. It’s
                simple. It’s real.
                <br />
                <br />
                Being with you feels right in a way that’s hard to explain. Not dramatic. Not
                overwhelming. Just steady. Comfortable. Like I don’t have to pretend or perform. I
                can just exist and that’s enough.
                <br />
                <br />
                You once thought I was getting annoyed with you. I wasn’t. I never was. If anything,
                I care more than I probably show. And to me, caring means being there when things
                aren’t perfect too. Not just when everything is easy.
                <br />
                <br />
                You’re far away right now, and I miss you. Not loudly. Just in the quiet moments
                when something reminds me of you, or when I wish you were standing next to me.
                Distance hasn’t changed anything. It’s only made me more certain about how I feel.
                <br />
                <br />
                I may not always say things in the most romantic way. But I’ve always been honest
                with you.
                <br />
                <br />
                And today, I just don’t want to keep this quiet anymore.
                <br />
                <br />
                So I’m going to ask you something.
                <br />
                <br />
                Something simple…
                <br />
                but something I mean.
              </p>

              <p className="mt-6 text-[22px] md:text-[20px] lg:text-[45px] font-semibold text-white">
                Will you be my Valentine? <span className="align-middle">❤️</span>
              </p>

              <div className="relative mt-8 mx-auto w-full max-w-[520px]">
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={isNoDisabled || isPartyRunning}
                    onClick={handleNoClick}
                    className={`
                      rounded-full bg-white/15 border border-white/25 backdrop-blur-md
                      px-6 py-2 text-sm font-semibold text-white
                      shadow-[0_12px_30px_rgba(0,0,0,0.18)] lg:text-[20px]
                      transition hover:bg-white/20 active:scale-[0.98]
                      ${isNoDisabled || isPartyRunning ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {isNoDisabled ? "No… (wait) 💔" : "No 💔"}
                  </button>

                  <button
                    type="button"
                    disabled={isPartyRunning}
                    onClick={handleYesClick}
                    className={`
                      inline-flex items-center gap-2 rounded-full
                      bg-[linear-gradient(180deg,#ff2b75,#ff145f)]
                      px-6 py-2 text-sm font-semibold text-white
                      shadow-[0_16px_40px_rgba(255,20,95,0.35)] lg:text-[20px]
                      transition hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                      ${isPartyRunning ? "opacity-70 cursor-not-allowed" : ""}
                    `}
                  >
                    Yes ❤️ <Heart className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-4 text-white/70 text-[12px] lg:text-[20px]">
                  (Do not Press <b>No</b> 😌)
                </p>
              </div>

              {yesMode && (
                <div className="mt-8 rounded-[16px] border flex flex-col items-center border-white/20 bg-white/10 backdrop-blur-xl px-5 py-4 text-left">
                  <p className="text-white font-semibold text-[14px] lg:text-[20px] md:text-[15px]">
                    Okay wow. You said yes. I’m smiling like an idiot now. 🥹
                  </p>
                  <p className="mt-2 text-white/85 text-[13px] md:text-[14px] lg:text-[20px] leading-relaxed">
                    Consider this official: you’re my favorite person, in every timezone.
                    <br />
                  Note: This isn’t your Valentine’s gift 😌💗
I’m giving you that one in person.
                  </p>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="inline-flex items-center gap-2 rounded-full lg:text-[20px] border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15 active:scale-[0.98]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="inline-flex items-center gap-2  lg:text-[20px] rounded-full bg-white/15 border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-[0.98]"
                    >
                      Home
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute -inset-x-6 -bottom-10 h-24 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
      {modal.open && modal.type && (
        <GlassModal
          open={modal.open}
          type={modal.type === "yes" ? "yes" : "no"}
          title={modalTitle}
          message={modalMessage ?? ""}
          onClose={closeModal}
          disableActions={isFlyRunning || isPartyRunning}
        />
      )}
    </main>
  );
}
