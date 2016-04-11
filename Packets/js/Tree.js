//a Tree is a widely used abstract data type (ADT)—or data structure 
//implementing this ADT—that simulates a hierarchical tree structure, 
// with a root value and subtrees of children with a parent node, 
//represented as a set of linked nodes.

// As a Tree datastructure has no restriction on the number of children it has
// it can be implemented with an array
 Packets.Tree = function() {
	var treeArr=[];
	// this inserts a node into the tree
	// insertion happens from left to right
	this.insertNode = function(item) {
	treeArr.push(item);
	};
	// This returns the root of the tree
	this.getRoot = function() {
		return treeArr[0];
	};
	// This is used to display the entire tree from left to right
	this.displayTree = function() {
    for(var i=0;i<treeArr.length;i++)
      document.write(treeArr[i]+" -- ");
  };
};
