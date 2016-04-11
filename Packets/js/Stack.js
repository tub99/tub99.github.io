// A Stack is an abstract data type that serves as a 
// collection of elements, with two principal operations: push,
// which adds an element to the collection, and pop, which removes 
// the most recently added element that was not yet removed.
// The order in which elements come off a stack gives rise 
// to its alternative name, LIFO (for last in, first out).
// Additionally, a peek operation may give access to the top without 
// modifying the stack. Its a LIFO data structure

// To create a stack datastructure user should pass the size of the 
// Stack throught the constructor function
Packets.Stack = function(capacity) {
	// the push and pop operations occur only 
	//at one end of the structure, referred to as the top of the stack.
	var  top=-1,
	// default size is 5
		size=capacity || 5,
	// info is the linear structure where elemnts will reside
		info=[];
	// This function pushes an item into the stack	
	this.s_push = function(item) {
		// if stack contains space for elements
		if(!this.s_full()) {
			// top now will point to the position where item
			// will be inserted
			++top;
			// placing the item in the array
			info[top]=item;
			document.write(item+ " successfully inserted into the stack !<br>");
		}
		else
			document.write("stack overflow! Cannot insert "+item+" <br>");
	};
	// This function deletes the element on top of the Stack
	this.s_pop = function() {
		// if there are items in the stack
		if(!this.s_empty())
			return info[top--];// delete the topmost item
		else
			document.write("stack underflow <br>");
		
	};
	// This function returns the elemnt which is
	// present on top of the Stack
	this.s_peek = function() {
		document.write("Peeked data is"+info[top]+"<br>");
	};
	// This returns the size of the stack
	this.s_size = function() {
		return info.length;
	};
	// checks whether the stack is empty or not
	this.s_empty= function() {
		// when top points to -1
		// stack is empty at that point
		if(top==-1)
			return true;
		else {
			return false;
		}
	};
	// checks whether the stack is full or not
	this.s_full= function() {
		// when top points to MAXIMUM size ie size-1
		// the stack becomes full
		if(top===size-1)
			return true;
		else {
			return false;
		}

	};
	// this function diplays the element of the stack
	this.s_display=function() {
		document.write("*********Displaying Stack*********** <br>");
		var j=top;
		while(j>=0){

			document.write("At position "+j+" of the stack is "+info[j]+" <br>");
			j--;
		}
	};
};
