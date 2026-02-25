/**
 * Google Analytics 事件追踪工具
 */

// 声明全局 gtag 类型
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void
  }
}

/**
 * 发送自定义事件到 GA
 */
export const trackEvent = (
  eventName: string,
  params?: {
    category?: string
    label?: string
    value?: number
    [key: string]: any
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: params?.category,
      event_label: params?.label,
      value: params?.value,
      ...params,
    })
  }
}

/**
 * 预定义的事件类型
 */
export const AnalyticsEvents = {
  // 主题切换
  THEME_CHANGE: 'theme_change',

  // 占卜输入方式
  INPUT_SELECT_TIME: 'input_select_time',         // 选择时间
  INPUT_RANDOM_NUMBERS: 'input_random_numbers',   // 随机取数
  INPUT_DIVINATION: 'input_divination',           // 起卦（随机取数模式）
  INPUT_DIVINATION_TIME: 'input_divination_time', // 起卦（选择时间模式）

  // 分享相关
  SHARE_GENERATE_CARD: 'share_generate_card',     // 生成卡片
  SHARE_DOWNLOAD_IMAGE: 'share_download_image',   // 保存图片
  SHARE_COPY_IMAGE: 'share_copy_image',           // 复制图片

  // 日期选择
  DATE_CHANGE: 'date_change',
} as const
