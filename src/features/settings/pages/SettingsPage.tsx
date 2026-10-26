import { Alert, App as AntApp, Card, Flex, Skeleton, Tabs } from 'antd'
import { useState } from 'react'
import { CompanyProfileForm } from '@/features/settings/components/CompanyProfileForm'
import { IntegrationCard } from '@/features/settings/components/IntegrationCard'
import { IntegrationFormDrawer } from '@/features/settings/components/IntegrationFormDrawer'
import {
  useConnectIntegration,
  useDisconnectIntegration,
  useSettings,
  useUpdateCompanyProfile,
} from '@/features/settings/hooks'
import type {
  CompanyProfileInput,
  Integration,
  IntegrationInput,
} from '@/features/settings/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'

export default function SettingsPage() {
  const { message } = AntApp.useApp()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null)

  const settingsQuery = useSettings()
  const updateMutation = useUpdateCompanyProfile()
  const connectMutation = useConnectIntegration()
  const disconnectMutation = useDisconnectIntegration()

  const settings = settingsQuery.data

  const handleCompanySave = async (values: CompanyProfileInput) => {
    try {
      await updateMutation.mutateAsync(values)
      message.success('Company profile saved')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const openConnect = (integration: Integration) => {
    setEditingIntegration(integration)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingIntegration(null)
  }

  const handleConnect = async (values: IntegrationInput) => {
    if (!editingIntegration) {
      return
    }

    try {
      await connectMutation.mutateAsync({ id: editingIntegration.id, input: values })
      message.success('Channel connected')
      closeDrawer()
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleDisconnect = async (integration: Integration) => {
    try {
      await disconnectMutation.mutateAsync(integration.id)
      message.success('Channel disconnected')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <PageContainer
      title="Settings"
      subtitle="Manage company details and the channels connected to your inbox."
    >
      {settings ? (
        <Tabs
          items={[
            {
              key: 'company',
              label: 'Company profile',
              children: (
                <CompanyProfileForm
                  company={settings.company}
                  saving={updateMutation.isPending}
                  onSubmit={handleCompanySave}
                />
              ),
            },
            {
              key: 'integrations',
              label: 'Integrations',
              children: (
                <Flex vertical gap={16}>
                  <Alert
                    type="info"
                    showIcon
                    message="Connect the channels your team replies from"
                    description="New WhatsApp and Messenger messages appear in the shared Inbox, ready to assign."
                  />
                  {settings.integrations.map((integration) => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      disconnecting={
                        disconnectMutation.isPending &&
                        disconnectMutation.variables === integration.id
                      }
                      onConnect={() => openConnect(integration)}
                      onDisconnect={() => handleDisconnect(integration)}
                    />
                  ))}
                </Flex>
              ),
            },
          ]}
        />
      ) : (
        <Card>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Card>
      )}

      <IntegrationFormDrawer
        open={drawerOpen}
        integration={editingIntegration}
        submitting={connectMutation.isPending}
        onClose={closeDrawer}
        onSubmit={handleConnect}
      />
    </PageContainer>
  )
}
