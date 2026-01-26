'use client'

import { useState } from 'react'
import { CalculationResult } from '@/lib/xiaoliu'
import { LunarDateTime, formatLunarDate } from '@/lib/lunar'

interface ShareButtonProps {
  result: CalculationResult
  lunar: LunarDateTime
  theme: 'modern' | 'classic'
}

export default function ShareButton({ result, lunar, theme }: ShareButtonProps) {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const isModern = theme === 'modern'

  const buttonClass = isModern
    ? 'px-4 py-2 rounded-lg font-medium transition-colors text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-md'
    : 'px-4 py-2 rounded-lg font-medium transition-colors text-sm bg-red-700 text-amber-100 hover:bg-red-800 border border-amber-500'

  const generateImage = async () => {
    setLoading(true)

    const fortuneMap = {
      good: 'good',
      bad: 'bad',
      neutral: 'neutral',
    } as const

    const params = new URLSearchParams({
      god: result.finalGod.name,
      fortune: fortuneMap[result.finalGod.fortune],
      element: result.finalGod.element,
      position: result.finalGod.position,
      lunar: formatLunarDate(lunar),
      meaning: result.finalGod.meaning,
    })

    const url = `/api/og?${params.toString()}`

    try {
      // 预加载图片
      const res = await fetch(url)
      if (!res.ok) throw new Error('生成失败')
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      setImageUrl(objectUrl)
      setShowModal(true)
    } catch (error) {
      console.error('生成图片失败:', error)
      alert('生成图片失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!imageUrl) return

    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `小六壬-${result.finalGod.name}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopy = async () => {
    if (!imageUrl) return

    try {
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      alert('已复制到剪贴板')
    } catch {
      // 降级方案：提示用户长按保存
      alert('复制失败，请长按图片保存')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
      setImageUrl(null)
    }
  }

  return (
    <>
      <button
        onClick={generateImage}
        disabled={loading}
        className={buttonClass}
      >
        {loading ? '生成中...' : '生成卡片'}
      </button>

      {/* 弹窗 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 图片预览 */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="分享卡片"
                className="w-full rounded-lg mb-4"
              />
            )}

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600"
              >
                保存图片
              </button>
              <button
                onClick={handleCopy}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                复制图片
              </button>
            </div>

            {/* 关闭按钮 */}
            <button
              onClick={closeModal}
              className="w-full mt-3 py-2 text-gray-500 text-sm"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  )
}
