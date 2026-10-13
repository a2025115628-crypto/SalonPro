import type {
    ButtonHTMLAttributes,
    ReactNode,
} from 'react'

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    loading?: boolean
    children: ReactNode
}

export function Button({
                           variant = 'primary',
                           loading = false,
                           disabled,
                           children,
                           className = '',
                           ...props
                       }: ButtonProps) {
    return (
        <button
            className={`btn btn--${variant} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading
                ? 'Procesando...'
                : children}
        </button>
    )
}