import { BarProps } from '../../components/bar'

export const solve = async (
    bars: BarProps[],
    setBars: React.Dispatch<React.SetStateAction<BarProps[]>>
) => {
    for (let i = 0; i < bars.length - 1; i++) {
        let minIdx = i

        for (let j = i + 1; j < bars.length; j++) {
            if (bars[j].height! < bars[minIdx].height!) minIdx = j
        }

        bars[i].isSwapped = true
        bars[minIdx].isSwapped = true

        await new Promise((r) => setTimeout(r, 50))

        setBars([...bars])

        await new Promise((r) => setTimeout(r, 5))

        bars[i].isSwapped = false
        bars[minIdx].isSwapped = false

        const tmp = bars[i]
        bars[i] = bars[minIdx]
        bars[minIdx] = tmp

        bars[i].isSorted = true

        setBars([...bars])
    }
    bars[bars.length - 1].isSorted = true
}
