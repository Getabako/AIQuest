/**
 * AIクエスト - ゲームロジック
 * if(塾) × if(Business)
 */

// ========================================
// LIFF設定
// ========================================
const LIFF_ID = "2008882500-ZwUdPYOK";

// ========================================
// ゲームデータ
// ========================================
const GameData = {
  // プレイヤー初期HP
  playerMaxHP: 100,

  // 学生ルートの敵
  studentEnemies: [
    {
      name: "勉強嫌いゴブリン",
      description: "勉強なんてつまらない！",
      image: "images/enemy-student-1.png",
      weakness: "chatgpt",
      resist: "image",
      hp: 80,
      attack: 15,
      skill: { icon: "fa-book", name: "学習効率化" },
      tips: {
        chatgpt: "ChatGPTは分からないことを即座に教えてくれる！「つまらない」は「わからない」から来ることが多いんだ。",
        automation: "自動化ツールで宿題の単純作業を減らせば、考える時間が増えるね。",
        image: "画像生成AIで教科書の内容を図解すると、理解しやすくなるよ！"
      }
    },
    {
      name: "集中できない魔導士",
      description: "気が散って全然進まない...",
      image: "images/enemy-student-2.png",
      weakness: "automation",
      resist: "chatgpt",
      hp: 90,
      attack: 18,
      skill: { icon: "fa-crosshairs", name: "集中力ブースト" },
      tips: {
        chatgpt: "ChatGPTにタスクを整理してもらうと、何から手をつければいいか明確になるよ！",
        automation: "自動化で単純作業を減らせば、大事なことに集中できる時間が生まれる！",
        image: "画像生成AIでビジュアル化すると、複雑な概念も頭に入りやすい！"
      }
    },
    {
      name: "将来不安ドラゴン",
      description: "自分に何ができるかわからない...",
      image: "images/enemy-student-3.png",
      weakness: "image",
      resist: "automation",
      hp: 120,
      attack: 22,
      skill: { icon: "fa-star", name: "未来創造力" },
      tips: {
        chatgpt: "ChatGPTに将来の選択肢を聞いてみよう！知らなかった道が見つかるかも。",
        automation: "AIを使いこなせる人材は、これからの時代に超重要！今のうちに触れておこう。",
        image: "画像生成AIで「理想の自分」を描いてみて！想像が形になる体験は、将来への第一歩だよ。"
      }
    }
  ],

  // 起業家ルートの敵
  businessEnemies: [
    {
      name: "人手不足スライム",
      description: "人が足りない...でも雇う余裕もない...",
      image: "images/enemy-business-1.png",
      weakness: "automation",
      resist: "image",
      hp: 85,
      attack: 16,
      skill: { icon: "fa-bolt", name: "業務自動化" },
      tips: {
        chatgpt: "ChatGPTでメール対応や書類作成を効率化！1人で2人分の仕事ができるようになる。",
        automation: "Make.comやZapierで作業を自動化すれば、人を雇わなくても業務が回る！",
        image: "画像生成AIでデザイン作業を時短！デザイナーに頼まなくても資料が作れる。"
      }
    },
    {
      name: "時間泥棒ゴースト",
      description: "毎日残業...でも仕事が終わらない...",
      image: "images/enemy-business-2.png",
      weakness: "chatgpt",
      resist: "automation",
      hp: 95,
      attack: 20,
      skill: { icon: "fa-clock", name: "時間創出術" },
      tips: {
        chatgpt: "ChatGPTに議事録作成、メール文面、企画書のドラフトを任せれば、時間が大幅に短縮！",
        automation: "請求書発行、データ入力、レポート作成...自動化できる作業は思った以上に多い！",
        image: "プレゼン資料のイメージ画像を画像生成AIで作れば、素材探しの時間がゼロに！"
      }
    },
    {
      name: "非効率キング",
      description: "やり方を変えたいけど、何から手をつければ...",
      image: "images/enemy-business-3.png",
      weakness: "image",
      resist: "chatgpt",
      hp: 130,
      attack: 25,
      skill: { icon: "fa-crown", name: "DX推進力" },
      tips: {
        chatgpt: "ChatGPTに業務フローを説明して改善案をもらおう！客観的な視点が得られる。",
        automation: "まずは小さな自動化から！成功体験を積み重ねることが大切。",
        image: "新しい業務フローを画像生成AIで可視化！チームへの説明もスムーズに。"
      }
    }
  ],

  // 武器データ
  weapons: {
    chatgpt: {
      name: "ChatGPT剣",
      icon: "fa-sword",
      baseDamage: 30,
      effectiveMultiplier: 2.0,
      normalMultiplier: 1.0,
      weakMultiplier: 0.5
    },
    automation: {
      name: "自動化の盾",
      icon: "fa-shield-halved",
      baseDamage: 25,
      effectiveMultiplier: 2.0,
      normalMultiplier: 1.0,
      weakMultiplier: 0.5
    },
    image: {
      name: "画像生成の弓",
      icon: "fa-bow-arrow",
      baseDamage: 28,
      effectiveMultiplier: 2.0,
      normalMultiplier: 1.0,
      weakMultiplier: 0.5
    }
  },

  // 称号
  titles: {
    student: {
      name: "AIネイティブ学生",
      description: "AIを使いこなして学びを加速できる新世代の学生！if(塾)で、もっと力を伸ばそう！"
    },
    business: {
      name: "AI経営マスター",
      description: "AIで業務を変革できるビジネスリーダー！if(Business)で、さらなる効率化を実現しよう！"
    }
  },

  // プレゼント
  presents: {
    student: {
      description: "無料体験授業＆オンライン相談にご招待！",
      coupon: "AIQUEST-EDU",
      ctaText: "教育相談をする",
      ctaMessage: "教育の相談",
      princessMessage: "勇者よ、よくぞ学びの壁を打ち破りました！<br>AIを味方につければ、勉強も夢への挑戦も<br>もっと楽しくなりますよ。<br><br>if(塾)で、あなただけの学び方を<br>一緒に見つけてみませんか？",
      ctaAdvice: "AIと一緒に、好きを伸ばしてみませんか？"
    },
    business: {
      description: "AI導入診断＆Zoom相談が無料！",
      coupon: "AIQUEST-BIZ",
      ctaText: "ビジネス相談をする",
      ctaMessage: "ビジネス相談",
      princessMessage: "勇者よ、見事に業務の闇を払いました！<br>AIの力で、あなたのビジネスは<br>もっと効率的に、もっと自由になれます。<br><br>if(Business)で、御社に合った<br>AI活用法をご提案させてください。",
      ctaAdvice: "AIで、働き方を変えてみませんか？"
    }
  },

  // ゲームオーバー時のメッセージ
  gameOver: {
    student: {
      message: "まだAIの力を使いこなせていないようだ...<br>でも大丈夫！if(塾)で学べば、<br>次は必ず勝てるようになる！",
      ctaText: "if(塾)で学ぶ",
      ctaMessage: "教育の相談"
    },
    business: {
      message: "業務の闘いは厳しかった...<br>でも心配無用！if(Business)のサポートで、<br>AIを味方につけよう！",
      ctaText: "相談してみる",
      ctaMessage: "ビジネス相談"
    }
  }
};

