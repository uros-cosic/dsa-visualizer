import { CellProps } from '../../components/cell'
import { getNeighbours } from './maze'

export const solve = async (
    matrix: CellProps[][],
    setMaze: React.Dispatch<React.SetStateAction<CellProps[][]>>
) => {
    const rows = matrix.length
    const cols = matrix[0].length
    const source = matrix[0][0]
    const distances: Record<string, number> = {}
    const predecessors: Record<string, CellProps | null> = {}

    for (const row of matrix) {
        for (const cell of row) {
            distances[`${cell.x}-${cell.y}`] = Infinity
            predecessors[`${cell.x}-${cell.y}`] = null
        }
    }

    distances[`${source.x}-${source.y}`] = 0

    for (let i = 0; i < rows * cols - 1; i++) {
        for (const row of matrix) {
            for (const cell of row) {
                const neighbors = getNeighbours(cell, matrix)

                cell.visited = true

                for (const n of neighbors) {
                    if (!hasWall(cell, n)) {
                        const newDist =
                            distances[`${cell.x}-${cell.y}`] + n.weight!

                        if (newDist < distances[`${n.x}-${n.y}`]) {
                            distances[`${n.x}-${n.y}`] = newDist
                            predecessors[`${n.x}-${n.y}`] = cell
                        }
                    }
                }
            }
        }
    }

    for (const row of matrix) {
        for (const cell of row) {
            const neighbors = getNeighbours(cell, matrix)
            for (const n of neighbors) {
                if (!hasWall(cell, n)) {
                    if (
                        distances[`${cell.x}-${cell.y}`] + n.weight! <
                        distances[`${n.x}-${n.y}`]
                    ) {
                        console.warn('Negative cycle detected')
                        return
                    }
                }
            }
        }
    }

    let curr: CellProps | null = matrix[matrix.length - 1][matrix[0].length - 1]
    const path: CellProps[] = []

    while (curr) {
        path.push(curr)
        curr = predecessors[`${curr.x}-${curr.y}`] ?? null
    }

    path.reverse()

    for (const n of path) {
        await new Promise((r) => setTimeout(r, 1))

        setMaze((prevMaze) =>
            prevMaze.map((row) =>
                row.map((cell) =>
                    cell.x === n.x && cell.y === n.y
                        ? { ...cell, isPath: true }
                        : cell
                )
            )
        )
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
