import { mergeSort } from "./modules/mergeSort.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    initialBuildTree(array) {
        let start = 0;
        let end = array.length - 1;
        return this.buildTree(array, start, end);
    }

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid-1);
        root.right = this.buildTree(array, mid + 1, end);

        this.prettyPrint(root);

        return root;
    }

    removeDuplicates(array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === array [i-1]) {
                array.splice(i, 1);
            }
        }
        return array;
    }

    processData(array) {
        let processedArray = this.removeDuplicates(mergeSort(array));
        return processedArray;
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

    insert(root, value) {
        if (root === null) {
            return new Node (value);
        }

        if (root.value === value) {
            return root;
        }

        if (value < root.value) {
            root.left = insert(root.left, value);
        } else if (value > root.value) {
            root.right = insert(root.right, value);
        }

        return root;
    }

    inOrder(root) {
        if (root !== null) {
            inOrder(root.left);
            console.log(root.key + " ");
            inOrder(root.right);
        }
    }
}


let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


let test = new Tree();
test.insert(12);
let data = test.processData(testArray);
console.log(data);
test.initialBuildTree(data);