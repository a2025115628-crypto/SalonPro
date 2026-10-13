import {
    render,
    screen,
} from '@testing-library/react'
import {
    describe,
    expect,
    it,
} from 'vitest'
import { StatusBadge } from './StatusBadge'

describe(
    'StatusBadge',
    () => {
        it(
            'muestra Activo cuando active es true',
            () => {
                render(
                    <StatusBadge active />,
                )

                expect(
                    screen.getByText(
                        'Activo',
                    ),
                ).toBeInTheDocument()
            },
        )

        it(
            'muestra Inactivo cuando active es false',
            () => {
                render(
                    <StatusBadge
                        active={false}
                    />,
                )

                expect(
                    screen.getByText(
                        'Inactivo',
                    ),
                ).toBeInTheDocument()
            },
        )
    },
)