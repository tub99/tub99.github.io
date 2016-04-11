// This class is responsible for creating the parse trees it gets as input
//from the Lexical Analyzer class

//Parser
function Parser() {
	this.generateParseTree = function (tokenArray) {
		var parseTree = [],
			content = {},
			i = 0,
			// Symbol table is a dataStructure which contains the binding powers
			// it has left denoting function--> evaluating token on its left,
			// null denotive function-->specially for identifiers and functions 
			symbolTable = function (id, nud, lbp, led) {
			  var sym = content[id] || {};
			  content[id] = {
			    lbp: sym.lbp || lbp,
			    nud: sym.nud || nud,
			    led: sym.led || led
			  };
			},
			//This function sets the type and value of a token as a symbol
			// which exists in the symbol table
			analyzeToken = function (token) {
			  var sym = Object.create(content[token.type]);
			  sym.type = token.type;
			  sym.value = token.value;
			  return sym;
			},
			// The token function creates symbols from the tokenArray
			token = function () {
				return analyzeToken(tokenArray[i]); 
			},
			//This func gives the next symbol from token
			moveForward = function () { 
				i++; 
				return token(); 
			},
			// Helps to generate the parse tree of an expression
			exp = function (rbp) {
				var left, t = token();
				 moveForward();
				 if (!t.nud) document.getElementById('displayBar').innerHTML+="Error: Token '"+t.type+"' is not recognized."+"\n";
				  left = t.nud(t);
				 while (rbp < token().lbp) {
				    t = token();
				    moveForward();
				    if (!t.led) document.getElementById('displayBar').innerHTML+= "Error: Token '"+t.type+"' is not recognized."+"\n";
				  	left = t.led(left);
				}
				return left;
			},
			exp_infix = function (id, lbp, rbp, led) {
		  		rbp = rbp || lbp;
				 symbolTable(id, null, lbp, led || function (left) {
				    return {
				      type: id,
				      left: left,
				      right: exp(rbp)
				    };
				});
			},
			exp_prefix = function (id, rbp) {
		  		symbolTable(id, function () {
		    		return {
			      		type: id,
			      		right: exp(rbp)
		    		};
		  		});
			};
		//Predefining the priority of operators
		exp_prefix("-", 7);
		exp_infix("^", 6, 5);
		exp_infix("*", 4);
		exp_infix("/", 4);
		exp_infix("%", 4);
		exp_infix("+", 3);
		exp_infix("-", 3);
		// ',' , ')','end' are mainly used for demarcation of the expresson
		symbolTable(",");
		symbolTable(")");
		symbolTable("(end)");
		//From here we start creating the symbol table
		symbolTable("(", function () {
		  	value = exp(2);
		  	if (token().type !== ")") 
		  		document.getElementById('displayBar').innerHTML+="Error: Closed parenthesis expected ')'.";
		  	moveForward();
		  	return value;
		});
		symbolTable("number", function (number) {
		    return number;
		});
		symbolTable("identifier", function (name) {
	  		if (token().type === "(") {
		    	var args = [];
		    	if (tokenArray[i + 1].type === ")") moveForward();
		    	else {
		      		do {
		        		moveForward();
		        		args.push(exp(2));
		      		} while (token().type === ",");
		      		if (token().type !== ")") document.getElementById('displayBar').innerHTML+="Error: Closed parenthesis expected ')'.";
		    	}
		    	moveForward();
		    	return {
		      		type: "call",
		      		args: args,
		      		name: name.value
		    	};
	  		}
	  		return name;
		});
		exp_infix("=", 1, 2, function (left) {
		    if (left.type === "call") {
		      for (var i = 0; i < left.args.length; i++) {
		        if (left.args[i].type !== "identifier") document.getElementById('displayBar').innerHTML="Error: Invalid argument name.";
		      }
		      return {
		        type: "function",
		        name: left.name,
		        args: left.args,
		        value: exp(2)
		      };
		    } else if (left.type === "identifier") {
		      return {
		        type: "assign",
		        name: left.value,
		        value: exp(2)
		      };
		    }
		    else document.getElementById('displayBar').innerHTML+="Error: Invalid lvalue.";
	    });
		while (token().type !== "(end)") {
		  parseTree.push(exp(0));
		}

		return parseTree;
	};
}