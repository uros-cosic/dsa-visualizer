import { solve as solveBfs } from './bfs'
import { solve as solveDfs } from './dfs'
import { solve as solveDijkstras } from './dijkstras'
import { solve as solveBellmanFord } from './bellman-ford'
import { solve as solveInsertionSort } from './insertion-sort'
import { solve as solveSelectionSort } from './selection-sort'
import { solve as solveQuickSort } from './quick-sort'
import { solve as solveMergeSort } from './merge-sort'

export const algortihms = {
    'path-finder': [
        {
            name: 'Breadth-First Search',
            description:
                'Breadth-First Search (BFS) is a graph traversal algorithm that explores nodes level by level, ensuring the shortest path in an unweighted graph. It uses a queue to visit each node’s neighbors before moving to the next level.',
            fn: solveBfs,
        },
        {
            name: 'Depth-First Search',
            description:
                'Depth-First Search (DFS) is a graph traversal algorithm that explores paths as deeply as possible before backtracking. It uses a stack (explicitly or via recursion) to visit nodes, making it efficient for maze solving, topological sorting, and cycle detection. However, unlike BFS, it doesn’t guarantee the shortest path in an unweighted graph.',
            fn: solveDfs,
        },
        {
            name: "Dijkstra's",
            description:
                "Dijkstra's algorithm is a shortest path finding algorithm that works on weighted graphs. It uses a priority queue to explore the shortest known path to each node, ensuring the optimal route from a starting point to all other nodes. It guarantees the shortest path in graphs with non-negative weights.",
            supportsWeights: true,
            supportsNegativeWeights: false,
            fn: solveDijkstras,
        },
        {
            name: 'Bellman-Ford',
            description:
                'Bellman-Ford is used to find the shortest paths from a single source to all other nodes in a weighted graph, even when negative weights are present.',
            supportsWeights: true,
            supportsNegativeWeights: true,
            fn: solveBellmanFord,
        },
    ],
    sort: [
        {
            name: 'Insertion sort',
            description:
                'Insertion Sort is a simple, comparison-based sorting algorithm that builds a sorted array one element at a time by inserting each element into its correct position',
            fn: solveInsertionSort,
        },
        {
            name: 'Selection sort',
            description:
                'Selection Sort is a simple comparison-based sorting algorithm that repeatedly selects the smallest (or largest) element from the unsorted portion and swaps it with the first unsorted element',
            fn: solveSelectionSort,
        },
        {
            name: 'Quick Sort',
            description:
                'Quick Sort is a divide-and-conquer sorting algorithm that selects a pivot, partitions the array into elements less than and greater than the pivot, and recursively sorts the partitions',
            fn: solveQuickSort,
        },
        {
            name: 'Merge Sort',
            description:
                'Merge Sort is a divide-and-conquer sorting algorithm that recursively splits an array into smaller subarrays, sorts them, and then merges them back together',
            fn: solveMergeSort,
        },
    ],
} as const
