'use strict';

[{
  zoneRegex: /^Alexander - The Cuff Of The Son \(Savage\)$/,
  timelineFile: 'a6s.txt',
  triggers: [
    {
      id: 'A6S Magic Vulnerability Gain',
      regex: Regexes.gainsEffect({ effect: 'Magic Vulnerability Up' }),
      regexDe: Regexes.gainsEffect({ effect: 'Erhöhte Magie-Verwundbarkeit' }),
      regexFr: Regexes.gainsEffect({ effect: 'Vulnérabilité Magique Augmentée' }),
      regexJa: Regexes.gainsEffect({ effect: '被魔法ダメージ増加' }),
      regexCn: Regexes.gainsEffect({ effect: '魔法受伤加重' }),
      regexKo: Regexes.gainsEffect({ effect: '받는 마법 피해량 증가' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      run: function(data) {
        data.magicVulnerability = true;
      },
    },
    {
      id: 'A6S Magic Vulnerability Loss',
      regex: Regexes.losesEffect({ effect: 'Magic Vulnerability Up' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      run: function(data) {
        data.magicVulnerability = false;
      },
    },
    {
      id: 'A6S Mind Blast',
      regex: Regexes.startsUsing({ source: 'Blaster', id: '15F3', capture: false }),
      condition: function(data) {
        return data.CanSilence();
      },
      response: Responses.silence(),
    },
    {
      id: 'A6S Hidden Minefield',
      regex: Regexes.startsUsing({ source: 'Blaster', id: '15F7', capture: false }),
      infoText: function(data) {
        if (data.role == 'tank' && !data.magicVulnerability) {
          return {
            en: 'Get Mines',
          };
        }
        return {
          en: 'Avoid Mines',
        };
      },
    },
    {
      id: 'A6S Supercharge',
      regex: Regexes.startsUsing({ source: 'Blaster Mirage', id: '15FB', capture: false }),
      suppressSeconds: 1,
      infoText: {
        en: 'Dodge Mirage Charge',
      },
    },
    {
      id: 'A6S Blinder',
      regex: Regexes.startsUsing({ source: 'Blaster Mirage', id: '15FC' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Look Away from Mirage',
      },
    },
    {
      id: 'A6S Power Tackle',
      regex: Regexes.startsUsing({ source: 'Blaster Mirage', id: '15FD' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Look Towards Mirage',
      },
    },
    {
      id: 'A6S Single Buster',
      regex: Regexes.ability({ source: 'Brawler', id: '1602' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      response: Responses.tankBuster(),
    },
    {
      id: 'A6S Double Buster',
      regex: Regexes.ability({ source: 'Brawler', id: '1603', capture: false }),
      infoText: {
        en: 'Double Buster: Group Soak',
      },
    },
    {
      id: 'A6S Rocket Drill',
      regex: Regexes.ability({ source: 'Brawler', id: '1604' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Get Away from Boss',
      },
    },
    {
      id: 'A6S Double Drill Crush',
      regex: Regexes.ability({ source: 'Brawler', id: '1605', capture: false }),
      condition: function(data) {
        return data.role == 'tank';
      },
      alarmText: {
        en: 'Double Drill: Be Near/Far',
      },
    },
    {
      id: 'A6S Low Arithmeticks',
      regex: Regexes.gainsEffect({ effect: 'Low Arithmeticks' }),
      regexDe: Regexes.gainsEffect({ effect: 'Biomathematik-Ebene 1' }),
      regexFr: Regexes.gainsEffect({ effect: 'Calcul de dénivelé 1' }),
      regexJa: Regexes.gainsEffect({ effect: '算術：ハイト1' }),
      regexCn: Regexes.gainsEffect({ effect: '算术：高度1' }),
      regexKo: Regexes.gainsEffect({ effect: '산술: 고도 1' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Go High',
      },
    },
    {
      id: 'A6S High Arithmeticks',
      regex: Regexes.gainsEffect({ effect: 'High Arithmeticks' }),
      regexDe: Regexes.gainsEffect({ effect: 'Biomathematik-Ebene 2' }),
      regexFr: Regexes.gainsEffect({ effect: 'Calcul de dénivelé 2' }),
      regexJa: Regexes.gainsEffect({ effect: '算術：ハイト2' }),
      regexCn: Regexes.gainsEffect({ effect: '算术：高度2' }),
      regexKo: Regexes.gainsEffect({ effect: '산술: 고도 2' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Go Low',
      },
    },
    {
      id: 'A6S Bio-arithmeticks',
      regex: Regexes.startsUsing({ source: 'Swindler', id: '1610', capture: false }),
      response: Responses.aoe(),
    },
    {
      id: 'A6S Super Cyclone',
      regex: Regexes.startsUsing({ source: 'Vortexer', id: '1627', capture: false }),
      response: Responses.knockback(),
    },
    {
      id: 'A6S Ultra Flash',
      regex: Regexes.startsUsing({ source: 'Vortexer', id: '161A', capture: false }),
      alertText: {
        en: 'Hide Behind Tornado',
      },
    },
    {
      id: 'A6S Ice Marker',
      regex: Regexes.headMarker({ id: '0043' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alarmText: {
        en: 'Ice Missile on YOU',
      },
    },
    {
      id: 'A6S Compressed Water Initial',
      regex: Regexes.gainsEffect({ effect: 'Compressed Water' }),
      regexDe: Regexes.gainsEffect({ effect: 'Wasserkompression' }),
      regexFr: Regexes.gainsEffect({ effect: 'Compression aqueuse' }),
      regexJa: Regexes.gainsEffect({ effect: '水属性圧縮' }),
      regexCn: Regexes.gainsEffect({ effect: '水属性压缩' }),
      regexKo: Regexes.gainsEffect({ effect: '물속성 압축' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      infoText: {
        en: 'Water on YOU',
        de: 'Wasser auf DIR',
        ja: '自分に水',
      },
    },
    {
      id: 'A6S Compressed Water Explode',
      regex: Regexes.gainsEffect({ effect: 'Compressed Water' }),
      regexDe: Regexes.gainsEffect({ effect: 'Wasserkompression' }),
      regexFr: Regexes.gainsEffect({ effect: 'Compression aqueuse' }),
      regexJa: Regexes.gainsEffect({ effect: '水属性圧縮' }),
      regexCn: Regexes.gainsEffect({ effect: '水属性压缩' }),
      regexKo: Regexes.gainsEffect({ effect: '물속성 압축' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      delaySeconds: function(data, matches) {
        // 5 second warning.
        return parseFloat(matches.duration) - 5;
      },
      alertText: {
        en: 'Drop Water Soon',
        de: 'Gleich Wasser ablegen',
        ja: '水来るよ',
      },
    },
    {
      id: 'A6S Compressed Lightning Initial',
      regex: Regexes.gainsEffect({ effect: 'Compressed Lightning' }),
      regexDe: Regexes.gainsEffect({ effect: 'Blitzkompression' }),
      regexFr: Regexes.gainsEffect({ effect: 'Compression électrique' }),
      regexJa: Regexes.gainsEffect({ effect: '雷属性圧縮' }),
      regexCn: Regexes.gainsEffect({ effect: '雷属性压缩' }),
      regexKo: Regexes.gainsEffect({ effect: '번개속성 압축' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      infoText: {
        en: 'Lightning on YOU',
        de: 'Blitz auf DIR',
        ja: '自分に雷',
      },
    },
    {
      id: 'A6S Compressed Lightning Explode',
      regex: Regexes.gainsEffect({ effect: 'Compressed Lightning' }),
      regexDe: Regexes.gainsEffect({ effect: 'Blitzkompression' }),
      regexFr: Regexes.gainsEffect({ effect: 'Compression électrique' }),
      regexJa: Regexes.gainsEffect({ effect: '雷属性圧縮' }),
      regexCn: Regexes.gainsEffect({ effect: '雷属性压缩' }),
      regexKo: Regexes.gainsEffect({ effect: '번개속성 압축' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      delaySeconds: function(data, matches) {
        // 5 second warning.
        return parseFloat(matches.duration) - 5;
      },
      alertText: {
        en: 'Drop Lightning Soon',
        de: 'Gleich Blitz ablegen',
        ja: '雷来るよ',
      },
    },
  ],
}];
