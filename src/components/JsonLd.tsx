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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1000"
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
          "text": "小六壬是中国民间流传的一种简易占卜术，又称诸葛马前课或指掌决。通过六神（大安、留连、速喜、赤口、小吉、空亡）来预测吉凶。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬怎么算？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "小六壬按农历月、日、时辰依次在六个宫位上掐算。正月起大安，依次顺时针数到该月；从月落点起数日期；从日落点起数时辰，最终落点即为结果。"
        }
      },
      {
        "@type": "Question",
        "name": "小六壬的六神分别代表什么？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "大安主吉，事情稳定；留连主拖延；速喜主好消息；赤口主口舌是非；小吉主小吉利；空亡主落空不顺。"
        }
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
    </>
  )
}
