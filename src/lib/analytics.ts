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
  // 占卜相关
  DIVINATION_START: 'divination_start',
  DIVINATION_COMPLETE: 'divination_complete',

  // 主题切换
  THEME_CHANGE: 'theme_change',

  // 分享相关
  SHARE_GENERATE_CARD: 'share_generate_card',     // 生成卡片
  SHARE_DOWNLOAD_IMAGE: 'share_download_image',   // 保存图片
  SHARE_COPY_IMAGE: 'share_copy_image',           // 复制图片

  // 日期选择
  DATE_CHANGE: 'date_change',
} as const
