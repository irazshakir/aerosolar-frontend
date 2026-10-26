import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { ResultPage } from '@/components/feedback/ResultPage'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/** Last line of defence: renders a themed 500 result instead of a blank screen. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info.componentStack)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ResultPage
          status={500}
          showHome={false}
          title="Something went wrong"
          subTitle="The application hit an unexpected error. Reload the page to continue."
        />
      )
    }

    return this.props.children
  }
}
