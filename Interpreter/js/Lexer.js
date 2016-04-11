//Lexer is responsible for breaking down lexerInput string to tokenArray
function LexicalAnalyzer(lexerInput){
  this.lexAnalyze = function () {
    //Token Array will program the statement divided into tokens
    var tokenArray = [],
      c, 
      i = 0;
    //Checking whether character is an Operator like +,-*/,%,etc
    var checkIfOperator = function (c) { 
      return (/[+\-*\/\^%=(),]/).test(c);
    },
    //checking whether a char is a digit{0,1,2..}
    checkIfDigit = function (c) { 
      return (/[0-9]/).test(c); 
    },
    //Checking for a space
    checkIfSpace = function (c) { 
      return (/\s/).test(c); 
    },
    // An identifier is a 'string' and not any of the above
    checkIfIdentifier = function (c) { 
      return typeof c === "string" && !checkIfOperator(c) && !checkIfDigit(c) && !checkIfSpace(c); 
    };
    // This function advances to the next char
    var moveForward = function () { 
      return c = lexerInput[++i];
    };
    // token contains a fields called type and a value
    //type can be an operator,etc
    var insertToken = function (type, value) {
      tokenArray.push({
        type: type,
        value: value
      });
    };
    // This while loop checks for every character in the LexerInput array
    //and finds out what among the above types it is!
    while (i < lexerInput.length) {
      //getting a character
      c = lexerInput[i];
      // The rest of it checks for individuals
      if (checkIfSpace(c))
        moveForward();
      else if (checkIfOperator(c)) {
        insertToken(c);
        moveForward();
      }
      if (checkIfSpace(c)) moveForward();
      else if (checkIfOperator(c)) {
        insertToken(c);
        moveForward();
      }
      else if (checkIfDigit(c)) {
        var num = c;
        while (checkIfDigit(moveForward())) 
          num += c;

        if (c === ".") {
            do num += c; while (checkIfDigit(moveForward()));
        }
        num = parseFloat(num);
        // If no's value doesnt fit in the Finite Range
        if (!isFinite(num)) 
         document.getElementById('displayBar').innerHTML+="Error: Entered number is too big. \n";
        insertToken("number", num);
      }
      //Checking for identifier
      else if (checkIfIdentifier(c)) {
          var idn = c;
          while (checkIfIdentifier(moveForward())) idn += c;
          insertToken("identifier", idn);
      }
      else document.getElementById('displayBar').innerHTML+="Error: Token '"+c+"' cannot be recognized. \n"; 
    }
    // "(end)" -> determines the END of the tokenArray[]
    insertToken("(end)");
    return tokenArray;
  };
}