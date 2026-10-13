import { Link } from 'react-router'

export default function NotFoundPage() {
    return (
        <section className="not-found">
            <p className="page-heading__eyebrow">Error 404</p>

            <h2>La página solicitada no existe</h2>

            <p>
                Revisa la dirección o vuelve al panel principal.
            </p>

            <Link className="button-link" to="/">
                Volver al inicio
            </Link>
        </section>
    )
}