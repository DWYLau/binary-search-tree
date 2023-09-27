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
      let root = new Node(sorted[mid]);
      root.left = this.buildTree(left);
      root.right = this.buildTree(right);
      return root;
    }
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(root, value) {
    if (root == null) {
      root = new Node(value);
      return root;
    }
    if (value < root.value) {
      root.left = this.insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.insertNode(root.right, value);
    }
    return root;
  }
}

module.exports = Tree;