// ========================================
// ゲーム状態
// ========================================
const GameState = {
  character: null,
  currentStage: 1,
  enemies: [],
  currentEnemy: null,
  currentEnemyHP: 0,
  playerHP: 100,
  playerMaxHP: 100,
  earnedSkills: [],
  lastAttack: null,
  isPlayerTurn: true,
  liffInitialized: false,
  userId: null,
  // 新機能用の状態
  powerGauge: {
    value: 50,
    direction: 1,
    speed: 2,
    animationId: null,
    isRunning: false
  },
  combo: {
    count: 0,
    maxCombo: 0
  },
  score: {
    total: 0,
    damageDealt: 0,
    perfectHits: 0,
    criticalHits: 0
  },
  shuffledWeapons: [],
  enemyNextAction: null,
  gameStartTime: null
};

// ========================================
// ゲームロジック
// ========================================
const Game = {
  // 初期化
  init: async function() {
    try {
      await liff.init({ liffId: LIFF_ID });
      GameState.liffInitialized = true;
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        GameState.userId = profile.userId;
      }
    } catch (error) {
      console.log("LIFF init error:", error);
    }
    this.showScreen('title');
  },

  // ========================================
  // パワーゲージシステム
  // ========================================
  startPowerGauge: function() {
    if (GameState.powerGauge.isRunning) return;

    GameState.powerGauge.isRunning = true;
    GameState.powerGauge.value = 50;
    GameState.powerGauge.direction = 1;

    const animate = () => {
      if (!GameState.powerGauge.isRunning) return;

      GameState.powerGauge.value += GameState.powerGauge.speed * GameState.powerGauge.direction;

      if (GameState.powerGauge.value >= 100) {
        GameState.powerGauge.value = 100;
        GameState.powerGauge.direction = -1;
      } else if (GameState.powerGauge.value <= 0) {
        GameState.powerGauge.value = 0;
        GameState.powerGauge.direction = 1;
      }

      this.updatePowerGaugeDisplay();
      GameState.powerGauge.animationId = requestAnimationFrame(animate);
    };

    animate();
  },

  stopPowerGauge: function() {
    GameState.powerGauge.isRunning = false;
    if (GameState.powerGauge.animationId) {
      cancelAnimationFrame(GameState.powerGauge.animationId);
      GameState.powerGauge.animationId = null;
    }
  },

  updatePowerGaugeDisplay: function() {
    const fill = document.getElementById('power-gauge-fill');
    const indicator = document.getElementById('power-gauge-indicator');
    if (fill && indicator) {
      fill.style.width = `${GameState.powerGauge.value}%`;
      indicator.style.left = `${GameState.powerGauge.value}%`;

      // 色を変更
      if (GameState.powerGauge.value >= 45 && GameState.powerGauge.value <= 55) {
        fill.classList.add('perfect');
        fill.classList.remove('good');
      } else if (GameState.powerGauge.value >= 35 && GameState.powerGauge.value <= 65) {
        fill.classList.add('good');
        fill.classList.remove('perfect');
      } else {
        fill.classList.remove('perfect', 'good');
      }
    }
  },

  getPowerGaugeMultiplier: function(capturedValue) {
    const value = capturedValue !== undefined ? capturedValue : GameState.powerGauge.value;
    // 45-55: Perfect (1.5x), 35-65: Good (1.2x), それ以外: Normal (1.0x)
    if (value >= 48 && value <= 52) return { multiplier: 2.0, rating: 'critical' };
    if (value >= 45 && value <= 55) return { multiplier: 1.5, rating: 'perfect' };
    if (value >= 35 && value <= 65) return { multiplier: 1.2, rating: 'good' };
    return { multiplier: 1.0, rating: 'normal' };
  },

  // ========================================
  // 武器シャッフルシステム
  // ========================================
  shuffleWeapons: function() {
    const weaponTypes = ['chatgpt', 'automation', 'image'];
    const weaponIcons = {
      chatgpt: 'fa-comment-dots',
      automation: 'fa-gears',
      image: 'fa-palette'
    };

    // 位置をシャッフル
    const shuffled = [...weaponTypes].sort(() => Math.random() - 0.5);
    GameState.shuffledWeapons = shuffled;

    // UIを更新
    const weaponsContainer = document.querySelector('.weapons');
    if (weaponsContainer) {
      const buttons = [];
      shuffled.forEach((type) => {
        const weapon = GameData.weapons[type];
        buttons.push(`
          <button class="weapon-btn" onclick="Game.attack('${type}')" id="weapon-${type}">
            <span class="weapon-icon"><i class="fa-solid ${weaponIcons[type]}"></i></span>
            <span class="weapon-name">${weapon.name}</span>
          </button>
        `);
      });
      weaponsContainer.innerHTML = buttons.join('');
    }
  },

  // ========================================
  // コンボシステム
  // ========================================
  incrementCombo: function() {
    GameState.combo.count++;
    if (GameState.combo.count > GameState.combo.maxCombo) {
      GameState.combo.maxCombo = GameState.combo.count;
    }
    this.updateComboDisplay();
  },

  resetCombo: function() {
    GameState.combo.count = 0;
    this.updateComboDisplay();
  },

  updateComboDisplay: function() {
    const comboElement = document.getElementById('combo-display');
    if (comboElement) {
      if (GameState.combo.count >= 2) {
        comboElement.innerHTML = `<span class="combo-number">${GameState.combo.count}</span><span class="combo-text">COMBO!</span>`;
        comboElement.classList.remove('hidden');
      } else {
        comboElement.classList.add('hidden');
      }
    }
  },

  getComboMultiplier: function() {
    const combo = GameState.combo.count;
    if (combo >= 10) return 2.0;
    if (combo >= 7) return 1.7;
    if (combo >= 5) return 1.5;
    if (combo >= 3) return 1.3;
    if (combo >= 2) return 1.1;
    return 1.0;
  },

  // ========================================
  // 敵の行動予告システム
  // ========================================
  generateEnemyAction: function() {
    const actions = [
      { type: 'chatgpt', icon: 'fa-comment-dots', name: '知識攻撃', counter: 'automation', description: '自動化の盾で防御！' },
      { type: 'automation', icon: 'fa-gears', name: '機械攻撃', counter: 'image', description: '画像生成の弓で反撃！' },
      { type: 'image', icon: 'fa-image', name: '幻影攻撃', counter: 'chatgpt', description: 'ChatGPT剣で見破れ！' }
    ];
    GameState.enemyNextAction = actions[Math.floor(Math.random() * actions.length)];
    this.updateEnemyActionDisplay();
  },

  updateEnemyActionDisplay: function() {
    const actionElement = document.getElementById('enemy-next-action');
    if (actionElement && GameState.enemyNextAction) {
      actionElement.innerHTML = `次: ${GameState.enemyNextAction.name} → ${GameState.enemyNextAction.description}`;
    }
  },

  checkDefenseBonus: function(weaponType) {
    if (GameState.enemyNextAction && weaponType === GameState.enemyNextAction.counter) {
      return { blocked: true, reduction: 0.5 };
    }
    return { blocked: false, reduction: 1.0 };
  },

  // ========================================
  // スコアシステム
  // ========================================
  addScore: function(points, reason) {
    GameState.score.total += points;
    // スコアポップアップはサイドビューではダメージポップアップで代用
  },

  calculateRank: function() {
    const score = GameState.score.total;
    const maxCombo = GameState.combo.maxCombo;
    const perfects = GameState.score.perfectHits;
    const criticals = GameState.score.criticalHits;

    const totalScore = score + (maxCombo * 100) + (perfects * 200) + (criticals * 500);

    if (totalScore >= 10000) return { rank: 'S', color: '#ffd700', message: '完璧！AIマスター！' };
    if (totalScore >= 7000) return { rank: 'A', color: '#c0c0c0', message: '素晴らしい！' };
    if (totalScore >= 4000) return { rank: 'B', color: '#cd7f32', message: 'よくできました！' };
    return { rank: 'C', color: '#888', message: 'もっと練習しよう！' };
  },

  // 画面切り替え
  showScreen: function(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(`screen-${screenName}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }
  },

  // ゲーム開始
  startGame: function() {
    SoundSystem.gameStart();
    SoundSystem.playBGM('title');
    this.showScreen('character');
  },

  // キャラクター選択
  selectCharacter: function(type) {
    SoundSystem.select();
    GameState.character = type;
    GameState.currentStage = 1;
    GameState.earnedSkills = [];
    GameState.playerHP = GameData.playerMaxHP;
    GameState.playerMaxHP = GameData.playerMaxHP;
    // 新システムの初期化
    GameState.combo.count = 0;
    GameState.combo.maxCombo = 0;
    GameState.score.total = 0;
    GameState.score.damageDealt = 0;
    GameState.score.perfectHits = 0;
    GameState.score.criticalHits = 0;
    GameState.gameStartTime = Date.now();

    if (type === 'student') {
      GameState.enemies = JSON.parse(JSON.stringify(GameData.studentEnemies));
    } else {
      GameState.enemies = JSON.parse(JSON.stringify(GameData.businessEnemies));
    }

    this.startBattle();
  },

  // バトル開始
  startBattle: function() {
    GameState.currentEnemy = GameState.enemies[GameState.currentStage - 1];
    GameState.currentEnemyHP = GameState.currentEnemy.hp;
    GameState.isPlayerTurn = true;

    // UI更新
    document.getElementById('current-stage').textContent = GameState.currentStage;

    document.getElementById('enemy-image').src = GameState.currentEnemy.image;
    document.getElementById('enemy-name').textContent = GameState.currentEnemy.name;
    document.getElementById('enemy-status-name').textContent = GameState.currentEnemy.name;

    // プレイヤー画像設定
    const playerImg = document.getElementById('player-image');
    if (playerImg) {
      playerImg.src = GameState.character === 'student' ? 'images/hero-student.png' : 'images/hero-business.png';
    }

    this.updateHPBars();
    this.updateBattleMessage(`${GameState.currentEnemy.name}が現れた！`);

    // 新システム：武器シャッフル、パワーゲージ開始、敵の行動予告
    this.shuffleWeapons();
    this.startPowerGauge();
    this.generateEnemyAction();
    this.updateComboDisplay();
    this.enableWeapons(true);

    SoundSystem.battleStart();
    SoundSystem.playBGM('battle');
    this.showScreen('battle');
  },

  // HPバー更新
  updateHPBars: function() {
    const enemyHPPercent = (GameState.currentEnemyHP / GameState.currentEnemy.hp) * 100;
    const playerHPPercent = (GameState.playerHP / GameState.playerMaxHP) * 100;

    const enemyHPFill = document.getElementById('enemy-hp-fill');
    if (enemyHPFill) {
      enemyHPFill.style.width = `${Math.max(0, enemyHPPercent)}%`;
    }

    const playerHPFill = document.getElementById('player-hp-fill');
    if (playerHPFill) {
      playerHPFill.style.width = `${Math.max(0, playerHPPercent)}%`;

      // HPバーの色を変更（危険時は赤く）
      if (playerHPPercent <= 25) {
        playerHPFill.classList.add('danger');
      } else {
        playerHPFill.classList.remove('danger');
      }
    }

    const playerHPCurrent = document.getElementById('player-hp-current');
    const playerHPMax = document.getElementById('player-hp-max');
    if (playerHPCurrent) playerHPCurrent.textContent = Math.max(0, GameState.playerHP);
    if (playerHPMax) playerHPMax.textContent = GameState.playerMaxHP;
  },

  // バトルメッセージ更新
  updateBattleMessage: function(message, className = '') {
    const msgEl = document.getElementById('battle-message');
    if (msgEl) {
      msgEl.innerHTML = message;
      msgEl.className = 'log-message ' + className;
    }
  },

  // 武器ボタンの有効/無効
  enableWeapons: function(enable) {
    document.querySelectorAll('.weapon-btn').forEach(btn => {
      btn.disabled = !enable;
      if (enable) {
        btn.classList.remove('disabled');
      } else {
        btn.classList.add('disabled');
      }
    });
  },

  // プレイヤー攻撃
  attack: function(weaponType) {
    if (!GameState.isPlayerTurn) return;

    // ゲージ値を即座にキャプチャ（ラグ防止）
    const capturedGaugeValue = GameState.powerGauge.value;

    // パワーゲージを停止
    this.stopPowerGauge();
    this.enableWeapons(false);
    GameState.isPlayerTurn = false;

    const enemy = GameState.currentEnemy;
    const weapon = GameData.weapons[weaponType];

    // 基本の有効性判定
    let baseMultiplier = weapon.normalMultiplier;
    let effectiveness = 'normal';

    if (enemy.weakness === weaponType) {
      baseMultiplier = weapon.effectiveMultiplier;
      effectiveness = 'effective';
      this.incrementCombo();
    } else if (enemy.resist === weaponType) {
      baseMultiplier = weapon.weakMultiplier;
      effectiveness = 'weak';
      this.resetCombo();
    }

    // パワーゲージのボーナス（キャプチャした値を使用）
    const powerResult = this.getPowerGaugeMultiplier(capturedGaugeValue);
    const powerMultiplier = powerResult.multiplier;
    const powerRating = powerResult.rating;

    // コンボボーナス
    const comboMultiplier = this.getComboMultiplier();

    // 最終ダメージ計算
    let finalDamage = Math.floor(weapon.baseDamage * baseMultiplier * powerMultiplier * comboMultiplier);

    // クリティカルヒット判定
    let isCritical = false;
    if (powerRating === 'critical' && effectiveness === 'effective') {
      isCritical = true;
      finalDamage = Math.floor(finalDamage * 1.5);
      GameState.score.criticalHits++;
    }

    // パーフェクトヒット記録
    if (powerRating === 'perfect' || powerRating === 'critical') {
      GameState.score.perfectHits++;
    }

    GameState.currentEnemyHP -= finalDamage;
    if (GameState.currentEnemyHP < 0) GameState.currentEnemyHP = 0;
    GameState.score.damageDealt += finalDamage;
    GameState.lastAttack = {
      weapon: weaponType,
      damage: finalDamage,
      effectiveness,
      powerRating,
      comboCount: GameState.combo.count,
      isCritical,
      tip: enemy.tips[weaponType]
    };

    // スコア加算
    this.addScore(finalDamage, 'ダメージ');
    if (effectiveness === 'effective') this.addScore(100, '弱点攻撃！');
    if (isCritical) this.addScore(300, 'クリティカル！');
    if (GameState.combo.count >= 3) this.addScore(GameState.combo.count * 20, 'コンボボーナス');

    // サイドビュー用アニメーション
    this.playAttackAnimation(finalDamage, effectiveness, isCritical, powerRating);
  },

  // ========================================
  // サイドビュー用アニメーション
  // ========================================
  playAttackAnimation: function(damage, effectiveness, isCritical, powerRating) {
    const playerSprite = document.getElementById('player-image');
    const enemySprite = document.getElementById('enemy-image');
    const enemyEffect = document.getElementById('enemy-effect');

    // メッセージ表示
    let msgClass = '';
    let msgText = `${GameData.weapons[GameState.lastAttack.weapon].name}で攻撃！`;

    if (isCritical) {
      msgClass = 'critical';
      msgText = 'CRITICAL HIT！！';
    } else if (effectiveness === 'effective') {
      msgClass = 'effective';
      msgText = '効果は抜群だ！';
    } else if (effectiveness === 'weak') {
      msgClass = 'weak';
      msgText = '効果はイマイチ...';
    }

    this.updateBattleMessage(msgText, msgClass);

    // プレイヤー攻撃アニメーション
    playerSprite.classList.add('attack');

    // 攻撃ヒットタイミング（0.3秒後）
    setTimeout(() => {
      // 効果音
      if (isCritical) {
        SoundSystem.criticalHit();
      } else if (effectiveness === 'effective') {
        SoundSystem.effectiveHit();
      } else if (effectiveness === 'weak') {
        SoundSystem.weakHit();
      } else {
        SoundSystem.hit();
      }

      // コンボ音
      if (GameState.combo.count >= 2) {
        setTimeout(() => SoundSystem.combo(GameState.combo.count), 150);
      }

      // 敵にヒットエフェクト
      enemySprite.classList.add('shake');

      // エフェクト表示
      if (isCritical) {
        enemyEffect.innerHTML = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-bolt"></i>';
        enemyEffect.className = 'sprite-effect critical-effect';
      } else {
        enemyEffect.innerHTML = '<i class="fa-solid fa-burst"></i>';
        enemyEffect.className = 'sprite-effect hit-effect';
      }

      // ダメージポップアップ
      this.showDamagePopup(damage, isCritical, 'enemy');

      // HPバー更新
      this.updateHPBars();
    }, 300);

    // アニメーション終了後
    setTimeout(() => {
      playerSprite.classList.remove('attack');
      enemySprite.classList.remove('shake');
      enemyEffect.className = 'sprite-effect';
      enemyEffect.innerHTML = '';

      // 敵撃破チェック
      if (GameState.currentEnemyHP <= 0) {
        this.enemyDefeated();
      } else {
        // 敵のターン
        setTimeout(() => this.enemyAttack(), 500);
      }
    }, 800);
  },

  // ダメージポップアップ表示
  showDamagePopup: function(damage, isCritical, target) {
    const area = document.getElementById('damage-popup-area');
    if (!area) return;

    const popup = document.createElement('div');
    popup.className = 'damage-popup' + (isCritical ? ' critical' : '');
    popup.textContent = damage;

    // 位置設定
    if (target === 'enemy') {
      popup.style.left = '25%';
      popup.style.top = '40%';
    } else {
      popup.style.right = '25%';
      popup.style.top = '40%';
    }

    area.appendChild(popup);

    setTimeout(() => popup.remove(), 1000);
  },

  // 防御成功ポップアップ
  showBlockPopup: function() {
    const area = document.getElementById('damage-popup-area');
    if (!area) return;

    const popup = document.createElement('div');
    popup.className = 'damage-popup block';
    popup.textContent = 'GUARD!';
    popup.style.right = '25%';
    popup.style.top = '30%';

    area.appendChild(popup);

    setTimeout(() => popup.remove(), 1000);
  },

  // 攻撃後の処理（互換性のため残す - サイドビューでは使用しない）
  nextAfterAttack: function() {
    // サイドビューではplayAttackAnimation内で処理
  },

  // AIの豆知識モーダル
  showTipModal: function(tip) {
    const modal = document.getElementById('ai-tip-modal');
    const tipText = document.getElementById('ai-tip-text');
    if (modal && tipText) {
      tipText.textContent = tip;
      modal.classList.remove('hidden');
    }
  },

  closeTipModal: function() {
    const modal = document.getElementById('ai-tip-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  },

  // 敵の攻撃
  enemyAttack: function() {
    const enemy = GameState.currentEnemy;
    let baseDamage = Math.max(5, enemy.attack + Math.floor(Math.random() * 10) - 5);

    // 防御ボーナスチェック
    const lastWeapon = GameState.lastAttack ? GameState.lastAttack.weapon : null;
    const defense = this.checkDefenseBonus(lastWeapon);

    let finalDamage = baseDamage;
    let blocked = false;

    if (defense.blocked) {
      finalDamage = Math.floor(baseDamage * defense.reduction);
      blocked = true;
    }

    GameState.playerHP -= finalDamage;
    if (GameState.playerHP < 0) GameState.playerHP = 0;

    // サイドビュー用敵攻撃アニメーション
    this.playEnemyAttackAnimation(finalDamage, blocked);
  },

  // 敵攻撃アニメーション
  playEnemyAttackAnimation: function(damage, blocked) {
    const playerSprite = document.getElementById('player-image');
    const playerEffect = document.getElementById('player-effect');
    const enemy = GameState.currentEnemy;

    // メッセージ
    const actionName = GameState.enemyNextAction ? GameState.enemyNextAction.name : '攻撃';
    this.updateBattleMessage(`${enemy.name}の${actionName}！`);

    // 敵攻撃モーション（敵が揺れる）
    const enemySprite = document.getElementById('enemy-image');
    enemySprite.style.animation = 'none';
    setTimeout(() => {
      enemySprite.style.animation = '';
    }, 10);

    // ヒットタイミング
    setTimeout(() => {
      // 効果音
      if (blocked) {
        SoundSystem.guard();
      } else {
        SoundSystem.playerDamage();
      }

      // プレイヤーにダメージ
      playerSprite.classList.add('hit');

      if (blocked) {
        this.showBlockPopup();
        this.updateBattleMessage('防御成功！ダメージ半減！', 'effective');
      }

      // エフェクト
      playerEffect.innerHTML = '<i class="fa-solid fa-burst"></i>';
      playerEffect.className = 'sprite-effect hit-effect';

      // ダメージポップアップ
      this.showDamagePopup(damage, false, 'player');

      // HPバー更新
      this.updateHPBars();
    }, 400);

    // アニメーション終了
    setTimeout(() => {
      playerSprite.classList.remove('hit');
      playerEffect.className = 'sprite-effect';
      playerEffect.innerHTML = '';

      // ゲームオーバーチェック
      if (GameState.playerHP <= 0) {
        setTimeout(() => this.gameOver(), 500);
      } else {
        // プレイヤーのターン
        this.startPlayerTurn();
      }
    }, 800);
  },

  // プレイヤーターン開始
  startPlayerTurn: function() {
    GameState.isPlayerTurn = true;
    this.shuffleWeapons();
    this.startPowerGauge();
    this.generateEnemyAction();
    this.enableWeapons(true);
    this.updateBattleMessage('どの武器で攻撃する？');
  },

  // 敵攻撃後の続行処理（互換性のため残す）
  continueAfterEnemyAttack: function() {
    // サイドビューでは使用しない
  },

  // 敵を倒した
  enemyDefeated: function() {
    SoundSystem.stopBGM();
    SoundSystem.enemyDefeated();
    GameState.earnedSkills.push(GameState.currentEnemy.skill);

    document.getElementById('defeated-enemy-image').src = GameState.currentEnemy.image;
    document.getElementById('defeated-enemy-name').textContent = GameState.currentEnemy.name;

    const skillIcon = GameState.currentEnemy.skill.icon;
    const skillName = GameState.currentEnemy.skill.name;
    document.getElementById('skill-badge').innerHTML = `
      <span class="skill-icon"><i class="fa-solid ${skillIcon}"></i></span>
      <span class="skill-name">${skillName}</span>
    `;

    setTimeout(() => SoundSystem.skillGet(), 300);
    this.showScreen('stage-clear');
  },

  // 次のステージへ
  nextStage: function() {
    SoundSystem.select();
    GameState.currentStage++;

    if (GameState.currentStage > 3) {
      this.showEndingScene();
    } else {
      this.startBattle();
    }
  },

  // ゲームオーバー
  gameOver: function() {
    SoundSystem.stopBGM();
    SoundSystem.gameOver();
    this.showScreen('gameover');
  },

  // ========================================
  // エンディングカットシーン
  // ========================================
  _sceneTimeouts: [],
  _typewriterId: null,
  _fireworksId: null,

  showEndingScene: function() {
    SoundSystem.stopBGM();
    SoundSystem.playBGM('ending');

    // 勇者画像設定
    var heroImg = document.getElementById('scene-hero-img');
    heroImg.src = GameState.character === 'student' ? 'images/hero-student.png' : 'images/hero-business.png';

    // シーンリセット
    var princess = document.getElementById('scene-princess');
    var hero = document.getElementById('scene-hero');
    var dialog = document.getElementById('scene-dialog');
    var happyEnd = document.getElementById('scene-happy-end');
    var hearts = document.getElementById('scene-hearts');
    var fireworks = document.getElementById('fireworks-container');

    princess.className = 'scene-char scene-princess-char';
    hero.className = 'scene-char scene-hero-char';
    dialog.classList.add('hidden');
    happyEnd.classList.add('hidden');
    hearts.innerHTML = '';
    fireworks.innerHTML = '';

    // CTAリセット
    var ctaEl = document.getElementById('scene-cta');
    if (ctaEl) ctaEl.classList.add('hidden');
    var skipBtn = document.querySelector('.scene-skip');
    if (skipBtn) skipBtn.style.display = '';

    // 前のタイマーをクリア
    this._sceneTimeouts.forEach(clearTimeout);
    this._sceneTimeouts = [];
    if (this._typewriterId) clearInterval(this._typewriterId);
    if (this._fireworksId) clearInterval(this._fireworksId);
    this._fireworksId = null;

    this.showScreen('ending-scene');

    var self = this;

    // ダイアログデータ
    var dialogs;
    if (GameState.character === 'student') {
      dialogs = [
        { name: '姫', text: '勇者よ...\nついに会えましたね...' },
        { name: '勇者', text: '姫！ ご無事でしたか！' },
        { name: '姫', text: 'あなたのおかげで\n学びの壁は打ち砕かれました' },
        { name: '姫', text: 'AIの力を使いこなすあなたなら\nきっと未来は明るいですよ' },
        { name: '姫', text: 'さあ、一緒に\n新しい冒険へ出かけましょう！' }
      ];
    } else {
      dialogs = [
        { name: '姫', text: '勇者よ...\nついに会えましたね...' },
        { name: '勇者', text: '姫！ ご無事でしたか！' },
        { name: '姫', text: 'あなたのおかげで\n業務の闇は消え去りました' },
        { name: '姫', text: 'AIの力を味方につけたあなたの\nビジネスはもう無敵です' },
        { name: '姫', text: 'さあ、一緒に\n新しい冒険へ出かけましょう！' }
      ];
    }

    // タイマーヘルパー
    var t = function(delay, fn) {
      self._sceneTimeouts.push(setTimeout(fn, delay));
    };

    // === タイムライン ===

    // 0.5s: キャラクター歩いて登場
    t(500, function() {
      princess.classList.add('walk-in');
      hero.classList.add('walk-in');
    });

    // 3.5s～: ダイアログ開始
    var dialogDelay = 3500;
    var dialogInterval = 2800;

    dialogs.forEach(function(d, i) {
      var delay = dialogDelay + (i * dialogInterval);

      t(delay, function() {
        self._showSceneDialog(d.name, d.text);
        SoundSystem.select();
      });

      // 3つ目のダイアログ後にハート
      if (i === 2) {
        t(delay + 1500, function() {
          self._spawnSceneHearts(5);
        });
      }

      // 4つ目でキャラが近づく + ハート
      if (i === 3) {
        t(delay, function() {
          princess.classList.add('close');
          hero.classList.add('close');
        });
        t(delay + 800, function() {
          self._spawnSceneHearts(8);
        });
      }
    });

    // 最後のダイアログ後: HAPPY END + 花火
    var happyEndDelay = dialogDelay + (dialogs.length * dialogInterval) + 1500;

    t(happyEndDelay, function() {
      dialog.classList.add('hidden');
      happyEnd.classList.remove('hidden');
      SoundSystem.victory();

      // ハート大量発生
      self._spawnSceneHearts(12);
      t(800, function() { self._spawnSceneHearts(8); });

      // 花火開始
      self._startFireworks();
    });

    // CTAボタンを表示（HAPPY END 2.5秒後）
    t(happyEndDelay + 2500, function() {
      self._showSceneCTA();
    });
  },

  skipEndingScene: function() {
    this._sceneTimeouts.forEach(clearTimeout);
    this._sceneTimeouts = [];
    if (this._typewriterId) clearInterval(this._typewriterId);
    this._stopFireworks();

    // スキップ時はすぐにHAPPY END + CTAを表示
    var dialog = document.getElementById('scene-dialog');
    var happyEnd = document.getElementById('scene-happy-end');
    dialog.classList.add('hidden');
    happyEnd.classList.remove('hidden');
    this._showSceneCTA();
  },

  _showSceneCTA: function() {
    var ctaEl = document.getElementById('scene-cta');
    var skipBtn = document.querySelector('.scene-skip');
    if (ctaEl) ctaEl.classList.remove('hidden');
    if (skipBtn) skipBtn.style.display = 'none';

    // CTAメッセージをキャラクター別に設定
    var present = GameData.presents[GameState.character];
    var ctaMsg = document.getElementById('scene-cta-message');
    if (ctaMsg && present) {
      ctaMsg.innerHTML = present.ctaAdvice;
    }
  },

  _showSceneDialog: function(name, text) {
    var dialog = document.getElementById('scene-dialog');
    var nameEl = document.getElementById('dialog-name');
    var textEl = document.getElementById('dialog-text');

    dialog.classList.remove('hidden');
    nameEl.textContent = name;
    textEl.textContent = '';

    // タイプライター効果
    var chars = text.split('');
    var i = 0;
    var self = this;

    if (this._typewriterId) clearInterval(this._typewriterId);

    this._typewriterId = setInterval(function() {
      if (i < chars.length) {
        textEl.textContent += chars[i];
        i++;
      } else {
        clearInterval(self._typewriterId);
      }
    }, 50);
  },

  _spawnSceneHearts: function(count) {
    var container = document.getElementById('scene-hearts');
    if (!container) return;

    for (var i = 0; i < count; i++) {
      var heart = document.createElement('div');
      heart.className = 'scene-heart';
      heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
      heart.style.left = (20 + Math.random() * 60) + '%';
      heart.style.bottom = (20 + Math.random() * 25) + '%';
      heart.style.animationDelay = (Math.random() * 1.5) + 's';
      heart.style.fontSize = (16 + Math.random() * 22) + 'px';
      container.appendChild(heart);

      (function(el) {
        setTimeout(function() { if (el.parentNode) el.remove(); }, 5000);
      })(heart);
    }
  },

  // ========================================
  // 花火エフェクト
  // ========================================
  _startFireworks: function() {
    var self = this;
    // 即座に1発
    self._launchFirework();
    // 定期的に花火を打ち上げ
    this._fireworksId = setInterval(function() {
      self._launchFirework();
    }, 800);
  },

  _stopFireworks: function() {
    if (this._fireworksId) {
      clearInterval(this._fireworksId);
      this._fireworksId = null;
    }
  },

  _launchFirework: function() {
    var container = document.getElementById('fireworks-container');
    if (!container) return;

    // 打ち上げ位置
    var x = 10 + Math.random() * 80; // %
    var burstY = 10 + Math.random() * 35; // 上部で破裂 (%)

    // 色をランダムに選択
    var colors = [
      ['#ff4444', '#ff8888', '#ffaaaa'],
      ['#44ff44', '#88ff88', '#aaffaa'],
      ['#4444ff', '#8888ff', '#aaaaff'],
      ['#ffd700', '#ffea80', '#fff4cc'],
      ['#ff44ff', '#ff88ff', '#ffaaff'],
      ['#44ffff', '#88ffff', '#aaffff'],
      ['#ff8800', '#ffaa44', '#ffcc88']
    ];
    var colorSet = colors[Math.floor(Math.random() * colors.length)];

    // 打ち上げ軌跡
    var trail = document.createElement('div');
    trail.className = 'firework-trail';
    trail.style.left = x + '%';
    trail.style.bottom = '12%';
    container.appendChild(trail);

    // 花火効果音
    SoundSystem.init();
    SoundSystem.resume();
    if (SoundSystem.ctx && SoundSystem.enabled) {
      var t = SoundSystem.ctx.currentTime + 0.6;
      SoundSystem.playNoise(0.15, 0.12, t);
      SoundSystem.playNote(800 + Math.random() * 400, 0.1, 'sine', 0.08, t);
    }

    var self = this;

    // 0.8秒後に破裂
    setTimeout(function() {
      if (trail.parentNode) trail.remove();

      // パーティクル生成
      var particleCount = 20 + Math.floor(Math.random() * 15);
      for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.className = 'firework-particle';

        // 円形に散らばる
        var angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5) * 0.5;
        var distance = 40 + Math.random() * 60;
        var fx = Math.cos(angle) * distance;
        var fy = Math.sin(angle) * distance;

        particle.style.left = x + '%';
        particle.style.top = burstY + '%';
        particle.style.background = colorSet[Math.floor(Math.random() * colorSet.length)];
        particle.style.boxShadow = '0 0 6px ' + colorSet[0];
        particle.style.setProperty('--fx', fx + 'px');
        particle.style.setProperty('--fy', fy + 'px');
        particle.style.animationDuration = (1 + Math.random() * 0.8) + 's';
        particle.style.width = (3 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;

        container.appendChild(particle);

        (function(el) {
          setTimeout(function() { if (el.parentNode) el.remove(); }, 2500);
        })(particle);
      }

      // キラキラ余韻
      for (var j = 0; j < 8; j++) {
        var sparkle = document.createElement('div');
        sparkle.className = 'firework-sparkle';
        sparkle.style.left = (parseFloat(x) - 5 + Math.random() * 10) + '%';
        sparkle.style.top = (burstY - 3 + Math.random() * 6) + '%';
        sparkle.style.background = colorSet[1];
        sparkle.style.animationDelay = (0.3 + Math.random() * 0.5) + 's';
        container.appendChild(sparkle);

        (function(el) {
          setTimeout(function() { if (el.parentNode) el.remove(); }, 3000);
        })(sparkle);
      }
    }, 800);
  },

  // エンディング表示
  showEnding: function() {
    const charType = GameState.character;
    const title = GameData.titles[charType];
    const present = GameData.presents[charType];

    const heroImage = charType === 'student' ? 'images/hero-student.png' : 'images/hero-business.png';
    document.getElementById('result-hero-image').src = heroImage;

    document.getElementById('result-title').textContent = title.name;

    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = GameState.earnedSkills.map(skill => `
      <div class="end-skill-tag">
        <i class="fa-solid ${skill.icon}"></i>
        <span>${skill.name}</span>
      </div>
    `).join('');

    // スコアとランキング表示（コンパクト版）
    const rankResult = this.calculateRank();
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
      const playTime = Math.floor((Date.now() - GameState.gameStartTime) / 1000);
      scoreDisplay.innerHTML = `
        <div class="end-rank-row">
          <div class="end-rank-badge" style="background: ${rankResult.color}">
            ${rankResult.rank}
          </div>
          <span class="end-rank-msg">${rankResult.message}</span>
        </div>
        <div class="end-score-grid">
          <span>スコア<b>${GameState.score.total.toLocaleString()}</b></span>
          <span>コンボ<b>${GameState.combo.maxCombo}</b></span>
          <span>完璧<b>${GameState.score.perfectHits}</b></span>
          <span>クリ<b>${GameState.score.criticalHits}</b></span>
          <span>時間<b>${Math.floor(playTime / 60)}:${String(playTime % 60).padStart(2, '0')}</b></span>
        </div>
      `;
    }

    document.getElementById('present-description').textContent = present.description;
    document.getElementById('coupon-code').textContent = present.coupon;

    document.getElementById('cta-message').innerHTML = present.ctaAdvice;
    document.getElementById('btn-main-cta').innerHTML = '<i class="fa-solid fa-comments"></i> ' + present.ctaText;

    SoundSystem.stopBGM();
    SoundSystem.victory();
    this.showScreen('ending');
  },

  // メッセージ送信してLIFF閉じる
  sendMessageAndClose: function(message) {
    if (GameState.liffInitialized && liff.isInClient()) {
      liff.sendMessages([{ type: 'text', text: message }])
        .then(() => liff.closeWindow())
        .catch((error) => {
          console.error('Send message error:', error);
          alert('トーク画面から「' + message + '」と送信してください。');
        });
    } else {
      alert('LINEアプリから「' + message + '」と送信してください！');
    }
  },

  // 相談へ誘導
  goToConsultation: function() {
    const present = GameData.presents[GameState.character];
    this.sendMessageAndClose(present.ctaMessage);
  },

  // 結果をシェア
  shareResult: function() {
    const title = GameData.titles[GameState.character];
    const shareText = `【AIクエストクリア！】\n称号「${title.name}」を獲得！\n残りHP: ${GameState.playerHP}で勝利！\n\nあなたもAIの力で世界を救おう！\n#AIクエスト #if塾`;

    if (GameState.liffInitialized && liff.isApiAvailable('shareTargetPicker')) {
      liff.shareTargetPicker([{ type: 'text', text: shareText }])
        .catch(() => this.fallbackShare(shareText));
    } else {
      this.fallbackShare(shareText);
    }
  },

  fallbackShare: function(text) {
    if (navigator.share) {
      navigator.share({ title: 'AIクエスト', text: text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('シェア用テキストをコピーしました！');
      }).catch(() => alert(text));
    }
  },

  // ゲームリスタート
  restartGame: function() {
    // BGMとパワーゲージを停止
    SoundSystem.stopBGM();
    this.stopPowerGauge();

    GameState.character = null;
    GameState.currentStage = 1;
    GameState.enemies = [];
    GameState.currentEnemy = null;
    GameState.currentEnemyHP = 0;
    GameState.playerHP = 100;
    GameState.earnedSkills = [];
    GameState.lastAttack = null;
    GameState.isPlayerTurn = true;

    // 新システムのリセット
    GameState.combo.count = 0;
    GameState.combo.maxCombo = 0;
    GameState.score.total = 0;
    GameState.score.damageDealt = 0;
    GameState.score.perfectHits = 0;
    GameState.score.criticalHits = 0;
    GameState.shuffledWeapons = [];
    GameState.enemyNextAction = null;
    GameState.gameStartTime = null;

    this.showScreen('title');
  }
};

// ========================================
// 初期化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
