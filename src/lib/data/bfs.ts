import { CellProps } from '../../components/cell'
import { getNeighbours } from './maze'

export const solve = async (
    matrix: CellProps[][],
    setMaze: React.Dispatch<React.SetStateAction<CellProps[][]>>
) => {
    const queue = [matrix[0][0]]
    const prev: Record<string, CellProps | null> = {}
    let found = false

    prev[`${matrix[0][0].x}-${matrix[0][0].y}`] = null

    while (queue.length) {
        const curr = queue.shift()!

        if (curr.isEnd) {
            found = true
            break
        }

        curr.visited = true

        await new Promise((r) => setTimeout(r, 1))

        setMaze((prevMaze) => {
            const newMaze = prevMaze.map((row) =>
                row.map((cell) =>
                    cell.x === curr.x && cell.y === curr.y
                        ? { ...cell, visited: true }
                        : cell
                )
            )
            return newMaze
        })

        const neighbours = getNeighbours(curr, matrix)

        for (const n of neighbours) {
            if (!hasWall(curr, n) && !n.visited) {
                queue.push(n)
                prev[`${n.x}-${n.y}`] = curr
            }
        }
    }

    if (!found) return

    const path = []

    let curr: CellProps | null = matrix[matrix.length - 1][matrix[0].length - 1]

    while (curr) {
        path.push(curr)
        curr = prev[`${curr.x}-${curr.y}`] ?? null
    }

    path.reverse()

    for (const n of path) {
        await new Promise((r) => setTimeout(r, 1))

        setMaze((prevMaze) => {
            const newMaze = prevMaze.map((row) =>
                row.map((cell) =>
                    cell.x === n.x && cell.y === n.y
                        ? { ...cell, isPath: true }
                        : cell
                )
            )
            return newMaze
        })
    }
}

const hasWall = (cellOne: CellProps, cellTwo: CellProps) => {
    // Top
    if (cellOne.x === cellTwo.x && cellOne.y === cellTwo.y + 1) {
        return cellOne.walls![0] === 1 && cellTwo.walls![2] === 1
    }
    // Right
    if (cellOne.x + 1 === cellTwo.x && cellOne.y === cellTwo.y) {
        return cellOne.walls![1] === 1 && cellTwo.walls![3] === 1
    }
    // Bottom
    if (cellOne.x === cellTwo.x && cellOne.y + 1 === cellTwo.y) {
        return cellOne.walls![2] === 1 && cellTwo.walls![0] === 1
    }
    // Left
    if (cellOne.x === cellTwo.x + 1 && cellOne.y === cellTwo.y) {
        return cellOne.walls![3] === 1 && cellTwo.walls![1] === 1
    }

    return false
}
