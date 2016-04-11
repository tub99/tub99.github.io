//Calculator gives us the  result evaluated from the parse tree
function Calculator(parseTree) {
	// calculate() is a public function responsible 
	// for evaluating the entire expression 
	this.calculate = function () {
		// predefining constants like 'pi'=3.14 and 'e'
		var variables = {
				pi: Math.PI,
				e: Math.E
			},	
			// Defining what every operator should do 
			opt = {
				"+": function(a, b) {
					return a + b;
				},
				"-": function(a, b) {
					if (typeof b === "undefined") return -a;
						return a - b;
				},
				"*": function(a, b) {
					return a * b;
				},
				"/": function(a, b) {
					return a / b;
				},
				"%": function(a, b) {
					return a % b;
				},
				"^": function(a, b) {
					return Math.pow(a, b);
				}
			},

			args = {},
			// functions conatin the predefined Math class function of JavaScript
			functions = {
				round: Math.round,
				ceil: Math.ceil,
				floor: Math.floor,
				log: Math.log,
				exp: Math.exp,
				sqrt: Math.sqrt,
				sin: Math.sin,
				cos: Math.cos,
				tan: Math.cos,
				max: Math.max,
				min: Math.min,
				random: Math.random
			},
			//Parsing each and every single element to identify
			//whether its a number,identifier,function,call to function,etc
			paseElement = function (el) {
				if (el.type === "number") return el.value;
				else if (opt[el.type]) {
				if (el.left) return opt[el.type](paseElement(el.left), paseElement(el.right));
					return opt[el.type](paseElement(el.right));
				}
				else if (el.type === "identifier") {
					var value = args.hasOwnProperty(el.value) ? args[el.value] : variables[el.value];
					if (typeof value === "undefined") document.getElementById('displayBar').innerHTML=document.getElementById('displayBar').innerHTML+ el.value + " is undefined.";
						return value;
				}
				else if (el.type === "assign") {
					variables[el.name] = paseElement(el.value);
				}
				else if (el.type === "call") {
					for (var i = 0; i < el.args.length; i++) el.args[i] = paseElement(el.args[i]);
						return functions[el.name].apply(null, el.args);
				}
				else if (el.type === "function") {
					functions[el.name] = function () {
						for (var i = 0; i < el.args.length; i++) {
							args[el.args[i].value] = arguments[i];
						}
						var ret = paseElement(el.value);
							args = {};
						return ret;
					};
				}
			},
			result = "",
			value;
  for (var i = 0; i < parseTree.length; i++) {
		value = paseElement(parseTree[i]);
    if (typeof value !== "undefined") result += value + "\n";
  }
  return result;
};

}