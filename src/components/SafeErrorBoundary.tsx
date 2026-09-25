import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SafeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Recovered from component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 p-4 text-center">
          <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 mb-2">
            !
          </div>
          <span className="font-mono text-xs text-red-400 font-bold uppercase">
            Telemetry Feed Unavailable
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}
