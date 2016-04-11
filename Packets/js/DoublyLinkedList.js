//  a Doubly linked list is a linked data structure that consists of a 
// set of sequentially linked records called nodes.
// Each node contains two fields, called links, that are references 
//to the previous and to the next node in the sequence of nodes.
//A doubly linked List contains 3 fields-> 1. item 2. pointer to next item (right)
// 3. a pointer to the previous elemnt(left)
DoublyLinkedList = function() {
	// The head node or starting node always points to null
		var head=null;
	// Adding an elemnt to the beginning of the list	
	this.addFirst=function(item) {
		// temp is the temporary node which will be added
		// Dnode creates a node of the DLL structure
		var temp=new DNode(item);
		//temp->right should point to where the head was poiniting
		temp.right=head;
		//Left of the starting node points to null
		temp.left=null;
		// head points to the temp just now inserted
		head=temp;
		
	};
	//This adds a node to the last of the DLL
	this.addLast=function(item) {
		// creating a temporary node 
		var temp=new DNode(item),
		// curr points to head
			curr=head;
			//Searching for the last node
		//In case of the last one its right points to null
		while(curr.right !== null)
		{
			curr=curr.right;
		}
		//curr gives us the position of the last node
		//As temp is the last node its left pts to curr
		// and curr->right should point to temp which
		// is actually the last node now
		temp.left=curr;	curr.right=temp;
		temp.right=null;
	};
	// Add a node after a given element
	this.addAfter=function(after,item) {
		//curr points to head
		var curr=head,
		// temp is the temporary node which will be added
			temp=new DNode(item);
		// Searching for the node after which we want to insert
		while(curr.right !==null)
		{
			// When we find the node we were 
			// searching we break out of the loop
			if(curr.data === after)
				break;
			//moving to the next node
			curr=curr.right;
		}
		//As temp is the searched node its left pts to curr
		temp.left=curr;
		// temp-> right will now be pointing to where curr-> right was pointing
		temp.right=curr.right;
		// curr->right will now point to temp
		curr.right=temp;
		
	};
	// deletes the first element of the List
	this.deleteFirst = function() {
		// Checking list is not empty
		// ie there is something to delete
		if(!this.isEmptyList()) {

			var curr=head;
			//head will now point to curr->next
			head=curr.right;
			// deleting the curr node
			delete curr;
		}
		else
		{
			document.write(" Empty List : Nothing to delete");
		}
	};
	// This function deletes the last element of The list
	this.deleteLast = function() {
		// if list is not empty
		if(!this.isEmptyList()) {
			var curr=head,
			//prev is the node before the current
				prev=null;
			//Searching for the last node
			//In case of the last one its right points to null
			while(curr.right !== null)
			{
				prev=curr;
				curr=curr.right;
			}
			// prev is the last node now.
			// hence its rt=null
			prev.right=null;
			// deleting the curr node
			delete curr;
		}	
		else
			document.write(" Empty List ! Nothing to delete");
		
	};
	// delete a particular node of the list
	this.deleteNode = function(item) {
		var curr,
			prev;
		// if list is not empty
		if(!this.isEmptyList()) {
			// curr points to head
			curr=head;
			//prev is the node before the current
			prev=null;
			// Searching for the actual item
			while(curr.right !== null)
			{
				// When we find the node we were 
				// searching we break out of the loop
				if(curr.data===item)
					break;
				//prev is the node before the current
				prev=curr;
				// moving to the next node
				curr=curr.right;
				
			}
			// upadting the pointers and making adjustments
			prev.right=curr.right;
			curr.right.left=prev;
			// deleting the curr node
			delete curr;
		}
		else
			document.write(" Empty List ! Nothing to delete");

	};
	// check if list is empty or not
	this.isEmptyList = function() {
		// if head points to null
		// then there is nothing in the list
		if(head === null)
			return true;
		else return false;
	};
	// displays elemnts of the Doubly linked list
	this.display=function() {
		var curr=head;
		// while we reach the last elemnt
		while(curr !== null)
		{
			document.write(curr.data+" ");
			curr=curr.right;
		}
	}
};