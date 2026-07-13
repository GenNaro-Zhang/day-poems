export interface TimePeriod {
  id: string;
  name: string;
  time: string;
  desc: string;
  poem: string;
  startHour: number;
  endHour: number;
  currentHour: number;
  timestamp: number;
}

type Lang = 'zh' | 'en';

export function getCurrentTimePeriod(lang: Lang = 'zh'): TimePeriod {
  const periods = [
    {
      id: 'dawn',
      start: 4,
      end: 6,
      zh: { name: '破晓', desc: '天光初醒，万物渐明。', poem: '东方既白，晨光熹微。' },
      en: { name: 'DAWN', desc: 'The sky begins to light up.', poem: 'The east grows pale, the first light gleams.' },
    },
    {
      id: 'sunrise',
      start: 6,
      end: 8,
      zh: { name: '晨曦', desc: '旭日东升，暖意渐生。', poem: '日出江花红胜火，春来江水绿如蓝。' },
      en: {
        name: 'SUNRISE',
        desc: 'The sun rises and brings warmth.',
        poem: 'The sunrise flowers burn like fire, spring river green as indigo dye.',
      },
    },
    {
      id: 'morning',
      start: 8,
      end: 10,
      zh: { name: '朝晖', desc: '一日之始，生机盎然。', poem: '朝辞白帝彩云间，千里江陵一日还。' },
      en: {
        name: 'MORNING',
        desc: 'A fresh start full of energy.',
        poem: 'At dawn I leave Baidi in rosy clouds, a thousand miles to Jiangling in one day.',
      },
    },
    {
      id: 'forenoon',
      start: 10,
      end: 12,
      zh: { name: '隅中', desc: '心无旁骛，事竟功成。', poem: '大鹏一日同风起，扶摇直上九万里。' },
      en: {
        name: 'FORENOON',
        desc: 'Time to focus and get things done.',
        poem: 'The roc rises with the wind in one day, soaring ninety thousand miles high.',
      },
    },
    {
      id: 'noon',
      start: 12,
      end: 13,
      zh: { name: '日中', desc: '赤日当空，光华万丈。', poem: '亭午息群物，独游爱芳塘。' },
      en: {
        name: 'NOON',
        desc: 'The sun is high in the sky.',
        poem: 'At noon all creatures rest, I stroll the fragrant pond alone.',
      },
    },
    {
      id: 'afternoon',
      start: 13,
      end: 16,
      zh: { name: '日昳', desc: '时光流转，行稳致远。', poem: '山重水复疑无路，柳暗花明又一村。' },
      en: {
        name: 'AFTERNOON',
        desc: 'The day continues with steady progress.',
        poem: 'Mountains and streams seem to block the way, yet willows shade and flowers brighten another village.',
      },
    },
    {
      id: 'dusk',
      start: 16,
      end: 18,
      zh: { name: '暮色', desc: '夕阳西沉，霞染长天。', poem: '落霞与孤鹜齐飞，秋水共长天一色。' },
      en: {
        name: 'DUSK',
        desc: 'The sun sets and the sky turns beautiful.',
        poem: 'Rosy clouds and lone ducks fly together, autumn river and vast sky share one hue.',
      },
    },
    {
      id: 'twilight',
      start: 18,
      end: 20,
      zh: { name: '黄昏', desc: '天幕渐垂，灯火初上。', poem: '月上柳梢头，人约黄昏后。' },
      en: {
        name: 'TWILIGHT',
        desc: 'The sky darkens, lights begin to glow.',
        poem: 'The moon hangs on the willow tip, we meet after dusk.',
      },
    },
    {
      id: 'evening',
      start: 20,
      end: 22,
      zh: { name: '入夜', desc: '闲庭信步，共话桑麻。', poem: '开轩面场圃，把酒话桑麻。' },
      en: {
        name: 'EVENING',
        desc: 'A time to relax and spend with others.',
        poem: 'Open the window to fields and gardens, over wine we talk of crops and life.',
      },
    },
    {
      id: 'night',
      start: 22,
      end: 24,
      zh: { name: '夜深', desc: '万籁俱寂，星河入梦。', poem: '天阶夜色凉如水，坐看牵牛织女星。' },
      en: {
        name: 'NIGHT',
        desc: 'The world is quiet and peaceful.',
        poem: 'The night on palace steps is cool as water, sitting to watch the Cowherd and Weaving Maid stars.',
      },
    },
    {
      id: 'midnight',
      start: 0,
      end: 4,
      zh: { name: '子夜', desc: '酣然入梦，新元待启。', poem: '姑苏城外寒山寺，夜半钟声到客船。' },
      en: {
        name: 'MIDNIGHT',
        desc: 'Deep sleep, new dreams, new energy.',
        poem: "Outside Gusu city lies Cold Mountain Temple, its midnight bell reaches the traveler's boat.",
      },
    },
  ];

  const now = new Date();
  const hour = now.getHours();

  let currentPeriod = null;
  for (const p of periods) {
    let start = p.start;
    let end = p.end;
    if (start === 0 && end === 4) {
      if (hour >= 0 && hour < 4) {
        currentPeriod = p;
        break;
      }
    } else {
      if (hour >= start && hour < end) {
        currentPeriod = p;
        break;
      }
    }
  }

  if (!currentPeriod) {
    currentPeriod = periods[periods.length - 1];
  }

  const langKey = lang === 'zh' ? 'zh' : 'en';
  const timeRange = currentPeriod.start + ':00 - ' + currentPeriod.end + ':00';

  return {
    id: currentPeriod.id,
    name: currentPeriod[langKey].name,
    time: timeRange,
    desc: currentPeriod[langKey].desc,
    poem: currentPeriod[langKey].poem,
    startHour: currentPeriod.start,
    endHour: currentPeriod.end,
    currentHour: hour,
    timestamp: now.getTime(),
  };
}
