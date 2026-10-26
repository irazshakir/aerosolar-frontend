import { IdcardOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { Avatar, Card, Descriptions, Flex, Tag, Typography, theme } from 'antd'
import { ThemeModeSwitch } from '@/components/ui/ThemeModeSwitch'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { useAuthStore } from '@/store/authStore'

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export default function ProfilePage() {
  const { token } = theme.useToken()
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return null
  }

  return (
    <PageContainer
      title="My profile"
      subtitle="Your signed-in account and the appearance of this workspace."
    >
      <Flex vertical gap={16} style={{ maxWidth: 760 }}>
        <Card>
          <Flex align="center" gap={16} wrap>
            <Avatar size={64} style={{ background: token.colorPrimary, fontSize: 22 }}>
              {getInitials(user.name)}
            </Avatar>
            <Flex vertical gap={2} style={{ minWidth: 0 }}>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {user.name}
              </Typography.Title>
              <Typography.Text type="secondary">{user.email}</Typography.Text>
            </Flex>
            <Tag color="purple" variant="filled" style={{ marginInlineStart: 'auto' }}>
              {user.role}
            </Tag>
          </Flex>
        </Card>

        <Card title="Account details">
          <Descriptions
            column={1}
            colon={false}
            styles={{ label: { width: 180 } }}
            items={[
              {
                key: 'name',
                label: (
                  <Flex gap={8} align="center">
                    <IdcardOutlined /> Name
                  </Flex>
                ),
                children: user.name,
              },
              {
                key: 'email',
                label: (
                  <Flex gap={8} align="center">
                    <MailOutlined /> Email
                  </Flex>
                ),
                children: user.email,
              },
              {
                key: 'role',
                label: (
                  <Flex gap={8} align="center">
                    <SafetyCertificateOutlined /> Role
                  </Flex>
                ),
                children: user.role,
              },
            ]}
          />
        </Card>

        <Card title="Appearance">
          <Flex vertical gap={12}>
            <Typography.Text type="secondary">
              Choose how the workspace looks. Your choice is saved automatically in this browser.
            </Typography.Text>
            <Flex>
              <ThemeModeSwitch block={false} />
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </PageContainer>
  )
}
