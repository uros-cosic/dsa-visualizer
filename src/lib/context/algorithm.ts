import { createContext } from 'react'

export type AlgorithmContent = {
    algorithm: {
        name?: string
        description?: string
        hasStarted?: boolean
        fn?: (...args: any) => any
    }
    setAlgorithm: (a: any) => void
}

export const AlgorithmContext = createContext<AlgorithmContent>({
    algorithm: {},
    setAlgorithm: () => {},
})
