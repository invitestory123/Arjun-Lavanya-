// Continuous background music engine using Web Audio API for infinite seamless looping of "music.mp4"

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private fallbackAudio: HTMLAudioElement | null = null;

  private isStarted = false;
  private isMuted = false;
  private isWebAudioActive = false;
  private loadPromise: Promise<AudioBuffer | null> | null = null;
  private listeners = new Set<(playing: boolean) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      this.loadPromise = this.preload();
      this.setupVisibilityListener();
    }
  }

  // Preload and decode /audio/music.mp4 directly into memory
  private async preload(): Promise<AudioBuffer | null> {
    try {
      const res = await fetch("/audio/music.mp4");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (AudioCtx) {
        if (!this.ctx) {
          this.ctx = new AudioCtx();
        }
        this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer.slice(0));
        return this.audioBuffer;
      }
    } catch (err) {
      console.warn("Audio preload error for /audio/music.mp4:", err);
    }
    return null;
  }

  // Synchronous entry point called upon user gesture (wax seal click)
  public async start() {
    if (this.isStarted) return;
    this.isStarted = true;

    // 1. Primary Engine: Web Audio API (Indestructible in-memory hardware loop)
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (AudioCtx) {
      try {
        if (!this.ctx) {
          this.ctx = new AudioCtx();
        }
        // Unlock AudioContext synchronously inside user interaction
        if (this.ctx.state === "suspended") {
          this.ctx.resume().catch(() => {});
        }

        if (!this.gainNode) {
          this.gainNode = this.ctx.createGain();
          this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
          this.gainNode.connect(this.ctx.destination);
        }

        if (!this.audioBuffer && this.loadPromise) {
          await this.loadPromise;
        }

        if (this.audioBuffer) {
          this.playWebAudioLoop();
          this.notify();
          return;
        }
      } catch (err) {
        console.warn("Web Audio API start error, using HTML5 fallback:", err);
      }
    }

    // 2. Fallback Engine: HTML5 Audio on music.mp4
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
      this.fallbackAudio = new Audio("/audio/music.mp4");
      this.fallbackAudio.loop = true;
      // @ts-expect-error playsInline attribute for mobile
      this.fallbackAudio.playsInline = true;

      // Ensure playback loops continuously when finished
      this.fallbackAudio.addEventListener("ended", () => {
        if (this.isStarted && !this.isMuted && this.fallbackAudio) {
          this.fallbackAudio.currentTime = 0;
          this.fallbackAudio.play().catch(() => {});
        }
      });

      this.fallbackAudio.addEventListener("timeupdate", () => {
        const a = this.fallbackAudio;
        if (this.isStarted && !this.isMuted && a && a.duration && a.currentTime >= a.duration - 0.25) {
          a.currentTime = 0;
        }
      });
    }

    this.fallbackAudio.currentTime = 0;
    this.fallbackAudio.muted = this.isMuted;
    this.fallbackAudio.play().catch((err) => {
      console.warn("HTML5 fallback play error:", err);
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
