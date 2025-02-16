import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { AlgorithmContent, AlgorithmContext } from "../../lib/context/algorithm"
import { generateMaze } from "../../lib/data/maze"
import { Algorithm } from "../algorithm-provider"
import Cell, { CellProps } from "../cell"
import { Button } from "../ui/button"

const Maze = () => {
    const [maze, setMaze] = useState<CellProps[][]>([])

    const { algorithm, setAlgorithm } = useContext<AlgorithmContent>(AlgorithmContext)

    const ref = useRef<HTMLDivElement | null>(null)

    const createMaze = useCallback(() => {
        if (ref.current) {
            const newMaze = generateMaze(algorithm, ref.current.clientWidth)
            setMaze(newMaze)
        }

    }, [algorithm.name, ref])

    const handleSolve = async () => {
        if (!algorithm.fn) return

        setAlgorithm((prev: Algorithm) => ({ ...prev, hasStarted: true }))

        await algorithm.fn(maze, setMaze)

        setAlgorithm((prev: Algorithm) => ({ ...prev, hasStarted: false }))
    }

    useEffect(() => {
        createMaze()
    }, [algorithm.name, ref])

    return (
        <div className="grid gap-3">
            <div className="flex items-center gap-5">
                <Button
                    disabled={algorithm.hasStarted || !algorithm.fn}
                    onClick={handleSolve}
                    className="max-w-44 w-full"
                >
                    Solve
                </Button>
                <Button
                    disabled={algorithm.hasStarted}
                    onClick={createMaze}
                    className="max-w-44 w-full"
                    variant={"secondary"}
                >
                    Reset
                </Button>
            </div>
            <div className="flex flex-wrap w-full" ref={ref}>
                {
                    maze.map(row => (
                        row.map(cell => <Cell key={`${cell.x}-${cell.y}`} {...cell} />)
                    ))
                }
            </div>
        </div>
    )
}

export default Maze
