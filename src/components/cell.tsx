import { CELL_HEIGHT, CELL_WIDTH } from "../lib/constants"
import { cn } from "../lib/utils"

export type CellProps = {
    x: number,
    y: number,
    walls?: [
        0 | 1, // top
        0 | 1, // right
        0 | 1, // bottom
        0 | 1 // left
    ]
    visited?: boolean
    isStart?: boolean
    isEnd?: boolean
    width?: number
    height?: number
    weight?: number
    isPath?: boolean
}

const Cell = ({
    x,
    y,
    walls = [1, 1, 1, 1],
    visited = false,
    isStart = false,
    isEnd = false,
    width = CELL_WIDTH,
    height = CELL_HEIGHT,
    weight = 0,
    isPath = false
}: CellProps) => {

    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`
            }}
            className={cn("flex items-center justify-center transition-colors text-center text-sm font-medium bg-white border border-black border-t-0 border-b-0 border-l-0 border-r-0", {
                "border-t": walls[0],
                "border-r": walls[1],
                "border-b": walls[2],
                "border-l": walls[3],
                "bg-blue-500": visited,
                "bg-yellow-500": isPath
            })}
        >
            {isStart ? 'S' : isEnd ? 'E' : weight || ''}
        </div>
    )
}

export default Cell
