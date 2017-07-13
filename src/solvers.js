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
  var solution = undefined; //fixme
  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
  
  // makeEmptyMatrix
  var matrix = makeEmptyMatrix(n);
  // recursive function
  var findSolution = function (n, rowIndex, matrix) {
    // if matrix[rowIndex] > n
    if (matrix[rowIndex] > n) {
      // return matrix
      return matrix;
    }
    // if matrix[rowIndex] does not include 0s
    if (!matrix[rowIndex].includes(0)) {
      // return
      return false;
    }
    // for each item of matrix[rowIndex]
    for (var i = 0; i < n; i++) {
      // if matrix[rowIndex][i] is 0
      if (matrix[rowIndex][i] === 0) {
        // place a 2 at matrix[rowIndex][i]
        matrix[rowIndex][i] = 2;
        var columnConflict = false;
        // change 0s in range of 2 to 1s
        for (var j = 0; j < n; j++) {
          if (matrix[j][i] === 2) {
            // stop this possible matrix
            columnConflict = true;
            break;
          } else {
            matrix[j][i] = 1;
          }
          if (matrix[rowIndex][j] !== 2) {
            matrix[rowIndex][j] = 1;
          }
        }
      
        }
        // make left diagonals 1s
        var rowsFromCurr = 1;
        for (var k = i - 1; i >= 0; i--) {
          if (rowIndex - rowsFromCurr >= 0) {
            if (matrix[rowIndex - rowsFromCurr][k] === 2) {
              columnConflict = true;
              break;
            } else {
              matrix[rowIndex - rowsFromCurr][k] = 1;
            }
          }
          if (rowIndex + rowsFromCurr < n) {
            if (matrix[rowIndex + rowsFromCurr][k] === 2) {
              columnConflict = true;
              break;
            } else {
              matrix[rowIndex + rowsFromCurr][k] = 1;
            }
          }
        }
        
        if (columnConflict) {
          continue;
        }
        // recurse on next row
        var f = findSolution(n, rowIndex + 1, matrix); 
        if (!f) {
          continue;
        } else {
          return f;
        }    
      }
    }

      
  };
  
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
