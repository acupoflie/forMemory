
// class Queue {
//     constructor() {
//         this.items = []
//     }

//     enqueue(el) {
//         this.items.push(el)
//     }

//     dequeue() {
//         return this.items.shift()
//     }

//     isEmpty() {
//         return this.items.length === 0
//     }

//     peek() {
//         if(!this.isEmpty()) {
//             return this.items[0]
//         }
//         return null
//     }

//     size() {
//         return this.items.length
//     }

//     print() {
//         console.log(this.items.toString())
//     }
// }


//! OPTIMISED QUEUE

class Queue {
    constructor() {
        this.items = {}
        this.rear = 0
        this.front = 0
    }
    enqueue(el) {
        this.items[this.rear] = el;
        this.rear++
    }

    dequeue() {
        const item = this.items[this.front]
        delete this.items[this.front]
        this.front++
        return item
    }

    isEmpty() {
        return this.rear - this.front === 0
    }

    peek() {
        return this.items[this.front]
    }

    size() {
        return this.rear - this.front
    }

    print() {
        console.log(this.items)
    }
}

const que = new Queue()
console.log(que.isEmpty())

que.enqueue(10)
que.enqueue(20)
que.enqueue(30)
console.log(que.size())
que.print()

console.log(que.dequeue())
que.print()
que.enqueue(10)
que.print()