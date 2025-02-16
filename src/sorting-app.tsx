import { useContext, useEffect } from "react"
import Bars from "./components/sort/bars"
import Legend from "./components/sort/legend"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { AlgorithmContent, AlgorithmContext } from "./lib/context/algorithm"

import { algortihms as data } from "./lib/data/algorithms"

const SortingApp = () => {
    const { algorithm, setAlgorithm } = useContext<AlgorithmContent>(AlgorithmContext)

    useEffect(() => {
        setAlgorithm({})
    }, [])

    return (
        <main className="py-10 max-w-screen-2xl w-full px-2 mx-auto">
            <div className="grid gap-5">
                <div className="flex items-end justify-between gap-3">
                    <h1 className="text-2xl font-semibold">Sorting visualizer</h1>
                    <Select
                        disabled={!!algorithm.hasStarted}
                        onValueChange={val => setAlgorithm({ ...data['sort'].find(a => a.name === val)! })}
                    >
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Choose an algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {data["sort"].map(item => (
                                <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Legend />
                <Bars />
            </div>
        </main>
    )
}

export default SortingApp
