import { CELL_HEIGHT, CELL_WIDTH } from "../lib/constants"
import { cn } from "../lib/utils"

export type BarProps = {
    width?: number
    height?: number
    isSorted?: boolean
    isSwapped?: boolean
    informational?: boolean
}

const Bar = ({
    width = CELL_WIDTH,
    height = CELL_HEIGHT,
    isSorted = false,
    isSwapped = false,
    informational = false
}: BarProps) => {

    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`
            }}
            className={cn("flex items-center justify-center transform rotate-180 -scale-x-[1] transition-colors text-center text-sm font-medium bg-blue-500 border border-black", {
                "bg-slate-500": isSorted,
                "bg-yellow-500": isSwapped
            })}
        >
            {informational ? '' : height}
        </div>
    )
}

export default Bar

