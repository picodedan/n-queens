/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  for (var i = 0; i < n; i++) {
    solution.push([]);
  }
  var col = 0;
  for (var i = 0; i < n; i++) {
    solution[i][col] = 1;
    for (var j = col + 1; j < n; j++) {
      solution[i][j] = 0;
    }
    for (var k = col - 1; k >= 0; k--) {
      solution[i][k] = 0;
    }
    col++;
  }
  //takes as input a integer
  //outputs a matrix with the correct values to represent a solution 
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for (var i = 1; i <= n; i++) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var result, solution, matrix;

  // recursive function
  var findSolution = function (n, rowIndex, matrix) {
    // if matrix[rowIndex] > n
    if (rowIndex >= n) {
      // return matrix
      return matrix;
    }
    // for each column in the row
    for (var i = 0; i < n; i++) {
      //  attempt to put a queen there
      if (i !== 0) {
        matrix.togglePiece(rowIndex, i - 1);
      }

      matrix.togglePiece(rowIndex, i);
      // if conflict
      if (!matrix.hasAnyQueensConflicts()) {
        //remove the queen, and proceed to next column
        var solution = findSolution(n, rowIndex + 1, matrix); 
        // matrix.togglePiece(rowIndex, i);
        if (solution) {
          return solution;
        }
      } 
      if (i === n - 1) {
        matrix.togglePiece(rowIndex, i);
      }
      // else {
      //   // if not, call findSolution on next row
      //   findSolution(n, rowIndex + 1, matrix);  
      // }
    }
  };
  //if N is 0,2, or 3, return dummy input for 0 ==[]
  if (n === 0 || n === 2 || n === 3) {
    result = new Board({'n': n});
    solution = result.rows();
  } else if (n === 1) {
    //if N is 1 return [[1]]
    solution = [[1]];
  } else {
    //create matrix of N and run findSolution(n,rowIndex,matrix)
    matrix = new Board({'n': n});
    result = findSolution(n, 0, matrix);

    //loop through results rows and push to solution 
    solution = [];
    for (var i = 0; i < n; i++) {
      solution.push(result.get(i));
    }
  }
  //for loop over solution to convert to array of arrays and set to rsutl
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
 
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var result, matrix;
  // var solutionCount = 0;
  // // recursive function
  // var findSolutionCount = function (n, rowIndex, matrix) {
  //   // if matrix[rowIndex] > n
  //   if (rowIndex >= n) {
  //     // return matrix
  //     return true;
  //   }
  //   // for each column in the row
  //   for (var i = 0; i < n; i++) {
  //     //  attempt to put a queen there
  //     if (i !== 0) {
  //       matrix.togglePiece(rowIndex, i - 1);
  //     }

  //     matrix.togglePiece(rowIndex, i);
  //     // if conflict
  //     if (!matrix.hasAnyQueenConflictsOn(rowIndex, i)) {
  //       //remove the queen, and proceed to next column
  //       var solution = findSolutionCount(n, rowIndex + 1, matrix); 
  //       // matrix.togglePiece(rowIndex, i);
  //       if (solution) {
  //         solutionCount++;
  //         // console.log('solution count = ' + solutionCount + ' solution conflicts? = ' + matrix.hasAnyQueensConflicts());
  //         // console.log();
  //       }
  //     } 
  //     if (i === n - 1) {
  //       matrix.togglePiece(rowIndex, i);
  //     }
  //     // else {
  //     //   // if not, call findSolution on next row
  //     //   findSolution(n, rowIndex + 1, matrix);  
  //     // }
  //   }
  // };
  // //if N is 0,2, or 3, return dummy input for 0 ==[]
  // if (n === 0 || n === 1) {
  //   //if N is 1 return [[1]]
  //   solutionCount = 1;
  // } else if (n > 3) {
  //   //create matrix of N and run findSolution(n,rowIndex,matrix)
  //   matrix = new Board({'n': n});
  //   findSolutionCount(n, 0, matrix);
    
  //   //loop through results rows and push to solution 
    
  // }
  
  
  // START OF NEW IDEA
  
  // make an array of n arrays that each have 0, 1, 2, 3... up to n - 1 (these represent open spaces)
  var openSpaces = {};
  for (var i = 0; i < n; i++) {
    openSpaces[i] = {};
    for (var j = 0; j < n; j++) {
      openSpaces[i][j] = j;
    }
  }
  var solutionCount = 0;
  var solutionCounter = function(n, row, openSpaces) {
  // for an input row,
    // if row is off board
    if (row >= n) {
      // inc solutionCount
      return true;
    }
    // if there are spaces at row
    var rowOpenSpaces = Object.keys(openSpaces[row]);
    if (rowOpenSpaces.length > 0) {
      // for each open space s in input row imagine you put a queen there
      for (var queenSpace = 0; queenSpace < rowOpenSpaces.length; queenSpace++) {
        // delete each s in lower rows
        var limitedOpenSpaces = JSON.parse(JSON.stringify(openSpaces));
        var diagDiff = 1;
        for (var lowerRow = row + 1; lowerRow < n; lowerRow++) {
          delete limitedOpenSpaces[lowerRow][rowOpenSpaces[queenSpace]];
          // delete s - k and s + k, where k starts at 1 and increments
          delete limitedOpenSpaces[lowerRow][+rowOpenSpaces[queenSpace] - diagDiff];
          delete limitedOpenSpaces[lowerRow][+rowOpenSpaces[queenSpace] + diagDiff];
          diagDiff++;
        }
        // repeat REC for next row
        var hasSolution = solutionCounter(n, row + 1, limitedOpenSpaces);
        if (hasSolution) {
          solutionCount++;
        }  
      }
      
    }
    
  };
  // END OF NEW IDEA (DELETE ONLY THIS SECTION IF THIS IDEA FAILS)
  
  if (n === 0 || n === 1) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  solutionCounter(n, 0, openSpaces);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
