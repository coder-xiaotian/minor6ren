import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@next/third-parties/google"
import JsonLd from "@/components/JsonLd"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "小六壬在线占卜 - 诸葛马前课",
    template: "%s | 小六壬"
  },
  description: "小六壬在线占卜工具，又称诸葛马前课、指掌决。通过农历月日时推算六神（大安、留连、速喜、赤口、小吉、空亡），快速预测吉凶。支持手机端，免费使用。",
  keywords: ["小六壬", "诸葛马前课", "指掌决", "六壬", "占卜", "算卦", "大安", "留连", "速喜", "赤口", "小吉", "空亡", "农历占卜", "在线算命"],
  authors: [{ name: "小六壬" }],
  creator: "小六壬",
  publisher: "小六壬",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://xiao6ren.skylerwan.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://xiao6ren.skylerwan.me",
    title: "小六壬在线占卜 - 诸葛马前课",
    description: "小六壬在线占卜工具，通过农历月日时推算六神，快速预测吉凶。支持手机端，免费使用。",
    siteName: "小六壬",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "小六壬在线占卜",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "小六壬在线占卜 - 诸葛马前课",
    description: "小六壬在线占卜工具，通过农历月日时推算六神，快速预测吉凶。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights/>
        <GoogleAnalytics gaId="G-5TCRFF8N9M" />
      </body>
    </html>
  );
}
