// 小六壬核心算法
// 排布方式：三指六节横向排列
//         食指      中指      无名指
//   上节  │速喜│ → │赤口│ → │空亡│
//           ↑                   ↓
//   下节  │大安│ ← │留连│ ← │小吉│
// 顺时针顺序：大安(0) → 速喜(1) → 赤口(2) → 空亡(3) → 小吉(4) → 留连(5) → 循环

export interface God {
  index: number
  name: string
  position: string
  finger: 'index' | 'middle' | 'ring'
  row: 'top' | 'bottom'
  element: string
  meaning: string
  poem: string
  fortune: 'good' | 'bad' | 'neutral'
}

export const GODS: God[] = [
  {
    index: 0,
    name: '大安',
    position: '食指下节',
    finger: 'index',
    row: 'bottom',
    element: '木',
    meaning: '身不动时，属木青龙，凡谋事一、五、七。',
    poem: '大安事事昌，求财在坤方。失物去不远，宅舍保安康。行人身未动，病者主无妨。将军回田野，仔细更推详。',
    fortune: 'good'
  },
  {
    index: 1,
    name: '速喜',
    position: '食指上节',
    finger: 'index',
    row: 'top',
    element: '火',
    meaning: '人即至时，属火朱雀，凡谋事三、六、九。',
    poem: '速喜喜来临，求财向南行。失物申未午，逢人路上寻。官事有福德，病者无祸侵。田宅六畜吉，行人有信音。',
    fortune: 'good'
  },
  {
    index: 2,
    name: '赤口',
    position: '中指上节',
    finger: 'middle',
    row: 'top',
    element: '金',
    meaning: '官事凶时，属金白虎，凡谋事四、七、十。',
    poem: '赤口主口舌，官非切要防。失物速速讨，行人有惊慌。鸡犬多作怪，病者出西方。更须防咀咒，恐怕染瘟皇。',
    fortune: 'bad'
  },
  {
    index: 3,
    name: '空亡',
    position: '无名指上节',
    finger: 'ring',
    row: 'top',
    element: '土',
    meaning: '音信稀时，属土勾陈，凡谋事三、六、九。',
    poem: '空亡事不祥，阴人少主张。求财无利益，行人有灾殃。失物寻不见，官事有刑伤。病人逢暗鬼，解禳保安康。',
    fortune: 'bad'
  },
  {
    index: 4,
    name: '小吉',
    position: '无名指下节',
    finger: 'ring',
    row: 'bottom',
    element: '木',
    meaning: '人即至时，属木六合，凡谋事一、五、七。',
    poem: '小吉最吉昌，路上好商量。阴人来报喜，失物在坤方。行人即便至，交关甚是强。凡事皆和合，病者叩穹苍。',
    fortune: 'good'
  },
  {
    index: 5,
    name: '留连',
    position: '中指下节',
    finger: 'middle',
    row: 'bottom',
    element: '水',
    meaning: '人未归时，属水玄武，凡谋事二、八、十。',
    poem: '留连事难成，求谋日未明。官事凡宜缓，去者未回程。失物南方见，急讨方心称。更须防口舌，人口且平平。',
    fortune: 'neutral'
  }
]

// 时辰定义
export const HOURS = [
  { name: '子时', range: '23:00-01:00', index: 1 },
  { name: '丑时', range: '01:00-03:00', index: 2 },
  { name: '寅时', range: '03:00-05:00', index: 3 },
  { name: '卯时', range: '05:00-07:00', index: 4 },
  { name: '辰时', range: '07:00-09:00', index: 5 },
  { name: '巳时', range: '09:00-11:00', index: 6 },
  { name: '午时', range: '11:00-13:00', index: 7 },
  { name: '未时', range: '13:00-15:00', index: 8 },
  { name: '申时', range: '15:00-17:00', index: 9 },
  { name: '酉时', range: '17:00-19:00', index: 10 },
  { name: '戌时', range: '19:00-21:00', index: 11 },
  { name: '亥时', range: '21:00-23:00', index: 12 }
]

export interface CalculationResult {
  month: {
    value: number
    godIndex: number
    god: God
  }
  day: {
    value: number
    godIndex: number
    god: God
  }
  hour: {
    value: number
    name: string
    godIndex: number
    god: God
  }
  finalGod: God
}

/**
 * 小六壬推算
 * @param lunarMonth 农历月份 (1-12)
 * @param lunarDay 农历日期 (1-30)
 * @param hourIndex 时辰序号 (1-12, 子时=1)
 */
export function calculate(
  lunarMonth: number,
  lunarDay: number,
  hourIndex: number
): CalculationResult {
  // 月份起大安，数到该月
  const monthGodIndex = (lunarMonth - 1) % 6

  // 从月份落点起，数到该日
  const dayGodIndex = (monthGodIndex + lunarDay - 1) % 6

  // 从日份落点起，数到该时辰
  const hourGodIndex = (dayGodIndex + hourIndex - 1) % 6

  const hourInfo = HOURS[hourIndex - 1]

  return {
    month: {
      value: lunarMonth,
      godIndex: monthGodIndex,
      god: GODS[monthGodIndex]
    },
    day: {
      value: lunarDay,
      godIndex: dayGodIndex,
      god: GODS[dayGodIndex]
    },
    hour: {
      value: hourIndex,
      name: hourInfo?.name || '',
      godIndex: hourGodIndex,
      god: GODS[hourGodIndex]
    },
    finalGod: GODS[hourGodIndex]
  }
}

/**
 * 根据当前小时获取时辰序号
 */
export function getHourIndex(hour: number): number {
  if (hour === 23 || hour === 0) return 1  // 子时
  if (hour >= 1 && hour < 3) return 2      // 丑时
  if (hour >= 3 && hour < 5) return 3      // 寅时
  if (hour >= 5 && hour < 7) return 4      // 卯时
  if (hour >= 7 && hour < 9) return 5      // 辰时
  if (hour >= 9 && hour < 11) return 6     // 巳时
  if (hour >= 11 && hour < 13) return 7    // 午时
  if (hour >= 13 && hour < 15) return 8    // 未时
  if (hour >= 15 && hour < 17) return 9    // 申时
  if (hour >= 17 && hour < 19) return 10   // 酉时
  if (hour >= 19 && hour < 21) return 11   // 戌时
  return 12 // 亥时 21:00-23:00
}
