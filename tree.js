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

  find(value) {
    return this.findNode(this.root, value);
  }

  findNode(node, value) {
    if (node === null) return node;
    if (node.value === value) {
      return node;
    } else if (node.value > value) {
      return this.findNode(node.left, value);
    } else {
      return this.findNode(node.right, value);
    }
  }

  levelOrder(callback, traversal = []) {
    let node = this.root;
    if (node === null) return node;
    let queue = [];
    queue.push(node);
    while (queue.length) {
      let currentNode = queue[0];
      traversal.push(currentNode.value);
      if (currentNode.left != null) queue.push(currentNode.left);
      if (currentNode.right != null) queue.push(currentNode.right);
      queue.shift();
    }
    if (callback) return callback;

    return traversal;
  }

  preorder(callback, traversal = []) {
    let node = this.root;
    if (node === null) return node;
    const stack = [node];
    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode.right != null) stack.push(currentNode.right);
      if (currentNode.left != null) stack.push(currentNode.left);
      if (callback) callback(currentNode);
      traversal.push(currentNode.value);
    }
    if (callback) return callback;
    return traversal;
  }

  postorder(callback, traversal = []) {
    let node = this.root;
    if (node === null) return node;
    const stack = [node];
    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode.left != null) stack.push(currentNode.left);
      if (currentNode.right != null) stack.push(currentNode.right);
      if (callback) callback(currentNode);
      traversal.push(currentNode.value);
    }
    if (callback) return callback;
    return traversal.reverse();
  }

  inorder(callback, traversal = []) {
    let node = this.root;
    if (node === null) return node;
    const stack = [];
    while (node !== null || stack.length > 0) {
      if (node !== null) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop();
        if (callback) return callback;
        traversal.push(node.value);
        node = node.right;
      }
    }
    if (callback) return callback;
    return traversal;
  }

  height(value) {
    return this.findNodeHeight(this.root, value);
  }

  findNodeHeight(node, value) {
    if (node === null) return node;
    let height = -1;
    let level = 0;
    const queue = [node];
    while (queue.length > 0) {
      const nodes = queue.length; // number of nodes at current level
      for (let i = 0; i < nodes; i++) {
        const current = queue.shift();
        if (current.value === value) height = level;
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
      }
      level++;
    }
    height = level - height - 1;
    return height;
  }

  depth(value) {
    return this.findNodeDepth(this.root, value);
  }

  findNodeDepth(node, value) {
    if (node === null) return node;
    let depth = -1;
    let level = 0;
    const queue = [node];
    while (queue.length > 0) {
      const nodes = queue.length; // number of nodes at current level
      for (let i = 0; i < nodes; i++) {
        const current = queue.shift();
        if (current.value === value) depth = level;
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
      }
      level++;
    }
    return depth;
  }

  isBalanced(root = this.root) {
    return this.checkBalance(root);
  }

  findHeightRec(node) {
    if (node === null) return -1;
    const leftHeight = this.findHeightRec(node.left);
    const rightHeight = this.findHeightRec(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  checkBalance(node) {
    if (node === null) return true;
    const leftHeight = this.findHeightRec(node.left);
    const rightHeight = this.findHeightRec(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.checkBalance(node.left) && this.checkBalance(node.right);
  }

  rebalance() {
    const array = this.inorder();
    const uniqueArray = [...new Set(array)];
    const sortedArray = uniqueArray.sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
    return this.root;
  }
}

module.exports = Tree;
