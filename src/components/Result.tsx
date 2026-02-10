'use client'

import { CalculationResult } from '@/lib/xiaoliu'
import { LunarDateTime } from '@/lib/lunar'

interface ResultProps {
  result: CalculationResult | null
  lunar: LunarDateTime | null
  theme: 'modern' | 'classic'
  inputMode: 'current' | 'picker' | 'numbers'
}

export default function Result({ result, lunar, theme, inputMode }: ResultProps) {
  const isModern = theme === 'modern'

  if (!result || !lunar) {
    return null
  }

  const { finalGod } = result

  const containerClass = isModern
    ? 'bg-white rounded-2xl shadow-lg p-4 sm:p-6'
    : 'bg-amber-50 rounded-lg border-2 border-amber-700 p-4 sm:p-6 shadow-xl'

  const getFortuneDisplay = () => {
    switch (finalGod.fortune) {
      case 'good':
        return isModern
          ? { text: '吉', color: 'text-green-600', bg: 'bg-green-100' }
          : { text: '吉', color: 'text-green-800', bg: 'bg-green-100 border border-green-700' }
      case 'bad':
        return isModern
          ? { text: '凶', color: 'text-red-600', bg: 'bg-red-100' }
          : { text: '凶', color: 'text-red-800', bg: 'bg-red-100 border border-red-700' }
      default:
        return isModern
          ? { text: '平', color: 'text-amber-600', bg: 'bg-amber-100' }
          : { text: '平', color: 'text-amber-800', bg: 'bg-amber-100 border border-amber-700' }
    }
  }

  const fortune = getFortuneDisplay()

  return (
    <div className={containerClass}>
      {/* 推算过程 */}
      <div className={`mb-4 pb-4 border-b ${isModern ? 'border-gray-200' : 'border-amber-300'}`}>
        <p className={`text-sm mb-2 ${isModern ? 'text-gray-500' : 'text-stone-600'}`}>
          {isModern ? '推算过程' : '推算過程'}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className={`px-2 py-1 rounded ${isModern ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-800'}`}>
            {inputMode === 'numbers' ? result.month.value : `${lunar.monthInChinese}月`} → {result.month.god.name}
          </span>
          <span className={isModern ? 'text-gray-400' : 'text-stone-400'}>→</span>
          <span className={`px-2 py-1 rounded ${isModern ? 'bg-green-100 text-green-800' : 'bg-amber-200 text-amber-900'}`}>
            {inputMode === 'numbers' ? result.day.value : lunar.dayInChinese} → {result.day.god.name}
          </span>
          <span className={isModern ? 'text-gray-400' : 'text-stone-400'}>→</span>
          <span className={`px-2 py-1 rounded ${isModern ? 'bg-blue-100 text-blue-800' : 'bg-red-200 text-red-900'}`}>
            {inputMode === 'numbers' ? result.hour.value : result.hour.name} → {result.hour.god.name}
          </span>
        </div>
      </div>

      {/* 最终结果 */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className={`text-3xl sm:text-4xl font-bold ${isModern ? 'text-gray-800' : 'text-stone-800'}`}>
            {finalGod.name}
          </span>
          <span className={`px-3 py-1 rounded-full text-lg font-bold ${fortune.bg} ${fortune.color}`}>
            {fortune.text}
          </span>
        </div>
        <p className={`text-sm ${isModern ? 'text-gray-500' : 'text-stone-600'}`}>
          {finalGod.position} · 五行属{finalGod.element}
        </p>
      </div>

      {/* 断语 */}
      <div className={`rounded-lg p-4 ${isModern ? 'bg-gray-50' : 'bg-amber-100/50'}`}>
        <p className={`text-sm mb-2 font-medium ${isModern ? 'text-gray-700' : 'text-stone-700'}`}>
          {isModern ? '断语' : '斷語'}
        </p>
        <p className={`text-sm leading-relaxed ${isModern ? 'text-gray-600' : 'text-stone-700'}`}>
          {finalGod.meaning}
        </p>
      </div>

      {/* 诗诀 */}
      <div className={`mt-4 rounded-lg p-4 ${isModern ? 'bg-blue-50' : 'bg-stone-100'}`}>
        <p className={`text-sm mb-2 font-medium ${isModern ? 'text-blue-700' : 'text-stone-700'}`}>
          {isModern ? '诗诀' : '詩訣'}
        </p>
        <p className={`text-sm leading-relaxed ${isModern ? 'text-blue-600' : 'text-stone-600'} ${!isModern && 'font-serif'}`}>
          {finalGod.poem}
        </p>
      </div>
    </div>
  )
}
