/**
 * AIクエスト - ゲームロジック
 * if(塾) × if(Business)
 */

// ========================================
// LIFF設定（デプロイ後にIDを設定）
// ========================================
const LIFF_ID = "2008882500-ZwUdPYOK";

// ========================================
// ゲームデータ
// ========================================
const GameData = {
  // 学生ルートの敵
  studentEnemies: [
    {
      name: "勉強嫌いゴブリン",
      description: "「勉強なんてつまらない！」",
      image: "images/enemy-student-1.png",
      weakness: "chatgpt",
      hp: 100,
      skill: { icon: "📚", name: "学習効率化" },
      tips: {
        chatgpt: "ChatGPTは分からないことを聞けば即座に教えてくれる！勉強の「つまらない」は「わからない」から来ることが多いんだ。",
        automation: "自動化ツールで宿題の単純作業を減らせば、考える時間が増えるね。",
        image: "画像生成AIで教科書の内容を図解すると、理解しやすくなるよ！"
      }
    },
    {
      name: "集中できない魔導士",
      description: "「気が散って全然進まない...」",
      image: "images/enemy-student-2.png",
      weakness: "automation",
      hp: 100,
      skill: { icon: "🎯", name: "集中力ブースト" },
      tips: {
        chatgpt: "ChatGPTにタスクを整理してもらうと、何から手をつければいいか明確になるよ！",
        automation: "自動化で単純作業を減らせば、大事なことに集中できる時間が生まれる！",
        image: "画像生成AIでビジュアル化すると、複雑な概念も頭に入りやすい！"
      }
    },
    {
      name: "将来不安ドラゴン",
      description: "「自分に何ができるかわからない...」",
      image: "images/enemy-student-3.png",
      weakness: "image",
      hp: 100,
      skill: { icon: "🌟", name: "未来創造力" },
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
      description: "「人が足りない...でも雇う余裕もない...」",
      image: "images/enemy-business-1.png",
      weakness: "automation",
      hp: 100,
      skill: { icon: "⚡", name: "業務自動化" },
      tips: {
        chatgpt: "ChatGPTでメール対応や書類作成を効率化！1人で2人分の仕事ができるようになる。",
        automation: "Make.comやZapierで作業を自動化すれば、人を雇わなくても業務が回る！",
        image: "画像生成AIでデザイン作業を時短！デザイナーに頼まなくても資料が作れる。"
      }
    },
    {
      name: "時間泥棒ゴースト",
      description: "「毎日残業...でも仕事が終わらない...」",
      image: "images/enemy-business-2.png",
      weakness: "chatgpt",
      hp: 100,
      skill: { icon: "⏰", name: "時間創出術" },
      tips: {
        chatgpt: "ChatGPTに議事録作成、メール文面、企画書のドラフトを任せれば、時間が大幅に短縮！",
        automation: "請求書発行、データ入力、レポート作成...自動化できる作業は思った以上に多い！",
        image: "プレゼン資料のイメージ画像を画像生成AIで作れば、素材探しの時間がゼロに！"
      }
    },
    {
      name: "非効率キング",
      description: "「やり方を変えたいけど、何から手をつければ...」",
      image: "images/enemy-business-3.png",
      weakness: "image",
      hp: 100,
      skill: { icon: "👑", name: "DX推進力" },
      tips: {
        chatgpt: "ChatGPTに業務フローを説明して改善案をもらおう！客観的な視点が得られる。",
        automation: "まずは小さな自動化から！成功体験を積み重ねることが大切。",
        image: "新しい業務フローを画像生成AIで可視化！チームへの説明もスムーズに。AIで「見える化」すれば、変革への抵抗も減らせる！"
      }
    }
  ],

  // 武器データ
  weapons: {
    chatgpt: {
      name: "ChatGPT剣",
      icon: "⚔️",
      effectiveText: "知識の刃が敵を切り裂いた！",
      normalText: "ChatGPT剣で攻撃！",
      weakText: "効果はいまひとつ..."
    },
    automation: {
      name: "自動化の盾",
      icon: "🛡️",
      effectiveText: "自動化の力で敵を押し返した！",
      normalText: "自動化の盾で防御しながら攻撃！",
      weakText: "効果はいまひとつ..."
    },
    image: {
      name: "画像生成の弓",
      icon: "🏹",
      effectiveText: "創造の矢が敵の急所を射抜いた！",
      normalText: "画像生成の弓で攻撃！",
      weakText: "効果はいまひとつ..."
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
      ctaAdvice: "「AIと一緒に、好きを伸ばしてみませんか？」"
    },
    business: {
      description: "AI導入診断＆Zoom相談が無料！",
      coupon: "AIQUEST-BIZ",
      ctaText: "ビジネス相談をする",
      ctaMessage: "ビジネス相談",
      princessMessage: "勇者よ、見事に業務の闇を払いました！<br>AIの力で、あなたのビジネスは<br>もっと効率的に、もっと自由になれます。<br><br>if(Business)で、御社に合った<br>AI活用法をご提案させてください。",
      ctaAdvice: "「AIで、働き方を変えてみませんか？」"
    }
  }
};

