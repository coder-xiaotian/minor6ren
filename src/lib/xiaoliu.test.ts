/**
 * 小六壬核心算法测试
 * 测试规则来自 CLAUDE.md
 *
 * 六神排布顺序：大安(0) -> 留连(1) -> 速喜(2) -> 赤口(3) -> 小吉(4) -> 空亡(5)
 *
 * 计算公式：
 * - 月份：(lunarMonth - 1) % 6 -- 正月起大安
 * - 日期：(monthIndex + lunarDay - 1) % 6 -- 从月落点起数
 * - 时辰：(dayIndex + hourIndex - 1) % 6 -- 从日落点起数
 */

import { calculate, getHourIndex, GODS, HOURS } from './xiaoliu'

describe('GODS 六神配置', () => {
  it('应包含6个六神', () => {
    expect(GODS).toHaveLength(6)
  })

  it('六神顺序正确：大安 -> 留连 -> 速喜 -> 赤口 -> 小吉 -> 空亡', () => {
    expect(GODS[0].name).toBe('大安')
    expect(GODS[1].name).toBe('留连')
    expect(GODS[2].name).toBe('速喜')
    expect(GODS[3].name).toBe('赤口')
    expect(GODS[4].name).toBe('小吉')
    expect(GODS[5].name).toBe('空亡')
  })

  it('六神五行属性正确', () => {
    expect(GODS[0].element).toBe('木')  // 大安
    expect(GODS[1].element).toBe('水')  // 留连
    expect(GODS[2].element).toBe('火')  // 速喜
    expect(GODS[3].element).toBe('金')  // 赤口
    expect(GODS[4].element).toBe('木')  // 小吉
    expect(GODS[5].element).toBe('土')  // 空亡
  })

  it('六神吉凶属性正确', () => {
    expect(GODS[0].fortune).toBe('good')     // 大安 - 吉
    expect(GODS[1].fortune).toBe('neutral')  // 留连 - 平
    expect(GODS[2].fortune).toBe('good')     // 速喜 - 吉
    expect(GODS[3].fortune).toBe('bad')      // 赤口 - 凶
    expect(GODS[4].fortune).toBe('good')     // 小吉 - 吉
    expect(GODS[5].fortune).toBe('bad')      // 空亡 - 凶
  })
})

describe('HOURS 时辰配置', () => {
  it('应包含12个时辰', () => {
    expect(HOURS).toHaveLength(12)
  })

  it('时辰序号从1开始到12', () => {
    expect(HOURS[0].index).toBe(1)   // 子时
    expect(HOURS[11].index).toBe(12) // 亥时
  })

  it('子时为第一个时辰', () => {
    expect(HOURS[0].name).toBe('子时')
    expect(HOURS[0].range).toBe('23:00-01:00')
  })

  it('亥时为最后一个时辰', () => {
    expect(HOURS[11].name).toBe('亥时')
    expect(HOURS[11].range).toBe('21:00-23:00')
  })
})

