import { useContext } from "react"
import { AlgorithmContent, AlgorithmContext } from "../../lib/context/algorithm"
import Cell from "../cell"

const Legend = () => {
    const { algorithm } = useContext<AlgorithmContent>(AlgorithmContext)

    return (
        <div className="w-full min-h-[200px] rounded-md border items-start bg-gray-50 p-5 grid grid-cols-4 gap-5">
            <div className="flex gap-2 items-center">
                <Cell
                    x={0}
                    y={0}
                    walls={[1, 1, 1, 1]}
                    isStart={true}
                />
                <span>Starting cell</span>
            </div>
            <div className="flex gap-2 items-center">
                <Cell
                    x={0}
                    y={0}
                    walls={[1, 1, 1, 1]}
                    isEnd={true}
                />
                <span>Ending cell</span>
            </div>
            <div className="flex gap-2 items-center">
                <Cell
                    x={0}
                    y={0}
                    walls={[0, 0, 0, 0]}
                />
                <span>Cell with no walls</span>
            </div>
            <div className="flex gap-2 items-center">
                <Cell
                    x={0}
                    y={0}
                    walls={[1, 1, 1, 1]}
                />
                <span>Cell with walls</span>
            </div>
            {!!algorithm.name && (
                <div className="col-span-4 flex flex-col gap-3">
                    <h2 className="text-lg font-medium">{algorithm.name}</h2>
                    {!!algorithm.description && <p className="text-sm text-foreground/80">{algorithm.description}</p>}
                </div>
            )}
        </div>
    )
}

export default Legend
