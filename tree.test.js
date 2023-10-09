const Tree = require("./tree.js");

describe("#buildTree", () => {
  test("root returns null if tree class initialise with no arguments", () => {
    const tree = new Tree();

    expect(tree.root).toBe(null);
  });

  test("initialise tree class with array of values", () => {
    const tree = new Tree([3, 1, 2, 4]);

    expect(tree.root.value).toBe(3);
    expect(tree.root.left.value).toBe(2);
    expect(tree.root.right.value).toBe(4);
  });

  test("initialise tree class with no duplicate values", () => {
    const tree = new Tree([3, 1, 2, 4, 4, 4]);

    expect(tree.root.value).toBe(3);
    expect(tree.root.left.value).toBe(2);
    expect(tree.root.right.value).toBe(4);
  });
});

describe("#insert", () => {
  test("can insert new value into existing tree", () => {
    let tree = new Tree([3, 1, 2, 4]);
    tree.insert(5);

    expect(tree.root.right.right.value).toBe(5);
  });

  test("can insert new value into null tree", () => {
    let tree = new Tree();
    tree.insert(4);

    expect(tree.root.value).toBe(4);
  });

  test("values greater than root value go to right subtree", () => {
    let tree = new Tree();
    tree.insert(4);
    tree.insert(3);
    tree.insert(2);
    tree.insert(5);

    expect(tree.root.right.value).toBe(5);
  });

  test("values lower than root value go to left subtree", () => {
    let tree = new Tree();
    tree.insert(4);
    tree.insert(3);
    tree.insert(2);
    tree.insert(5);

    expect(tree.root.left.value).toBe(3);
    expect(tree.root.left.left.value).toBe(2);
  });
});

describe("#delete", () => {
  test("delete leaf nodes - nodes with no children", () => {
    let tree = new Tree([3, 1, 2, 4]);
    tree.delete(1);

    expect(tree.root.left.left).toBe(null);
  });

  test("delete nodes with single child", () => {
    let tree = new Tree([3, 1, 2, 4]);
    tree.delete(2);

    expect(tree.root.left.value).toBe(1);
  });

  test("delete nodes with two children", () => {
    let tree = new Tree([3, 1, 2, 4]);
    tree.delete(3);

    expect(tree.root.value).toBe(4);
  });
});

describe("#find", () => {
  test("returns null if root node is null", () => {
    let tree = new Tree();

    expect(tree.find()).toBe(null);
  });

  test("returns node object if value is equal to node value", () => {
    let tree = new Tree([3, 1, 2, 4]);

    expect(typeof tree.find(3)).toBe("object");
    expect(typeof tree.find(1)).toBe("object");
  });

  describe("#height", () => {
    test("returns 0 if node is leaf node", () => {
      let tree = new Tree([3, 1, 2, 4, 6, 5]);

      expect(tree.height(1)).toBe(0);
      expect(tree.height(3)).toBe(0);
      expect(tree.height(5)).toBe(0);
    });

    test("returns height value if node is higher than leaf node", () => {
      let tree = new Tree([3, 1, 2, 4, 6, 5]);

      expect(tree.height(4)).toBe(2);
      expect(tree.height(2)).toBe(1);
      expect(tree.height(6)).toBe(1);
    });
  });

  describe("#depth", () => {
    test("returns 0 if node is root node", () => {
      let tree = new Tree([3, 1, 2, 4, 6, 5]);

      expect(tree.depth(4)).toBe(0);
    });

    test("returns depth value if node is lower than root node", () => {
      let tree = new Tree([3, 1, 2, 4, 6, 5]);

      expect(tree.depth(2)).toBe(1);
      expect(tree.depth(6)).toBe(1);
      expect(tree.depth(1)).toBe(2);
      expect(tree.depth(3)).toBe(2);
      expect(tree.depth(5)).toBe(2);
    });
  });

  describe("#isBalanced", () => {
    test("returns true if tree is balanced - height difference of 0", () => {
      let tree = new Tree([3, 1, 2, 4, 6, 5]);

      expect(tree.isBalanced()).toBe(true);
    });

    test("returns true if tree is balanced - height difference of 1", () => {
      let tree = new Tree([3, 1, 2, 4, 6]);

      expect(tree.isBalanced()).toBe(true);
    });

    test("returns false if tree is unbalanced - height difference of 2", () => {
      let tree = new Tree();
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);

      expect(tree.isBalanced()).toBe(false);
    });
  });

  describe("#rebalance", () => {
    test("returns balanced tree if tree is unbalanced", () => {
      let tree = new Tree();
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      tree.rebalance();

      expect(tree.root.value).toBe(3);
    });

    test("removes duplicate values", () => {
      let tree = new Tree();
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      tree.insert(4);
      tree.rebalance();

      expect(tree.root.value).toBe(3);
    });
  });
});
