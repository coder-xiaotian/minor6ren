import { Solar, Lunar } from 'lunar-javascript'
import { getHourIndex, HOURS } from './xiaoliu'

export interface LunarDateTime {
  year: number
  month: number
  day: number
  hourIndex: number
  hourName: string
  yearInGanZhi: string
  monthInChinese: string
  dayInChinese: string
  isLeapMonth: boolean
  animal: string
}

/**
 * 获取当前农历日期时间
 */
export function getCurrentLunar(): LunarDateTime {
  const now = new Date()
  return getLunarFromDate(now)
}

/**
 * 从 Date 对象获取农历日期时间
 */
export function getLunarFromDate(date: Date): LunarDateTime {
  const solar = Solar.fromDate(date)
  const lunar = solar.getLunar()
  const hour = date.getHours()
  const hourIndex = getHourIndex(hour)
  const hourInfo = HOURS[hourIndex - 1]

  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    hourIndex,
    hourName: hourInfo?.name || '',
    yearInGanZhi: lunar.getYearInGanZhi(),
    monthInChinese: lunar.getMonthInChinese(),
    dayInChinese: lunar.getDayInChinese(),
    isLeapMonth: lunar.getMonth() < 0,
    animal: lunar.getYearShengXiao()
  }
}

/**
 * 从农历日期创建 LunarDateTime
 */
export function createLunarDateTime(
  year: number,
  month: number,
  day: number,
  hourIndex: number
): LunarDateTime {
  const lunar = Lunar.fromYmd(year, month, day)
  const hourInfo = HOURS[hourIndex - 1]

  return {
    year,
    month,
    day,
    hourIndex,
    hourName: hourInfo?.name || '',
    yearInGanZhi: lunar.getYearInGanZhi(),
    monthInChinese: lunar.getMonthInChinese(),
    dayInChinese: lunar.getDayInChinese(),
    isLeapMonth: month < 0,
    animal: lunar.getYearShengXiao()
  }
}

/**
 * 获取指定年份的农历月份列表（包含闰月）
 */
export function getLunarMonths(year: number): { value: number; label: string }[] {
  const months: { value: number; label: string }[] = []
  const monthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']

  // 查找是否有闰月
  const lunar = Lunar.fromYmd(year, 1, 1)
  const leapMonth = lunar.getYear() === year ? getLeapMonth(year) : 0

  for (let i = 1; i <= 12; i++) {
    months.push({ value: i, label: `${monthNames[i - 1]}月` })
    if (leapMonth === i) {
      months.push({ value: -i, label: `闰${monthNames[i - 1]}月` })
    }
  }

  return months
}

/**
 * 获取指定年份的闰月（0表示无闰月）
 */
function getLeapMonth(year: number): number {
  try {
    // lunar-javascript 中获取闰月的方式
    for (let m = 1; m <= 12; m++) {
      try {
        Lunar.fromYmd(year, -m, 1)
        return m
      } catch {
        continue
      }
    }
  } catch {
    return 0
  }
  return 0
}

/**
 * 获取指定农历年月的天数
 */
export function getLunarDays(year: number, month: number): number {
  try {
    // 尝试获取该月的最后一天
    for (let day = 30; day >= 29; day--) {
      try {
        Lunar.fromYmd(year, month, day)
        return day
      } catch {
        continue
      }
    }
  } catch {
    return 30
  }
  return 30
}

/**
 * 格式化农历日期显示
 */
export function formatLunarDate(lunar: LunarDateTime): string {
  const leapPrefix = lunar.isLeapMonth ? '闰' : ''
  return `${lunar.yearInGanZhi}年（${lunar.animal}）${leapPrefix}${lunar.monthInChinese}月${lunar.dayInChinese} ${lunar.hourName}`
}
