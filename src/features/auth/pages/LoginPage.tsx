import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { App as AntApp, Button, Flex, Form, Input, Typography } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { env } from '@/config/env'
import { useLogin } from '@/features/auth/hooks'
import type { LoginCredentials } from '@/features/auth/types'
import { getErrorMessage } from '@/lib/api/errors'

interface LoginLocationState {
  from?: string
  /** Set by the sign-up page so the freshly created email is filled in. */
  registeredEmail?: string
}

const mockDefaults: Partial<LoginCredentials> = {
  email: 'admin@aerosolar.example',
  password: 'demo1234',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useLogin()
  const { message } = AntApp.useApp()

  const state = location.state as LoginLocationState | null
  const redirectTo = state?.from ?? '/dashboard'

  const initialValues: Partial<LoginCredentials> = env.useMockApi ? { ...mockDefaults } : {}
  if (state?.registeredEmail) {
    initialValues.email = state.registeredEmail
  }

  const handleFinish = async (values: LoginCredentials) => {
    try {
      await login.mutateAsync(values)
      message.success('Welcome back')
      navigate(redirectTo, { replace: true })
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <Flex vertical gap={4}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Welcome back
      </Typography.Title>
      <Typography.Text type="secondary">
        Enter your credentials to access the dashboard.
      </Typography.Text>

      <Form<LoginCredentials>
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        initialValues={initialValues}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email address' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="you@company.com" autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Password is required' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12, marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block loading={login.isPending}>
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text
        type="secondary"
        style={{ display: 'block', textAlign: 'center', fontSize: 12 }}
      >
        Don't have an account? <Link to="/signup">Create one</Link>
      </Typography.Text>
    </Flex>
  )
}
