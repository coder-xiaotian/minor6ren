declare module 'lunar-javascript' {
  export class Solar {
    static fromDate(date: Date): Solar
    static fromYmd(year: number, month: number, day: number): Solar
    getLunar(): Lunar
    getYear(): number
    getMonth(): number
    getDay(): number
  }

  export class Lunar {
    static fromYmd(year: number, month: number, day: number): Lunar
    static fromDate(date: Date): Lunar
    getYear(): number
    getMonth(): number
    getDay(): number
    getYearInGanZhi(): string
    getMonthInChinese(): string
    getDayInChinese(): string
    getYearShengXiao(): string
    getSolar(): Solar
  }
}
