import {
    render,
    screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
    describe,
    expect,
    it,
    vi,
} from 'vitest'
import { Pagination } from './Pagination'

describe(
    'Pagination',
    () => {
        it(
            'solicita la página siguiente',
            async () => {
                const user =
                    userEvent.setup()

                const onPageChange =
                    vi.fn()

                render(
                    <Pagination
                        page={1}
                        totalPages={3}
                        onPageChange={
                            onPageChange
                        }
                    />,
                )

                await user.click(
                    screen.getByRole(
                        'button',
                        {
                            name: /siguiente/i,
                        },
                    ),
                )

                expect(
                    onPageChange,
                ).toHaveBeenCalledWith(
                    2,
                )
            },
        )

        it(
            'deshabilita Anterior en la primera página',
            () => {
                render(
                    <Pagination
                        page={1}
                        totalPages={3}
                        onPageChange={() => {}}
                    />,
                )

                expect(
                    screen.getByRole(
                        'button',
                        {
                            name: /anterior/i,
                        },
                    ),
                ).toBeDisabled()
            },
        )
    },
)