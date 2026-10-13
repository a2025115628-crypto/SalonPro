import {
    useCallback,
    useEffect,
    useState,
} from 'react'
import { isAbortError } from '../utils/isAbortError'

type Loader<T> = (
    signal: AbortSignal,
) => Promise<T[]>

export function useAsyncList<T>(
    loader: Loader<T>,
) {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [reloadToken, setReloadToken] =
        useState(0)

    const reload = useCallback(() => {
        setReloadToken(
            (value) => value + 1,
        )
    }, [])

    useEffect(() => {
        const controller =
            new AbortController()

        const load = async () => {
            try {
                setLoading(true)
                setError('')

                const result =
                    await loader(
                        controller.signal,
                    )

                setData(result)
            } catch (error) {
                if (!isAbortError(error)) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : 'Error de carga',
                    )
                }
            } finally {
                if (
                    !controller.signal.aborted
                ) {
                    setLoading(false)
                }
            }
        }

        void load()

        return () => {
            controller.abort()
        }
    }, [loader, reloadToken])

    return {
        data,
        setData,
        loading,
        error,
        setError,
        reload,
    }
}