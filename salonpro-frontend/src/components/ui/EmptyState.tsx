interface EmptyStateProps {
    title: string
    description?: string
}

export function EmptyState({
                               title,
                               description,
                           }: EmptyStateProps) {
    return (
        <section
            className="empty-state"
            role="status"
        >
            <strong>{title}</strong>

            {description && (
                <p>{description}</p>
            )}
        </section>
    )
}