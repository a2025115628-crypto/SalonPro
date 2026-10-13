interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function SearchInput({
                                value,
                                onChange,
                                placeholder = 'Buscar...',
                            }: SearchInputProps) {
    return (
        <label className="field">
      <span className="field__label">
        Búsqueda
      </span>

            <input
                type="search"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
            />
        </label>
    )
}