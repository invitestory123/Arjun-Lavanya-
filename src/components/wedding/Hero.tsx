import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Aurora } from "@/components/Aurora";
import { Petals } from "./Petals";
import { wedding } from "./data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });

  const glowY = useTransform(smooth, [0, 1], ["0%", "22%"]);
  const garlandY = useTransform(smooth, [0, 1], ["0%", "-30%"]);
  const textY = useTransform(smooth, [0, 1], ["0%", "45%"]);
  const textOpacity = useTransform(smooth, [0, 0.65], [1, 0]);
  const coupleY = useTransform(smooth, [0, 1], ["0%", "-8%"]);
  const coupleScale = useTransform(smooth, [0, 1], [1, 1.04]);

  return (
    <section
      ref={ref}
      className="bg-emerald-deep relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden pb-10"
    >
      <Aurora intensity={1} />
      <div className="from-emerald-ink/55 via-emerald-deep/20 to-emerald-ink/90 absolute inset-0 bg-gradient-to-b" />
      <motion.div
        aria-hidden
        style={{
          y: glowY,
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.93 0.05 92 / 0.55), transparent 62%)",
        }}
        className="absolute bottom-0 left-1/2 h-[62%] w-[130%] -translate-x-1/2 rounded-t-full blur-2xl"
      />

      <Petals count={12} />

      {/* Traditional Marigold Festoon & Orange Strands (positioned upward, clear of headline) */}
      <motion.img
        src="/images/garland.png"
        alt=""
        aria-hidden
        style={{ y: garlandY }}
        className="pointer-events-none absolute -top-4 sm:-top-6 left-1/2 w-[116%] sm:w-[108%] max-w-none -translate-x-1/2 opacity-95 drop-shadow-md z-10"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pt-28 text-center sm:pt-32">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-gold-soft/90 text-[0.62rem] tracking-[0.45em] uppercase font-medium"
          >
            Together with their families
          </motion.p>

          {/* Names with Font Correction & & */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-col items-center"
          >
            <span className="text-gold-foil font-display inline-block px-3 pt-1 pb-4 text-[4rem] sm:text-[4.5rem] font-medium tracking-wide leading-[1.1] sm:leading-[1.15] drop-shadow-[0_2px_14px_rgba(212,175,55,0.3)]">
              {wedding.groom.name}
            </span>
            <span className="font-script text-gold/90 -my-3 text-3xl sm:text-4xl">&amp;</span>
            <span className="text-gold-foil font-display inline-block px-3 pt-1 pb-4 text-[4rem] sm:text-[4.5rem] font-medium tracking-wide leading-[1.1] sm:leading-[1.15] drop-shadow-[0_2px_14px_rgba(212,175,55,0.3)]">
              {wedding.bride.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="rule-gold mt-4 w-36"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="text-ivory/90 mt-4 text-sm tracking-[0.35em] uppercase font-medium"
          >
            13 · 11 · 2026
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-ivory/60 mt-1.5 text-[0.7rem] tracking-[0.25em] uppercase"
          >
            Devadurga · Raichur
          </motion.p>
        </motion.div>

        {/* Cover Photo: Full View with NO Border */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.65, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: coupleY, scale: coupleScale }}
          className="relative mt-8 mb-4 w-full max-w-[430px] overflow-hidden rounded-3xl shadow-2xl drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
        >
          <img
            src={wedding.coverImage}
            alt={`${wedding.groom.name} & ${wedding.bride.name}`}
            width={1024}
            height={682}
            className="h-auto w-full object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ opacity: textOpacity }}
        className="text-gold/70 relative z-20 flex flex-col items-center"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
