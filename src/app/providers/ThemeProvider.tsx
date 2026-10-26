import { App as AntApp, ConfigProvider } from 'antd'
import { useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useUiStore } from '@/store/uiStore'
import { createAntdTheme } from '@/theme/antdTheme'
import { brand } from '@/theme/brand'

/**
 * Owns the Ant Design ConfigProvider. Rebuilds the theme whenever the brand
 * or the light/dark preference changes, and mirrors the mode onto <html>.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeMode = useUiStore((state) => state.themeMode)
  const theme = useMemo(() => createAntdTheme(themeMode), [themeMode])

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode

    // Keeps the mobile browser chrome in step with the app background.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', themeMode === 'dark' ? '#141414' : brand.primaryColor)
  }, [themeMode])

  return (
    <ConfigProvider theme={theme}>
      <AntApp style={{ height: '100%' }}>{children}</AntApp>
    </ConfigProvider>
  )
}
