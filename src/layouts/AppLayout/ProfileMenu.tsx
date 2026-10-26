import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown, Typography, theme } from 'antd'
import type { DropdownProps } from 'antd'
import { useState } from 'react'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeModeSwitch } from '@/components/ui/ThemeModeSwitch'
import { useAuthStore } from '@/store/authStore'

interface ProfileMenuProps {
  /** Renders the trigger; the flag is true while the panel is open. */
  trigger: (open: boolean) => ReactElement
  placement?: DropdownProps['placement']
  /** Called after an action runs — used to close the mobile navigation drawer. */
  onAction?: () => void
}

const sectionLabelStyle = {
  display: 'block' as const,
  fontSize: 12,
  fontWeight: 500,
  padding: '4px 10px 6px',
}

/**
 * Account panel opened from the profile name. Kept intentionally small: the
 * user's own profile, the light/dark preference, and sign out.
 */
export function ProfileMenu({ trigger, placement = 'bottomRight', onAction }: ProfileMenuProps) {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const clearSession = useAuthStore((state) => state.clearSession)
  const [open, setOpen] = useState(false)

  const runAction = (action: () => void) => {
    setOpen(false)
    onAction?.()
    action()
  }

  const panel = (
    <div style={{ width: 280, padding: 8 }}>
      <Typography.Text type="secondary" style={sectionLabelStyle}>
        Account
      </Typography.Text>
      <Button
        type="text"
        block
        icon={<UserOutlined />}
        onClick={() => runAction(() => navigate('/profile'))}
        style={{ justifyContent: 'flex-start', height: 38, paddingInline: 10 }}
      >
        My profile
      </Button>

      <Divider style={{ margin: '8px 0' }} />

      <Typography.Text type="secondary" style={sectionLabelStyle}>
        Appearance
      </Typography.Text>
      <div style={{ padding: '2px 6px 6px' }}>
        <ThemeModeSwitch />
      </div>

      <Divider style={{ margin: '8px 0' }} />

      <Button
        type="text"
        danger
        block
        icon={<LogoutOutlined />}
        onClick={() =>
          runAction(() => {
            clearSession()
            navigate('/login', { replace: true })
          })
        }
        style={{ justifyContent: 'flex-start', height: 38, paddingInline: 10 }}
      >
        Sign out
      </Button>
    </div>
  )

  return (
    <Dropdown
      open={open}
      trigger={['click']}
      placement={placement}
      onOpenChange={setOpen}
      destroyOnHidden
      popupRender={() => (
        <div
          style={{
            background: token.colorBgElevated,
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadowSecondary,
          }}
        >
          {panel}
        </div>
      )}
    >
      {trigger(open)}
    </Dropdown>
  )
}
