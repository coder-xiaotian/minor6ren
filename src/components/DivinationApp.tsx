'use client'

import { useState } from 'react'
import HandDiagram from '@/components/HandDiagram'
import Result from '@/components/Result'
import DatePicker from '@/components/DatePicker'
import { calculate, CalculationResult } from '@/lib/xiaoliu'
import { getCurrentLunar, createLunarDateTime, LunarDateTime } from '@/lib/lunar'

type Theme = 'modern' | 'classic'

interface DivinationAppProps {
  initialLunar: LunarDateTime
  initialResult: CalculationResult
}

export default function DivinationApp({ initialLunar, initialResult }: DivinationAppProps) {
  const [theme, setTheme] = useState<Theme>('modern')
  const [lunar, setLunar] = useState<LunarDateTime>(initialLunar)
  const [result, setResult] = useState<CalculationResult>(initialResult)
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (year: number, month: number, day: number, hourIndex: number) => {
    const newLunar = createLunarDateTime(year, month, day, hourIndex)
    setLunar(newLunar)
    const calcResult = calculate(Math.abs(month), day, hourIndex)
    setResult(calcResult)
    setShowPicker(false)
  }

  const handleCurrentTime = () => {
    const currentLunar = getCurrentLunar()
    setLunar(currentLunar)
    const calcResult = calculate(
      Math.abs(currentLunar.month),
      currentLunar.day,
      currentLunar.hourIndex
    )
    setResult(calcResult)
  }

  const isModern = theme === 'modern'

  const bgClass = isModern
    ? 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'
    : 'min-h-screen bg-gradient-to-br from-amber-100 to-stone-200'

  const headerClass = isModern
    ? 'text-2xl sm:text-3xl font-bold text-gray-800'
    : 'text-2xl sm:text-3xl font-bold text-stone-800 tracking-widest'

  const subHeaderClass = isModern
    ? 'text-sm text-gray-500 mt-1'
    : 'text-sm text-stone-600 mt-1'

  const buttonBaseClass = 'px-4 py-2 rounded-lg font-medium transition-colors text-sm'
  const themeButtonClass = (active: boolean) => {
    if (isModern) {
      return active
        ? `${buttonBaseClass} bg-blue-500 text-white`
        : `${buttonBaseClass} bg-white text-gray-600 hover:bg-gray-100`
    } else {
      return active
        ? `${buttonBaseClass} bg-red-700 text-amber-100 border border-amber-500`
        : `${buttonBaseClass} bg-amber-100 text-stone-700 hover:bg-amber-200 border border-amber-400`
    }
  }

  const actionButtonClass = isModern
    ? `${buttonBaseClass} bg-white text-gray-700 hover:bg-gray-100 shadow-sm`
    : `${buttonBaseClass} bg-amber-100 text-stone-700 hover:bg-amber-200 border border-amber-500`

  return (
    <div className={bgClass}>
      <div className="max-w-lg mx-auto px-4 py-6 sm:py-8">
        {/* 头部 */}
        <header className="text-center mb-6">
          <h1 className={headerClass}>小六壬</h1>
          <p className={subHeaderClass}>诸葛马前课 · 指掌占卜</p>
        </header>

        {/* 风格切换 */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setTheme('modern')}
            className={themeButtonClass(theme === 'modern')}
          >
            简约风格
          </button>
          <button
            onClick={() => setTheme('classic')}
            className={themeButtonClass(theme === 'classic')}
          >
            古典风格
          </button>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={handleCurrentTime}
            className={actionButtonClass}
          >
            当前时间
          </button>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className={actionButtonClass}
          >
            {showPicker ? '收起' : '选择时间'}
          </button>
        </div>

        {/* 日期选择器 */}
        {showPicker && (
          <div className="mb-6">
            <DatePicker
              lunar={lunar}
              onChange={handleDateChange}
              theme={theme}
            />
          </div>
        )}

        {/* 手掌图示 */}
        <div className="mb-6">
          <HandDiagram result={result} theme={theme} />
        </div>

        {/* 结果展示 */}
        <div className="mb-6">
          <Result result={result} lunar={lunar} theme={theme} />
        </div>

        {/* 页脚 */}
        <footer className={`text-center text-xs ${isModern ? 'text-gray-400' : 'text-stone-500'}`}>
          <p>仅供娱乐参考</p>
        </footer>
      </div>
    </div>
  )
}
