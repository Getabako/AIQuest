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

  // 通常攻撃ヒット（バシッ！）
  hit: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    // 重いノイズ衝撃音
    this.playNoise(0.12, 0.5, t);
    // 低音のインパクト
    this.playNote(80, 0.15, 'sawtooth', 0.5, t);
    this.playNote(120, 0.1, 'square', 0.4, t);
    // 中音のアタック
    this.playNote(300, 0.06, 'sawtooth', 0.35, t + 0.02);
    this.playNote(150, 0.1, 'sawtooth', 0.3, t + 0.05);
  },

  // 弱点攻撃ヒット（ズバシッ！！）
  effectiveHit: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    // 強いノイズ
    this.playNoise(0.15, 0.55, t);
    // 低音ドスン
    this.playNote(60, 0.18, 'sawtooth', 0.55, t);
    this.playNote(100, 0.12, 'square', 0.45, t);
    // 中音スラッシュ
    this.playNote(350, 0.08, 'sawtooth', 0.4, t + 0.02);
    this.playNote(500, 0.06, 'square', 0.35, t + 0.04);
    // 高音キラン
    this.playNote(800, 0.1, 'square', 0.25, t + 0.06);
    this.playNote(1000, 0.12, 'square', 0.2, t + 0.08);
  },

  // クリティカルヒット（ドガシャァ！！！）
  criticalHit: function() {
    this.init();
    this.resume();
    const t = this.ctx.currentTime;
    // 最大ノイズ衝撃
    this.playNoise(0.2, 0.6, t);
    this.playNoise(0.1, 0.5, t + 0.05);
    // 超低音ズドン
    this.playNote(50, 0.2, 'sawtooth', 0.6, t);
    this.playNote(80, 0.15, 'square', 0.5, t);
    // 中音連打
    this.playNote(300, 0.08, 'sawtooth', 0.45, t + 0.02);
    this.playNote(450, 0.06, 'sawtooth', 0.4, t + 0.05);
    // 高音エフェクト（上昇音）
    this.playNote(600, 0.06, 'square', 0.35, t + 0.08);
    this.playNote(900, 0.08, 'square', 0.3, t + 0.1);
    this.playNote(1200, 0.1, 'square', 0.25, t + 0.13);
    this.playNote(1600, 0.15, 'square', 0.3, t + 0.16);
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
  },

  // ========================================
  // BGMシステム（8bit RPG風ループ）
  // ========================================
  bgm: {
    current: null,
    timerId: null,
    volume: 0.18,
    nodes: []
  },

  stopBGM: function() {
    if (this.bgm.timerId) {
      clearTimeout(this.bgm.timerId);
      this.bgm.timerId = null;
    }
    var nodes = this.bgm.nodes;
    for (var i = 0; i < nodes.length; i++) {
      try { nodes[i].stop(); } catch(e) {}
    }
    this.bgm.nodes = [];
    this.bgm.current = null;
  },

  // BGM用ノート再生（エンベロープ付き）
  _bgmNote: function(freq, dur, type, vol, t) {
    if (!this.ctx || !this.enabled || freq <= 0) return;
    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    var v = vol * this.bgm.volume * this.masterVolume;
    gain.gain.setValueAtTime(v, t);
    gain.gain.setValueAtTime(v * 0.7, t + dur * 0.75);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.01);
    this.bgm.nodes.push(osc);
    var self = this;
    osc.onended = function() {
      var idx = self.bgm.nodes.indexOf(osc);
      if (idx > -1) self.bgm.nodes.splice(idx, 1);
    };
  },

  // ノートシーケンスをスケジュール: [freq, beats, freq, beats, ...]
  _scheduleSeq: function(notes, startTime, beatDur, type, vol) {
    var time = startTime;
    for (var i = 0; i < notes.length; i += 2) {
      var freq = notes[i];
      var beats = notes[i + 1];
      var dur = beatDur * beats;
      if (freq > 0) {
        this._bgmNote(freq, dur * 0.85, type, vol, time);
      }
      time += dur;
    }
    return time - startTime;
  },

  // BGM再生開始
  playBGM: function(name) {
    this.init();
    this.resume();
    this.stopBGM();
    this.bgm.current = name;

    var self = this;
    var loop = function() {
      if (self.bgm.current !== name) return;
      var t = self.ctx.currentTime + 0.08;
      var duration = 0;

      if (name === 'title') {
        duration = self._playTitleLoop(t);
      } else if (name === 'battle') {
        duration = self._playBattleLoop(t);
      }

      if (duration > 0) {
        self.bgm.timerId = setTimeout(loop, (duration - 0.1) * 1000);
      }
    };

    loop();
  },

  // タイトルBGM - 冒険のはじまり（C major, 130BPM, 32ビート）
  _playTitleLoop: function(t) {
    var b = 60 / 130; // ≈ 0.46s per beat

    // メロディ（square wave）- 勇壮なRPGテーマ
    var melody = [
      // フレーズ1: 上昇する希望のメロディ
      523, 1,  659, 1,  784, 1.5,  0, 0.5,   // C5 E5 G5~
      880, 1,  784, 1,  659, 2,               // A5 G5 E5~
      // フレーズ2: 応答フレーズ
      440, 1,  523, 1,  659, 1.5,  0, 0.5,   // A4 C5 E5~
      587, 1,  523, 1,  440, 1,  0, 1,       // D5 C5 A4 rest
      // フレーズ3: 高揚するメロディ
      523, 1,  659, 1,  784, 1,  880, 1,     // C5 E5 G5 A5
      1047, 2,  988, 1,  880, 1,             // C6~ B5 A5
      // フレーズ4: 着地フレーズ
      784, 1,  659, 1,  523, 1,  440, 1,     // G5 E5 C5 A4
      523, 2.5,  0, 1.5                       // C5~~ rest
    ];

    // ベースライン（square wave、低音で支える）
    var bass = [
      131, 2,  131, 2,  175, 2,  175, 2,     // C3~ C3~ F3~ F3~
      110, 2,  131, 2,  196, 2,  131, 2,     // A2~ C3~ G3~ C3~
      131, 2,  131, 2,  175, 2,  165, 2,     // C3~ C3~ F3~ E3~
      196, 2,  165, 2,  131, 2,  131, 2      // G3~ E3~ C3~ C3~
    ];

    // アルペジオ伴奏（triangle風 = sine）
    var arp = [
      262, 1,  330, 1,  392, 1,  330, 1,     // C4 E4 G4 E4
      349, 1,  440, 1,  349, 1,  262, 1,     // F4 A4 F4 C4
      220, 1,  262, 1,  330, 1,  262, 1,     // A3 C4 E4 C4
      392, 1,  330, 1,  262, 1,  196, 1,     // G4 E4 C4 G3
      262, 1,  330, 1,  392, 1,  330, 1,     // C4 E4 G4 E4
      349, 1,  440, 1,  523, 1,  440, 1,     // F4 A4 C5 A4
      392, 1,  330, 1,  262, 1,  220, 1,     // G4 E4 C4 A3
      262, 1,  330, 1,  262, 1,  196, 1      // C4 E4 C4 G3
    ];

    var dur = this._scheduleSeq(melody, t, b, 'square', 0.35);
    this._scheduleSeq(bass, t, b, 'square', 0.2);
    this._scheduleSeq(arp, t, b, 'sine', 0.12);

    return dur;
  },

  // バトルBGM - 激戦（A minor, 160BPM, 32ビート）
  _playBattleLoop: function(t) {
    var b = 60 / 160; // = 0.375s per beat

    // メロディ（square wave）- 緊迫した戦闘テーマ
    var melody = [
      // フレーズ1: 急迫する攻撃メロディ
      440, 0.5,  523, 0.5,  659, 1,  880, 1,   // A4 C5 E5~ A5~
      659, 0.5,  523, 0.5,  440, 1,  0, 1,     // E5 C5 A4~ rest
      // フレーズ2: 反撃のフレーズ
      392, 0.5,  440, 0.5,  523, 1,  784, 1,   // G4 A4 C5~ G5~
      659, 0.5,  523, 0.5,  440, 1,  0, 1,     // E5 C5 A4~ rest
      // フレーズ3: 高速パッセージ
      440, 0.5,  523, 0.5,  440, 0.5,  392, 0.5,  // A C A G
      440, 0.5,  659, 0.5,  880, 1,  1047, 1,     // A E A5~ C6~
      880, 0.5,  784, 0.5,  659, 1,               // A5 G5 E5~
      // フレーズ4: クライマックス
      784, 0.5,  659, 0.5,  523, 0.5,  440, 0.5,  // G E C A
      392, 0.5,  440, 0.5,  523, 1,               // G A C~
      659, 0.5,  523, 0.5,  440, 1,  0, 1         // E C A~ rest
    ];

    // ベースライン（square、ドライブ感のある8分音符）
    var bass = [
      110, 0.5,  110, 0.5,  110, 0.5,  165, 0.5,  // A2 A2 A2 E3
      131, 0.5,  131, 0.5,  110, 0.5,  110, 0.5,  // C3 C3 A2 A2
      98, 0.5,   98, 0.5,   131, 0.5,  131, 0.5,  // G2 G2 C3 C3
      165, 0.5,  165, 0.5,  110, 0.5,  110, 0.5,  // E3 E3 A2 A2
      110, 0.5,  110, 0.5,  131, 0.5,  131, 0.5,  // A2 A2 C3 C3
      110, 0.5,  165, 0.5,  110, 1,               // A2 E3 A2~
      175, 0.5,  175, 0.5,  165, 0.5,  165, 0.5,  // F3 F3 E3 E3
      // 最終4ビート
      98, 0.5,   98, 0.5,   110, 0.5,  131, 0.5,  // G2 G2 A2 C3
      165, 0.5,  131, 0.5,  110, 1,               // E3 C3 A2~
      110, 0.5,  165, 0.5,  110, 0.5,  0, 0.5    // A2 E3 A2 rest
    ];

    // ドラムパターン風ノイズ（リズム刻み）
    var self = this;
    var drumTime = t;
    for (var i = 0; i < 32; i++) {
      if (i % 2 === 0) {
        // バスドラム（低音ノイズ）
        self._bgmNote(55, b * 0.3, 'sawtooth', 0.15, drumTime);
      }
      if (i % 2 === 1) {
        // ハイハット（高音ノイズ風）
        self._bgmNote(1200, b * 0.1, 'square', 0.05, drumTime);
      }
      if (i % 4 === 2) {
        // スネア風
        self.playNoise(0.06, 0.08, drumTime);
      }
      drumTime += b;
    }

    var dur = this._scheduleSeq(melody, t, b, 'square', 0.3);
    this._scheduleSeq(bass, t, b, 'square', 0.18);

    return dur;
  }
};
