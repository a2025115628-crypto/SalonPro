interface MetricCardProps {
    label: string
    value: number
    helper?: string
}

export function MetricCard({
                               label,
                               value,
                               helper,
                           }: MetricCardProps) {
    return (
        <article className="metric-card">
      <span className="metric-card__label">
        {label}
      </span>

            <strong className="metric-card__value">
                {value}
            </strong>

            {helper && (
                <small className="metric-card__helper">
                    {helper}
                </small>
            )}
        </article>
    )
}