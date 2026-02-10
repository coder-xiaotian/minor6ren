export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "小六壬在线占卜",
    "alternateName": ["诸葛马前课", "指掌决", "小六壬"],
    "description": "小六壬在线占卜工具，通过农历月日时推算六神（大安、留连、速喜、赤口、小吉、空亡），快速预测吉凶。",
    "url": "https://xiao6ren.skylerwan.me",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY"
    },
    "inLanguage": "zh-CN",
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript"
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "什么是小六壬？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "小六壬是中国民间流传的一种简易占卜术，又称诸葛马前课或指掌决。通过六神（大安、留连、速喜、赤口、小吉、空亡）来预测吉凶。它起源于三国时期，相传为诸葛亮行军打仗时用于快速预测的方法，因操作简便、只需掐指即可完成而广泛流传。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬怎么算？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "小六壬按农历月、日、时辰依次在六个宫位上掐算。正月起大安，依次顺时针数到该月；从月落点起数日期；从日落点起数时辰，最终落点即为结果。顺序为：大安→留连→速喜→赤口→小吉→空亡→循环。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬的六神分别代表什么？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "六神各有含义：大安属木主吉，身不动时事事安稳；留连属水主平，人未归时事多拖延；速喜属火主吉，喜事临门好消息将至；赤口属金主凶，口舌是非需防小人；小吉属木主吉，小有吉利适合求人办事；空亡属土主凶，音信稀少事多落空。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬用农历还是阳历？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "小六壬必须使用农历（阴历）进行计算，包括农历的月份、日期和时辰。这是因为小六壬的算法基于农历体系设计，使用阳历会导致结果不准确。本工具会自动将当前时间转换为农历，无需手动换算。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬准吗？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "小六壬作为中国传统民间占卜术，其准确性因人而异。它更多是一种文化传承和心理暗示工具，可以帮助人们在犹豫不决时做出选择。建议以娱乐和文化了解为主，重大决策仍应基于理性分析。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬怎么看时辰？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "小六壬使用十二时辰计时：子时(23-1点)、丑时(1-3点)、寅时(3-5点)、卯时(5-7点)、辰时(7-9点)、巳时(9-11点)、午时(11-13点)、未时(13-15点)、申时(15-17点)、酉时(17-19点)、戌时(19-21点)、亥时(21-23点)。本工具会根据当前时间自动判断时辰。"
        }
      },
      {
        "@type": "Question",
        "name": "大安代表什么意思？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "大安是小六壬六神之首，五行属木，位于食指下节。大安主吉，代表身不动时、事事安稳。求事者得大安，意味着事情平稳顺利，宜静不宜动，适合守成等待。在求财、求官、婚姻等方面都是吉利的征兆。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬和大六壬有什么区别？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "小六壬和大六壬是两种不同的占卜术。大六壬是中国古代三式之一（太乙、奇门、六壬），体系复杂、需要专业学习；小六壬则是民间简化版，只用六个宫位掐指即算，操作简单、上手快。两者虽然名字相似，但在理论体系、计算方法和应用范围上都有很大区别。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬可以一天算几次？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "传统上小六壬讲究\u201c初动\u201d原则，即以第一次起念时的时辰为准，同一件事不宜反复占卜。如果是不同的事情，可以分别占卜。对于同一件事反复算会被认为不诚不灵。建议每件事只占一次，以第一次结果为准。"
        }
      }
    ]
  }

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "如何使用小六壬占卜",
    "description": "小六壬掐算方法教程，学会用农历月日时辰在手指上推算六神，快速预测吉凶。",
    "totalTime": "PT1M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "确定农历日期",
        "text": "确定要占卜时刻的农历月份、日期和时辰。本工具会自动获取当前农历时间，也可以手动选择其他日期。"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "起月——从大安起正月",
        "text": "从大安开始，按大安→留连→速喜→赤口→小吉→空亡的顺序，依次数到当月农历月份。例如农历三月，从大安数起：大安(正月)、留连(二月)、速喜(三月)，月份落在速喜。"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "起日——从月落点起数",
        "text": "从月份所落的宫位开始，继续按顺序数日期。例如月落速喜，农历初五：速喜(初一)、赤口(初二)、小吉(初三)、空亡(初四)、大安(初五)，日期落在大安。"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "起时辰——从日落点起数",
        "text": "从日期所落的宫位开始，按顺序数时辰序号。例如日落大安，午时(序号7)：大安(1)、留连(2)、速喜(3)、赤口(4)、小吉(5)、空亡(6)、大安(7)，最终结果落在大安。"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "查看占卜结果",
        "text": "最终时辰所落的宫位即为本次占卜结果。查看该六神的吉凶含义、五行属性和详细解读，了解事情的趋势和建议。"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </>
  )
}