// ========================================
// ゲーム状態
// ========================================
const GameState = {
  character: null,     // 'student' or 'business'
  currentStage: 1,
  enemies: [],
  currentEnemy: null,
  earnedSkills: [],
  lastAttack: null,
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
      // LIFF初期化
      await liff.init({ liffId: LIFF_ID });
      GameState.liffInitialized = true;

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        GameState.userId = profile.userId;
      }
    } catch (error) {
      console.log("LIFF init error (running outside LINE):", error);
      // LINE外でもゲームは動作可能
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

    // 敵をセット
    if (type === 'student') {
      GameState.enemies = [...GameData.studentEnemies];
    } else {
      GameState.enemies = [...GameData.businessEnemies];
    }

    this.startBattle();
  },

  // バトル開始
  startBattle: function() {
    GameState.currentEnemy = GameState.enemies[GameState.currentStage - 1];

    // UI更新
    document.getElementById('current-stage').textContent = GameState.currentStage;
    document.getElementById('progress-fill').style.width = `${(GameState.currentStage / 3) * 100}%`;

    document.getElementById('enemy-image').src = GameState.currentEnemy.image;
    document.getElementById('enemy-name').textContent = GameState.currentEnemy.name;
    document.getElementById('enemy-description').textContent = GameState.currentEnemy.description;
    document.getElementById('enemy-hp-fill').style.width = '100%';

    document.getElementById('battle-message').textContent = `${GameState.currentEnemy.name}が現れた！どの武器で戦う？`;

    // ヒント更新（弱点のヒント）
    const hints = {
      chatgpt: "この敵は「知識」で解決できそうだ...",
      automation: "この敵は「自動化」で対処できそうだ...",
      image: "この敵は「創造力」で倒せそうだ..."
    };
    document.getElementById('hint-text').textContent = hints[GameState.currentEnemy.weakness];

    this.showScreen('battle');
  },

  // 攻撃
  attack: function(weaponType) {
    const enemy = GameState.currentEnemy;
    const weapon = GameData.weapons[weaponType];
    const isEffective = enemy.weakness === weaponType;

    GameState.lastAttack = {
      weapon: weaponType,
      isEffective: isEffective
    };

    // エフェクト設定
    const effectEmojis = {
      chatgpt: "⚔️💥",
      automation: "🛡️✨",
      image: "🏹🎯"
    };

    document.getElementById('attack-effect').textContent = effectEmojis[weaponType];

    // 結果テキスト
    const resultTitle = document.getElementById('attack-result-title');
    const resultMessage = document.getElementById('attack-result-message');
    const damageDisplay = document.querySelector('.damage-number');

    if (isEffective) {
      resultTitle.textContent = "効果抜群！";
      resultTitle.className = "effective";
      resultMessage.textContent = weapon.effectiveText;
      damageDisplay.textContent = "-100";
    } else {
      resultTitle.textContent = "攻撃成功！";
      resultTitle.className = "normal";
      resultMessage.textContent = weapon.normalText;
      damageDisplay.textContent = "-100";
    }

    // AIの豆知識を表示
    document.getElementById('ai-tip-text').textContent = enemy.tips[weaponType];

    this.showScreen('attack-result');
  },

  // 攻撃後の処理
  nextAfterAttack: function() {
    // HPを0にする（簡易版なので1撃で倒す）
    document.getElementById('enemy-hp-fill').style.width = '0%';

    // スキル獲得
    GameState.earnedSkills.push(GameState.currentEnemy.skill);

    // ステージクリア画面へ
    document.getElementById('defeated-enemy-image').src = GameState.currentEnemy.image;
    document.getElementById('defeated-enemy-name').textContent = GameState.currentEnemy.name;
    document.getElementById('skill-badge').innerHTML = `
      <span class="skill-icon">${GameState.currentEnemy.skill.icon}</span>
      <span class="skill-name">${GameState.currentEnemy.skill.name}</span>
    `;

    this.showScreen('stage-clear');
  },

  // 次のステージへ
  nextStage: function() {
    GameState.currentStage++;

    if (GameState.currentStage > 3) {
      // ゲームクリア
      this.showEnding();
    } else {
      // 次のバトル
      this.startBattle();
    }
  },

  // エンディング表示
  showEnding: function() {
    const charType = GameState.character;
    const title = GameData.titles[charType];
    const present = GameData.presents[charType];

    // お姫様のメッセージ
    document.getElementById('princess-message').innerHTML = present.princessMessage;

    // 勇者画像
    const heroImage = charType === 'student' ? 'images/hero-student.png' : 'images/hero-business.png';
    document.getElementById('result-hero-image').src = heroImage;

    // 称号
    document.getElementById('result-title').textContent = title.name;

    // 獲得スキル
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = GameState.earnedSkills.map(skill => `
      <div class="skill-item">
        <span>${skill.icon}</span>
        <span>${skill.name}</span>
      </div>
    `).join('');

    // プレゼント
    document.getElementById('present-description').textContent = present.description;
    document.getElementById('coupon-code').textContent = present.coupon;

    // CTAボタン
    document.getElementById('cta-message').innerHTML = present.ctaAdvice;
    document.getElementById('btn-main-cta').textContent = present.ctaText;

    this.showScreen('ending');
  },

  // 相談へ誘導
  goToConsultation: function() {
    const present = GameData.presents[GameState.character];

    if (GameState.liffInitialized && liff.isInClient()) {
      // LINEアプリ内の場合、メッセージを送信してLIFFを閉じる
      liff.sendMessages([
        {
          type: 'text',
          text: present.ctaMessage
        }
      ]).then(() => {
        liff.closeWindow();
      }).catch((error) => {
        console.error('Send message error:', error);
        alert('メッセージの送信に失敗しました。トーク画面から「' + present.ctaMessage + '」と送信してください。');
      });
    } else {
      // LINE外の場合
      alert('LINEアプリからこのゲームを開いて、「' + present.ctaMessage + '」と送信してください！');
    }
  },

  // 結果をシェア
  shareResult: function() {
    const title = GameData.titles[GameState.character];
    const shareText = `【AIクエストクリア！】\n称号「${title.name}」を獲得しました！\nあなたもAIの力で世界を救おう！\n\n#AIクエスト #if塾 #AIX`;

    if (GameState.liffInitialized && liff.isApiAvailable('shareTargetPicker')) {
      liff.shareTargetPicker([
        {
          type: 'text',
          text: shareText
        }
      ]).catch((error) => {
        console.error('Share error:', error);
        this.fallbackShare(shareText);
      });
    } else {
      this.fallbackShare(shareText);
    }
  },

  // フォールバックシェア
  fallbackShare: function(text) {
    if (navigator.share) {
      navigator.share({
        title: 'AIクエスト',
        text: text
      });
    } else {
      // クリップボードにコピー
      navigator.clipboard.writeText(text).then(() => {
        alert('シェア用テキストをコピーしました！');
      }).catch(() => {
        alert(text);
      });
    }
  },

  // ゲームリスタート
  restartGame: function() {
    GameState.character = null;
    GameState.currentStage = 1;
    GameState.enemies = [];
    GameState.currentEnemy = null;
    GameState.earnedSkills = [];
    GameState.lastAttack = null;

    this.showScreen('title');
  }
};

// ========================================
// 初期化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
