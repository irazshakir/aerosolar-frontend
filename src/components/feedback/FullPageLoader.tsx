import { Flex, Spin, Typography } from 'antd'

interface FullPageLoaderProps {
  tip?: string
  minHeight?: string | number
}

/** Centered spinner used for route transitions and auth bootstrapping. */
export function FullPageLoader({ tip, minHeight = '60vh' }: FullPageLoaderProps) {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={16}
      style={{ minHeight, width: '100%', padding: 24 }}
    >
      <Spin size="large" />
      {tip ? <Typography.Text type="secondary">{tip}</Typography.Text> : null}
    </Flex>
  )
}
