import { Algorithm } from '../../components/algorithm-provider'
import { CellProps } from '../../components/cell'
import { CELL_WIDTH } from '../constants'

export const generateMaze = (algorithm: Algorithm, containerWidth: number) => {
    const columnsNum = Math.floor(containerWidth / CELL_WIDTH)
    const rowsNum = Math.floor(0.4 * columnsNum)

    if (columnsNum <= 0 || rowsNum <= 0) return []

    const res: CellProps[][] = []

    for (let i = 0; i < rowsNum; i++) {
        const row: CellProps[] = []
        for (let j = 0; j < columnsNum; j++) {
            row.push({
                walls: [1, 1, 1, 1],
                visited: false,
                isEnd: false,
                isStart: false,
                weight: algorithm.supportsWeights
                    ? Math.ceil(Math.random() * 99)
                    : 0,
                x: j,
                y: i,
            })
        }
        res.push(row)
    }

    res[0][0].isStart = true
    res[rowsNum - 1][columnsNum - 1].isEnd = true

    generateMazeRec(res[0][0], res, {})

    return res
}

const generateMazeRec = (
    current: CellProps,
    matrix: CellProps[][],
    visited: Record<string, boolean>
) => {
    if (visited[`${current.x}-${current.y}`]) return
    visited[`${current.x}-${current.y}`] = true

    let neighbours = getNeighbours(current, matrix)

    neighbours = neighbours.sort(() => Math.random() - 0.5)

    for (const neighbour of neighbours) {
        if (!visited[`${neighbour.x}-${neighbour.y}`]) {
            breakWall(current, neighbour)
            generateMazeRec(neighbour, matrix, visited)
        }
    }
}

const breakWall = (cellOne: CellProps, cellTwo: CellProps) => {
    // Top
    if (cellOne.x === cellTwo.x && cellOne.y === cellTwo.y + 1) {
        cellOne.walls![0] = 0
        cellTwo.walls![2] = 0
    }
    // Right
    if (cellOne.x + 1 === cellTwo.x && cellOne.y === cellTwo.y) {
        cellOne.walls![1] = 0
        cellTwo.walls![3] = 0
    }
    // Bottom
    if (cellOne.x === cellTwo.x && cellOne.y + 1 === cellTwo.y) {
        cellOne.walls![2] = 0
        cellTwo.walls![0] = 0
    }
    // Left
    if (cellOne.x === cellTwo.x + 1 && cellOne.y === cellTwo.y) {
        cellOne.walls![3] = 0
        cellTwo.walls![1] = 0
    }
}

export const getNeighbours = (
    cell: CellProps,
    res: CellProps[][]
): CellProps[] => {
    const neighbours: CellProps[] = []

    if (cell.y > 0) neighbours.push(res[cell.y - 1][cell.x]) // Top
    if (cell.y < res.length - 1) neighbours.push(res[cell.y + 1][cell.x]) // Bottom
    if (cell.x > 0) neighbours.push(res[cell.y][cell.x - 1]) // Left
    if (cell.x < res[0].length - 1) neighbours.push(res[cell.y][cell.x + 1]) // Right

    return neighbours
}
