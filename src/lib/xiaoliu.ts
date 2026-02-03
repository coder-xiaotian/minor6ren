// 小六壬核心算法
// 排布方式：三指六节横向排列
//         食指      中指      无名指
//   上节  │留连│ → │速喜│ → │赤口│
//           ↑                   ↓
//   下节  │大安│ ← │空亡│ ← │小吉│
// 顺时针顺序：大安(0) → 留连(1) → 速喜(2) → 赤口(3) → 小吉(4) → 空亡(5) → 循环

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
    name: '留连',
    position: '食指上节',
    finger: 'index',
    row: 'top',
    element: '水',
    meaning: '人未归时，属水玄武，凡谋事二、八、十。',
    poem: '留连事难成，求谋日未明。官事凡宜缓，去者未回程。失物南方见，急讨方心称。更须防口舌，人口且平平。',
    fortune: 'neutral'
  },
  {
    index: 2,
    name: '速喜',
    position: '中指上节',
    finger: 'middle',
    row: 'top',
    element: '火',
    meaning: '人即至时，属火朱雀，凡谋事三、六、九。',
    poem: '速喜喜来临，求财向南行。失物申未午，逢人路上寻。官事有福德，病者无祸侵。田宅六畜吉，行人有信音。',
    fortune: 'good'
  },
  {
    index: 3,
    name: '赤口',
    position: '无名指上节',
    finger: 'ring',
    row: 'top',
    element: '金',
    meaning: '官事凶时，属金白虎，凡谋事四、七、十。',
    poem: '赤口主口舌，官非切要防。失物速速讨，行人有惊慌。鸡犬多作怪，病者出西方。更须防咀咒，恐怕染瘟皇。',
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
    name: '空亡',
    position: '中指下节',
    finger: 'middle',
    row: 'bottom',
    element: '土',
    meaning: '音信稀时，属土勾陈，凡谋事三、六、九。',
    poem: '空亡事不祥，阴人少主张。求财无利益，行人有灾殃。失物寻不见，官事有刑伤。病人逢暗鬼，解禳保安康。',
    fortune: 'bad'
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
 * 基于三个数字进行小六壬推算
 * @param num1 第一个数（对应月份）
 * @param num2 第二个数（对应日期）
 * @param num3 第三个数（对应时辰）
 */
export function calculateByNumbers(
  num1: number,
  num2: number,
  num3: number
): CalculationResult {
  // 第一个数起大安
  const monthGodIndex = (num1 - 1) % 6
  // 从第一个数落点起，数第二个数
  const dayGodIndex = (monthGodIndex + num2 - 1) % 6
  // 从第二个数落点起，数第三个数
  const hourGodIndex = (dayGodIndex + num3 - 1) % 6

  return {
    month: {
      value: num1,
      godIndex: monthGodIndex,
      god: GODS[monthGodIndex]
    },
    day: {
      value: num2,
      godIndex: dayGodIndex,
      god: GODS[dayGodIndex]
    },
    hour: {
      value: num3,
      name: `第三数`,
      godIndex: hourGodIndex,
      god: GODS[hourGodIndex]
    },
    finalGod: GODS[hourGodIndex]
  }
}

/**
 * 从 RANDOM.ORG 获取真随机数（基于大气噪声）
 * @param count 数量
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 */
export async function fetchTrueRandomNumbers(
  count: number,
  min: number,
  max: number
): Promise<number[]> {
  const url = `https://www.random.org/integers/?num=${count}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`RANDOM.ORG API error: ${response.status}`)
  }

  const text = await response.text()
  const numbers = text
    .trim()
    .split('\n')
    .map(line => parseInt(line.trim(), 10))
    .filter(n => !isNaN(n))

  if (numbers.length !== count) {
    throw new Error('Invalid response from RANDOM.ORG')
  }

  return numbers
}

/**
 * 获取三个真随机数（优先 RANDOM.ORG，失败时降级到 crypto）
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 */
export async function getThreeRandomNumbers(
  min: number = 1,
  max: number = 100
): Promise<{ numbers: [number, number, number]; source: 'random.org' | 'crypto' }> {
  try {
    const numbers = await fetchTrueRandomNumbers(3, min, max)
    return {
      numbers: numbers as [number, number, number],
      source: 'random.org'
    }
  } catch {
    // 降级到 crypto.getRandomValues
    console.warn('RANDOM.ORG unavailable, falling back to crypto.getRandomValues')
    const fallback = getCryptoRandomNumbers(3, min, max)
    return {
      numbers: fallback as [number, number, number],
      source: 'crypto'
    }
  }
}

/**
 * 使用 crypto.getRandomValues 生成随机数（降级备选）
 */
function getCryptoRandomNumbers(count: number, min: number, max: number): number[] {
  const range = max - min + 1
  const array = new Uint32Array(count)
  crypto.getRandomValues(array)
  return Array.from(array).map(n => min + (n % range))
}

/**
 * 快速生成伪随机数用于动画效果
 */
export function getAnimationRandomNumbers(min: number = 1, max: number = 100): [number, number, number] {
  const range = max - min + 1
  const array = new Uint32Array(3)
  crypto.getRandomValues(array)
  return Array.from(array).map(n => min + (n % range)) as [number, number, number]
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
