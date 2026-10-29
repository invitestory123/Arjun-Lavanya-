import { Heart } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

export function Footer() {
  return (
    <footer className="bg-emerald-ink relative overflow-hidden px-5 pt-20 pb-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url('/images/mandala-texture.jpg')",
          backgroundSize: "120%",
          backgroundPosition: "top center",
        }}
      />
      <Aurora intensity={0.5} />
      <div className="from-emerald-ink/70 via-emerald-ink/85 to-emerald-ink absolute inset-0 bg-gradient-to-b" />

      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-4 -left-8 w-36 opacity-30"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-4 -right-8 w-36 -scale-x-100 opacity-30"
      />

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <Ornament label="With love" />
          <p className="font-script text-gold-foil mt-6 text-4xl leading-snug">
            Come bless our beginning
          </p>
          <p className="text-ivory/70 mx-auto mt-5 max-w-sm text-sm leading-relaxed">
            Your presence is the most cherished gift. Join us to celebrate love, laughter,
            and the start of our forever together.
          </p>
        </Reveal>

        {/* End photo - 3rd image */}
        <Reveal delay={0.12}>
          <div className="relative mx-auto my-10 max-w-[340px] overflow-hidden rounded-[2.5rem] border-2 border-gold/40 shadow-2xl drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)]">
            <img
              src={wedding.endImage}
              alt={`${wedding.groom.name} & ${wedding.bride.name}`}
              loading="lazy"
              width={682}
              height={1024}
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-gold/30" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-ink/90 via-emerald-ink/40 to-transparent flex items-end justify-center pb-4">
              <p className="font-script text-gold-foil text-3xl">
                Together in Love
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-4 flex flex-col items-center">
            <span className="rule-gold w-28" />
            <p className="text-ivory font-display mt-6 text-3xl font-light">
              {wedding.groom.name} <span className="font-script text-gold">&amp;</span>{" "}
              {wedding.bride.name}
            </p>
            <p className="text-ivory/50 mt-2 text-[0.6rem] tracking-[0.4em] uppercase">
              13 · 11 · 2026 · Raichur
            </p>
          </div>
        </Reveal>

        <p className="text-ivory/35 mt-12 flex items-center justify-center gap-1.5 text-[0.6rem] tracking-[0.3em] uppercase">
          Made with <Heart className="text-gold h-3 w-3 fill-current" /> for our families &amp; friends
        </p>

        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-[10px] uppercase tracking-[0.35em] text-ivory/40 transition-opacity hover:text-ivory/80"
        >
          Follow @invitestory.in on Instagram
        </a>
      </div>
    </footer>
  );
}
