import { CellProps } from '../../components/cell'
import { getNeighbours } from './maze'

export const solve = async (
    matrix: CellProps[][],
    setMaze: React.Dispatch<React.SetStateAction<CellProps[][]>>
) => {
    const path: CellProps[] = []

    const found = await solveR(matrix[0][0], matrix, setMaze, path)

    if (found) {
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

    return []
}

const solveR = async (
    current: CellProps,
    matrix: CellProps[][],
    setMaze: React.Dispatch<React.SetStateAction<CellProps[][]>>,
    path: CellProps[] = []
) => {
    if (current.isEnd) {
        path.push(current)
        return true
    }
    if (current.visited) return false

    current.visited = true

    await new Promise((r) => setTimeout(r, 1))

    setMaze((prevMaze) => {
        const newMaze = prevMaze.map((row) =>
            row.map((cell) =>
                cell.x === current.x && cell.y === current.y
                    ? { ...cell, visited: true }
                    : cell
            )
        )
        return newMaze
    })

    path.push(current)

    const neighbours = getNeighbours(current, matrix)

    for (const n of neighbours) {
        if (!hasWall(current, n)) {
            const found = await solveR(n, matrix, setMaze, path)

            if (found) return true
        }
    }

    path.pop()

    return false
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
