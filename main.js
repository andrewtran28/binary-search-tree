import { mergeSort } from "./modules/mergeSort.js";

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(root) {
        this.root = root;
    }

    buildTree(array) {
        let dataArray = this.processData(array);
        const tree = new Tree(rootNode);
    }

    removeDuplicate(array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === array [i-1]) {
                array.splice(i, 1);
            }
        }
        return array;
    }

    processData(array) {
        sortedArray = mergeSort(array);
        return this.removeDuplicate(sortedArray);
    }
}


let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
console.log(mergeSort(testArray));
