//This is the Binary Search Tree Class which helps to arrange keys
// in sorted order. Where the value of left-subtree is less than 
// value in the right subtree
Packets.BSTree = function() {
	var root = null;
  // inserting a value in the BST
	this.insertNode = function(item) {
    //Creating a temporary node which will contain the value of the item
    var temp = new TNode(item),
      //curr is made to point to the root of the tree
      curr=root;
      //temp initialized
    temp.left = temp.right = null;
    //Then this item will be the root of the tree
    if(root === null) {
      root=temp;
      return;
    }
    //searching for the place where the item needs to be inserted
    while(curr.data!=item) {
      //if tree-key value  > item search for LEFT-Sub tree
      if(curr.data>item) {
        if(curr.left===null) {
          curr.left=temp;
          return;
        }
        else {
          curr=curr.left;
        }
      }
      //else search in the right sub tree
      else {  
        if(curr.right === null) {
            curr.right=temp;
            return;
        }
        else {
          curr=curr.right;
        }
      } 	
    }
	};
  //This function returns the root of the tree
	this.getRoot = function() {
		return root;
	};
  // This returns height of the tree
  this.getHeight= function(rt) {
    // if there is nothing height of tree is 0
    if(rt === null)
      return 0;
    //If there are nodes in the tree
    // search for the maximum height of the Rt-subtree or Left-Subtree
    else
    {
      var lHt=this.getHeight(rt.left);
      var rHt=this.getHeight(rt.right);
      //The maximum ht+1 is the height of the tree
      // +1 is added for the parent
      if(lHt>rHt)
        return lHt+1;
      else
        return rHt+1;
    }
  };
  // this is form of graph traversal
	this.postorder = function(ptr) {
		//var ptr=root;
    if(ptr!== null) {
      //First Left subtree
      this.postorder(ptr.left);
      //Then traverse Right subTree
      this.postorder(ptr.right);
      //Then traverse root
      document.write(" "+ptr.data+" ");
   }
    return;
  };
  //Another graph traversal technique
  this.preorder = function(ptr) {
		//var ptr=root;
    //First root
    if(ptr!== null) {
      document.write(" "+ptr.data+"<br> ");
      //Then Left-subtree
      this.preorder(ptr.left);
      //Lastly rt SubTree
      this.preorder(ptr.right);
    }
    return;
  };
  // traversal technique
  // First left subtree,then rt subtree then node/root
  this.inorder = function(ptr) {
		//var ptr=root;
    if(ptr!== null) {
      this.inorder(ptr.left);
      document.write("-"+ptr.data+"-");
      this.inorder(ptr.right);
    }
    return;
  };
  //Displays nodes level-by-level
  this.levelorder = function(rt) {
    var h=this.getHeight(rt),
        i;
    for(i=1;i<=h;i++) {
      printLevel(rt,i);
    }
  };
  // This function is used by levelorder traversal 
  var printLevel = function(rt,level) {
    if(rt === null)
      return;
    if(level === 1)
      document.write(rt.data+" ");
    else if(level > 1)
    {
      // Recursive calls to rt sub-tree and then to left-subtree
      printLevel(rt.left,level-1);
      printLevel(rt.right,level-1);
    }
  };
  //Checking whether a tree is empty or not
  this.isEmpty = function() {
    // root=null means there is nothing in the tree
    if(root === null) {
      return true;
    }
    else {
      return false;
    }
  };

};
