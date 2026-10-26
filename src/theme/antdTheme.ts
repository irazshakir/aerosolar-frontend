import { theme as antdThemeApi } from 'antd'
import type { ThemeConfig } from 'antd'
import { brand } from '@/theme/brand'
import { palette, radii, typography } from '@/theme/tokens'

export type ThemeMode = 'light' | 'dark'

/**
 * Builds the Ant Design theme from brand + raw tokens so a single brand file
 * re-skins the whole UI. Kept as a factory (not a constant) so dark mode and
 * runtime brand switching stay possible.
 */
export function createAntdTheme(mode: ThemeMode = 'light'): ThemeConfig {
  const isDark = mode === 'dark'

  return {
    algorithm: isDark ? antdThemeApi.darkAlgorithm : antdThemeApi.defaultAlgorithm,
    token: {
      colorPrimary: brand.primaryColor,
      colorLink: brand.primaryColor,
      colorInfo: brand.primaryColor,
      colorSuccess: palette.success,
      colorWarning: palette.warning,
      colorError: palette.error,
      colorText: isDark ? palette.gray100 : palette.gray900,
      colorTextSecondary: isDark ? palette.gray400 : palette.gray500,
      colorBorder: isDark ? '#3A3A40' : palette.gray200,
      colorBorderSecondary: isDark ? '#2E2E33' : palette.gray100,
      colorBgLayout: isDark ? '#141414' : palette.canvas,
      colorBgContainer: isDark ? '#1D1D1F' : palette.white,
      borderRadius: radii.md,
      borderRadiusLG: radii.lg,
      borderRadiusSM: radii.sm,
      controlHeight: 34,
      fontSize: typography.baseSize,
      fontFamily: typography.fontFamily,
      fontWeightStrong: typography.headingWeight,
      fontSizeHeading1: 26,
      fontSizeHeading2: 21,
      fontSizeHeading3: typography.size.pageTitle,
      fontSizeHeading4: typography.size.bodyStrong,
      fontSizeHeading5: typography.size.body,
      lineHeight: 1.45,
      wireframe: false,
    },
    components: {
      Layout: {
        headerBg: isDark ? '#1D1D1F' : palette.white,
        headerHeight: 56,
        headerPadding: '0 20px',
        siderBg: isDark ? '#1D1D1F' : palette.white,
        bodyBg: isDark ? '#141414' : palette.canvas,
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        itemSelectedBg: isDark ? 'rgba(108, 77, 246, 0.22)' : palette.brand50,
        itemSelectedColor: isDark ? '#B7A5FF' : brand.primaryColor,
        itemBorderRadius: radii.md,
        itemHeight: 36,
        itemMarginInline: 10,
        iconSize: 16,
      },
      Button: {
        controlHeight: 34,
        borderRadius: radii.md,
        primaryShadow: 'none',
        defaultShadow: 'none',
      },
      Table: {
        headerBg: isDark ? '#232326' : palette.tableHeader,
        headerColor: isDark ? palette.gray400 : palette.gray500,
        headerSplitColor: 'transparent',
        headerBorderRadius: radii.sm,
        rowHoverBg: isDark ? '#232326' : palette.gray50,
        cellPaddingBlock: 9,
        cellPaddingInline: 12,
        borderColor: isDark ? '#2E2E33' : palette.gray200,
      },
      Card: {
        bodyPadding: 20,
        headerFontSize: typography.size.bodyStrong,
      },
      Input: {
        controlHeight: 34,
        borderRadius: radii.md,
      },
      Select: {
        controlHeight: 34,
        borderRadius: radii.md,
      },
      Drawer: {
        paddingLG: 20,
      },
      Tag: {
        borderRadiusSM: 6,
      },
    },
  }
}

export const antdTheme = createAntdTheme('light')
