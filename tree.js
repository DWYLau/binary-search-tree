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

  insertNode(node, value) {
    if (node == null) {
      node = new Node(value);
      return node;
    }
    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }
    return node;
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node == null) {
      return node;
    }

    // find node to be deleted via recursion
    if (node.value > value) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (node.value < value) {
      node.right = this.deleteNode(node.right, value);
      return node;
    }

    // delete leaf nodes (nodes with no children)
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }

    // delete nodes with a single child
    if (node.left === null) {
      node = node.right;
      return node;
    } else if (node.right === null) {
      node = node.left;
      return node;
    }

    // delete nodes with two children
    let succ = this.findSucc(node.right);
    node.value = succ.value;
    node.right = this.deleteNode(node.right, succ.value);
    return node;
  }

  findSucc(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findSucc(node.left);
    }
  }
}

let tree = new Tree();
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);

module.exports = Tree;
