// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

/**
 * Reads an M x N matrix from the user, one row at a time.
 * @param {number} rows
 * @param {number} cols
 * @returns {number[][]}
 */
function readMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    let row;
    // Keep asking until the row has exactly `cols` numbers
    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1}: `);
      row = line.trim().split(/\s+/).map(Number);
      if (row.length === cols && row.every((n) => !isNaN(n))) {
        break;
      }
      console.log(`Please enter exactly ${cols} numbers separated by spaces.`);
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * Prints a matrix in a neat, aligned grid.
 * @param {number[][]} matrix
 */
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    const rowText = matrix[i].map((val) => String(val).padStart(4)).join(' ');
    console.log(rowText);
  }
}

/**
 * PART A — Transposes a matrix (rows become columns).
 * @param {number[][]} matrix - M x N matrix
 * @returns {number[][]} N x M matrix
 */
function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}


/**
 * PART B — Adds two matrices of the same size element-wise.
 * @param {number[][]} a - M x N matrix
 * @param {number[][]} b - M x N matrix
 * @returns {number[][]} M x N matrix
 */
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}



/**
 * PART C — Multiplies matrix A (M x N) by matrix B (N x P).
 * @param {number[][]} a - M x N matrix
 * @param {number[][]} b - N x P matrix
 * @returns {number[][]} M x P matrix
 */
function multiplyMatrices(a, b) {
  const m = a.length;
  const n = a[0].length; // = b.length
  const p = b[0].length;
  const result = [];

  for (let i = 0; i < m; i++) {
    const newRow = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

function main() {
  // ---------------------------------------------------------------------
  // PART A — Transpose
  // ---------------------------------------------------------------------
  console.log('=== PART A: Transpose a Matrix ===');
  const rowsA = readlineSync.questionInt('Enter number of rows: ');
  const colsA = readlineSync.questionInt('Enter number of columns: ');
  const matrixA = readMatrix(rowsA, colsA);

  console.log('\nOriginal Matrix:');
  printMatrix(matrixA);

  console.log('\nTransposed Matrix:');
  printMatrix(transpose(matrixA));

  // ---------------------------------------------------------------------
  // PART B — Addition
  // ---------------------------------------------------------------------
  console.log('\n=== PART B: Add Two Matrices ===');
  console.log(`Enter a second matrix of the same size (${rowsA} x ${colsA}):`);
  const matrixB = readMatrix(rowsA, colsA);

  console.log('\nSum of Matrices:');
  printMatrix(addMatrices(matrixA, matrixB));

  // ---------------------------------------------------------------------
  // PART C — Multiplication
  // ---------------------------------------------------------------------
  console.log('\n=== PART C: Multiply Two Matrices ===');
  console.log(`Matrix A is ${rowsA} x ${colsA}.`);
  console.log(`Matrix C must have ${colsA} rows (columns of A = rows of C).`);
  const colsC = readlineSync.questionInt('Enter number of columns for Matrix C: ');
  const matrixC = readMatrix(colsA, colsC);

  console.log('\nProduct of A x C:');
  printMatrix(multiplyMatrices(matrixA, matrixC));
}

main();