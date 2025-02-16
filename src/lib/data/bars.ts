import { BarProps } from '../../components/bar'
import { CELL_WIDTH } from '../constants'

export const generateBars = (
    containerStartPos: number,
    containerWidth: number
) => {
    const maxBars = Math.floor(containerWidth / CELL_WIDTH)
    const maxHeight = window.innerHeight - containerStartPos

    const res: BarProps[] = []

    for (let i = 0; i < maxBars; i++)
        res.push({
            height: Math.floor(Math.random() * maxHeight),
            width: CELL_WIDTH,
            isSorted: false,
            isSwapped: false,
        })

    return res
}
