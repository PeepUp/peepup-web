import React, { Component, ReactNode, ErrorInfo, ReactElement } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    errorComponent: ReactNode | ReactElement;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error({ error, errorInfo });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => {
                            // Handle retry or navigate to a different page
                        }}
                    >
                        Try again?
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
