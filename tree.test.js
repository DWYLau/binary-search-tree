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
});
