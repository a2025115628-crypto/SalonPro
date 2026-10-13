import { Button } from './Button'
import { Modal } from './Modal'

interface ConfirmDialogProps {
    open: boolean
    title: string
    message: string
    confirming?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmDialog({
                                  open,
                                  title,
                                  message,
                                  confirming = false,
                                  onConfirm,
                                  onCancel,
                              }: ConfirmDialogProps) {
    return (
        <Modal
            open={open}
            title={title}
            onClose={onCancel}
        >
            <p>{message}</p>

            <div className="modal__actions">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={confirming}
                >
                    Cancelar
                </Button>

                <Button
                    variant="danger"
                    loading={confirming}
                    onClick={onConfirm}
                >
                    Eliminar
                </Button>
            </div>
        </Modal>
    )
}