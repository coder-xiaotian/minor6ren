'use client'

import { useState, useEffect } from 'react'
import { LunarDateTime, getLunarMonths, getLunarDays } from '@/lib/lunar'
import { HOURS } from '@/lib/xiaoliu'

interface DatePickerProps {
  lunar: LunarDateTime | null
  onChange: (year: number, month: number, day: number, hourIndex: number) => void
  theme: 'modern' | 'classic'
}

export default function DatePicker({ lunar, onChange, theme }: DatePickerProps) {
  const isModern = theme === 'modern'

  const [year, setYear] = useState(lunar?.year || new Date().getFullYear())
  const [month, setMonth] = useState(lunar?.month || 1)
  const [day, setDay] = useState(lunar?.day || 1)
  const [hourIndex, setHourIndex] = useState(lunar?.hourIndex || 1)
  const [months, setMonths] = useState<{ value: number; label: string }[]>([])
  const [maxDay, setMaxDay] = useState(30)

  useEffect(() => {
    if (lunar) {
      setYear(lunar.year)
      setMonth(lunar.month)
      setDay(lunar.day)
      setHourIndex(lunar.hourIndex)
    }
  }, [lunar])

  useEffect(() => {
    setMonths(getLunarMonths(year))
  }, [year])

  useEffect(() => {
    const days = getLunarDays(year, month)
    setMaxDay(days)
    if (day > days) {
      setDay(days)
    }
  }, [year, month, day])

  const handleSubmit = () => {
    onChange(year, month, day, hourIndex)
  }

  const containerClass = isModern
    ? 'bg-white rounded-2xl shadow-lg p-4 sm:p-6'
    : 'bg-amber-50 rounded-lg border-2 border-amber-700 p-4 sm:p-6 shadow-xl'

  const labelClass = isModern
    ? 'block text-sm font-medium text-gray-700 mb-1'
    : 'block text-sm font-medium text-stone-700 mb-1'

  const selectClass = isModern
    ? 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
    : 'w-full px-3 py-2 border-2 border-amber-600 rounded bg-amber-50 focus:ring-2 focus:ring-amber-400 focus:border-amber-500'

  const buttonClass = isModern
    ? 'w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors'
    : 'w-full py-3 bg-red-700 hover:bg-red-800 text-amber-100 font-medium rounded border-2 border-amber-600 transition-colors'

  // 生成年份选项（当前年份前后100年）
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i)

  return (
    <div className={containerClass}>
      <h3 className={`text-lg font-semibold mb-4 ${isModern ? 'text-gray-800' : 'text-stone-800'}`}>
        {isModern ? '选择时间' : '選擇時間'}
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* 年份 */}
        <div>
          <label className={labelClass}>
            {isModern ? '农历年' : '農曆年'}
          </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className={selectClass}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* 月份 */}
        <div>
          <label className={labelClass}>月份</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className={selectClass}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* 日期 */}
        <div>
          <label className={labelClass}>日期</label>
          <select
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className={selectClass}
          >
            {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* 时辰 */}
        <div>
          <label className={labelClass}>{isModern ? '时辰' : '時辰'}</label>
          <select
            value={hourIndex}
            onChange={(e) => setHourIndex(Number(e.target.value))}
            className={selectClass}
          >
            {HOURS.map((h) => (
              <option key={h.index} value={h.index}>
                {h.name} ({h.range})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className={`mt-4 ${buttonClass}`}
      >
        {isModern ? '起卦' : '起卦'}
      </button>
    </div>
  )
}
