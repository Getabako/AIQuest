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
  userId: null
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
    this.showScreen('character');
  },

  // キャラクター選択
  selectCharacter: function(type) {
    GameState.character = type;
    GameState.currentStage = 1;
    GameState.earnedSkills = [];
    GameState.playerHP = GameData.playerMaxHP;
    GameState.playerMaxHP = GameData.playerMaxHP;

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
    document.getElementById('progress-fill').style.width = `${(GameState.currentStage / 3) * 100}%`;

    document.getElementById('enemy-image').src = GameState.currentEnemy.image;
    document.getElementById('enemy-name').textContent = GameState.currentEnemy.name;
    document.getElementById('enemy-description').textContent = GameState.currentEnemy.description;

    this.updateHPBars();
    this.updateBattleMessage(`${GameState.currentEnemy.name}が現れた！`);
    this.enableWeapons(true);

    this.showScreen('battle');
  },

  // HPバー更新
  updateHPBars: function() {
    const enemyHPPercent = (GameState.currentEnemyHP / GameState.currentEnemy.hp) * 100;
    const playerHPPercent = (GameState.playerHP / GameState.playerMaxHP) * 100;

    document.getElementById('enemy-hp-fill').style.width = `${Math.max(0, enemyHPPercent)}%`;

    document.getElementById('player-hp-fill').style.width = `${Math.max(0, playerHPPercent)}%`;
    document.getElementById('player-hp-current').textContent = Math.max(0, GameState.playerHP);
    document.getElementById('player-hp-max').textContent = GameState.playerMaxHP;

    // HPバーの色を変更（危険時は赤く）
    const playerHPBar = document.getElementById('player-hp-fill');
    if (playerHPPercent <= 25) {
      playerHPBar.classList.add('danger');
    } else {
      playerHPBar.classList.remove('danger');
    }
  },

  // バトルメッセージ更新
  updateBattleMessage: function(message) {
    document.getElementById('battle-message').innerHTML = message;
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

    this.enableWeapons(false);
    GameState.isPlayerTurn = false;

    const enemy = GameState.currentEnemy;
    const weapon = GameData.weapons[weaponType];

    let multiplier = weapon.normalMultiplier;
    let effectiveness = 'normal';

    if (enemy.weakness === weaponType) {
      multiplier = weapon.effectiveMultiplier;
      effectiveness = 'effective';
    } else if (enemy.resist === weaponType) {
      multiplier = weapon.weakMultiplier;
      effectiveness = 'weak';
    }

    const damage = Math.floor(weapon.baseDamage * multiplier);
    GameState.currentEnemyHP -= damage;
    GameState.lastAttack = { weapon: weaponType, damage, effectiveness };

    // 攻撃アニメーション
    const enemyImg = document.getElementById('enemy-image');
    enemyImg.classList.add('shake');
    setTimeout(() => enemyImg.classList.remove('shake'), 500);

    this.updateHPBars();
    this.showAttackResult(effectiveness, damage, weapon.name, enemy.tips[weaponType]);
  },

  // 攻撃結果表示
  showAttackResult: function(effectiveness, damage, weaponName, tip) {
    const titles = {
      effective: '<i class="fa-solid fa-star"></i> 効果は抜群だ！',
      normal: '<i class="fa-solid fa-check"></i> 攻撃成功！',
      weak: '<i class="fa-solid fa-minus"></i> 効果はイマイチ...'
    };

    const resultTitle = document.getElementById('attack-result-title');
    resultTitle.innerHTML = titles[effectiveness];
    resultTitle.className = effectiveness;

    document.getElementById('attack-result-message').textContent = `${weaponName}で攻撃！`;
    document.getElementById('damage-display').innerHTML = `<span class="damage-number">-${damage}</span>`;
    document.getElementById('ai-tip-text').textContent = tip;

    this.showScreen('attack-result');
  },

  // 攻撃後の処理
  nextAfterAttack: function() {
    if (GameState.currentEnemyHP <= 0) {
      // 敵を倒した
      this.enemyDefeated();
    } else {
      // 敵のターン
      this.enemyAttack();
    }
  },

  // 敵の攻撃
  enemyAttack: function() {
    const enemy = GameState.currentEnemy;
    const damage = Math.max(5, enemy.attack + Math.floor(Math.random() * 10) - 5); // ランダム要素

    GameState.playerHP -= damage;
    if (GameState.playerHP < 0) GameState.playerHP = 0;

    // 敵攻撃画面に情報をセット
    document.getElementById('enemy-attack-message').textContent = `${enemy.name}の攻撃！`;
    document.getElementById('enemy-damage-display').innerHTML = `<span class="damage-number">-${damage}</span>`;
    document.getElementById('enemy-attack-hp-current').textContent = GameState.playerHP;
    document.getElementById('enemy-attack-hp-max').textContent = GameState.playerMaxHP;

    this.showScreen('enemy-attack');
  },

  // 敵攻撃後の続行処理
  continueAfterEnemyAttack: function() {
    this.updateHPBars();

    if (GameState.playerHP <= 0) {
      // ゲームオーバー
      this.gameOver();
    } else {
      // プレイヤーのターン
      GameState.isPlayerTurn = true;
      this.enableWeapons(true);
      this.updateBattleMessage(`<i class="fa-solid fa-wand-sparkles"></i> どの武器で攻撃する？`);
      this.showScreen('battle');
    }
  },

  // 敵を倒した
  enemyDefeated: function() {
    GameState.earnedSkills.push(GameState.currentEnemy.skill);

    document.getElementById('defeated-enemy-image').src = GameState.currentEnemy.image;
    document.getElementById('defeated-enemy-name').textContent = GameState.currentEnemy.name;

    const skillIcon = GameState.currentEnemy.skill.icon;
    const skillName = GameState.currentEnemy.skill.name;
    document.getElementById('skill-badge').innerHTML = `
      <span class="skill-icon"><i class="fa-solid ${skillIcon}"></i></span>
      <span class="skill-name">${skillName}</span>
    `;

    this.showScreen('stage-clear');
  },

  // 次のステージへ
  nextStage: function() {
    GameState.currentStage++;

    if (GameState.currentStage > 3) {
      this.showEnding();
    } else {
      this.startBattle();
    }
  },

  // ゲームオーバー
  gameOver: function() {
    this.showScreen('gameover');
  },

  // エンディング表示
  showEnding: function() {
    const charType = GameState.character;
    const title = GameData.titles[charType];
    const present = GameData.presents[charType];

    document.getElementById('princess-message').innerHTML = present.princessMessage;

    const heroImage = charType === 'student' ? 'images/hero-student.png' : 'images/hero-business.png';
    document.getElementById('result-hero-image').src = heroImage;

    document.getElementById('result-title').textContent = title.name;

    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = GameState.earnedSkills.map(skill => `
      <div class="skill-item">
        <i class="fa-solid ${skill.icon}"></i>
        <span>${skill.name}</span>
      </div>
    `).join('');

    document.getElementById('present-description').textContent = present.description;
    document.getElementById('coupon-code').textContent = present.coupon;

    document.getElementById('cta-message').innerHTML = present.ctaAdvice;
    document.getElementById('btn-main-cta').textContent = present.ctaText;

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
    GameState.character = null;
    GameState.currentStage = 1;
    GameState.enemies = [];
    GameState.currentEnemy = null;
    GameState.currentEnemyHP = 0;
    GameState.playerHP = 100;
    GameState.earnedSkills = [];
    GameState.lastAttack = null;
    GameState.isPlayerTurn = true;

    this.showScreen('title');
  }
};

// ========================================
// 初期化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
