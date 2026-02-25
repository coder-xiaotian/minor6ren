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

    // 统计重合数量
    const matchCount = [isMonthGod, isDayGod, isHourGod].filter(Boolean).length
    const badges = []
    if (isMonthGod) badges.push('月')
    if (isDayGod) badges.push('日')
    if (isHourGod) badges.push('时')

    let bgColor = ''
    let textColor = ''
    let boxShadow = ''

    if (isModern) {
      // 背景色显示最内层的（时 < 日 < 月的优先级）
      if (isHourGod) {
        bgColor = 'bg-blue-500'
        textColor = 'text-white'
      } else if (isDayGod) {
        bgColor = 'bg-green-500'
        textColor = 'text-white'
      } else if (isMonthGod) {
        bgColor = 'bg-amber-500'
        textColor = 'text-white'
      } else {
        bgColor = 'bg-gray-100'
        textColor = 'text-gray-700'
      }

      // 多层边框显示重合（按月 > 日 > 时顺序，从外到内）
      if (matchCount === 3) {
        // 月日时重叠：最外层黄(月) → 中间绿(日) → 最内蓝(时背景)
        boxShadow = '0 0 0 3px rgb(34 197 94), 0 0 0 6px rgb(245 158 11)' // 内层日绿，外层月黄
      } else if (matchCount === 2) {
        if (isMonthGod && isDayGod) {
          // 月日重叠：外层黄(月)，背景绿(日)
          boxShadow = '0 0 0 3px rgb(245 158 11)' // 月黄
        } else if (isMonthGod && isHourGod) {
          // 月时重叠：外层黄(月)，背景蓝(时)
          boxShadow = '0 0 0 3px rgb(245 158 11)' // 月黄
        } else if (isDayGod && isHourGod) {
          // 日时重叠：外层绿(日)，背景蓝(时)
          boxShadow = '0 0 0 3px rgb(34 197 94)' // 日绿
        }
      }
    } else {
      // 古典风格：背景色显示最内层的（时 < 日 < 月的优先级）
      if (isHourGod) {
        bgColor = 'bg-red-700'
        textColor = 'text-amber-100'
      } else if (isDayGod) {
        bgColor = 'bg-amber-800'
        textColor = 'text-amber-100'
      } else if (isMonthGod) {
        bgColor = 'bg-stone-700'
        textColor = 'text-amber-100'
      } else {
        bgColor = 'bg-stone-200'
        textColor = 'text-stone-800'
      }

      // 古典风格多层边框（按月 > 日 > 时顺序，从外到内）
      if (matchCount === 3) {
        // 月日时重叠：最外层石(月) → 中间琥珀(日) → 最内红(时背景)
        boxShadow = '0 0 0 3px rgb(146 64 14), 0 0 0 6px rgb(120 113 108)' // 内层日琥珀，外层月石
      } else if (matchCount === 2) {
        if (isMonthGod && isDayGod) {
          // 月日重叠：外层石(月)，背景琥珀(日)
          boxShadow = '0 0 0 3px rgb(120 113 108)' // 月石
        } else if (isMonthGod && isHourGod) {
          // 月时重叠：外层石(月)，背景红(时)
          boxShadow = '0 0 0 3px rgb(120 113 108)' // 月石
        } else if (isDayGod && isHourGod) {
          // 日时重叠：外层琥珀(日)，背景红(时)
          boxShadow = '0 0 0 3px rgb(146 64 14)' // 日琥珀
        }
      }
    }

    return { bgColor, textColor, boxShadow, badges, matchCount }
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
              const style = getPositionStyle(god)
              return (
                <div
                  className={`
                    w-full aspect-square rounded-lg mb-2
                    flex flex-col items-center justify-center
                    transition-all duration-300 cursor-default relative
                    ${style.bgColor} ${style.textColor}
                    ${style.matchCount === 0 ? (isModern ? 'border-2 border-gray-200' : 'border-2 border-amber-400') : ''}
                  `}
                  style={style.boxShadow ? { boxShadow: style.boxShadow } : undefined}
                >
                  {/* 角标徽章 */}
                  {style.matchCount > 1 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                      {style.badges.join('')}
                    </div>
                  )}
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
              const style = getPositionStyle(god)
              return (
                <div
                  className={`
                    w-full aspect-square rounded-lg
                    flex flex-col items-center justify-center
                    transition-all duration-300 cursor-default relative
                    ${style.bgColor} ${style.textColor}
                    ${style.matchCount === 0 ? (isModern ? 'border-2 border-gray-200' : 'border-2 border-amber-400') : ''}
                  `}
                  style={style.boxShadow ? { boxShadow: style.boxShadow } : undefined}
                >
                  {/* 角标徽章 */}
                  {style.matchCount > 1 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                      {style.badges.join('')}
                    </div>
                  )}
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
