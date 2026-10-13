import React from 'react'

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
}

export class AppErrorBoundary extends React.Component<
    Props,
    State
> {
    state: State = {
        hasError: false,
    }

    static getDerivedStateFromError(): State {
        return {
            hasError: true,
        }
    }

    componentDidCatch(
        error: unknown,
        info: React.ErrorInfo,
    ) {
        console.error(
            'Render error',
            error,
            info.componentStack,
        )
    }

    render() {
        if (this.state.hasError) {
            return (
                <main
                    className="feature-page"
                    role="alert"
                >
                    <div className="state-card error">
                        <h1>
                            La interfaz tuvo un problema.
                        </h1>

                        <p>
                            Recarga la página para
                            intentar nuevamente.
                        </p>
                    </div>
                </main>
            )
        }

        return this.props.children
    }
}