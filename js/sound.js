/**
 * AIクエスト - サウンドシステム
 * Web Audio APIで効果音をプログラム生成
 */

const SoundSystem = {
  ctx: null,
  enabled: true,
  masterVolume: 0.4,

  // AudioContext初期化（ユーザー操作後に呼ぶ）
  init: function() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
      this.enabled = false;
    }
  },

  // コンテキストのresume（iOS対応）
  resume: function() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  // 基本のノート再生
  playNote: function(freq, duration, type, vol, startTime) {
    if (!this.ctx || !this.enabled) return;
    const t = startTime || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'square';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol * this.masterVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  },

  // ノイズ生成
  playNoise: function(duration, vol, startTime) {
    if (!this.ctx || !this.enabled) return;
    const t = startTime || this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol * this.masterVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    source.connect(gain);
    gain.connect(this.ctx.destination);
    source.start(t);
  },

  // ========================================
  // 効果音
  // ========================================

  // ボタン選択音
  select: function() {
    this.init();
    this.resume();
    this.playNote(880, 0.08, 'square', 0.2);
    this.playNote(1100, 0.08, 'square', 0.15, this.ctx.currentTime + 0.05);
  },

  // ゲーム開始音
  gameStart: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNote(523, 0.15, 'square', 0.25, t);
    this.playNote(659, 0.15, 'square', 0.25, t + 0.12);
    this.playNote(784, 0.15, 'square', 0.25, t + 0.24);
    this.playNote(1047, 0.3, 'square', 0.3, t + 0.36);
  },

  // バトル開始音
  battleStart: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNote(330, 0.12, 'square', 0.2, t);
    this.playNote(392, 0.12, 'square', 0.2, t + 0.1);
    this.playNote(523, 0.12, 'square', 0.2, t + 0.2);
    this.playNote(659, 0.2, 'square', 0.3, t + 0.3);
  },

  // 通常攻撃ヒット
  hit: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNoise(0.08, 0.3, t);
    this.playNote(200, 0.1, 'sawtooth', 0.3, t);
    this.playNote(150, 0.08, 'sawtooth', 0.2, t + 0.05);
  },

  // 弱点攻撃ヒット
  effectiveHit: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNoise(0.1, 0.35, t);
    this.playNote(400, 0.12, 'sawtooth', 0.3, t);
    this.playNote(600, 0.1, 'square', 0.25, t + 0.05);
    this.playNote(800, 0.15, 'square', 0.2, t + 0.1);
  },

  // クリティカルヒット
  criticalHit: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNoise(0.15, 0.4, t);
    this.playNote(600, 0.1, 'sawtooth', 0.35, t);
    this.playNote(800, 0.1, 'sawtooth', 0.35, t + 0.05);
    this.playNote(1000, 0.1, 'square', 0.3, t + 0.1);
    this.playNote(1200, 0.15, 'square', 0.25, t + 0.15);
    this.playNote(1500, 0.2, 'square', 0.3, t + 0.2);
  },

  // 効果イマイチ
  weakHit: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNote(200, 0.15, 'sine', 0.15, t);
    this.playNote(150, 0.2, 'sine', 0.1, t + 0.08);
  },

  // プレイヤーがダメージを受ける
  playerDamage: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNoise(0.12, 0.25, t);
    this.playNote(300, 0.1, 'sawtooth', 0.25, t);
    this.playNote(200, 0.15, 'sawtooth', 0.2, t + 0.06);
    this.playNote(100, 0.2, 'sawtooth', 0.15, t + 0.12);
  },

  // 防御成功
  guard: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNote(800, 0.05, 'square', 0.3, t);
    this.playNote(600, 0.05, 'square', 0.25, t + 0.04);
    this.playNote(800, 0.1, 'square', 0.2, t + 0.08);
  },

  // コンボ音（コンボ数に応じて音程が上がる）
  combo: function(count) {
    this.init();
    this.resume();
    const baseFreq = 600 + (count * 80);
    const t = this.ctx.currentTime;
    this.playNote(baseFreq, 0.08, 'square', 0.2, t);
    this.playNote(baseFreq * 1.25, 0.1, 'square', 0.15, t + 0.06);
  },

  // 敵撃破
  enemyDefeated: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNoise(0.15, 0.3, t);
    this.playNote(523, 0.12, 'square', 0.3, t + 0.1);
    this.playNote(659, 0.12, 'square', 0.3, t + 0.22);
    this.playNote(784, 0.12, 'square', 0.3, t + 0.34);
    this.playNote(1047, 0.4, 'square', 0.35, t + 0.46);
    this.playNote(784, 0.15, 'square', 0.2, t + 0.7);
    this.playNote(1047, 0.5, 'square', 0.3, t + 0.85);
  },

  // ゲームオーバー
  gameOver: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNote(400, 0.3, 'square', 0.25, t);
    this.playNote(350, 0.3, 'square', 0.25, t + 0.3);
    this.playNote(300, 0.3, 'square', 0.25, t + 0.6);
    this.playNote(200, 0.6, 'sawtooth', 0.3, t + 0.9);
  },

  // 勝利ファンファーレ
  victory: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    // ファンファーレ
    this.playNote(523, 0.12, 'square', 0.25, t);
    this.playNote(523, 0.12, 'square', 0.25, t + 0.12);
    this.playNote(523, 0.12, 'square', 0.25, t + 0.24);
    this.playNote(523, 0.35, 'square', 0.3, t + 0.4);
    this.playNote(415, 0.35, 'square', 0.3, t + 0.75);
    this.playNote(466, 0.35, 'square', 0.3, t + 1.1);
    this.playNote(523, 0.2, 'square', 0.3, t + 1.45);
    this.playNote(466, 0.15, 'square', 0.25, t + 1.65);
    this.playNote(523, 0.6, 'square', 0.35, t + 1.8);
  },

  // スキル獲得
  skillGet: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    this.playNote(700, 0.1, 'sine', 0.25, t);
    this.playNote(900, 0.1, 'sine', 0.25, t + 0.08);
    this.playNote(1100, 0.1, 'sine', 0.25, t + 0.16);
    this.playNote(1400, 0.3, 'sine', 0.3, t + 0.24);
  }
};
