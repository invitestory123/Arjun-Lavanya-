import { CalendarPlus, Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function addToCalendar(event: (typeof wedding.events)[number]) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-${event.id}`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp(event.dateISO)}`,
    `DTEND:${icsStamp(event.endISO)}`,
    `SUMMARY:${wedding.groom.name} & ${wedding.bride.name} — ${event.title}`,
    `LOCATION:${event.venue.name}, ${event.venue.address}`,
    `DESCRIPTION:You are cordially invited to celebrate the ${event.title} of ${wedding.groom.name} and ${wedding.bride.name}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}-invite.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function EventDetails() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="When & Where" />
          <h2 className="text-primary font-display mt-5 text-4xl font-light">The Celebrations</h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-xs tracking-wide">
            We eagerly look forward to your presence and blessings
          </p>
        </Reveal>

        <div className="mt-8 space-y-10">
          {wedding.events.map((evt, idx) => {
            const rows = [
              { icon: Sparkles, label: "Ceremony", value: evt.muhurthamLabel },
              { icon: Clock, label: "Time", value: evt.timeLabel },
              { icon: MapPin, label: "Venue", value: evt.venue.name },
            ];

            return (
              <Reveal key={evt.id} delay={idx * 0.12}>
                <div className="border-gold/30 bg-card shadow-luxe overflow-hidden rounded-[2.5rem] border">
                  {/* Event Header */}
                  <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-7 text-center">
                    <span className="border-gold/30 text-gold-soft inline-block rounded-full border px-3 py-0.5 text-[0.55rem] tracking-[0.4em] uppercase">
                      {evt.title}
                    </span>
                    <p className="text-ivory font-display mt-3 text-5xl font-light">{evt.day}</p>
                    <p className="text-ivory/85 text-xs tracking-[0.35em] uppercase font-medium mt-1">
                      {evt.monthYear}
                    </p>
                    <p className="text-gold/80 mt-1 text-[0.65rem] tracking-[0.25em] uppercase">
                      {evt.dateLabel}
                    </p>
                  </div>

                  {/* Details rows */}
                  <div className="divide-gold/15 divide-y">
                    {rows.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-4 px-6 py-4">
                        <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                            {label}
                          </p>
                          <p className="text-foreground text-sm font-medium leading-snug">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Venue Address & Action Buttons */}
                  <div className="bg-secondary/40 border-gold/15 border-t px-6 py-5 text-center">
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {evt.venue.address}
                    </p>

                    <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                      <motion.a
                        whileTap={{ scale: 0.97 }}
                        href={evt.venue.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="border-gold/50 text-primary hover:bg-card flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-xs tracking-[0.25em] uppercase transition-colors"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        Directions
                      </motion.a>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addToCalendar(evt)}
                        className="from-primary to-emerald-ink text-ivory shadow-gold flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r py-3 text-xs tracking-[0.25em] uppercase"
                      >
                        <CalendarPlus className="h-3.5 w-3.5" />
                        Calendar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
