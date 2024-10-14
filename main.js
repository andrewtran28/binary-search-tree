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
        return this.prettyPrint (this.root);
    }

    createBST(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(array[mid]);

        root.left = this.createBST(array, start, mid-1);
        root.right = this.createBST(array, mid + 1, end);

        this.prettyPrint(root);
        return root;
    }

    insert(root, key) {
        if (root === null) {
            return new Node(key);
        }
        
        if (root.data === key) {
            return root;
        }

        if (key < root.data) {
            root.left = this.insert(root.left, key);
        } else if (key > root.data) {
            root.right = this.insert(root.right, key);
        }

        return root;
    }

    delete(root, key) {
        if (root === null) {
            return root;
        }

        if (root.data > key) {
            root.left = this.delete(root.left, key);
        } else if (root.data < key) {
            root.right = this.delete(root.right, key);
        } else {
            if (root.left === null) {
                return root.left;
            }
        
            if (root.right === null) {
                return root.right;
            }

            let successor = this.getSuccessor(root);
            root.data = successor.data;
            root.right = this.delete(root.right, successor.key);
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

    preOrder(root) {
        if (root === null) return;
        console.log(root.data);
        this.preOrder(root.left);
        this.preOrder(root.right);
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

    inOrder(root) {
        if (root !== null) {
            inOrder(root.left);
            console.log(root.key + " ");
            inOrder(root.right);
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

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree();
let arr = processArr.sort(testArray);
console.log(arr);

tree.buildTree(arr);
tree.insert(tree.root, 12);
tree.prettyPrint(tree.root);
tree.delete(tree.root, 12);
tree.prettyPrint(tree.root);
// tree.prettyPrint(tree.root);
// tree.buildTree(arr);
// console.log(tree.array);
