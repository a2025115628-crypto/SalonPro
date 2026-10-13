import {
    useEffect,
    useRef,
    type ReactNode,
} from 'react'

interface ModalProps {
    open: boolean
    title: string
    children: ReactNode
    onClose: () => void
}

export function Modal({
                          open,
                          title,
                          children,
                          onClose,
                      }: ModalProps) {
    const ref =
        useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = ref.current

        if (!dialog) {
            return
        }

        if (
            open &&
            !dialog.open
        ) {
            dialog.showModal()
        }

        if (
            !open &&
            dialog.open
        ) {
            dialog.close()
        }
    }, [open])

    return (
        <dialog
            ref={ref}
            className="modal"
            onCancel={onClose}
            onClose={onClose}
        >
            <header className="modal__header">
                <h2>{title}</h2>

                <button
                    type="button"
                    aria-label="Cerrar"
                    onClick={onClose}
                >
                    ×
                </button>
            </header>

            {children}
        </dialog>
    )
}