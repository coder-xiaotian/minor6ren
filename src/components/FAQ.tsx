'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "什么是小六壬？",
    answer: "小六壬是中国民间流传的一种简易占卜术，又称诸葛马前课或指掌决。通过六神（大安、留连、速喜、赤口、小吉、空亡）来预测吉凶。它起源于三国时期，相传为诸葛亮行军打仗时用于快速预测的方法，因操作简便、只需掐指即可完成而广泛流传。"
  },
  {
    question: "小六壬怎么算？",
    answer: "小六壬按农历月、日、时辰依次在六个宫位上掐算。正月起大安，依次顺时针数到该月；从月落点起数日期；从日落点起数时辰，最终落点即为结果。顺序为：大安→留连→速喜→赤口→小吉→空亡→循环。"
  },
  {
    question: "小六壬的六神分别代表什么？",
    answer: "六神各有含义：大安属木主吉，身不动时事事安稳；留连属水主平，人未归时事多拖延；速喜属火主吉，喜事临门好消息将至；赤口属金主凶，口舌是非需防小人；小吉属木主吉，小有吉利适合求人办事；空亡属土主凶，音信稀少事多落空。"
  },
  {
    question: "小六壬用农历还是阳历？",
    answer: "小六壬必须使用农历（阴历）进行计算，包括农历的月份、日期和时辰。这是因为小六壬的算法基于农历体系设计，使用阳历会导致结果不准确。本工具会自动将当前时间转换为农历，无需手动换算。"
  },
  {
    question: "小六壬准吗？",
    answer: "小六壬作为中国传统民间占卜术，其准确性因人而异。它更多是一种文化传承和心理暗示工具，可以帮助人们在犹豫不决时做出选择。建议以娱乐和文化了解为主，重大决策仍应基于理性分析。"
  },
  {
    question: "小六壬怎么看时辰？",
    answer: "小六壬使用十二时辰计时：子时(23-1点)、丑时(1-3点)、寅时(3-5点)、卯时(5-7点)、辰时(7-9点)、巳时(9-11点)、午时(11-13点)、未时(13-15点)、申时(15-17点)、酉时(17-19点)、戌时(19-21点)、亥时(21-23点)。本工具会根据当前时间自动判断时辰。"
  },
  {
    question: "大安代表什么意思？",
    answer: "大安是小六壬六神之首，五行属木，位于食指下节。大安主吉，代表身不动时、事事安稳。求事者得大安，意味着事情平稳顺利，宜静不宜动，适合守成等待。在求财、求官、婚姻等方面都是吉利的征兆。"
  },
  {
    question: "小六壬和大六壬有什么区别？",
    answer: "小六壬和大六壬是两种不同的占卜术。大六壬是中国古代三式之一（太乙、奇门、六壬），体系复杂、需要专业学习；小六壬则是民间简化版，只用六个宫位掐指即算，操作简单、上手快。两者虽然名字相似，但在理论体系、计算方法和应用范围上都有很大区别。"
  },
  {
    question: "小六壬可以一天算几次？",
    answer: "传统上小六壬讲究「初动」原则，即以第一次起念时的时辰为准，同一件事不宜反复占卜。如果是不同的事情，可以分别占卜。对于同一件事反复算会被认为不诚不灵。建议每件事只占一次，以第一次结果为准。"
  }
]

interface FAQProps {
  theme?: 'modern' | 'classic'
}

export default function FAQ({ theme = 'modern' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const isModern = theme === 'modern'

  const containerClass = isModern
    ? 'bg-white/60 rounded-lg p-4 sm:p-6'
    : 'bg-amber-50/60 rounded-lg p-4 sm:p-6 border border-amber-300'

  const titleClass = isModern
    ? 'text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center'
    : 'text-xl sm:text-2xl font-bold text-stone-800 mb-4 text-center tracking-wide'

  const itemClass = isModern
    ? 'border-b border-gray-200 last:border-b-0'
    : 'border-b border-amber-300 last:border-b-0'

  const questionClass = isModern
    ? 'w-full text-left py-3 px-2 font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-between'
    : 'w-full text-left py-3 px-2 font-medium text-stone-700 hover:text-red-700 transition-colors flex items-center justify-between'

  const answerClass = isModern
    ? 'px-2 pb-3 text-sm text-gray-600 leading-relaxed'
    : 'px-2 pb-3 text-sm text-stone-600 leading-relaxed'

  return (
    <div className={containerClass}>
      <h2 className={titleClass}>常见问题</h2>
      <div className="space-y-0">
        {faqData.map((item, index) => (
          <div key={index} className={itemClass}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={questionClass}
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className={answerClass}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
