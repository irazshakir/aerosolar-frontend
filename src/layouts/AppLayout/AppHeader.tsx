import { BellOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Flex, Input, Layout, Tooltip } from 'antd'
import { AppBreadcrumbs } from '@/layouts/AppLayout/AppBreadcrumbs'
import { ProfileMenu } from '@/layouts/AppLayout/ProfileMenu'
import { useAuthStore } from '@/store/authStore'

interface AppHeaderProps {
  showMobileNavButton: boolean
  onOpenMobileNav: () => void
}

export function AppHeader({ showMobileNavButton, onOpenMobileNav }: AppHeaderProps) {
  const user = useAuthStore((state) => state.user)

  return (
    <Layout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        borderBottom: '1px solid var(--sial-border)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <Flex align="center" gap={12} style={{ minWidth: 0 }}>
        {showMobileNavButton ? (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onOpenMobileNav}
            aria-label="Open navigation"
          />
        ) : null}
        <AppBreadcrumbs />
      </Flex>

      <Flex align="center" gap={12}>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search anything…"
          aria-label="Global search"
          style={{ width: 240 }}
        />
        <Tooltip title="Notifications">
          <Badge count={3} size="small" offset={[-2, 2]}>
            <Button type="text" icon={<BellOutlined />} aria-label="Notifications" />
          </Badge>
        </Tooltip>
        <ProfileMenu
          placement="bottomRight"
          trigger={() => (
            <Button type="text" style={{ height: 40, paddingInline: 8 }}>
              <Flex align="center" gap={8}>
                <Avatar size={28} style={{ background: 'var(--sial-brand)' }}>
                  {(user?.name ?? 'S').charAt(0).toUpperCase()}
                </Avatar>
                <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name ?? 'Account'}
                </span>
              </Flex>
            </Button>
          )}
        />
      </Flex>
    </Layout.Header>
  )
}
