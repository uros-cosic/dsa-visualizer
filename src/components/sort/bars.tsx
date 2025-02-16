import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { AlgorithmContent, AlgorithmContext } from "../../lib/context/algorithm"
import { generateBars } from "../../lib/data/bars"
import Bar, { BarProps } from "../bar"
import { Button } from "../ui/button"

const Bars = () => {
    const [bars, setBars] = useState<BarProps[]>([])
    const { setAlgorithm, algorithm } = useContext<AlgorithmContent>(AlgorithmContext)

    const ref = useRef<HTMLDivElement | null>(null)

    const createBars = useCallback(() => {
        if (ref.current) {
            const bars = generateBars(ref.current.getBoundingClientRect().y, ref.current.clientWidth)
            setBars(bars)
        }
    }, [algorithm.name])

    const handleSort = async () => {
        if (!algorithm.fn) return

        setAlgorithm((prev: Algorithm) => ({ ...prev, hasStarted: true }))

        await algorithm.fn(bars, setBars)

        setAlgorithm((prev: Algorithm) => ({ ...prev, hasStarted: false }))
    }

    useEffect(() => {
        createBars()
    }, [createBars])

    return (
        <div className="grid gap-10">
            <div className="flex items-center gap-5">
                <Button
                    disabled={algorithm.hasStarted || !algorithm.fn}
                    onClick={handleSort}
                    className="max-w-44 w-full"
                >
                    Sort
                </Button>
                <Button
                    disabled={algorithm.hasStarted}
                    onClick={createBars}
                    className="max-w-44 w-full"
                    variant={"secondary"}
                >
                    Reset
                </Button>
            </div>
            <div className="flex w-full transform rotate-180 -scale-x-[1]" ref={ref}>
                {bars.map((bar, idx) => (
                    <Bar
                        key={idx}
                        {...bar}
                    />
                ))}
            </div>
        </div>
    )
}

export default Bars
