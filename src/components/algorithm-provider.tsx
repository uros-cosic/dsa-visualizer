import { useState } from "react"

import { AlgorithmContext } from "../lib/context/algorithm"

export type Algorithm = {
    name?: string,
    description?: string
    hasStarted?: boolean
    supportsWeights?: boolean
    supportsNegativeWeights?: boolean
}

type Props = {
    children: Readonly<React.ReactNode>
}

const AlgorithmProvider = ({ children }: Props) => {
    const [algorithm, setAlgorithm] = useState<Algorithm>({})

    return (
        <AlgorithmContext.Provider value={{ algorithm, setAlgorithm }}>
            {children}
        </AlgorithmContext.Provider>
    )
}

export default AlgorithmProvider
