const API_URL = import.meta.env.VITE_API_URL

interface ApiErrorBody {
    message?: string
    fieldErrors?: Record<string, string>
}

export class ApiError extends Error {
    status: number
    fieldErrors: Record<string, string>

    constructor(
        status: number,
        message: string,
        fieldErrors: Record<string, string> = {},
    ) {
        super(message)

        this.name = 'ApiError'
        this.status = status
        this.fieldErrors = fieldErrors
    }
}

async function leerError(
    response: Response,
): Promise<ApiError> {
    const body = (
        await response
            .json()
            .catch(() => null)
    ) as ApiErrorBody | null

    const message =
        body?.message ||
        response.statusText ||
        `Error HTTP ${response.status}`

    return new ApiError(
        response.status,
        message,
        body?.fieldErrors ?? {},
    )
}

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    if (!API_URL) {
        throw new Error(
            'Falta configurar VITE_API_URL',
        )
    }

    const headers =
        new Headers(options.headers)

    if (
        options.body &&
        !headers.has('Content-Type')
    ) {
        headers.set(
            'Content-Type',
            'application/json',
        )
    }

    let response: Response

    try {
        response = await fetch(
            `${API_URL}${endpoint}`,
            {
                ...options,
                headers,
            },
        )
    } catch (err) {
        if (
            err instanceof DOMException &&
            err.name === 'AbortError'
        ) {
            throw err
        }

        throw new Error(
            'No se pudo conectar con el servidor. Verifique que el backend esté en ejecución y que CORS permita este origen.',
        )
    }

    if (!response.ok) {
        throw await leerError(response)
    }

    if (response.status === 204) {
        return undefined as T
    }

    return response.json() as Promise<T>
}

export function describirError(
    err: unknown,
    porDefecto = 'Error inesperado',
): string {
    if (err instanceof ApiError) {
        const detalles =
            Object.entries(
                err.fieldErrors,
            ).map(
                ([campo, mensaje]) =>
                    `${campo}: ${mensaje}`,
            )

        return detalles.length > 0
            ? `${err.message} (${detalles.join('; ')})`
            : err.message
    }

    return err instanceof Error
        ? err.message
        : porDefecto
}