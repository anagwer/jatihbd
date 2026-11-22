// Pure Web Audio API Vintage Sound & Music Engine
// Synthesizes warm music-box / Rhodes chords, vinyl crackle, and tactile parlor SFX

class VintageSoundEngine {
  private ctx: AudioContext | null = null;
  private musicPlaying = false;
  private crackleEnabled = true;
  private loopTimer: number | null = null;
  private crackleNode: AudioNode | null = null;
  private crackleGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.7;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'triangle',
    volume = 0.12
  ) {
    const ctx = this.ensureContext();
    if (!this.masterGain) return;

    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle warm octave/detune for vintage celesta / electric piano warmth
    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.18, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    oscHarmonic.start(startTime);
    osc.stop(startTime + duration + 0.05);
    oscHarmonic.stop(startTime + duration + 0.05);
  }

  private startVinylCrackle() {
    const ctx = this.ensureContext();
    if (!this.masterGain || this.crackleNode) return;

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const r = Math.random();
      // Sparse pops + ultra-soft hiss
      if (r > 0.9985) {
        data[i] = (Math.random() * 2 - 1) * 0.45;
      } else if (r > 0.992) {
        data[i] = (Math.random() * 2 - 1) * 0.08;
      } else {
        data[i] = (Math.random() * 2 - 1) * 0.006;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1800;
    bandpass.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.value = this.crackleEnabled ? 0.28 : 0;

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.masterGain);
    noise.start();

    this.crackleNode = noise;
    this.crackleGain = gain;
  }

  private stopVinylCrackle() {
    if (this.crackleNode && 'stop' in this.crackleNode) {
      try {
        (this.crackleNode as AudioBufferSourceNode).stop();
      } catch {
        // ignore if already stopped
      }
    }
    this.crackleNode = null;
    this.crackleGain = null;
  }

  public setCrackle(enabled: boolean) {
    this.crackleEnabled = enabled;
    if (this.crackleGain && this.ctx) {
      this.crackleGain.gain.setTargetAtTime(enabled ? 0.28 : 0, this.ctx.currentTime, 0.05);
    }
  }

  public isCrackleEnabled(): boolean {
    return this.crackleEnabled;
  }

  public isMusicPlaying(): boolean {
    return this.musicPlaying;
  }

  public startVintageMusic() {
    if (this.musicPlaying) return;
    const ctx = this.ensureContext();
    this.musicPlaying = true;
    this.startVinylCrackle();

    // Warm Vintage Waltz / Happy Birthday Music-Box Arrangement in F Major
    // [frequency, beatOffset, durationBeats]
    const melody: Array<[number, number, number]> = [
      // "Happy birthday to you"
      [261.63, 0, 0.7],
      [261.63, 0.75, 0.35],
      [293.66, 1.15, 0.9],
      [261.63, 2.15, 0.9],
      [349.23, 3.15, 0.9],
      [329.63, 4.15, 1.7],

      // "Happy birthday to you"
      [261.63, 6.0, 0.7],
      [261.63, 6.75, 0.35],
      [293.66, 7.15, 0.9],
      [261.63, 8.15, 0.9],
      [392.0, 9.15, 0.9],
      [349.23, 10.15, 1.7],

      // "Happy birthday dear Jati"
      [261.63, 12.0, 0.7],
      [261.63, 12.75, 0.35],
      [523.25, 13.15, 0.9],
      [440.0, 14.15, 0.9],
      [349.23, 15.15, 0.9],
      [329.63, 16.15, 0.9],
      [293.66, 17.15, 1.5],

      // "Happy birthday to you"
      [466.16, 18.85, 0.7],
      [466.16, 19.6, 0.35],
      [440.0, 20.0, 0.9],
      [349.23, 21.0, 0.9],
      [392.0, 22.0, 0.9],
      [349.23, 23.0, 2.2],
    ];

    // Soft warm accompaniment chords
    const chords: Array<[number[], number, number]> = [
      [[174.61, 220.0, 261.63], 1.15, 2.8], // Fmaj
      [[130.81, 196.0, 261.63], 4.15, 2.8], // C
      [[130.81, 196.0, 246.94], 7.15, 2.8], // C7
      [[174.61, 220.0, 261.63], 10.15, 2.8], // Fmaj
      [[174.61, 220.0, 261.63], 13.15, 2.8], // Fmaj
      [[116.54, 174.61, 233.08], 16.15, 2.5], // Bb
      [[130.81, 174.61, 220.0], 20.0, 2.0], // F/C
      [[174.61, 220.0, 261.63], 23.0, 2.4], // Fmaj
    ];

    const beatSec = 0.48;
    const loopDurationMs = 27.5 * beatSec * 1000;

    const schedulePass = () => {
      if (!this.musicPlaying) return;
      const now = ctx.currentTime + 0.08;

      melody.forEach(([freq, offset, dur]) => {
        this.playTone(freq, now + offset * beatSec, dur * beatSec * 1.25, 'triangle', 0.085);
      });

      chords.forEach(([notes, offset, dur]) => {
        notes.forEach((n) => {
          this.playTone(n, now + offset * beatSec, dur * beatSec * 1.1, 'sine', 0.032);
        });
      });
    };

    schedulePass();
    this.loopTimer = window.setInterval(schedulePass, loopDurationMs);
  }

  public stopVintageMusic() {
    this.musicPlaying = false;
    if (this.loopTimer !== null) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    this.stopVinylCrackle();
  }

  public toggleVintageMusic(): boolean {
    if (this.musicPlaying) {
      this.stopVintageMusic();
    } else {
      this.startVintageMusic();
    }
    return this.musicPlaying;
  }

  public playWaxSealBreak() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    // Crisp wax snap + warm chime
    this.playTone(140, now, 0.14, 'triangle', 0.15);
    this.playTone(523.25, now + 0.06, 0.5, 'sine', 0.08);
    this.playTone(659.25, now + 0.14, 0.6, 'sine', 0.08);
  }

  public playCardFlip() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    this.playTone(320, now, 0.08, 'sine', 0.045);
    this.playTone(480, now + 0.03, 0.07, 'triangle', 0.03);
  }

  public playMatchChime() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((f, idx) => {
      this.playTone(f, now + idx * 0.07, 0.45, 'triangle', 0.07);
    });
  }

  public playCandyCatch() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    this.playTone(587.33, now, 0.12, 'triangle', 0.07);
    this.playTone(880, now + 0.05, 0.18, 'sine', 0.06);
  }

  public playBitterMiss() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    this.playTone(150, now, 0.18, 'sawtooth', 0.05);
    this.playTone(115, now + 0.07, 0.2, 'triangle', 0.06);
  }

  public playCandleBlow() {
    const ctx = this.ensureContext();
    if (!this.masterGain) return;
    const now = ctx.currentTime;

    // Soft breathy whoosh
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + 0.32);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(now);
  }

  public playCelebrationFanfare() {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    const notes = [349.23, 440.0, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      this.playTone(n, now + i * 0.09, 0.85, 'triangle', 0.09);
    });
  }
}

export const soundEngine = new VintageSoundEngine();
