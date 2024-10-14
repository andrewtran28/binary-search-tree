import { mergeSort } from "./modules/mergeSort.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.array = [];
        this.root = null;
    };

    buildTree(array) {
        let start = 0;
        let end = array.length - 1;
        this.root = this.createBST(array, start, end);
    }

    createBST(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(array[mid]);

        root.left = this.createBST(array, start, mid-1);
        root.right = this.createBST(array, mid + 1, end);

        return root;
    }

    insert(root, value) {
        if (root === null) {
            return new Node(value);
        }
        
        if (root.data === value) {
            return root;
        }

        if (value < root.data) {
            root.left = this.insert(root.left, value);
        } else if (value > root.data) {
            root.right = this.insert(root.right, value);
        }

        return root;
    }

    delete(root, value) {
        if (root === null) {
            return root;
        }

        if (root.data > value) {
            root.left = this.delete(root.left, value);
        } else if (root.data < value) {
            root.right = this.delete(root.right, value);
        } else {
            if (root.left === null) {
                return root.left;
            }
        
            if (root.right === null) {
                return root.right;
            }

            let successor = this.getSuccessor(root);
            root.data = successor.data;
            root.right = this.delete(root.right, successor.value);
        }

        return root;
    }

    getSuccessor(root) {
        let curr = root.right;
        while(curr && curr.left){
          curr = curr.left;
        }
        return curr;
    }

    find(root, value){
        if(root === null){
          return null;
        }else if(root.data == value){
          return root;
        }else if(root.data > value){
          return this.find(root.left,value)
        }else if(root.data < value){
          return this.find(root.right,value)
        }
        return root;
      }

    levelOrder(callback) {
        if (callback === null) {
            throw new Error("Callback function is required.");
        }

        const queue = [];
        queue.push(this.root);

        while (queue.length) {
            const currentNode = queue.shift();

            if (currentNode) {
                callback(currentNode);

                if(currentNode.left) {
                    queue.push(currentNode.left);
                }

                if(currentNode.right) {
                    queue.push(currentNode.right);
                }
            }
        }
    }

    inOrder(callback) {
        if (callback === null) {
            throw new Error("Callback function is required.");
        }

        let currentNode = this.root;
        const stack = [];

        while(stack.length || currentNode) {
            while(currentNode) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            }
            currentNode = stack.pop();
            callback(currentNode);

            currentNode = currentNode.right;
        }
    }

    preOrder(callback) {
        if (callback === null) {
            throw new Error("Callback function is required.");
        }

        let currentNode = this.root;
        const stack = [];

        while(stack.length || currentNode) {
            if(currentNode) {
                callback(currentNode);
                stack.push(currentNode);
                currentNode = currentNode.left;
            } else {
                currentNode = stack.pop();
                currentNode = currentNode.right;
            }
        }
    }

    postOrder(callback) {
        if (callback === null) {
            throw new Error("Callback function is required.");
        }

        let currentNode = this.root;
        const stack = [];
        const queue = [];

        while (stack.length || currentNode) {
            if (currentNode) {
                stack.push(currentNode);
                queue.push(currentNode);
                currentNode = currentNode.right;
            } else {
                currentNode = stack.pop();
                currentNode = currentNode.left;
            }
        }

        while(queue.length) {
            callback(queue.pop());
        }
    }

    height(node) {
        if (node === null) {
            return null;
        }

        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
    
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        let currentNode = this.root;
        let depth = 0;

        while(currentNode) {
            if (node.data < currentNode.data) {
                currentNode = currentNode.left;
                depth++;
            } else if (node.data > currentNode.data) {
                currentNode = currentNode.right;
                depth++;
            } else {
                return depth;
            }
        }
        return null;
    }

    isBalanced(node) {
        if (node === null) {
            return true;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        if((Math.abs(leftHeight-rightHeight) <= 1) && (this.isBalanced(node.left) == true) && (this.isBalanced(node.right) == true) ){
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        const array = [];
        this.inOrder(node => {
            array.push(node.data)
        });
        
        this.buildTree(array);
    }

    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

const processArr = (function () {
    const sort = (array) => {
        let processedArray = removeDuplicates(mergeSort(array));
        return processedArray;
    }

    const removeDuplicates = (array) => {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === array [i-1]) {
                array.splice(i, 1);
            }
        }
        return array;
    }

    return { sort };
})();

export { Tree, processArr };
