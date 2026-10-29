import { wedding } from "./data";
import { Parallax } from "./Parallax";
import { Reveal, Ornament } from "./Reveal";

function Person({
  person,
  role,
}: {
  person: typeof wedding.bride;
  role: string;
}) {
  return (
    <Reveal className="relative">
      <div className="bg-card/70 border-gold/30 shadow-luxe relative overflow-hidden rounded-[2.5rem] border p-6 backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('/images/mandala-texture.jpg')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative flex flex-col items-center text-center">
          <div className="border-gold/40 relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[2rem] border-2 shadow-md">
            <img
              src={person.image}
              alt={person.fullName}
              loading="lazy"
              width={682}
              height={1024}
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-gold/20" />
          </div>
          <span className="text-gold mt-6 text-[0.65rem] tracking-[0.45em] uppercase font-medium">
            {role}
          </span>
          <h3 className="text-primary font-display mt-2 text-3xl font-light">{person.fullName}</h3>
          <p className="text-muted-foreground mt-1 text-xs tracking-wide">{person.line}</p>
          <span className="rule-gold my-4 w-20" />
          <p className="text-foreground/75 text-sm leading-relaxed max-w-xs">{person.note}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Couple() {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-6 -left-10 w-44 opacity-40"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-10 -bottom-6 w-44 rotate-180 opacity-40"
      />

      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="The Couple" />
          <h2 className="text-primary font-display mt-5 text-4xl font-light">Two hearts, one journey</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-sm leading-relaxed">
            Together with joyous hearts, celebrating love, laughter, and a lifetime of togetherness.
          </p>
        </Reveal>

        <div className="mt-10 space-y-8">
          <Parallax speed={20}>
            <Person person={wedding.groom} role="The Groom" />
          </Parallax>
          <div className="flex justify-center">
            <span className="font-script text-gold animate-float-soft text-5xl">&amp;</span>
          </div>
          <Parallax speed={-20}>
            <Person person={wedding.bride} role="The Bride" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