describe('getHourIndex 时辰转换', () => {
  describe('子时 (23:00-01:00)', () => {
    it('23时应为子时(1)', () => {
      expect(getHourIndex(23)).toBe(1)
    })

    it('0时应为子时(1)', () => {
      expect(getHourIndex(0)).toBe(1)
    })
  })

  describe('丑时 (01:00-03:00)', () => {
    it('1时应为丑时(2)', () => {
      expect(getHourIndex(1)).toBe(2)
    })

    it('2时应为丑时(2)', () => {
      expect(getHourIndex(2)).toBe(2)
    })
  })

  describe('寅时 (03:00-05:00)', () => {
    it('3时应为寅时(3)', () => {
      expect(getHourIndex(3)).toBe(3)
    })

    it('4时应为寅时(3)', () => {
      expect(getHourIndex(4)).toBe(3)
    })
  })

  describe('卯时 (05:00-07:00)', () => {
    it('5时应为卯时(4)', () => {
      expect(getHourIndex(5)).toBe(4)
    })

    it('6时应为卯时(4)', () => {
      expect(getHourIndex(6)).toBe(4)
    })
  })

  describe('辰时 (07:00-09:00)', () => {
    it('7时应为辰时(5)', () => {
      expect(getHourIndex(7)).toBe(5)
    })

    it('8时应为辰时(5)', () => {
      expect(getHourIndex(8)).toBe(5)
    })
  })

  describe('巳时 (09:00-11:00)', () => {
    it('9时应为巳时(6)', () => {
      expect(getHourIndex(9)).toBe(6)
    })

    it('10时应为巳时(6)', () => {
      expect(getHourIndex(10)).toBe(6)
    })
  })

  describe('午时 (11:00-13:00)', () => {
    it('11时应为午时(7)', () => {
      expect(getHourIndex(11)).toBe(7)
    })

    it('12时应为午时(7)', () => {
      expect(getHourIndex(12)).toBe(7)
    })
  })

  describe('未时 (13:00-15:00)', () => {
    it('13时应为未时(8)', () => {
      expect(getHourIndex(13)).toBe(8)
    })

    it('14时应为未时(8)', () => {
      expect(getHourIndex(14)).toBe(8)
    })
  })

  describe('申时 (15:00-17:00)', () => {
    it('15时应为申时(9)', () => {
      expect(getHourIndex(15)).toBe(9)
    })

    it('16时应为申时(9)', () => {
      expect(getHourIndex(16)).toBe(9)
    })
  })

  describe('酉时 (17:00-19:00)', () => {
    it('17时应为酉时(10)', () => {
      expect(getHourIndex(17)).toBe(10)
    })

    it('18时应为酉时(10)', () => {
      expect(getHourIndex(18)).toBe(10)
    })
  })

  describe('戌时 (19:00-21:00)', () => {
    it('19时应为戌时(11)', () => {
      expect(getHourIndex(19)).toBe(11)
    })

    it('20时应为戌时(11)', () => {
      expect(getHourIndex(20)).toBe(11)
    })
  })

  describe('亥时 (21:00-23:00)', () => {
    it('21时应为亥时(12)', () => {
      expect(getHourIndex(21)).toBe(12)
    })

    it('22时应为亥时(12)', () => {
      expect(getHourIndex(22)).toBe(12)
    })
  })
})

describe('calculate 月份计算', () => {
  // 公式: (lunarMonth - 1) % 6

  it('正月(1月)应落在大安 (index=0)', () => {
    // (1-1) % 6 = 0 -> 大安
    const result = calculate(1, 1, 1)
    expect(result.month.godIndex).toBe(0)
    expect(result.month.god.name).toBe('大安')
  })

  it('二月应落在留连 (index=1)', () => {
    // (2-1) % 6 = 1 -> 留连
    const result = calculate(2, 1, 1)
    expect(result.month.godIndex).toBe(1)
    expect(result.month.god.name).toBe('留连')
  })

  it('三月应落在速喜 (index=2)', () => {
    // (3-1) % 6 = 2 -> 速喜
    const result = calculate(3, 1, 1)
    expect(result.month.godIndex).toBe(2)
    expect(result.month.god.name).toBe('速喜')
  })

  it('四月应落在赤口 (index=3)', () => {
    // (4-1) % 6 = 3 -> 赤口
    const result = calculate(4, 1, 1)
    expect(result.month.godIndex).toBe(3)
    expect(result.month.god.name).toBe('赤口')
  })

  it('五月应落在小吉 (index=4)', () => {
    // (5-1) % 6 = 4 -> 小吉
    const result = calculate(5, 1, 1)
    expect(result.month.godIndex).toBe(4)
    expect(result.month.god.name).toBe('小吉')
  })

  it('六月应落在空亡 (index=5)', () => {
    // (6-1) % 6 = 5 -> 空亡
    const result = calculate(6, 1, 1)
    expect(result.month.godIndex).toBe(5)
    expect(result.month.god.name).toBe('空亡')
  })

  it('七月应循环回大安 (index=0)', () => {
    // (7-1) % 6 = 0 -> 大安
    const result = calculate(7, 1, 1)
    expect(result.month.godIndex).toBe(0)
    expect(result.month.god.name).toBe('大安')
  })

  it('腊月(12月)应落在空亡 (index=5)', () => {
    // (12-1) % 6 = 11 % 6 = 5 -> 空亡
    const result = calculate(12, 1, 1)
    expect(result.month.godIndex).toBe(5)
    expect(result.month.god.name).toBe('空亡')
  })
})

