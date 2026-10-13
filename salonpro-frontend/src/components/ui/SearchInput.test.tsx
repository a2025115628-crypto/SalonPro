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
import { SearchInput } from './SearchInput'

describe(
    'SearchInput',
    () => {
        it(
            'emite cambios cuando el usuario escribe',
            async () => {
                const user =
                    userEvent.setup()

                const onChange =
                    vi.fn()

                render(
                    <SearchInput
                        value=""
                        onChange={
                            onChange
                        }
                    />,
                )

                await user.type(
                    screen.getByRole(
                        'searchbox',
                    ),
                    'ricardo',
                )

                expect(
                    onChange,
                ).toHaveBeenCalled()
            },
        )
    },
)