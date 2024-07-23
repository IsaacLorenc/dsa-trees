/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

sumValues() {
    // Check if the tree is empty
    if (!this.root) return 0;
    
    // Initialize the sum with the root value
    let sum = this.root.val;

    // Helper function to recursively sum values starting from a node
    function sumHelper(node) {
      
      // Iterate through all children of the current node
      for (let child of node.children) {
        // Add the value of each child to the sum
        sum += child.val;

        // If the child has children, recursively call sumHelper on that child
        if (child.children.length > 0) {
          sumHelper(child);
        }
      }
    }

    // Start summing values from the root node
    sumHelper(this.root);
    
    // Return the total sum of all node values
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

    countEvens() {
      if (!this.root) return 0;
  
      let count = this.root.val % 2 === 0 ? 1 : 0;
  
      function countEvensHelper(node) {
        // go through all the children for a Node
        for (let child of node.children) {
          // count the child if the value is even
          if (child.val % 2 === 0) count++;
          // if it has any children
          if (child.children.length > 0) {
            // recurse with the child as the root
            countEvensHelper(child);
          }
        }
      }
  
      countEvensHelper(this.root);
      return count;
    }
  

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = this.root.val > lowerBound ? 1 : 0;

    function countEvensHelper(node) {
      // go through all the children for a Node
      for (let child of node.children) {
        // count the child if the value is greater than lowerBound
        if (child.val > lowerBound) count++;
        // if it has any children
        if (child.children.length > 0) {
          // recurse with the child as the root
          countEvensHelper(child);
        }
      }
    }

    countEvensHelper(this.root);
    return count; 
  }

}

module.exports = { Tree, TreeNode };
