import { Heart } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

export function Footer() {
  return (
    <footer className="bg-emerald-ink relative overflow-hidden px-5 pt-20 pb-16">
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
          <p className="text-ivory/75 mx-auto mt-4 max-w-sm text-sm leading-relaxed font-light">
            Your presence and warm blessings are the greatest gifts we could ask for.
            Join us as we step into our forever together.
          </p>
        </Reveal>

        {/* End photo - 3rd image (clean view, soft luxury shadow, no harsh border) */}
        <Reveal delay={0.12}>
          <div className="relative mx-auto my-9 max-w-[340px] overflow-hidden rounded-[2.5rem] shadow-2xl drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]">
            <img
              src={wedding.endImage}
              alt={`${wedding.groom.name} & ${wedding.bride.name}`}
              loading="lazy"
              width={682}
              height={1024}
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-emerald-ink via-emerald-ink/40 to-transparent flex items-end justify-center pb-5">
              <p className="font-script text-gold-foil text-3xl">
                Together in Love
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-4 flex flex-col items-center">
            <span className="rule-gold w-28" />
            <p className="text-ivory font-display mt-6 text-3xl font-light tracking-wide">
              {wedding.groom.name} <span className="font-script text-gold">&amp;</span>{" "}
              {wedding.bride.name}
            </p>
            <p className="text-ivory/50 mt-2 text-[0.6rem] tracking-[0.4em] uppercase">
              13 · 11 · 2026
            </p>
          </div>
        </Reveal>

        <p className="text-ivory/40 mt-10 flex items-center justify-center gap-1.5 text-[0.65rem] tracking-[0.25em] uppercase font-light">
          Made with <Heart className="text-gold h-3 w-3 fill-current" /> for our family &amp; friends
        </p>
      </div>
    </footer>
  );
}
