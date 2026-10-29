import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Hero } from "@/components/wedding/Hero";
import { Couple } from "@/components/wedding/Couple";
import { Countdown } from "@/components/wedding/Countdown";
import { EventDetails } from "@/components/wedding/EventDetails";
import { Footer } from "@/components/wedding/Footer";
import { Opener } from "@/components/wedding/Opener";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { wedding } from "@/components/wedding/data";

const title = `${wedding.groom.name} & ${wedding.bride.name} · 13 November 2026`;
const description = `Together with their families, ${wedding.groom.name} and ${wedding.bride.name} invite you to celebrate their wedding on 13 November 2026 at ${wedding.venue.name}, ${wedding.venue.address}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: wedding.coverImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened && <Opener key="opener" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && <ScrollProgress />}
      <MusicPlayer isOpened={opened} />

      <motion.main
        initial={{ opacity: 0, scale: 1.03 }}
        animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-background mx-auto w-full max-w-[520px] overflow-hidden"
      >
        <Hero />
        <Couple />
        <Countdown />
        <EventDetails />
        <Footer />
      </motion.main>
    </>
  );
}
