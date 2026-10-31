// Bulletproof seamless audio engine with Web Audio API + Blob HTML5 fallback
// Ensures background music loops continuously from the 1st second without stopping on mobile

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private fallbackAudio: HTMLAudioElement | null = null;

  private isStarted = false;
  private isMuted = false;
  private isWebAudioActive = false;
  private listeners = new Set<(playing: boolean) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      this.preload();
      this.setupVisibilityListener();
    }
  }

  // Preload audio data into memory immediately
  private async preload() {
    try {
      const candidates = ["/audio/song.mp3", "/audio/song.m4a", "/audio/music.mp4"];
      let arrayBuffer: ArrayBuffer | null = null;
      let usedBlob: Blob | null = null;

      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const blob = await res.blob();
            usedBlob = blob;
            arrayBuffer = await blob.arrayBuffer();
            break;
          }
        } catch {
          // try next candidate
        }
      }

      if (!arrayBuffer) return;

      // Prepare Web Audio Buffer
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          if (!this.ctx) {
            this.ctx = new AudioCtx();
          }
          this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer.slice(0));
        } catch (e) {
          console.warn("Web Audio decode error, will use Blob fallback:", e);
        }
      }

      // Prepare local Blob URL fallback for HTML5 audio
      if (usedBlob) {
        try {
          const blobUrl = URL.createObjectURL(usedBlob);
          const audio = new Audio(blobUrl);
          audio.loop = true;
          audio.preload = "auto";
          // @ts-expect-error playsInline attribute for mobile webkit
          audio.playsInline = true;

          // Manual repeat insurance in case mobile browser fails native loop
          audio.addEventListener("ended", () => {
            if (this.isStarted && !this.isMuted) {
              audio.currentTime = 0;
              audio.play().catch(() => {});
            }
          });

          // Pre-empt loop boundary pause on non-range media
          audio.addEventListener("timeupdate", () => {
            if (this.isStarted && !this.isMuted && audio.duration && audio.currentTime >= audio.duration - 0.25) {
              audio.currentTime = 0;
            }
          });

          this.fallbackAudio = audio;
        } catch (e) {
          console.warn("Blob audio fallback init error:", e);
        }
      }
    } catch (err) {
      console.warn("Audio preload error:", err);
    }
  }

  // Must be called synchronously within user click/tap gesture
  public start() {
    if (this.isStarted) return;
    this.isStarted = true;

    // 1. Try Web Audio API (Primary: sample-accurate, zero-gap, indestructible loop)
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      try {
        if (!this.ctx) {
          this.ctx = new AudioCtx();
        }
        if (this.ctx.state === "suspended") {
          this.ctx.resume().catch(() => {});
        }

        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);

        if (this.audioBuffer) {
          this.playWebAudioLoop();
          this.notify();
          return;
        } else {
          // If buffer is still decoding, play as soon as ready
          const checkInterval = setInterval(() => {
            if (this.audioBuffer && this.ctx && this.gainNode) {
              clearInterval(checkInterval);
              this.playWebAudioLoop();
              this.notify();
            }
          }, 100);

          // Timeout after 3s to fallback if fetch took too long
          setTimeout(() => clearInterval(checkInterval), 3000);
        }
      } catch (err) {
        console.warn("Web Audio API start error, using HTML5 fallback:", err);
      }
    }

    // 2. Fallback to HTML5 audio with blob or direct src
    this.playFallbackLoop();
    this.notify();
  }

  private playWebAudioLoop() {
    if (!this.ctx || !this.audioBuffer || !this.gainNode) return;
    try {
      if (this.sourceNode) {
        try {
          this.sourceNode.stop();
          this.sourceNode.disconnect();
        } catch {}
      }

      const source = this.ctx.createBufferSource();
      source.buffer = this.audioBuffer;
      source.loop = true; // Hardware-level continuous sample looping!
      source.connect(this.gainNode);
      source.start(0);

      this.sourceNode = source;
      this.isWebAudioActive = true;
    } catch (err) {
      console.warn("Failed to start Web Audio loop:", err);
      this.playFallbackLoop();
    }
  }

  private playFallbackLoop() {
    if (this.isWebAudioActive) return;

    if (!this.fallbackAudio) {
      this.fallbackAudio = new Audio("/audio/song.mp3");
      this.fallbackAudio.loop = true;
      // @ts-expect-error playsInline attribute
      this.fallbackAudio.playsInline = true;
    }

    this.fallbackAudio.currentTime = 0;
    this.fallbackAudio.muted = this.isMuted;
    this.fallbackAudio.play().catch((err) => {
      console.warn("Fallback HTML5 play failed:", err);
    });
  }

  public toggle() {
    if (!this.isStarted) {
      this.start();
      return;
    }

    this.isMuted = !this.isMuted;

    if (this.isWebAudioActive && this.ctx && this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
      if (this.isMuted) {
        this.ctx.suspend().catch(() => {});
      } else {
        this.ctx.resume().catch(() => {});
      }
    }

    if (this.fallbackAudio) {
      if (this.isMuted) {
        this.fallbackAudio.pause();
      } else {
        this.fallbackAudio.play().catch(() => {});
      }
    }

    this.notify();
  }

  public getIsPlaying(): boolean {
    return this.isStarted && !this.isMuted;
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.getIsPlaying());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const playing = this.getIsPlaying();
    this.listeners.forEach((fn) => fn(playing));
  }

  private setupVisibilityListener() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && this.isStarted && !this.isMuted) {
        if (this.isWebAudioActive && this.ctx && this.ctx.state === "suspended") {
          this.ctx.resume().catch(() => {});
        }
        if (this.fallbackAudio && this.fallbackAudio.paused) {
          this.fallbackAudio.play().catch(() => {});
        }
      }
    });
  }
}

export const weddingAudio = new WeddingAudioManager();
