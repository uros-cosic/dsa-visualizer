import { BarProps } from '../../components/bar'

export const solve = async (
    bars: BarProps[],
    setBars: React.Dispatch<React.SetStateAction<BarProps[]>>
) => {
    for (let i = 1; i < bars.length; i++) {
        const bar = bars[i]
        let j = i - 1

        while (j >= 0 && bars[j].height! > bar.height!) {
            bars[j + 1].isSwapped = true
            bars[j].isSwapped = true

            await new Promise((r) => setTimeout(r, 25))

            setBars([...bars])

            await new Promise((r) => setTimeout(r, 5))

            bars[j + 1].isSwapped = false
            bars[j].isSwapped = false

            bars[j + 1] = bars[j]

            setBars([...bars])
            j -= 1
        }

        bars[j + 1] = bar
    }

    for (let i = 0; i < bars.length; i++) {
        bars[i].isSorted = true
        await new Promise((r) => setTimeout(r, 25))

        setBars([...bars])
    }
}
