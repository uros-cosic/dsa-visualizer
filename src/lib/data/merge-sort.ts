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
    if (left >= right - 1) return

    const mid = Math.floor((left + right) / 2)

    await solveRec(bars, left, mid, setBars)
    await solveRec(bars, mid, right, setBars)

    await merge(bars, left, mid, right, setBars)
}

const merge = async (
    bars: BarProps[],
    left: number,
    mid: number,
    right: number,
    setBars: React.Dispatch<React.SetStateAction<BarProps[]>>
) => {
    let res: BarProps[] = []

    let i = left
    let j = mid

    while (i < mid && j < right) {
        if (bars[i].height! < bars[j].height!) {
            res.push(bars[i++])
        } else {
            res.push(bars[j++])
        }
    }

    while (i < mid) res.push(bars[i++])
    while (j < right) res.push(bars[j++])

    for (let k = 0; k < res.length; k++) {
        bars[left + k] = res[k]
        bars[left + k].isSwapped = true

        await new Promise((r) => setTimeout(r, 50))

        setBars([...bars])
        bars[left + k].isSwapped = false
    }

    setBars([...bars])
}
