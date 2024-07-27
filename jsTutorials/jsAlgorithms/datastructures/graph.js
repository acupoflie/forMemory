
//! Adjacency matrix graph
const matrix = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
]
// console.log(matrix[0][1])

//! Adjacency list graph (better efficient)
adjacencyList = {
    'A': ['B'],
    'B': ['A', 'C'],
    'C': ['B']
}
// console.log(adjacencyList['B'])


class Graph {
    constructor() {
        this.adlist = {}
    }

    addVertex(vertex) {
        if(!this.adlist[vertex]) {
            this.adlist[vertex] = new Set()
        }
    }

    addEdge(v1, v2) {
        if(!this.adlist[v1]) {
            this.addVertex(v1)
        }
        if(!this.adlist[v2]) {
            this.addVertex(v2)
        }
        this.adlist[v1].add(v2)
        this.adlist[v2].add(v1)
    }

    removeEdge(v1, v2) {
        this.adlist[v1].delete(v2)
        this.adlist[v2].delete(v1)
    }

    removeVertex(vertex) {
        if(!this.adlist[vertex]) {
            return
        }
        for(let adVer of this.adlist[vertex]) {
            this.removeEdge(vertex, adVer)
        }
        delete this.adlist[vertex]
    }

    display() {
        for(let vertex in this.adlist) {
            console.log(vertex + ' -> ' + [...this.adlist[vertex]])
        }
    }
    
    hasEdge(v1, v2) {
        return (
            this.adlist[v1].has(v2) &&
            this.adlist[v2].has(v1)
        )
    }
}

const graph = new Graph()

graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')

graph.addEdge('A', 'B')
graph.addEdge('B', 'C')

graph.display()
console.log(graph.hasEdge('A', 'B'))

graph.removeVertex('A')
graph.display()
