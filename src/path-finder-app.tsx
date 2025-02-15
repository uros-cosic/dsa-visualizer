import { useContext } from "react"
import Legend from "./components/path-finder/legend"
import Maze from "./components/path-finder/maze"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { AlgorithmContent, AlgorithmContext } from "./lib/context/algorithm"

import { algortihms as data } from "./lib/data/algorithms"

const PathFinderApp = () => {
    const { algorithm, setAlgorithm } = useContext<AlgorithmContent>(AlgorithmContext)

    return (
        <main className="py-10 max-w-screen-2xl w-full px-2 mx-auto">
            <div className="grid gap-5">
                <div className="flex items-end justify-between gap-3">
                    <h1 className="text-2xl font-semibold">Path finder</h1>
                    <Select
                        disabled={!!algorithm.hasStarted}
                        defaultValue={algorithm.name}
                        onValueChange={val => setAlgorithm({ name: val, description: data['path-finder'].find(a => a.name === val)!.description })}
                    >
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Choose an algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {data["path-finder"].map(item => (
                                <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Legend />
                <Maze />
            </div>
        </main>
    )
}

export default PathFinderApp
