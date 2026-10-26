import {
  CaretDownFilled,
  CaretUpFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Flex, Menu, Typography, theme } from 'antd'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigation } from '@/config/navigation'
import { ProfileMenu } from '@/layouts/AppLayout/ProfileMenu'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'
import { brand } from '@/theme/brand'
import { radii, typography } from '@/theme/tokens'

interface AppSidebarProps {
  collapsed: boolean
  /** Called after a navigation click — used to close the mobile drawer. */
  onNavigate?: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export function AppSidebar({ collapsed, onNavigate }: AppSidebarProps) {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const user = useAuthStore((state) => state.user)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  const menuItems: MenuProps['items'] = navigation
    .filter((item) => !item.hidden)
    .map((item) => {
      const children = item.children?.filter((child) => !child.hidden)
      return {
        // Group keys are not routes, so they use the nav key instead of the path.
        key: children?.length ? item.key : item.path,
        icon: item.icon,
        label: item.label,
        ...(children?.length
          ? { children: children.map((child) => ({ key: child.path, label: child.label })) }
          : {}),
      }
    })

  // Keep the group that owns the current route expanded.
  const activeGroupKey = navigation.find((item) =>
    item.children?.some((child) => pathname.startsWith(child.path)),
  )?.key

  const [openKeys, setOpenKeys] = useState<string[]>([])

  // The active group is always expanded; every other group follows user toggles.
  const expandedKeys = activeGroupKey
    ? Array.from(new Set([...openKeys, activeGroupKey]))
    : openKeys

  return (
    <Flex vertical style={{ height: '100%', paddingBlock: 12 }}>
      <Flex align="center" gap={10} style={{ padding: '8px 20px', minHeight: 48 }}>
        <img src={brand.logoUrl} alt={brand.appName} style={{ height: 28, width: 'auto' }} />
        {!collapsed ? (
          <Typography.Text
            strong
            style={{ fontSize: typography.size.bodyStrong, whiteSpace: 'nowrap' }}
          >
            {brand.appName}
          </Typography.Text>
        ) : null}
      </Flex>

      <Flex vertical style={{ flex: 1, marginTop: 12, overflowY: 'auto' }}>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[pathname]}
          // Collapsed submenus turn into hover popups, which Ant Design keeps inline-open.
          {...(collapsed ? {} : { openKeys: expandedKeys, onOpenChange: setOpenKeys })}
          onClick={({ key }) => {
            navigate(key)
            onNavigate?.()
          }}
          style={{ borderInlineEnd: 'none' }}
        />
      </Flex>

      <Flex vertical gap={8} style={{ padding: 12 }}>
        <Button
          type="text"
          block
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{ justifyContent: collapsed ? 'center' : 'flex-start', color: token.colorTextSecondary }}
        >
          {collapsed ? null : 'Collapse'}
        </Button>

        {user ? (
          <ProfileMenu
            placement="rightBottom"
            onAction={onNavigate}
            trigger={(open) => (
              <Button
                type="text"
                block
                aria-label="Open account menu"
                style={{
                  height: 'auto',
                  padding: 8,
                  borderRadius: radii.md,
                  background: token.colorFillQuaternary,
                  overflow: 'hidden',
                }}
              >
                <Flex align="center" gap={10} style={{ width: '100%', minWidth: 0 }}>
                  <Avatar size={32} style={{ background: token.colorPrimary, flexShrink: 0 }}>
                    {getInitials(user.name)}
                  </Avatar>
                  {!collapsed ? (
                    <>
                      <Flex vertical style={{ minWidth: 0, flex: 1 }}>
                        <Typography.Text strong ellipsis style={{ fontSize: 13 }}>
                          {user.name}
                        </Typography.Text>
                        <Typography.Text type="secondary" ellipsis style={{ fontSize: 12 }}>
                          {user.role}
                        </Typography.Text>
                      </Flex>
                      {open ? (
                        <CaretUpFilled
                          style={{ fontSize: 10, color: token.colorTextTertiary, flexShrink: 0 }}
                        />
                      ) : (
                        <CaretDownFilled
                          style={{ fontSize: 10, color: token.colorTextTertiary, flexShrink: 0 }}
                        />
                      )}
                    </>
                  ) : null}
                </Flex>
              </Button>
            )}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}
