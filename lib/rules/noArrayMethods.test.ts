import { RuleTester } from 'eslint'
import { noArrayMethods } from './noArrayMethods'

new RuleTester({ parser: require.resolve('@typescript-eslint/parser') }).run(
    'no-array-methods',
    //@ts-expect-error types somehow wrong
    noArrayMethods,
    {
        valid: [
            {
                code: 'R.map(value => value + 1, [1,2])',
            },
            {
                code: '[1,2].length',
            },
        ],

        invalid: [
            {
                code: '[1,2].map(value => value + 1)',
                errors: [
                    {
                        message:
                            'Cannot call array member methods. Use ramda functions instead. e.g. `R.map` instead of [].map',
                    },
                ],
            },
            {
                code: '[1,2].filter(value => !!value)',
                errors: [
                    {
                        message:
                            'Cannot call array member methods. Use ramda functions instead. e.g. `R.map` instead of [].map',
                    },
                ],
            },
        ],
    }
)
