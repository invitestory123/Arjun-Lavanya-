import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { wedding } from "./data";

export function MusicPlayer({ isOpened }: { isOpened: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Ensure loop is set explicitly on the audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  // When user opens the invitation, attempt autoplay
  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay blocked, user can tap music button:", err);
      });
    }
  }, [isOpened]);

  // Loop fallback if mobile browser fires ended instead of looping
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Loop playback restart:", err);
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
      >
        <source src="/audio/song.mp3" type="audio/mpeg" />
        <source src="/audio/song.m4a" type="audio/mp4" />
        <source src={wedding.audioSrc} type="audio/mp4" />
        <source src={wedding.audioSrc} type="video/mp4" />
      </audio>

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
    </>
  );
}

