import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { weddingAudio } from "@/lib/weddingAudio";

export function MusicPlayer({ isOpened }: { isOpened: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isOpened) {
      weddingAudio.start();
    }
  }, [isOpened]);

  const toggleMusic = () => {
    weddingAudio.toggle();
  };

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-5 right-5 z-40"
        >
          <motion.button
            onClick={toggleMusic}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="border-gold/40 bg-emerald-ink/85 shadow-gold text-gold flex items-center gap-2 rounded-full border px-3.5 py-2.5 backdrop-blur-md transition-all hover:border-gold"
          >
            {isPlaying ? (
              <>
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-gold rounded-full h-2.5 animate-pulse" />
                  <span className="w-0.5 bg-gold rounded-full h-3 animate-pulse delay-100" />
                  <span className="w-0.5 bg-gold rounded-full h-1.5 animate-pulse delay-200" />
                </div>
                <Volume2 className="h-3.5 w-3.5 text-gold" />
              </>
            ) : (
              <>
                <Music className="h-3.5 w-3.5 text-gold/60" />
                <VolumeX className="h-3.5 w-3.5 text-gold/60" />
              </>
            )}
            <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-ivory/80">
              {isPlaying ? "Music" : "Muted"}
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
