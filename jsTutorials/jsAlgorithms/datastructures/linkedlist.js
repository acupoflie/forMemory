

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

export default class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    isEmpty() {
        return this.size === 0
    }

    getSize() {
        return this.size
    }

    prepend(value) {
        const node = new Node(value)
        if(!this.isEmpty()) {
            node.next = this.head
        }
        this.head = node
        this.size++
    }

    //TODO - this method is linear time complexity
    //TODO - but it is possible to do constant with tail pointer
    append(value) {
        const node = new Node(value)
        if(this.isEmpty()) {
            this.head = node
        } else {
            let prev = this.head
            while(prev.next) {
                prev = prev.next
            }
            prev.next = node;
        }
        this.size++
    }

    insert(value, index) {
        if(index < 0 || index > this.size) {
            return
        }
        if(index === 0) {
            this.prepend(value)
        } else {
            const node = new Node(value)
            let prev = this.head
            for(let i = 0; i < index - 1; i++) {
                prev = prev.next
            }
            node.next = prev.next
            prev.next = node
            this.size++
        }
    }

    remove(index) {
        if(index < 0 || index >= this.size) {
            return null
        }
        let removeNode
        if(index === 0) {
            removeNode = this.head
            this.head = this.head.next
        } else {
            let prev = this.head
            for(let i = 0; i < index - 1; i++) {
                prev = prev.next
            }
            removeNode = prev.next
            prev.next = removeNode.next
        }
        this.size--
        return removeNode.value
    }

    removeValue(value) {
        if(this.isEmpty()) {
            return null
        }
        if(this.head.value === value) {
            this.head = this.head.next
            this.size--
            return value
        } else {
            let prev = this.head
            while(prev.next && prev.next.value !== value) {
                prev = prev.next
            }
            if(prev.next) {
                const removeNode = prev.next
                prev.next = removeNode.next
                this.size--
                return value
            }
            return null
        }
    }

    search(value) {
        if(this.isEmpty()) {
            return -1
        }
        let i = 0
        let curr = this.head
        while(curr) {
            if(curr.value === value) {
                return i
            }
            curr = curr.next
            i++
        }
        return -1
    }

    reverse() {
        let prev = null
        let curr = this.head
        while(curr) {
            let next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }
        this.head = prev
    }

    //! inserting and removing methods with tail pointer
    prependWithTail(value) {
        const node = new Node(value)
        if(this.isEmpty()) {
            this.head = node
            this.tail = node
        } else {
            node.next = this.head
            this.head = node
        }
        this.size++
    }

    appendWithTail(value) {
        const node = new Node(value)
        if(this.isEmpty()) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
        this.size++
    }

    removeFromFront() {
        if(this.isEmpty()) {
            return null
        }
        const value = this.head.value
        this.head = this.head.next
        this.size--
        return value
    }

    removeFromEnd() {
        if(this.isEmpty()) {
            return null
        }
        const value = this.tail.value
        if(this.size === 1) {
            this.head = null
            this.tail = null
        } else {
            let prev = this.head
            while(prev.next !== this.tail) {
                prev = prev.next
            }
            prev.next = null
            this.tail = prev
        }
        this.size--
        return value
    }

    print() {
        if(this.isEmpty()) {
            console.log('list is empty')            
        } else {
            let curr = this.head
            let values = ''
            while(curr) {
                values += `${curr.value} `
                curr = curr.next
            }
            console.log(values)
        }
    }
}
