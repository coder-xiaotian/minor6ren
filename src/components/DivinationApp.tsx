'use client'

import { useState } from 'react'
import HandDiagram from '@/components/HandDiagram'
import Result from '@/components/Result'
import DatePicker from '@/components/DatePicker'
import ShareButton from '@/components/ShareButton'
import { calculate, calculateByNumbers, getThreeRandomNumbers, getAnimationRandomNumbers, CalculationResult } from '@/lib/xiaoliu'
import { getCurrentLunar, createLunarDateTime, LunarDateTime } from '@/lib/lunar'

type Theme = 'modern' | 'classic'
type InputMode = 'current' | 'picker' | 'numbers'

interface DivinationAppProps {
  initialLunar: LunarDateTime
  initialResult: CalculationResult
}

export default function DivinationApp({ initialLunar, initialResult }: DivinationAppProps) {
  const [theme, setTheme] = useState<Theme>('modern')
  const [lunar, setLunar] = useState<LunarDateTime>(initialLunar)
  const [result, setResult] = useState<CalculationResult>(initialResult)
  const [inputMode, setInputMode] = useState<InputMode>('current')
  const [numbers, setNumbers] = useState<[number, number, number]>([1, 1, 1])
  const [isRolling, setIsRolling] = useState(false)
  const [randomSource, setRandomSource] = useState<'random.org' | 'crypto' | null>(null)

  const handleDateChange = (year: number, month: number, day: number, hourIndex: number) => {
    const newLunar = createLunarDateTime(year, month, day, hourIndex)
    setLunar(newLunar)
    const calcResult = calculate(Math.abs(month), day, hourIndex)
    setResult(calcResult)
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
    setInputMode('current')
    setRandomSource(null)
  }

  const handlePickerToggle = () => {
    setInputMode(inputMode === 'picker' ? 'current' : 'picker')
    setRandomSource(null)
  }

  const handleRandomNumbers = async () => {
    setInputMode('numbers')
    setIsRolling(true)
    setRandomSource(null)

    // 先发起 RANDOM.ORG 请求
    const randomPromise = getThreeRandomNumbers(1, 100)

    // 同时播放滚动动画
    const rollDuration = 1000
    const rollInterval = 50
    const startTime = Date.now()

    const rollAnimation = () => {
      const elapsed = Date.now() - startTime
      if (elapsed < rollDuration) {
        // 在滚动期间显示伪随机数（仅用于动画）
        const tempNumbers = getAnimationRandomNumbers(1, 100)
        setNumbers(tempNumbers)
        setTimeout(rollAnimation, rollInterval)
      }
    }

    rollAnimation()

    // 等待真随机数返回
    const { numbers: finalNumbers, source } = await randomPromise

    // 确保动画至少播放完
    const elapsed = Date.now() - startTime
    if (elapsed < rollDuration) {
      await new Promise(resolve => setTimeout(resolve, rollDuration - elapsed))
    }

    // 设置最终结果
    setNumbers(finalNumbers)
    setRandomSource(source)
    const calcResult = calculateByNumbers(finalNumbers[0], finalNumbers[1], finalNumbers[2])
    setResult(calcResult)
    setIsRolling(false)
  }

  const handleNumberChange = (index: 0 | 1 | 2, value: string) => {
    const num = parseInt(value) || 1
    const newNumbers = [...numbers] as [number, number, number]
    newNumbers[index] = Math.max(1, num)
    setNumbers(newNumbers)
  }

  const handleNumbersSubmit = () => {
    const calcResult = calculateByNumbers(numbers[0], numbers[1], numbers[2])
    setResult(calcResult)
    setRandomSource(null) // 手动输入，清除随机源标识
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
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={handleCurrentTime}
            className={inputMode === 'current' ? themeButtonClass(true) : actionButtonClass}
          >
            当前时间
          </button>
          <button
            onClick={handlePickerToggle}
            className={inputMode === 'picker' ? themeButtonClass(true) : actionButtonClass}
          >
            {inputMode === 'picker' ? '收起' : '选择时间'}
          </button>
          <button
            onClick={handleRandomNumbers}
            disabled={isRolling}
            className={`${inputMode === 'numbers' ? themeButtonClass(true) : actionButtonClass} ${isRolling ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRolling ? '摇卦中...' : '随机取数'}
          </button>
        </div>

        {/* 数字输入区域 - 仅在随机取数模式下显示 */}
        {inputMode === 'numbers' && (
          <div className={`mb-6 p-4 rounded-lg ${isModern ? 'bg-white/50' : 'bg-amber-50/50 border border-amber-300'}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className={`text-sm ${isModern ? 'text-gray-600' : 'text-stone-600'}`}>
                当前数字：
              </span>
              <div className="flex gap-2">
                {numbers.map((num, index) => (
                  <input
                    key={index}
                    type="number"
                    min="1"
                    value={num}
                    onChange={(e) => handleNumberChange(index as 0 | 1 | 2, e.target.value)}
                    className={`w-16 px-2 py-1 text-center rounded border text-lg font-mono
                      ${isModern
                        ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        : 'border-amber-400 bg-amber-50 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-stone-800'}
                      ${isRolling ? 'animate-pulse' : ''}
                    `}
                    disabled={isRolling}
                  />
                ))}
              </div>
              <button
                onClick={handleNumbersSubmit}
                disabled={isRolling}
                className={`${actionButtonClass} text-sm ${isRolling ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                起卦
              </button>
            </div>
            <p className={`text-xs text-center ${isModern ? 'text-gray-400' : 'text-stone-500'}`}>
              基于数字起卦
              {randomSource && (
                <span className={randomSource === 'random.org' ? 'text-green-600' : 'text-yellow-600'}>
                  {' · '}
                  {randomSource === 'random.org' ? '✓ 真随机数 (RANDOM.ORG)' : '⚠ 伪随机数 (本地)'}
                </span>
              )}
            </p>
            <p className={`text-xs text-center mt-1 ${isModern ? 'text-gray-400' : 'text-stone-500'}`}>
              可修改数字后点击"起卦"重新计算
            </p>
          </div>
        )}

        {/* 日期选择器 */}
        {inputMode === 'picker' && (
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

        {/* 分享按钮 */}
        <div className="flex justify-center mb-6">
          <ShareButton result={result} lunar={lunar} theme={theme} />
        </div>

        {/* 页脚 */}
        <footer className={`text-center text-xs ${isModern ? 'text-gray-400' : 'text-stone-500'}`}>
          <p>仅供娱乐参考</p>
        </footer>
      </div>
    </div>
  )
}
