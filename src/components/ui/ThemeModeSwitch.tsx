import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Segmented } from 'antd'
import { useUiStore } from '@/store/uiStore'
import type { ThemeMode } from '@/theme/antdTheme'

interface ThemeModeSwitchProps {
  /** Stretch the control to the width of its container. */
  block?: boolean
  size?: 'small' | 'middle' | 'large'
}

/** Light/dark control bound to the persisted UI preference. */
export function ThemeModeSwitch({ block = true, size = 'middle' }: ThemeModeSwitchProps) {
  const themeMode = useUiStore((state) => state.themeMode)
  const setThemeMode = useUiStore((state) => state.setThemeMode)

  return (
    <Segmented<ThemeMode>
      aria-label="Appearance"
      block={block}
      shape="round"
      size={size}
      value={themeMode}
      onChange={setThemeMode}
      options={[
        { value: 'light', icon: <SunOutlined />, tooltip: 'Light' },
        { value: 'dark', icon: <MoonOutlined />, tooltip: 'Dark' },
      ]}
    />
  )
}
