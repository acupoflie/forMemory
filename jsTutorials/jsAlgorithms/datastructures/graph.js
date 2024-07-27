
//! Adjacency matrix graph
const matrix = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
]

console.log(matrix[0][1])

//! Adjacency list graph (better efficient)

adjacencyList = {
    'A': ['B'],
    'B': ['A', 'C'],
    'C': ['B']
}

console.log(adjacencyList['B'])