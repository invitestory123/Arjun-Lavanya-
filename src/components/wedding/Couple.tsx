import { wedding } from "./data";
import { Parallax } from "./Parallax";
import { Reveal, Ornament } from "./Reveal";

function FloralMotif() {
  return (
    <div className="my-4 flex items-center justify-center gap-2">
      <span className="h-px w-10 bg-gold/30" />
      <span className="text-gold text-xs">✤</span>
      <span className="h-px w-10 bg-gold/30" />
    </div>
  );
}

function Person({
  person,
}: {
  person: typeof wedding.bride;
}) {
  return (
    <Reveal className="relative">
      <div className="bg-card/90 border-gold/30 shadow-luxe relative overflow-hidden rounded-[2.5rem] border p-6 backdrop-blur-sm sm:p-7">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('/images/mandala-texture.jpg')",
            backgroundSize: "cover",
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          {/* Couple portrait */}
          <div className="border-gold/35 relative aspect-[3/4] w-full max-w-[290px] overflow-hidden rounded-[2rem] border shadow-md">
            <img
              src={person.image}
              alt={person.fullName}
              loading="lazy"
              width={682}
              height={1024}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Name & Qualification (as in Image 2 & 3) */}
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <h3 className="text-primary font-display text-3xl font-medium tracking-wide sm:text-4xl">
              {person.name}
            </h3>
            {person.qualification && (
              <span className="text-primary/75 font-sans text-xs font-semibold tracking-wider uppercase">
                {person.qualification}
              </span>
            )}
          </div>

          <FloralMotif />

          {/* Relation & Parents (with & as requested) */}
          <p className="text-muted-foreground text-[0.8rem] tracking-wide font-light">
            {person.relation}
          </p>
          <p className="text-foreground/90 font-display mt-0.5 text-base sm:text-lg font-medium tracking-wide">
            {person.parents}
          </p>

          <FloralMotif />

          {/* Heartfelt Note */}
          <p className="text-foreground/75 mx-auto max-w-xs text-xs sm:text-sm leading-relaxed">
            {person.note}
          </p>
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
          <h2 className="text-primary font-display mt-5 text-4xl font-normal">Two hearts, one journey</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-sm leading-relaxed">
            Together with joyous hearts, celebrating love, laughter, and a lifetime of togetherness.
          </p>
        </Reveal>

        <div className="mt-10 space-y-8">
          <Parallax speed={18}>
            <Person person={wedding.groom} />
          </Parallax>
          <div className="flex justify-center">
            <span className="font-script text-gold animate-float-soft text-5xl">&amp;</span>
          </div>
          <Parallax speed={-18}>
            <Person person={wedding.bride} />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
