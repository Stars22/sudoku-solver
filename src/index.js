module.exports = function solveSudoku(matrix) {
  function findZero() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (matrix[row][col] == 0) {
          return [row, col];
        }
      }
    }
  }

  function fillTable(table, value) {
    matrix[table[0]][table[1]] = value;
  }

  function nullTable(table) {
    fillTable(table, 0);
  }
  
  function checkValidity(table, value) {
    if (matrix[table[0]].some(val => val == value)) {
      return false;
    }

    if (matrix.some(row => row[table[1]] == value)) {
      return false;
    }

    let [squareRowStart, squareColStart] = [
      Math.floor(table[0] / 3) * 3,
      Math.floor(table[1] / 3) * 3
    ];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (matrix[squareRowStart + row][squareColStart + col] == value) {
          return false;
        }
      }
    }

    return true;
  }

  function stackSolvingUnit() {
    let table = findZero();
    if (table == undefined) {
      return true;
    }

    for (let value = 1; value <= 9; value++) {
      if (!checkValidity(table, value)) {
        continue;
      }

      fillTable(table, value);
      let solvingResponse = stackSolvingUnit();

      if (solvingResponse) {
        return true;
      }
    }

    nullTable(table);
    return false;
  }
  stackSolvingUnit();

  return matrix;
}
