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

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
