'use strict';

// O10N - Alphascape 2.0
[{
  zoneRegex: /^(Alphascape \(V2.0\)|Alphascape V2.0)$/,
  timelineFile: 'o10n.txt',
  triggers: [
    {
      // Spin Table
      // 31C7 + 31C9 = 31CD (horiz + horiz = out)
      // 31C7 + 31CB = 31CF (horiz + vert = in)
      // 31C8 + 31CB = 31D0 (vert + vert = +)
      id: 'O10N Spin Cleanup',
      regex: /15:\y{ObjectId}:Midgardsormr:31C[78]:/,
      regexDe: /15:\y{ObjectId}:Midgardsormr:31C[78]:/,
      regexFr: /15:\y{ObjectId}:Midgardsormr:31C[78]:/,
      regexJa: /15:\y{ObjectId}:ミドガルズオルム:31C[78]:/,
      delaySeconds: 10,
      run: function(data) {
        delete data.lastSpinWasHorizontal;
      },
    },
    {
      id: 'O10N Horizontal Spin 1',
      regex: /15:\y{ObjectId}:Midgardsormr:31C7:/,
      regexDe: /15:\y{ObjectId}:Midgardsormr:31C7:/,
      regexFr: /15:\y{ObjectId}:Midgardsormr:31C7:/,
      regexJa: /15:\y{ObjectId}:ミドガルズオルム:31C7:/,
      infoText: {
        en: 'Next Spin: In or Out',
        fr: 'Tour suivant : Dedans/Dehors',
      },
      run: function(data) {
        data.lastSpinWasHorizontal = true;
      },
    },
    {
      id: 'O10N Vertical Spin 1',
      regex: /15:\y{ObjectId}:Midgardsormr:31C8:/,
      regexDe: /15:\y{ObjectId}:Midgardsormr:31C8:/,
      regexFr: /15:\y{ObjectId}:Midgardsormr:31C8:/,
      regexJa: /15:\y{ObjectId}:ミドガルズオルム:31C8:/,
      infoText: {
        en: 'Next Spin: Corners',
        fr: 'Tour suivant : Plus',
      },
      run: function(data) {
        data.lastSpinWasHorizontal = false;
      },
    },
    {
      id: 'O10N Horizontal Spin 2',
      regex: /15:\y{ObjectId}:Midgardsormr:31C9:/,
      regexDe: /15:\y{ObjectId}:Midgardsormr:31C9:/,
      regexFr: /15:\y{ObjectId}:Midgardsormr:31C9:/,
      regexJa: /15:\y{ObjectId}:ミドガルズオルム:31C9:/,
      condition: function(data) {
        return data.lastSpinWasHorizontal !== undefined;
      },
      alertText: function(data) {
        if (data.lastSpinWasHorizontal) {
          return {
            en: 'Get Out',
            fr: 'Sortez',
          };
        }
        // This shouldn't happen.
        return {
          en: 'Go To Cardinals',
          fr: 'Allez sur les points cardinaux',
        };
      },
    },
    {
      id: 'O10N Vertical Spin 2',
      regex: /15:\y{ObjectId}:Midgardsormr:31CB:/,
      regexDe: /15:\y{ObjectId}:Midgardsormr:31CB:/,
      regexFr: /15:\y{ObjectId}:Midgardsormr:31CB:/,
      regexJa: /15:\y{ObjectId}:ミドガルズオルム:31CB:/,
      condition: function(data) {
        return data.lastSpinWasHorizontal !== undefined;
      },
      alertText: function(data) {
        if (data.lastSpinWasHorizontal) {
          return {
            en: 'Get In',
            fr: 'Allez sous le boss',
          };
        }
        return {
          en: 'Go To Corners',
          fr: 'Allez dans les coins',
        };
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Engage!': 'Start!',
        'Midgardsormr': 'Midgardsormr',
        'Ancient Dragon': 'Antik[a] Drache',
        'Immortal Key': 'Unsterblich[a] Schlüssel',
      },
      'replaceText': {
        '--targetable--': '--anvisierbar--',
        '--untargetable--': '--nich anvisierbar--',
        'Akh Morn': 'Akh Morn',
        'Akh Rhai': 'Akh Rhai',
        'Azure Wings': 'Azurschwingen',
        'Bloodied Maw': 'Blutiger Schlund',
        'Cauterize': 'Kauterisieren',
        'Coil': 'Angriff',
        'Crimson Breath': 'Purpurschwingen',
        'Crimson Wings': 'Purpurschwingen',
        'Dark Wave': 'Dunkle Welle',
        'Dry Ice': 'Trockeneis',
        'Earth Shaker': 'Erdstoß',
        'Enrage': 'Finalangriff',
        'Exaflare': 'Exaflare',
        'Flame Blast': 'Flammenhölle',
        'Frost Breath': 'Frostiger Atem',
        'Horrid Roar': 'Entsetzliches Brüllen',
        'Hot Tail': 'Schwelender Schweif',
        'Northern Cross': 'Kreuz des Nordens',
        'Protostar': 'Protostern',
        'Rime Wreath': 'Frostkalter Reif',
        'Stygian Maw': 'Stygischer Schlund',
        'Tail End': 'Schweifspitze',
        'Thunderstorm': 'Gewitter',
        'Time Immemorial': 'Urknall',
        'Touchdown': 'Himmelssturz',
        'attack': 'Attacke',

        // FIXME
        'Flip': 'Flip',
        'Spin': 'Spin',
        'Cardinals': 'Cardinals',
        'Corners': 'Corners',
        'In': 'In',
        'Out': 'Out',
        'Flip/Spin': 'Flip/Spin',
        'In/Out': 'In/Out',
        'Corners/Cardinals': 'Corners/Cardinals',
        'Shaker/Thunder': 'Shaker/Thunder',
        ' ready': ' ready',
        'Signal': 'Signal',
        'Position': 'Position',
      },
      '~effectNames': {
        'Arcane Bulwark': 'Magische Barriere',
        'Crumbling Bulwark': 'Zerstörung der magischen Barriere',
        'Death from Above': 'Strafe des Himmels',
        'Death from Below': 'Strafe der Erde',
        'Defenseless': 'Magische Barriere blockiert',
        'Landborne': 'Kraft der Erde',
        'Skyborne': 'Kraft des Himmels',
        'Thin Ice': 'Glatteis',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Engage!': 'À l\'attaque',
        'Midgardsormr': 'Midgardsormr',
        'Ancient Dragon': 'Dragon Ancien',
        'Immortal Key': 'Clef Immortelle',
      },
      'replaceText': {
        '--Reset--': '--Réinitialisation--',
        '--sync--': '--synchronisation--',
        '--targetable--': '--ciblable--',
        '--untargetable--': '--impossible à cibler--',
        'Akh Morn': 'Akh Morn',
        'Akh Rhai': 'Akh Rhai',
        'Azure Wings': 'Ailes azur',
        'Bloodied Maw': 'Gueule ensanglantée',
        'Cauterize': 'Cautérisation',
        'Coil': 'Charge',
        'Crimson Breath': 'Haleine cramoisie',
        'Crimson Wings': 'Ailes pourpres',
        'Dark Wave': 'Vague de ténèbres',
        'Dry Ice': 'Poussière glaçante',
        'Earth Shaker': 'Secousse',
        'Enrage': 'Enragement',
        'Exaflare': 'ExaBrasier',
        'Flame Blast': 'Explosion de flamme',
        'Frost Breath': 'Souffle glacé',
        'Horrid Roar': 'Rugissement horrible',
        'Hot Tail': 'Queue calorifique',
        'Northern Cross': 'Croix du nord',
        'Protostar': 'Proto-étoile',
        'Rime Wreath': 'Enveloppe de givre',
        'Stygian Maw': 'Gueule ténébreuse',
        'Tail End': 'Pointe de queue',
        'Thunderstorm': 'Tempête de foudre',
        'Time Immemorial': 'Big bang',
        'Touchdown': 'Atterrissage',
        'attack': 'Attaque',

        'Flip': 'Tour vertical',
        'Spin': 'Tour horizontal',
        'Cardinals': 'Cardinaux',
        'In': 'Dedans',
        'Out': 'Dehors',
        'Flip/Spin': 'Tour Hz/Vt',
        'In/Out': 'Dedans/Dehors',
        'Corners/Cardinals': 'Coins/Cardinaux',
        'Shaker/Thunder': 'Secousse/Tempête',
        ' ready': ' prêt',

        // FIXME
        'Corners': 'Corners',
        'Signal': 'Signal',
        'Position': 'Position',
      },
      '~effectNames': {
        'Arcane Bulwark': 'Barrière magique',
        'Crumbling Bulwark': 'Barrière magique détériorée',
        'Death from Above': 'Désastre céleste',
        'Death from Below': 'Désastre terrestre',
        'Defenseless': 'Barrière magique bloquée',
        'Landborne': 'Force terrestre',
        'Skyborne': 'Force céleste',
        'Thin Ice': 'Verglas',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Engage!': '戦闘開始！',
        'Midgardsormr': 'ミドガルズオルム',
        'Ancient Dragon': 'エンシェントドラゴン',
        'Immortal Key': '竜の楔',
      },
      'replaceText': {
        'Akh Morn': 'アク・モーン',
        'Akh Rhai': 'アク・ラーイ',
        'Azure Wings': '蒼翼の焔',
        'Bloodied Maw': '紅牙の焔',
        'Cauterize': 'カータライズ',
        'Coil': '',
        'Crimson Breath': 'クリムゾンブレス',
        'Crimson Wings': '紅翼の焔',
        'Dark Wave': 'ダークウェーブ',
        'Dry Ice': 'フリージングダスト',
        'Earth Shaker': 'アースシェイカー',
        'Exaflare': 'エクサフレア',
        'Flame Blast': 'フレイムブラスト',
        'Frost Breath': 'フロストブレス',
        'Horrid Roar': 'ホリッドロア',
        'Hot Tail': 'ヒートテイル',
        'Northern Cross': 'ノーザンクロス',
        'Protostar': 'プロトスター',
        'Rime Wreath': 'ライムリリース',
        'Stygian Maw': '',
        'Tail End': 'テイルエンド',
        'Thunderstorm': 'サンダーストーム',
        'Time Immemorial': '天地開闢',
        'Touchdown': 'タッチダウン',
        'attack': '攻撃',

        // FIXME
        'Flip': 'Flip',
        'Spin': 'Spin',
        'Cardinals': 'Cardinals',
        'Corners': 'Corners',
        'In': 'In',
        'Out': 'Out',
        'Flip/Spin': 'Flip/Spin',
        'In/Out': 'In/Out',
        'Corners/Cardinals': 'Corners/Cardinals',
        'Shaker/Thunder': 'Shaker/Thunder',
        ' ready': ' ready',
        'Signal': 'Signal',
        'Position': 'Position',
      },
      '~effectNames': {
        'Arcane Bulwark': '魔法障壁',
        'Crumbling Bulwark': '魔法障壁：崩壊',
        'Death from Above': '天の災厄',
        'Death from Below': '地の災厄',
        'Defenseless': '魔法障壁：展開不可',
        'Landborne': '地の力',
        'Skyborne': '天の力',
        'Thin Ice': '氷床',
      },
    },
  ],
}];