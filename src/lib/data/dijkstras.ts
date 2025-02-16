import { CellProps } from '../../components/cell'
import { getNeighbours } from './maze'

export const solve = async (
    matrix: CellProps[][],
    setMaze: React.Dispatch<React.SetStateAction<CellProps[][]>>
) => {
    const pq = new PriorityQueue()
    const prev: Record<string, CellProps | null> = {}

    prev[`${matrix[0][0].x}-${matrix[0][0].y}`] = null

    pq.add(matrix[0][0])

    let found = false

    while (!pq.isEmpty()) {
        const curr = pq.remove()!

        if (curr.isEnd) {
            found = true
            break
        }

        curr.visited = true
        await new Promise((r) => setTimeout(r, 5))

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
            if (!n.visited && !hasWall(curr, n)) {
                pq.add(n)
                prev[`${n.x}-${n.y}`] = curr
            }
        }
    }

    if (!found) return

    const path: CellProps[] = []
    let curr: CellProps | null = matrix[matrix.length - 1][matrix[0].length - 1]

    while (curr) {
        path.push(curr)
        curr = prev[`${curr.x}-${curr.y}`] ?? null
    }

    path.reverse()

    for (const n of path) {
        await new Promise((r) => setTimeout(r, 5))

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

class PriorityQueue {
    private pq: CellProps[]

    constructor() {
        this.pq = []
    }

    isEmpty() {
        return this.pq.length === 0
    }

    add(n: CellProps) {
        this.pq.push(n)

        this.heapifyUp(this.pq.length - 1)
    }

    remove() {
        if (this.isEmpty()) return null

        this.swap(0, this.pq.length - 1)

        const res = this.pq.pop()

        this.heapifyDown(0)

        return res
    }

    peek() {
        if (this.isEmpty()) return null
        return this.pq[0]
    }

    toString() {
        let str = ''

        let i = 0

        while (i++ < this.pq.length) {
            str += this.pq[i].weight + ' '
        }

        return str
    }

    private heapifyUp(idx: number) {
        if (idx < 0) return

        const n = this.pq[idx]
        const parentIdx = this.getParentIdx(idx)

        if (parentIdx < 0) return

        const parent = this.pq[parentIdx]

        if (n.weight! < parent.weight!) {
            this.swap(parentIdx, idx)
            this.heapifyUp(parentIdx)
        }
    }

    private heapifyDown(idx: number) {
        if (idx >= this.pq.length || !this.hasLeftChild(idx)) return

        let smallerChildIdx = this.getLeftChildIdx(idx)
        const leftChild = this.getLeftChild(idx)

        if (
            this.hasRightChild(idx) &&
            this.getRightChild(idx).weight! < leftChild.weight!
        )
            smallerChildIdx = this.getRightChildIdx(idx)

        if (this.pq[idx] <= this.pq[smallerChildIdx]) return

        this.swap(idx, smallerChildIdx)
        this.heapifyDown(smallerChildIdx)
    }

    private hasLeftChild(parentIdx: number) {
        return this.getLeftChildIdx(parentIdx) < this.pq.length
    }

    private hasRightChild(parentIdx: number) {
        return this.getRightChildIdx(parentIdx) < this.pq.length
    }

    private swap(firstIdx: number, secondIdx: number) {
        const temp = this.pq[firstIdx]
        this.pq[firstIdx] = this.pq[secondIdx]
        this.pq[secondIdx] = temp
    }

    private getParentIdx(childIdx: number) {
        return Math.floor((childIdx - 1) / 2)
    }

    private getLeftChildIdx(parentIdx: number) {
        return 2 * parentIdx + 1
    }

    private getRightChildIdx(parentIdx: number) {
        return 2 * parentIdx + 2
    }

    private getLeftChild(parentIdx: number) {
        return this.pq[this.getLeftChildIdx(parentIdx)]
    }

    private getRightChild(parentIdx: number) {
        return this.pq[this.getRightChildIdx(parentIdx)]
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
