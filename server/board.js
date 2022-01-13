
class Board {
  isRunning = false;
  generations = 0;
  #cron;
  constructor(size, speed) {
    this.size = size;
    this.speed = speed;
    this.board = this.#buildBoard();
  }

  #buildBoard = (val) => {
    return [...Array(this.size)].map(() =>
      [...Array(this.size)].map(() =>
        val === 0 ? val : Math.floor(Math.random() * 2)
      )
    );
  };

  setNewState = (neighbors, state) => {
    if (neighbors < 2 && state === 1) {
      return 0;
    }
    if (neighbors > 3 && state === 1) {
      return 0;
    }
    if (neighbors === 3 && state === 0) {
      return 1;
    }
    return state;
  };

  findNeighbors = (col, row) => {
    let neighbors = 0;
    for (let i = -1; i < 2; i++) {
      let x = i + col;
      if (x < 0 || x > this.size - 1) {
        continue;
      }
      for (let j = -1; j < 2; j++) {
        let y = j + row;
        if (i === 0 && j === 0) {
          continue;
        }
        if (y < 0 || y > this.size - 1) {
          continue;
        }
        if (this.board[x][y] === 1) {
          neighbors++;
        }
      }
    }
    return neighbors;
  };

  generate = () => {
    if(this.generations >= (this.size * 10)) {
      this.stop();
      return false;
    }
    let newGeneration = this.#buildBoard(0);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let neighbors = this.findNeighbors(i, j);
        let state = this.board[i][j];
        newGeneration[i][j] = this.setNewState(neighbors, state);
      }
    }
    this.board = newGeneration;
    this.generations++;
  };

  run = () => {
    this.#cron = setInterval(() => {
      this.isRunning = true;
      this.generate();
    }, this.speed);
  };

  stop = () => {
    this.isRunning = false;
    clearInterval(this.#cron);
  };

  changeSpeed = (newSpeed) => {
    this.speed = newSpeed;
    clearInterval(this.#cron);
    this.run();
  }
}

module.exports = Board;
