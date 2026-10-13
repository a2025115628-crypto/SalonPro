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
import { SelectFilter } from './SelectFilter'

describe(
    'SelectFilter',
    () => {
        it(
            'emite el valor seleccionado',
            async () => {
                const user =
                    userEvent.setup()

                const onChange =
                    vi.fn()

                render(
                    <SelectFilter
                        label="Estado"
                        value="all"
                        options={[
                            {
                                value: 'all',
                                label: 'Todos',
                            },
                            {
                                value: 'active',
                                label: 'Activos',
                            },
                            {
                                value: 'inactive',
                                label: 'Inactivos',
                            },
                        ]}
                        onChange={
                            onChange
                        }
                    />,
                )

                await user.selectOptions(
                    screen.getByRole(
                        'combobox',
                        {
                            name: /estado/i,
                        },
                    ),
                    'active',
                )

                expect(
                    onChange,
                ).toHaveBeenCalledWith(
                    'active',
                )
            },
        )
    },
)