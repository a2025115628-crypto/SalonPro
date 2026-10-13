interface StatusBadgeProps {
    active: boolean
}

export function StatusBadge({
                                active,
                            }: StatusBadgeProps) {
    return (
        <span
            className={`badge ${
                active
                    ? 'badge--active'
                    : 'badge--inactive'
            }`}
        >
      {active
          ? 'Activo'
          : 'Inactivo'}
    </span>
    )
}