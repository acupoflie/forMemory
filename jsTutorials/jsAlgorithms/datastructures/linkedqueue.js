
import LinkedList from "./linkedlist.js";

class LinkedQueue {
    constructor() {
        this.list = new LinkedList()
    }

    enqueue(value) {
        this.list.append(value)
    }

    dequeue() {
        return this.list.removeFromFront()
    }

    peek() {
        return this.list.head.value
    }

    isEmpty() {
        return this.list.isEmpty()
    }

    getSize() {
        return this.list.getSize()
    }

    print() {
        return this.list.print()
    }
}

const queue = new LinkedQueue()
console.log(queue.isEmpty())

queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

console.log(queue.getSize())
queue.print()

console.log(queue.dequeue())
console.log(queue.peek())