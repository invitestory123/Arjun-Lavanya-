import { Calendar, Clock, MapPin } from "lucide-react";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

function FloralDivider() {
  return (
    <div className="my-5 flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/40" />
      <span className="text-gold text-xs">❖</span>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

export function EventDetails() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="Auspicious Ceremonies" />
          <h2 className="text-primary font-display mt-5 text-4xl font-normal">
            The Celebrations
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-xs tracking-wide">
            Together with their families, cordially invite your gracious presence and blessings
          </p>
        </Reveal>

        <div className="mt-8 space-y-10">
          {wedding.events.map((evt, idx) => (
            <Reveal key={evt.id} delay={idx * 0.12}>
              <div className="border-gold/35 bg-card/95 shadow-luxe relative overflow-hidden rounded-[2.5rem] border backdrop-blur-sm">
                {/* Traditional Mandala Watermark */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "url('/images/mandala-texture.jpg')",
                    backgroundSize: "cover",
                  }}
                />

                {/* Event Header Banner */}
                <div className="from-primary to-emerald-ink relative bg-gradient-to-br px-6 py-6 text-center">
                  <span className="border-gold/30 text-gold-soft inline-block rounded-full border px-4 py-0.5 text-[0.6rem] tracking-[0.35em] uppercase font-medium">
                    {evt.title}
                  </span>
                  {evt.kannadaTitle && (
                    <p className="text-gold/90 mt-2 text-xs tracking-wide font-normal">
                      {evt.kannadaTitle}
                    </p>
                  )}
                  <p className="text-ivory font-display mt-3 text-5xl font-light">{evt.day}</p>
                  <p className="text-ivory/90 text-xs tracking-[0.35em] uppercase font-medium mt-1">
                    {evt.monthYear}
                  </p>
                  <p className="text-gold/80 mt-1 text-[0.7rem] tracking-[0.25em] uppercase">
                    {evt.dateLabel}
                  </p>
                </div>

                {/* Sacred Invitation Body (pure invitation card styling, no link buttons) */}
                <div className="relative px-6 py-7 text-center">
                  {/* Muhurtham / Ceremony Timings */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 text-gold">
                      <Clock className="h-4 w-4" />
                      <span className="text-[0.65rem] tracking-[0.35em] uppercase font-semibold text-primary">
                        Timings
                      </span>
                    </div>
                    <p className="text-foreground font-display mt-1 text-2xl font-medium tracking-wide">
                      {evt.timeLabel}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-normal">
                      {evt.muhurthamLabel}
                    </p>
                  </div>

                  <FloralDivider />

                  {/* Sacred Venue */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 text-gold">
                      <MapPin className="h-4 w-4" />
                      <span className="text-[0.65rem] tracking-[0.35em] uppercase font-semibold text-primary">
                        Venue
                      </span>
                    </div>
                    <p className="text-foreground font-display mt-1.5 text-xl sm:text-2xl font-medium leading-snug">
                      {evt.venue.name}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed max-w-xs">
                      {evt.venue.address}
                    </p>

                    {evt.venue.mapUrl && (
                      <a
                        href={evt.venue.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-4 inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gradient-to-r from-gold/15 via-gold/10 to-gold/15 px-5 py-2 text-[0.68rem] tracking-[0.25em] uppercase font-medium text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-gold hover:from-gold/25 hover:to-gold/25 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <MapPin className="h-3.5 w-3.5 text-gold transition-transform duration-300 group-hover:-translate-y-0.5" />
                        <span>View on Google Maps</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Gold filigree bottom accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
