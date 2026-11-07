/* =========================================================
   AVENGERS: DOOMSDAY - WEB AUDIO SYNTHESIZER
   Avengers Theme & Doctor Doom Ambient Synthesis
========================================================= */

(function () {
  let audioCtx = null;
  let isPlaying = false;
  let currentTrackIdx = 0;
  let timerSequence = null;

  const NOTES = {
    C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196.00, Ab3: 207.65, Bb3: 233.08,
    C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.00, Ab4: 415.30, Bb4: 466.16,
    C5: 523.25, D5: 587.33, Eb5: 622.25, REST: 0
  };

  const TRACKS = [
    {
      title: "⚔️ Avengers Assemble Theme",
      tempo: 0.32,
      melody: [
        ['C4', 1.5], ['Eb4', 1.5], ['F4', 1], ['G4', 3],
        ['C4', 1.5], ['Eb4', 1.5], ['F4', 1], ['D4', 3],
        ['C4', 1.5], ['Eb4', 1.5], ['F4', 1], ['G4', 2], ['Bb4', 1.5], ['C5', 4],
        ['REST', 1], ['Bb4', 1.5], ['G4', 1.5], ['F4', 1.5], ['Eb4', 1.5], ['C4', 4]
      ]
    },
    {
      title: "👑 Latveria: Doom's Throne Ambient",
      tempo: 0.45,
      melody: [
        ['C3', 2], ['Eb3', 2], ['G3', 3], ['Ab3', 1.5], ['G3', 3],
        ['C3', 2], ['Bb3', 2], ['Ab3', 2], ['F3', 3], ['C3', 4],
        ['REST', 2], ['Eb3', 2], ['G3', 2], ['C4', 4]
      ]
    }
  ];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, duration, type = 'sawtooth') {
    if (freq === 0 || !freq) return;
    const ctx = getAudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm brassy/heroic filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration - 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  function scheduleTrack() {
    const track = TRACKS[currentTrackIdx];
    let noteIdx = 0;

    function nextNote() {
      if (!isPlaying) return;
      if (noteIdx >= track.melody.length) {
        noteIdx = 0;
      }

      const [noteName, beats] = track.melody[noteIdx];
      const duration = beats * track.tempo;

      if (NOTES[noteName]) {
        playTone(NOTES[noteName], duration);
      }

      noteIdx++;
      timerSequence = setTimeout(nextNote, duration * 1000);
    }

    nextNote();
  }

  function toggleAudio() {
    const btn = document.getElementById('audio-play-btn');
    const titleEl = document.getElementById('audio-title');
    const visualizer = document.getElementById('audio-visualizer');

    if (isPlaying) {
      isPlaying = false;
      clearTimeout(timerSequence);
      if (btn) btn.textContent = '▶';
      if (visualizer) visualizer.classList.remove('playing');
    } else {
      isPlaying = true;
      getAudioContext();
      if (btn) btn.textContent = '⏸';
      if (visualizer) visualizer.classList.add('playing');
      if (titleEl) titleEl.textContent = TRACKS[currentTrackIdx].title;
      scheduleTrack();
    }
  }

  function nextTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % TRACKS.length;
    const titleEl = document.getElementById('audio-title');
    if (titleEl) titleEl.textContent = TRACKS[currentTrackIdx].title;

    if (isPlaying) {
      clearTimeout(timerSequence);
      scheduleTrack();
    }
  }

  function initAudio() {
    const playBtn = document.getElementById('audio-play-btn');
    const nextBtn = document.getElementById('audio-next-btn');

    if (playBtn) playBtn.addEventListener('click', toggleAudio);
    if (nextBtn) nextBtn.addEventListener('click', nextTrack);
  }

  document.addEventListener('DOMContentLoaded', initAudio);
  window.toggleAudio = toggleAudio;
})();