describe('calculate 日期计算', () => {
  // 公式: (monthIndex + lunarDay - 1) % 6

  it('正月初一日应落在大安', () => {
    // 月: (1-1) % 6 = 0 (大安)
    // 日: (0 + 1 - 1) % 6 = 0 -> 大安
    const result = calculate(1, 1, 1)
    expect(result.day.godIndex).toBe(0)
    expect(result.day.god.name).toBe('大安')
  })

  it('正月初二日应落在留连', () => {
    // 月: 0 (大安)
    // 日: (0 + 2 - 1) % 6 = 1 -> 留连
    const result = calculate(1, 2, 1)
    expect(result.day.godIndex).toBe(1)
    expect(result.day.god.name).toBe('留连')
  })

  it('正月初七日应循环回大安', () => {
    // 月: 0 (大安)
    // 日: (0 + 7 - 1) % 6 = 6 % 6 = 0 -> 大安
    const result = calculate(1, 7, 1)
    expect(result.day.godIndex).toBe(0)
    expect(result.day.god.name).toBe('大安')
  })

  it('二月初一日应落在留连', () => {
    // 月: (2-1) % 6 = 1 (留连)
    // 日: (1 + 1 - 1) % 6 = 1 -> 留连
    const result = calculate(2, 1, 1)
    expect(result.day.godIndex).toBe(1)
    expect(result.day.god.name).toBe('留连')
  })

  it('三月十五日计算正确', () => {
    // 月: (3-1) % 6 = 2 (速喜)
    // 日: (2 + 15 - 1) % 6 = 16 % 6 = 4 -> 小吉
    const result = calculate(3, 15, 1)
    expect(result.day.godIndex).toBe(4)
    expect(result.day.god.name).toBe('小吉')
  })

  it('腊月三十日计算正确', () => {
    // 月: (12-1) % 6 = 5 (空亡)
    // 日: (5 + 30 - 1) % 6 = 34 % 6 = 4 -> 小吉
    const result = calculate(12, 30, 1)
    expect(result.day.godIndex).toBe(4)
    expect(result.day.god.name).toBe('小吉')
  })
})

describe('calculate 时辰计算', () => {
  // 公式: (dayIndex + hourIndex - 1) % 6

  it('正月初一子时应落在大安', () => {
    // 月: 0, 日: 0, 时: (0 + 1 - 1) % 6 = 0 -> 大安
    const result = calculate(1, 1, 1)
    expect(result.hour.godIndex).toBe(0)
    expect(result.hour.god.name).toBe('大安')
    expect(result.hour.name).toBe('子时')
  })

  it('正月初一丑时应落在留连', () => {
    // 月: 0, 日: 0, 时: (0 + 2 - 1) % 6 = 1 -> 留连
    const result = calculate(1, 1, 2)
    expect(result.hour.godIndex).toBe(1)
    expect(result.hour.god.name).toBe('留连')
    expect(result.hour.name).toBe('丑时')
  })

  it('正月初一亥时应落在空亡', () => {
    // 月: 0, 日: 0, 时: (0 + 12 - 1) % 6 = 11 % 6 = 5 -> 空亡
    const result = calculate(1, 1, 12)
    expect(result.hour.godIndex).toBe(5)
    expect(result.hour.god.name).toBe('空亡')
    expect(result.hour.name).toBe('亥时')
  })

  it('二月初三午时计算正确', () => {
    // 月: (2-1) % 6 = 1 (留连)
    // 日: (1 + 3 - 1) % 6 = 3 (赤口)
    // 时: (3 + 7 - 1) % 6 = 9 % 6 = 3 -> 赤口
    const result = calculate(2, 3, 7)
    expect(result.hour.godIndex).toBe(3)
    expect(result.hour.god.name).toBe('赤口')
    expect(result.hour.name).toBe('午时')
  })
})

