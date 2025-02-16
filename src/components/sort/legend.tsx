import { useContext } from "react"
import { AlgorithmContent, AlgorithmContext } from "../../lib/context/algorithm"
import Bar from "../bar"

const Legend = () => {
    const { algorithm } = useContext<AlgorithmContent>(AlgorithmContext)

    return (
        <div className="w-full min-h-[200px] rounded-md border items-start bg-gray-50 p-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="flex gap-2 items-center">
                <Bar
                    informational={true}
                />
                <span>Starting bar</span>
            </div>
            <div className="flex gap-2 items-center">
                <Bar
                    informational={true}
                    isSorted={true}
                />
                <span>Sorted bar</span>
            </div>
            <div className="flex gap-2 items-center">
                <Bar
                    informational={true}
                    isSwapped={true}
                />
                <span>Swapped bar</span>
            </div>
            {!!algorithm.name && (
                <div className="lg:col-span-4 flex flex-col gap-3">
                    <h2 className="text-lg font-medium">{algorithm.name}</h2>
                    {!!algorithm.description && <p className="text-sm text-foreground/80">{algorithm.description}</p>}
                </div>
            )}
        </div>
    )
}

export default Legend

