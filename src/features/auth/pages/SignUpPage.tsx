import {
  BankOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { App as AntApp, Button, Checkbox, Flex, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/features/auth/hooks'
import type { RegisterFormValues, RegisterPayload } from '@/features/auth/types'
import { getErrorMessage } from '@/lib/api/errors'

/** Digits, spaces, dots, dashes and parentheses, with an optional leading "+". */
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/

export default function SignUpPage() {
  const navigate = useNavigate()
  const register = useRegister()
  const { message } = AntApp.useApp()

  const handleFinish = async (values: RegisterFormValues) => {
    const payload: RegisterPayload = {
      name: values.name,
      organizationName: values.organizationName,
      phone: values.phone,
      email: values.email,
      password: values.password,
    }

    try {
      await register.mutateAsync(payload)
      message.success('Account created. Sign in to continue.')
      navigate('/login', { replace: true, state: { registeredEmail: values.email } })
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <Flex vertical gap={4}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Create your account
      </Typography.Title>
      <Typography.Text type="secondary">
        Set up your organization and start building assistants.
      </Typography.Text>

      <Form<RegisterFormValues>
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="name"
          label="Full name"
          rules={[
            { required: true, whitespace: true, message: 'Name is required' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Jane Cooper" autoComplete="name" />
        </Form.Item>

        <Form.Item
          name="organizationName"
          label="Organization name"
          rules={[{ required: true, whitespace: true, message: 'Organization name is required' }]}
        >
          <Input prefix={<BankOutlined />} placeholder="Acme Solar" autoComplete="organization" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone number"
          rules={[
            { required: true, whitespace: true, message: 'Phone number is required' },
            { pattern: PHONE_PATTERN, message: 'Enter a valid phone number' },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="+1 555 000 1234" autoComplete="tel" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Work email"
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
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="acceptTerms"
          valuePropName="checked"
          style={{ marginTop: 4, marginBottom: 12 }}
          rules={[
            {
              validator: (_rule, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Please accept the terms to continue')),
            },
          ]}
        >
          <Checkbox>I agree to the Terms of Service and Privacy Policy</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 12, marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block loading={register.isPending}>
            Create account
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text
        type="secondary"
        style={{ display: 'block', textAlign: 'center', fontSize: 12 }}
      >
        Already have an account? <Link to="/login">Sign in</Link>
      </Typography.Text>
    </Flex>
  )
}
