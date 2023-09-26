const Node = require("./node.js");

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  sortArray(array) {
    const sortedArray = array.sort((a, b) => a - b);
    return sortedArray;
  }

  uniqueArray(array) {
    const uniqueArray = new Set(array);
    return uniqueArray;
  }

  buildTree(array) {}
}

module.exports = Tree;
