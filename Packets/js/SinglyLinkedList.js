// Linked List  is a linear collection of 
// data elements, called nodes pointing to the next node 
// by means of a pointer. It produces a chain kind of structure

//A singly linked List contains 2 fields-> 1. item 2. pointer to next item 
SinglyLinkedList=function() {
	// The head node or starting node always points to null
	var head=null;
	// Adding an elemnt to the beginning of the list
	this.addFirst=function(item) {
		// temp is the temporary node which will be added
		// Snode craetes a node of the above structure
		var temp=new SNode(item);
		//temp->next should point to where the head was poiniting
		temp.next=head;
		// head points to the temp just now inserted
		head=temp;

	};
	//This adds a node to the last of the LL
	this.addLast=function(item) {
		// temp is the temporary node which will be added
		var temp=new SNode(item),
			//curr points to head
			curr=head;
		//Searching for the last node
		//In case of the last one its next points to null
		while(curr.next!==null){
			curr=curr.next;
		}	
		//curr gives us the position of the last node
		// hence curr->next should point to temp which
		// is actually the last node now
		curr.next=temp;
		temp.next=null;
	};
	// Add a node after a given element
	this.addAfter=function(after,item) {
		//curr points to head
		var curr=head,
		// temp is the temporary node which will be added
			temp=new SNode(item);
		// Searching for the node after which we want to insert
		while(curr.next!==null)
		{
			// When we find the node we were 
			// searching we break out of the loop
			if(curr.data===after)
				break;
			//moving to the next node
			curr=curr.next;
		}
		// temp-> next will now be pointing to where curr-> next was pointing
		temp.next=curr.next;
		// curr->next will now point to temp
		curr.next=temp;
	};
	// deletes the first element of the List
	this.deleteFirst = function() {
		// curr points to head
		var curr=head;
		// Checking list is not empty
		// ie there is something to delete
		if(!this.isEmptyList()) {

			//head will now point to curr->next
			head=curr.next;
			// deleting the curr node
			delete curr;
		}
		else {
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
			//In case of the last one its next points to null
			while(curr.next!==null)
			{
				prev=curr;
				curr=curr.next;
			}
			// prev is the last node now 
			prev.next=null;
			// deleting the curr node
			delete curr;
		}	
		else
			document.write(" Empty List ! Nothing to delete");
		
	};
	// delete a particular node of the list
	this.deleteNode = function(item) {
		// if list is not empty
		if(!this.isEmptyList()) {
			// curr points to head
			var curr=head,
			//prev is the node before the current
				prev=null;
			// Searching for the actual item
			while(curr.next!==null)
			{
				if(curr.data===item)
					break;
				prev=curr;
				curr=curr.next;
				
			}
			// upadting the pointers and making adjustments
			prev.next=curr.next;
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
		else { return false;
		}
	};
	// displays elemnts of the singly linked list
	this.display=function() {
		var curr=head;
		// while we reach the last elemnt
		while(curr !== null)
		{
			document.write(curr.data+" ");
			curr=curr.next;
		}
	}
};