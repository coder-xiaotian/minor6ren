import DivinationApp from '@/components/DivinationApp'
import { calculate } from '@/lib/xiaoliu'
import { getCurrentLunar } from '@/lib/lunar'

export default function Home() {
  // 服务端获取初始数据（用于 SSR/SSG）
  const initialLunar = getCurrentLunar()
  const initialResult = calculate(
    Math.abs(initialLunar.month),
    initialLunar.day,
    initialLunar.hourIndex
  )

  return (
    <main>
      {/* SEO: 隐藏的语义化内容，供搜索引擎抓取 */}
      <article className="sr-only">
        <h1>小六壬在线占卜 - 诸葛马前课</h1>
        <p>
          小六壬是中国民间流传的一种简易占卜术，又称诸葛马前课、指掌决。
          通过六神（大安、留连、速喜、赤口、小吉、空亡）来预测吉凶。
        </p>
        <section>
          <h2>六神介绍</h2>
          <ul>
            <li><strong>大安</strong>：五行属木，主吉。身不动时，事事安稳。</li>
            <li><strong>留连</strong>：五行属水，主平。人未归时，事多拖延。</li>
            <li><strong>速喜</strong>：五行属火，主吉。喜事临门，好消息将至。</li>
            <li><strong>赤口</strong>：五行属金，主凶。口舌是非，需防小人。</li>
            <li><strong>小吉</strong>：五行属木，主吉。小有吉利，适合求人办事。</li>
            <li><strong>空亡</strong>：五行属土，主凶。音信稀少，事多落空。</li>
          </ul>
        </section>
        <section>
          <h2>使用方法</h2>
          <p>
            小六壬按农历月、日、时辰依次在六个宫位上掐算。
            正月起大安，依次顺时针数到该月；从月落点起数日期；从日落点起数时辰，最终落点即为结果。
          </p>
        </section>
        <section>
          <h2>掐算顺序</h2>
          <p>大安 → 留连 → 速喜 → 赤口 → 小吉 → 空亡 → 循环</p>
        </section>
      </article>

      {/* 客户端交互组件 */}
      <DivinationApp
        initialLunar={initialLunar}
        initialResult={initialResult}
      />
    </main>
  )
}
