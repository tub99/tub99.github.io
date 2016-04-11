// This class contains nodes for different dataStructures

// This node is for a singlyLinkedList
SNode=function(item) {
	//It contains two fiels data(ie the item/value
	// passed as parameter) and next
	this.data=item;
	//next is initialized to null
	this.next=null;
};
// This node is for a Doubly LinkedList
DNode = function (item) {
	// It contains 3 fiels data(ie the item/value
	// passed as parameter), left and right
	this.data = item;
	// right and left are pointers which are initialized to null
	this.right = null;
	this.left = null;
};
// This node is for a Binary search Tree
TNode = function (item) {
	//It contains 3 fiels data(ie the item/value passed as parameter), 
	//left and right
	this.data = item;
	// right and left are pointersof the TreeNode
	// which are initialized to null
	this.right = null;
	this.left = null;
};