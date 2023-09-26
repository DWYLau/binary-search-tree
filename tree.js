const Node = require("./node.js");

class Tree {
  constructor(array) {
    const uniqueArray = [...new Set(array)];
    const sortedArray = uniqueArray.sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sorted) {
    if (sorted.length === 0) {
      return null;
    } else {
      let mid = Math.floor(sorted.length / 2);
      let left = sorted.slice(0, mid);
      let right = sorted.slice(mid + 1);
      let rootNode = new Node(sorted[mid]);
      rootNode.left = this.buildTree(left);
      rootNode.right = this.buildTree(right);
      return rootNode;
    }
  }
}

module.exports = Tree;
