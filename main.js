import { Tree, processArr } from "./bst.js";

function randomNum100() {
    let array = new Array(Math.floor(Math.random()*10) + 3);        //Create empty array with 3-12 elements

    for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random()*100);      //Set element to a number between 1-99
    }

    return array;
}

let tree = new Tree();
let randomArr = randomNum100();
let testArr = processArr.sort(randomArr);
tree.buildTree(testArr);
tree.prettyPrint(tree.root);
console.log("Balanced tree? " + tree.isBalanced(tree.root));

let inOrder = [];
tree.inOrder(node => inOrder.push(node.data));
console.log("inOrder Array: " + inOrder);

let preOrder = [];
tree.preOrder(node => preOrder.push(node.data));
console.log("preOrder Array: " + preOrder);

let postOrder = [];
tree.postOrder(node => postOrder.push(node.data));
console.log("postOrder Array: " + postOrder);

const unbalancedNumbers = [101, 102, 103, 104, 105];
unbalancedNumbers.forEach(num => tree.insert(tree.root, num));
tree.prettyPrint(tree.root);
console.log("Balanced after adding >100 numbers? " + tree.isBalanced(tree.root));
tree.rebalance();
tree.prettyPrint(tree.root);
console.log("Balanced after re-balancing? " + tree.isBalanced(tree.root));

tree.inOrder(node => inOrder.push(node.data));
console.log("inOrder Array: " + inOrder);

tree.preOrder(node => preOrder.push(node.data));
console.log("preOrder Array: " + preOrder);

tree.postOrder(node => postOrder.push(node.data));
console.log("postOrder Array: " + postOrder);