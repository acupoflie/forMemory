

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    isEmpty() {
        return this.root === null
    }

    insert(value) {
        const node = new Node(value)
        if(this.isEmpty()) {
            this.root = node
        } else {
            this.insertNode(this.root, node)
        }
    }  

    insertNode(root, newNode) {
        if(newNode.value < root.value) {
            if(root.left === null) {
                root.left = newNode
            } else {
                this.insertNode(root.left, newNode)
            }
        } else {
            if(root.right === null) {
                root.right = newNode
            } else {
                this.insertNode(root.right, newNode)
            }
        }
    }

    search(root, value) {
        if(!root) {
            return false
        } else {
            if(root.value === value) {
                return true
            } else if (value < root.value) {
                return this.search(root.left, value)
            } else {
                return this.search(root.right, value)
            }
        }
    }

    //! DFS - Depth First Search algortihm
    preorder(root) {
        if(root) {
            console.log(root.value)
            this.preorder(root.left)
            this.preorder(root.right)
        }
    }

    inorder(root) {
        if(root) {
            this.inorder(root.left)
            console.log(root.value)
            this.inorder(root.right)
        }
    }

    postorder(root) {
        if(root) {
            this.postorder(root.left)
            this.postorder(root.right)
            console.log(root.value)
        }
    }

    //! BST - Breadth First Search algorithm
    levelOrder() {
        // Use optimised queue implementation!
        const queue = []
        queue.push(this.root)
        while(queue.length) {
            let curr = queue.shift()
            console.log(curr.value)
            if(curr.left) {
                queue.push(curr.left)
            }
            if(curr.right) {
                queue.push(curr.right)
            }
        }
    }


    min(root) {
        if(!root.left) {
            return root.value
        } else {
            return this.min(root.left)
        }
    }

    max(root) {
        if(!root.right) {
            return root.value
        } else {
            return this.max(root.right)
        }
    }
}

const bst = new BinarySearchTree()
console.log(bst.isEmpty())

bst.insert(10)
bst.insert(5)
bst.insert(15)
bst.insert(3)
bst.insert(7)

console.log(bst.search(bst.root, 10))
console.log(bst.search(bst.root, 5))
console.log(bst.search(bst.root, 15))
console.log(bst.search(bst.root, 20))

bst.levelOrder()

console.log(bst.min(bst.root))
console.log(bst.max(bst.root))