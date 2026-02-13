"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = useMemo(() => {
    let seed = 24681357;
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
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
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

        /* slide animations */
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateX(10px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

type Slide = {
  id: string;
  imageSrc: string;
  title: string;
  text: string;
};

export default function ValentineAskLikeDesign() {
  const router = useRouter();
  const nextSectionRef = useRef<HTMLElement | null>(null);

  const handleScrollDown = () => {
    nextSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goNextPage = () => {
    router.push("/ILoveYouPookie"); 
  };

  const slides: Slide[] = useMemo(
    () => [
      {
        id: "s1",
        imageSrc: "/photos/1.jpg",
        title: "The Moment It Changed",
        text: "We held hands for the first time here. You in black, me trying to act calm. I still remember every second.",
      },
      {
        id: "s2",
        imageSrc: "/photos/2.jpg",
        title: "Main character energy",
        text: "With a cat in your arms and that calm smile on your face this is you at your best.",
      },
      {
        id: "s3",
        imageSrc: "/photos/3.jpg",
        title: "Where I Get Lost",
        text: "If I ever go quiet around you, it’s probably because I’m stuck in your eyes.",
      },
      {
        id: "s4",
        imageSrc: "/photos/4.jpg",
        title: "Yes, I said it 😭",
        text: "You in traditional isn’t just beautiful. It’s the kind of beauty that makes me stop mid-sentence.And honestly? For you… I might even give chance to Rahul Gandhi.",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = slides[index];

  const next = () => {
    setIndex((p) => (p + 1) % slides.length);
    setAnimKey((k) => k + 1);
  };

  const prev = () => {
    setIndex((p) => (p - 1 + slides.length) % slides.length);
    setAnimKey((k) => k + 1);
  };

 
  useEffect(() => {
    if (paused) return;

    const t = window.setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 10000);

    return () => window.clearInterval(t);
  }, [paused, slides.length]);

  return (
    <main className="relative min-h-screen overflow-hidden">
 
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff5db1_17%,#ef017c_100%)]" />

     
      <div className="relative z-10 py-[20px] flex min-h-screen items-center justify-center px-4">
        <div className="relative w-full max-w-[330px] md:max-w-[500px] lg:max-w-[1200px] 2xl:max-w-[1400px]">
          <div
            className="
              relative
          h-auto
              rounded-[18px]
              overflow-hidden
              border border-white/25
              bg-white/10
              backdrop-blur-xl
              shadow-[0_28px_80px_rgba(0,0,0,0.30)]
              text-center
            "
          >
            <FloatingHearts count={32} />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.25),transparent_45%)]" />

            <div className="relative h-full px-7  py-[40px] md:py-[60px]  flex flex-col items-center justify-start">
              <div className="relative mb-4 h-[100px] w-[110px] overflow-hidden rounded-full">
                <div className="absolute inset-0 rounded-full bg-white/30 blur-xl" />
                <img
                  src="/Cat Love GIF by CC0 Studios.gif"
                  alt="Cute love cat"
                  className="relative h-full w-full object-cover rounded-full"
                />
              </div>

              <h1 className="text-[32px] md:text-[48px] font-semibold tracking-tight text-[#FAFAFA] drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                Hey My Love <span className="align-middle">💖</span>
              </h1>

              <p className="mt-3 text-[16px] md:text-[20px] lg:text-[26px] font-medium leading-relaxed text-white/95 max-w-4xl">
                <p>
                  I made this little space for you because what I feel for you
                  isn’t small… and I didn’t want it to stay unspoken. You’re not
                  just someone I care about, you’re the person my heart
                  recognizes, the one I think about without trying, The one who
                  feels like warmth on a hard day and peace in the middle of
                  chaos. No matter the distance, no matter how quiet things get,
                  you never feel far from me. You’re in the little pauses of my
                  day. In the way I smile for no reason.
                </p>
                <p>
                  I don’t need to make loud promises to mean something. When I
                  say I’m here, I mean it. Being close to you feels right in a
                  way I can’t explain, only feel. And if there’s one thing I’m
                  certain about, it’s that my heart stands with you. Steady.
                  Patient. Fully yours. 💗
                </p>
              </p>

              <button
                type="button"
                onClick={handleScrollDown}
                className="
                  group
                  mt-5
                  inline-flex items-center gap-2
                  text-white/90
                  cursor-pointer
                  transition-all duration-300 ease-out
                  hover:scale-[1.05]
                  rounded-full px-2 py-1
                "
                aria-label="Scroll to next section"
              >
                <span className="text-[13px] lg:text-[20px] font-semibold underline-offset-4 transition-all duration-300 group-hover:underline">
                  Scroll Down
                </span>
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute -inset-x-6 -bottom-10 h-24 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>

      <section
        ref={nextSectionRef}
        className="relative z-10 px-4 pb-16 pt-[30px] "
      >
        <div className="mx-auto w-full max-w-[330px] md:max-w-[500px] lg:max-w-[1200px] 2xl:max-w-[1400px]">
          <div
            className="
              relative h-auto
             lg:h-[1550px]
              rounded-[18px]  md:py-[60px]
              overflow-hidden
              border border-white/25
              bg-white/10
              backdrop-blur-xl
              shadow-[0_28px_80px_rgba(0,0,0,0.30)]
              text-center
              px-7 py-[40px]
              pb-[120px]
              text-white
            "
          >
            <FloatingHearts count={26} />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.22),transparent_48%)]" />

            <h2 className="relative text-xl md:text-2xl lg:text-[45px] font-semibold">
              The Little Things I Fell in Love With
            </h2>

            <p className="relative mt-3 text-white/85 max-w-3xl mx-auto leading-relaxed text-[14px] md:text-[16px] lg:text-[26px] lg:mt-[3rem]">
              <p>
                {" "}
                I don’t think I ever meant to fall this hard. I wasn’t waiting
                for some big moment or dramatic sign. It just happened slowly…
                and then all at once.
              </p>
              <p>
                It was the little things. The way you smile without thinking
                about it. The way your eyes change when you’re happy. The small
                expressions you make when you’re focused or pretending not to
                laugh. The quiet confidence you carry without even noticing it.
                </p>
              
                <p>
                Somewhere in between those moments, I realized I wasn’t just
                admiring you anymore. I was falling for you. And even when I
                annoy you and you get all dramatic and a little angry, those
                long, passionate explanations you give about the most random
                topics somehow make me fall even harder for you. And honestly… I
                wouldn’t change a thing. 💗
              </p>
            </p>
            <div className="relative mt-6 flex justify-center">
              <div className="relative h-[130px] w-[190px] md:h-[110px] md:w-[110px] lg:w-[380px] lg:h-[280px] overflow-hidden">
                <div className="pointer-events-none absolute inset-0 blur-xl" />
                <img
                  src="/love.gif"
                  alt="Love gif"
                  className="relative h-full w-full object-cover"
                />
              </div>
            </div>
            <div
              className="
                relative
                mt-1 md:mt-10
                mx-auto
                w-full
                max-w-5xl
                rounded-[18px]
                overflow-hidden
                border border-white/20
                bg-white/10
                backdrop-blur-xl
                shadow-[0_18px_60px_rgba(0,0,0,0.20)]
              "
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative flex flex-col lg:flex-row">
                <div className="relative lg:w-[58%]">
                  <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
                    <img
                      key={`img-${active.id}-${animKey}`}
                      src={active.imageSrc}
                      alt={active.title}
                      className="h-full w-full object-cover motion-safe:animate-[fadeSlideIn_.55s_ease-out_both]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                </div>
                <div className="relative lg:w-[42%] text-left p-5 sm:p-6 md:p-8">
                  <div
                    key={`txt-${active.id}-${animKey}`}
                    className="motion-safe:animate-[fadeUp_.55s_ease-out_both]"
                  >
                    <h3 className="text-[18px] lg:text-[32px] sm:text-[20px] md:text-[22px] font-semibold">
                      {active.title}
                    </h3>
                    <p className="mt-3 text-white/85 leading-relaxed text-[14px] lg:text-[22px] sm:text-[15px] md:text-[16px]">
                      {active.text}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      className="
                        inline-flex items-center gap-2
                        rounded-full
                        border border-white/25
                        bg-white/10 lg:text-[20px]
                        px-4 py-2
                        text-sm font-semibold
                        text-white
                        transition
                        hover:bg-white/15
                        active:scale-[0.98]
                      "
                    >
                      <ChevronLeft className="h-4 w-4 lg:w-8 lg:h-8" />
                      Prev
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      className="
                        inline-flex items-center gap-2
                        rounded-full
                        bg-[linear-gradient(180deg,#ff2b75,#ff145f)]
                        px-4 py-2
                        text-sm font-semibold
                        text-white
                        shadow-[0_16px_40px_rgba(255,20,95,0.35)]
                        transition lg:text-[20px]
                        hover:-translate-y-0.5
                        active:translate-y-0
                        active:scale-[0.98]
                      "
                    >
                      Next
                      <ChevronRight className="h-4 w-4 lg:w-8 lg:h-8" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <button
              type="button"
              onClick={goNextPage}
              className="
                absolute bottom-6 left-1/2 -translate-x-1/2
                z-30
                group
                inline-flex items-center gap-2
                text-white/90
                transition-all duration-300 ease-out
                hover:scale-[1.05]
                rounded-full px-4 py-2
                bg-white/10 
                border border-white/25
                backdrop-blur-xl
                shadow-[0_18px_50px_rgba(0,0,0,0.25)]
              "
              aria-label="Go to next page"
            >
              <span className="text-[13px] lg:text-[20px] font-semibold underline-offset-4 transition-all duration-300 group-hover:underline">
                Next
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
