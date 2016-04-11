// A graph data structure consists of a finite (and possibly mutable)
// set of vertices or nodes or points, together with a set of unordered 
// pairs of these vertices for an undirected graph or a set of ordered pairs 
//for a directed graph. These pairs are known as edges.

// Here we represent a Graph with help of an adjacency 2-D matrix
Packets.Graph = function()
{
	// These are the attributes of a graph 
	var vertices,
		edges = 0,
		adjMat=[],
		// This array is used for graph traversal
		marked=[];
	// This function takes 'v'-> no of vertices as input
	// and creates a graph-like structure	
	this.initGraph = function(v) {
		vertices = (v!==undefined && typeof(v)==="number") ? v : 0 ;
		//initializing the adjacent matrix
		for(var i=0;i<vertices;i++) {
			//creating a 2-D matrix for every vertex
			adjMat[i] = [];
			//initializing with a blank value
			//adjMat[i].push(" ");
		}
	
	};
	// This function takes 2 vertices as input and 
	// creates an edge between those 2 vertices
	this.addEdge = function(v1,v2) {
		// an edge is formed by connecting two vertices
		// v1 & v2 should always be less than the no of vertices
		// '<' as we start from 0 
		if(v1<vertices && v2<vertices) {
			// creating the edge in the matrix
			// edge here is undirected
			// hence we append both
			adjMat[v1].push(v2);
			adjMat[v2].push(v1);
			// when edge gets craeted we increase the edges count
			edges++;
		}
		else
			console.log("Edge is invalid, cannot be inserted");
	};
	// This function takes 2 vertices as input and 
	// creates an edge between those 2 vertices
	this.deleteEdge = function(v1,v2) {
		// checking if that edge exists in the graph
		if(Array.isArray(adjMat[v1])){
			// edge here is undirected
			// hence we remove both
			adjMat[v1].pop(v2);
			adjMat[v2].pop(v1);
			// when edge gets deleted we decrease the edges count
			edges--;

		}
	};
	// this function displays the elements of the graph
	this.displayGraph = function(){
		for(var i=0;i<vertices;i++) {
			console.log(i+" -> ");
			for(var j=0; j< vertices; j++){
				// displaying elements
				if(adjMat[i][j]!== undefined)
					console.log(adjMat[i][j]+ ' | ');
			}
			console.log("<br>");
		}
	};

	// This function takes the source vertex
	// and traverse the graph depth-wise from the source
	this.dfs = function(vert) {
		
		//marking the vertex as visited
		marked[vert]=true;
		//checking whether the vertex 'vert' is valid 
		if(adjMat[vert] !== undefined) {
			console.log("Marked vertex:"+vert);
			console.log("<br>");
		}
		//recursively call dfs on the remaining vertices which is adjacent to 'vert'
		// Loop though all the adjacent vertices and call dfs on them
		for( let w of adjMat[vert]) {
			// checking whether that vertex 'w' has been already visited or not
			if(marked[w] === undefined)
				this.dfs(w);
		}
	};

	// This function takes the source vertex
	// and traverse the graph level-wise from the source
	this.bfs = function(vert) {
		console.log("Under Construction. Comingup Shortly!");
	};


};