describe('calculate 完整推算流程', () => {
  it('返回完整的计算结果', () => {
    const result = calculate(1, 1, 1)

    // 验证结构完整性
    expect(result).toHaveProperty('month')
    expect(result).toHaveProperty('day')
    expect(result).toHaveProperty('hour')
    expect(result).toHaveProperty('finalGod')

    // 验证月份信息
    expect(result.month.value).toBe(1)
    expect(result.month.godIndex).toBe(0)
    expect(result.month.god).toBeDefined()

    // 验证日期信息
    expect(result.day.value).toBe(1)
    expect(result.day.godIndex).toBe(0)
    expect(result.day.god).toBeDefined()

    // 验证时辰信息
    expect(result.hour.value).toBe(1)
    expect(result.hour.name).toBe('子时')
    expect(result.hour.godIndex).toBe(0)
    expect(result.hour.god).toBeDefined()

    // 最终结果应等于时辰的六神
    expect(result.finalGod).toEqual(result.hour.god)
  })

  it('finalGod 始终等于时辰的六神', () => {
    // 测试多个场景
    const testCases = [
      { month: 1, day: 1, hour: 1 },
      { month: 3, day: 15, hour: 7 },
      { month: 6, day: 20, hour: 12 },
      { month: 12, day: 30, hour: 6 }
    ]

    testCases.forEach(({ month, day, hour }) => {
      const result = calculate(month, day, hour)
      expect(result.finalGod).toEqual(result.hour.god)
    })
  })

  it('复杂案例：腊月廿五申时', () => {
    // 月: (12-1) % 6 = 5 (空亡)
    // 日: (5 + 25 - 1) % 6 = 29 % 6 = 5 (空亡)
    // 时: (5 + 9 - 1) % 6 = 13 % 6 = 1 (留连)
    const result = calculate(12, 25, 9)

    expect(result.month.god.name).toBe('空亡')
    expect(result.day.god.name).toBe('空亡')
    expect(result.hour.god.name).toBe('留连')
    expect(result.finalGod.name).toBe('留连')
  })

  it('边界案例：六月初六巳时', () => {
    // 月: (6-1) % 6 = 5 (空亡)
    // 日: (5 + 6 - 1) % 6 = 10 % 6 = 4 (小吉)
    // 时: (4 + 6 - 1) % 6 = 9 % 6 = 3 (赤口)
    const result = calculate(6, 6, 6)

    expect(result.month.god.name).toBe('空亡')
    expect(result.day.god.name).toBe('小吉')
    expect(result.hour.god.name).toBe('赤口')
  })
})

describe('calculate 边界条件', () => {
  it('处理最小值：正月初一子时', () => {
    const result = calculate(1, 1, 1)
    expect(result.finalGod.name).toBe('大安')
  })

  it('处理最大值：腊月三十亥时', () => {
    // 月: 5, 日: (5+30-1)%6=4, 时: (4+12-1)%6=3
    const result = calculate(12, 30, 12)
    expect(result.month.god.name).toBe('空亡')
    expect(result.day.god.name).toBe('小吉')
    expect(result.hour.god.name).toBe('赤口')
  })

  it('处理闰月日期：三十日', () => {
    const result = calculate(1, 30, 1)
    // 月: 0, 日: (0+30-1)%6=5, 时: (5+1-1)%6=5
    expect(result.day.god.name).toBe('空亡')
    expect(result.hour.god.name).toBe('空亡')
  })

  it('处理无效时辰索引时返回空字符串作为时辰名', () => {
    // hourIndex 超出 1-12 范围时，HOURS[hourIndex - 1] 为 undefined
    const result = calculate(1, 1, 99)
    expect(result.hour.name).toBe('')
    // 算法仍然正常工作
    expect(result.hour.godIndex).toBe((0 + 99 - 1) % 6)
  })
})
