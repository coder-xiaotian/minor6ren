import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// 吉凶颜色配置
const fortuneStyles = {
  good: { text: '吉', color: '#15803d', bg: '#dcfce7' },
  bad: { text: '凶', color: '#dc2626', bg: '#fee2e2' },
  neutral: { text: '平', color: '#d97706', bg: '#fef3c7' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  // 从 URL 参数获取数据
  const god = searchParams.get('god') || '大安'
  const fortune = (searchParams.get('fortune') || 'good') as keyof typeof fortuneStyles
  const element = searchParams.get('element') || '木'
  const position = searchParams.get('position') || ''
  const lunar = searchParams.get('lunar') || ''
  const meaning = searchParams.get('meaning') || ''

  const fortuneStyle = fortuneStyles[fortune] || fortuneStyles.neutral

  // 加载中文字体（本地 OTF 文件）
  const fontData = await fetch(
    new URL('../../fonts/NotoSansSC-Medium.otf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'Noto Sans SC',
        }}
      >
        {/* 主卡片 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            borderRadius: 32,
            padding: '48px 56px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            minWidth: 380,
          }}
        >
          {/* 标题 */}
          <div
            style={{
              fontSize: 22,
              color: '#6b7280',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: '#a855f7' }}>◆</span>
            <span>小六壬 · 今日卦</span>
            <span style={{ color: '#a855f7' }}>◆</span>
          </div>

          {/* 六神名称 */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: '#1f2937',
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            {god}
          </div>

          {/* 吉凶标签 */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: fortuneStyle.color,
              background: fortuneStyle.bg,
              padding: '8px 32px',
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            {fortuneStyle.text}
          </div>

          {/* 属性信息 */}
          <div
            style={{
              fontSize: 18,
              color: '#6b7280',
              marginBottom: 20,
              display: 'flex',
              gap: 16,
            }}
          >
            <span>{position}</span>
            <span>·</span>
            <span>五行属{element}</span>
          </div>

          {/* 农历时间 */}
          <div
            style={{
              fontSize: 18,
              color: '#9ca3af',
              marginBottom: 24,
              padding: '8px 20px',
              background: '#f3f4f6',
              borderRadius: 8,
            }}
          >
            {lunar}
          </div>

          {/* 断语 */}
          <div
            style={{
              fontSize: 18,
              color: '#4b5563',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: 320,
            }}
          >
            {meaning}
          </div>
        </div>

        {/* 底部网址 */}
        <div
          style={{
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: 32,
          }}
        >
          xiao6ren.skylerwan.me
        </div>
      </div>
    ),
    {
      width: 480,
      height: 680,
      fonts: [
        {
          name: 'Noto Sans SC',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
