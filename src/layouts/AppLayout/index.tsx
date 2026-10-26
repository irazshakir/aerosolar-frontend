import { Drawer, Grid, Layout, theme } from 'antd'
import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FullPageLoader } from '@/components/feedback/FullPageLoader'
import { getPageTitle } from '@/config/navigation'
import { AppHeader } from '@/layouts/AppLayout/AppHeader'
import { AppSidebar } from '@/layouts/AppLayout/AppSidebar'
import { useUiStore } from '@/store/uiStore'
import { brand } from '@/theme/brand'
import { layout } from '@/theme/tokens'

const { Sider, Content } = Layout

export default function AppLayout() {
  const { token } = theme.useToken()
  const collapsed = useUiStore((state) => state.sidebarCollapsed)
  const themeMode = useUiStore((state) => state.themeMode)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const screens = Grid.useBreakpoint()
  const { pathname } = useLocation()

  // Stay in desktop mode until the breakpoint resolves, avoiding a mobile flash.
  const isMobile = screens.lg === false

  useEffect(() => {
    document.title = `${getPageTitle(pathname)} · ${brand.appName}`
  }, [pathname])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          placement="left"
          width={layout.sidebarWidth}
          closable={false}
          styles={{ body: { padding: 0 } }}
        >
          <AppSidebar collapsed={false} onNavigate={() => setMobileNavOpen(false)} />
        </Drawer>
      ) : (
        <Sider
          width={layout.sidebarWidth}
          collapsedWidth={layout.sidebarCollapsedWidth}
          collapsed={collapsed}
          trigger={null}
          theme={themeMode}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            borderInlineEnd: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorBgContainer,
          }}
        >
          <AppSidebar collapsed={collapsed} />
        </Sider>
      )}

      <Layout style={{ background: token.colorBgLayout }}>
        <AppHeader
          showMobileNavButton={isMobile}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <Content>
          <Suspense fallback={<FullPageLoader />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}
