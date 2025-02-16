import { solve as solveBfs } from './bfs'
import { solve as solveDfs } from './dfs'
import { solve as solveDijkstras } from './dijkstras'

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
    ],
    sort: [],
} as const
