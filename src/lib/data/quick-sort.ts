import { BarProps } from '../../components/bar'

export const solve = async (
    bars: BarProps[],
    setBars: React.Dispatch<React.SetStateAction<BarProps[]>>
) => {
    await solveRec(bars, 0, bars.length, setBars)

    for (let i = 0; i < bars.length; i++) {
        bars[i].isSorted = true
        await new Promise((r) => setTimeout(r, 25))

        setBars([...bars])
    }
}

const solveRec = async (
    bars: BarProps[],
    left: number,
    right: number,
    setBars: React.Dispatch<React.SetStateAction<BarProps[]>>
) => {
    if (left >= right) return

    const pivot = await getPivot(bars, left, right, setBars)

    await solveRec(bars, left, pivot, setBars)
    await solveRec(bars, pivot + 1, right, setBars)
}

const getPivot = async (
    bars: BarProps[],
    left: number,
    right: number,
    setBars: React.Dispatch<React.SetStateAction<BarProps[]>>
) => {
    const p = bars[right - 1]

    let j = left - 1

    for (let i = left; i < right - 1; i++) {
        if (bars[i].height! < p.height!) {
            j += 1

            bars[i].isSwapped = true
            bars[j].isSwapped = true

            await new Promise((r) => setTimeout(r, 50))

            setBars([...bars])

            await new Promise((r) => setTimeout(r, 5))

            bars[i].isSwapped = false
            bars[j].isSwapped = false

            const tmp = bars[i]
            bars[i] = bars[j]
            bars[j] = tmp

            setBars([...bars])
        }
    }

    ;[bars[right - 1], bars[j + 1]] = [bars[j + 1], bars[right - 1]]

    return j + 1
}
