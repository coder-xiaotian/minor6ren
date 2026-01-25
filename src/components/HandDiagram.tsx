'use client'

import { God, GODS, CalculationResult } from '@/lib/xiaoliu'

interface HandDiagramProps {
  result: CalculationResult | null
  theme: 'modern' | 'classic'
}

export default function HandDiagram({ result, theme }: HandDiagramProps) {
  const isModern = theme === 'modern'

  const getPositionStyle = (god: God) => {
    const isMonthGod = result?.month.godIndex === god.index
    const isDayGod = result?.day.godIndex === god.index
    const isHourGod = result?.hour.godIndex === god.index

    let bgColor = ''
    let textColor = ''
    let borderColor = ''

    if (isModern) {
      if (isHourGod) {
        bgColor = 'bg-blue-500'
        textColor = 'text-white'
        borderColor = 'border-blue-600 ring-2 ring-blue-300'
      } else if (isDayGod) {
        bgColor = 'bg-green-500'
        textColor = 'text-white'
        borderColor = 'border-green-600'
      } else if (isMonthGod) {
        bgColor = 'bg-amber-500'
        textColor = 'text-white'
        borderColor = 'border-amber-600'
      } else {
        bgColor = 'bg-gray-100'
        textColor = 'text-gray-700'
        borderColor = 'border-gray-300'
      }
    } else {
      // 古典风格
      if (isHourGod) {
        bgColor = 'bg-red-700'
        textColor = 'text-amber-100'
        borderColor = 'border-amber-500 ring-2 ring-amber-400'
      } else if (isDayGod) {
        bgColor = 'bg-amber-800'
        textColor = 'text-amber-100'
        borderColor = 'border-amber-600'
      } else if (isMonthGod) {
        bgColor = 'bg-stone-700'
        textColor = 'text-amber-100'
        borderColor = 'border-stone-500'
      } else {
        bgColor = 'bg-stone-200'
        textColor = 'text-stone-800'
        borderColor = 'border-stone-400'
      }
    }

    return `${bgColor} ${textColor} ${borderColor}`
  }

  const getFortuneColor = (fortune: God['fortune']) => {
    if (isModern) {
      switch (fortune) {
        case 'good': return 'text-green-600'
        case 'bad': return 'text-red-600'
        default: return 'text-amber-600'
      }
    } else {
      switch (fortune) {
        case 'good': return 'text-green-700'
        case 'bad': return 'text-red-800'
        default: return 'text-amber-700'
      }
    }
  }

  // 按照手指和行排列
  const fingerOrder: ('index' | 'middle' | 'ring')[] = ['index', 'middle', 'ring']
  const fingerNames = isModern
    ? { index: '食指', middle: '中指', ring: '无名指' }
    : { index: '食指', middle: '中指', ring: '無名指' }

  const getGodByPosition = (finger: 'index' | 'middle' | 'ring', row: 'top' | 'bottom') => {
    return GODS.find(g => g.finger === finger && g.row === row)
  }

  const containerClass = isModern
    ? 'bg-white rounded-2xl shadow-lg p-4 sm:p-6'
    : 'bg-amber-50 rounded-lg border-2 border-amber-700 p-4 sm:p-6 shadow-xl'

  const titleClass = isModern
    ? 'text-lg font-semibold text-gray-800 mb-4'
    : 'text-lg font-bold text-stone-800 mb-4 tracking-wider'

  return (
    <div className={containerClass}>
      <h3 className={titleClass}>
        {isModern ? '掌诀图' : '掌訣圖'}
      </h3>

      {/* 图例 */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded ${isModern ? 'bg-amber-500' : 'bg-stone-700'}`}></span>
          <span className={isModern ? 'text-gray-600' : 'text-stone-700'}>月</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded ${isModern ? 'bg-green-500' : 'bg-amber-800'}`}></span>
          <span className={isModern ? 'text-gray-600' : 'text-stone-700'}>日</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded ${isModern ? 'bg-blue-500' : 'bg-red-700'}`}></span>
          <span className={isModern ? 'text-gray-600' : 'text-stone-700'}>时（结果）</span>
        </div>
      </div>

      {/* 手指图示 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {fingerOrder.map((finger) => (
          <div key={finger} className="flex flex-col items-center">
            <span className={`text-xs sm:text-sm mb-2 ${isModern ? 'text-gray-500' : 'text-stone-600'}`}>
              {fingerNames[finger]}
            </span>

            {/* 上节 */}
            {(() => {
              const god = getGodByPosition(finger, 'top')
              if (!god) return null
              return (
                <div
                  className={`
                    w-full aspect-square rounded-lg border-2 mb-2
                    flex flex-col items-center justify-center
                    transition-all duration-300 cursor-default
                    ${getPositionStyle(god)}
                  `}
                >
                  <span className={`text-base sm:text-xl font-bold ${getFortuneColor(god.fortune)}`}>
                    {god.name}
                  </span>
                  <span className="text-xs opacity-70">{god.element}</span>
                </div>
              )
            })()}

            {/* 下节 */}
            {(() => {
              const god = getGodByPosition(finger, 'bottom')
              if (!god) return null
              return (
                <div
                  className={`
                    w-full aspect-square rounded-lg border-2
                    flex flex-col items-center justify-center
                    transition-all duration-300 cursor-default
                    ${getPositionStyle(god)}
                  `}
                >
                  <span className={`text-base sm:text-xl font-bold ${getFortuneColor(god.fortune)}`}>
                    {god.name}
                  </span>
                  <span className="text-xs opacity-70">{god.element}</span>
                </div>
              )
            })()}
          </div>
        ))}
      </div>
    </div>
  )
}
