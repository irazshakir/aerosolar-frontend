import { Card, Flex, Typography } from 'antd'
import { Outlet } from 'react-router-dom'
import { brand } from '@/theme/brand'
import { layout } from '@/theme/tokens'

export default function AuthLayout() {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        padding: 24,
        background:
          'radial-gradient(900px circle at 50% -10%, var(--sial-brand-soft), transparent 55%), var(--sial-canvas)',
      }}
    >
      <img
        src={brand.logoUrl}
        alt={brand.appName}
        style={{ height: 80, width: 'auto', marginBottom: 24 }}
      />

      <Card style={{ width: '100%', maxWidth: layout.authCardMaxWidth }}>
        <Outlet />
      </Card>

      <Typography.Text type="secondary" style={{ display: 'block', marginTop: 16, fontSize: 12 }}>
        Powered by{' '}
        <Typography.Link href="https://aerosolz.com" target="_blank" rel="noopener noreferrer">
          aerosolz
        </Typography.Link>
      </Typography.Text>
    </Flex>
  )
}
