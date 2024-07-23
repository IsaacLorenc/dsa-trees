/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    // If the tree is empty, return 0.
    if (!this.root) return 0;

    // Define a helper function that recursively calculates the minimum depth
    // of a subtree rooted at a given node.
    function minDepthHelper(node) {
      // If the node is a leaf (has no children), return 1.
      if (node.left === null && node.right === null) return 1;

      // If the node has only a left child, recurse on the right child and add 1.
      if (node.left === null) return minDepthHelper(node.right) + 1;

      // If the node has only a right child, recurse on the left child and add 1.
      if (node.right === null) return minDepthHelper(node.left) + 1;

      // If the node has both children, find the minimum depth of the left and right
      // subtrees and return the minimum of the two plus 1.
      return (
        Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
      );
    }

    // Recurse on the root node and return the minimum depth.
    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    // If the tree is empty, return 0.
    if (!this.root) return 0;

    // Define a helper function that recursively calculates the maximum depth
    // of a subtree rooted at a given node.
    function maxDepthHelper(node) {
      // If the node is a leaf (has no children), return 1.
      if (node.left === null && node.right === null) return 1;

      // If the node has only a left child, recurse on the right child and add 1.
      if (node.left === null) return maxDepthHelper(node.right) + 1;

      // If the node has only a right child, recurse on the left child and add 1.
      if (node.right === null) return maxDepthHelper(node.left) + 1;

      // If the node has both children, find the maximum depth of the left and right
      // subtrees and return the maximum of the two plus 1.
      return (
        Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
      );
    }

    // Recurse on the root node using the helper function and return the maximum depth.
    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      // If the node is null, return 0.
      if (node === null) return 0;

      // Calculate the maximum sum of the left and right subtrees and add them to the value of the current node.
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      const currentSum = node.val + leftSum + rightSum;

      // Update the maximum sum we've seen so far.
      result = Math.max(result, currentSum);

      // Return the maximum sum we can obtain by visiting the current node and either the left or right subtree.
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    // If the tree is empty, return null.
    if (!this.root) return null;

    // Create an empty queue to hold the nodes that we need to visit.
    let queue = [this.root];

    // Initialize a variable to keep track of the closest value found so far.
    // Start with null because we haven't found any values yet.
    let closest = null;

    // While there are nodes in the queue, visit the next node.
    while (queue.length) {
      // Get the next node from the queue.
      let currentNode = queue.shift();

      // Get the value of the current node.
      let currentVal = currentNode.val;

      // Check if the current value is greater than the lower bound.
      let higherThanLowerBound = currentVal > lowerBound;

      // Check if the current value is smaller than the closest value found so far.
      // Or if we haven't found any value yet (closest is null).
      let shouldReassignClosest = currentVal < closest || closest === null;

      // If the current value is greater than the lower bound and it's either the
      // first value we've found or it's smaller than the closest value found so far,
      // update the closest value.
      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      // If the current node has a left child, add it to the queue.
      if (currentNode.left) queue.push(currentNode.left);

      // If the current node has a right child, add it to the queue.
      if (currentNode.right) queue.push(currentNode.right);
    }

    // Return the closest value found in the tree.
    return closest;
  }


  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

areCousins(node1, node2) {
    // If either node is the root node, they cannot be cousins
    if (node1 === this.root || node2 === this.root) return false;

    // Helper function to find the level of a given node and its parent in the tree
    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      // If we already found the parent, return the data
      if (data.parent) return data;

      // If the current node's child matches the node we are looking for
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        // Update the level and parent data
        data.level = level + 1;
        data.parent = currentNode;
      }

      // Recursively search for the node in the left subtree
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }

      // Recursively search for the node in the right subtree
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }

      return data;
    }

    // Find the level and parent information for node1 and node2
    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    // Check if the nodes are at the same level and have different parents
    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;

      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
