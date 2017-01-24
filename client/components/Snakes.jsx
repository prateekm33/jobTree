import React from 'react';


Array.prototype.fillWithFn = function(fn) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    this[i] = (fn());
  }
  return this;
}


export default class Snakes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      paused: false,
      currScore: 0,
      yourBest: 0,
      leader: {user: '', score: 0},
      length: 31,
      speed: 900,
      board: new Array(31).fillWithFn(() => new Array(31).fill(2)),
      food: {r: null, c: null},
      tailOnPiece: false,
      dir: 'right'
    }

    this.takenSpots = {},
    this.snake = {head: null, tail: null};
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.handleEndBtn = this.handleEndBtn.bind(this);
    this.changeGameDifficulty = this.changeGameDifficulty.bind(this);
    this.summonFood = this.summonFood.bind(this);
    this._moveBody = this._moveBody.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this._moveSnake = this._moveSnake.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.canIGo = this.canIGo.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEvent);
    this.endBtn.disabled = true;
    this.resetGame();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEvent);
  }

  changeGameDifficulty(evt) {
    if (this.state.started) return;

    const target = evt.target;

    switch (target.id) {
      case 'easy':
        return this.resetGame(31, 900);
      case 'medium':
        return this.resetGame(21, 500);
      case 'hard':
        return this.resetGame(11, 300);
      default: return;
    }
  }

  resetGame(length = this.state.length, speed = this.state.speed) {
    const board = new Array(length).fillWithFn(() => new Array(length).fill(2));
    const mid = Math.floor(board.length / 2);
    board[mid][mid] = 1;
    this.takenSpots = {};
    this.takenSpots[mid] = this.takenSpots[mid] || {};
    this.takenSpots[mid][mid] = true;
    this.setState({board});
    this.snake = {head: null, tail: null};
    this.snake.head = {r: mid, c: mid, prev: null, next: null};
    this.snake.tail = this.snake.head;
    this.setState({ board, length: length, speed: speed}, this.summonFood);
  }

  handleKeyEvent(evt) {
    const spaceBar = 32;
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;

    switch (evt.keyCode) {
      case spaceBar: return this.togglePause(evt);
      case up: 
        evt.preventDefault();
        if (!this.state.started) this.setMove = this.startGame(evt, 'up');
        return this.setMove('up');
      case right: 
        evt.preventDefault();
        if (!this.state.started) this.setMove = this.startGame(evt, 'right');
        return this.setMove('right');
      case down: 
        evt.preventDefault();
        if (!this.state.started) this.setMove = this.startGame(evt, 'down');
        return this.setMove('down');
      case left: 
        evt.preventDefault();
        if (!this.state.started) this.setMove = this.startGame(evt, 'left');
        return this.setMove('left');
      default: return;
    }
  }

  _moveSnake(moveFn) {
    clearInterval(this.timer);
    this.timer = setInterval(moveFn, this.state.speed);
  }

  startGame(evt, dir) {
    this.endBtn.disabled = false;
    evt.preventDefault();
    this.setState({ started: true});
    const self = this;

    this.setState({dir});

    this._moveSnake(this.moveSnake);

    return function (dir) {
      this.setState({dir});
    }
  }

  canIGo(dir) {
    const r = this.snake.head.r;
    const c = this.snake.head.c;
    switch(dir) {
      case 'up':
        if (!this.state.board[r - 1]) return false;
        if (this.takenSpots[r-1]) return !this.takenSpots[r-1][c];
      case 'right':
        if (!this.state.board[r][c + 1]) return false;
        if (this.takenSpots[r]) return !this.takenSpots[r][c + 1];
      case 'down':
        if (!this.state.board[r +1]) return false;
        if (this.takenSpots[r+1]) return !this.takenSpots[r+1][c];
      case 'left':
        if (!this.state.board[r][c - 1]) return false;
        if (this.takenSpots[r]) return !this.takenSpots[r][c - 1];
      default: return true;
    }
  }

  gameOver() {
    this.endGame();
  }

  endGame() {
    this.endBtn.disabled = true;
    this.setState({started: false, paused: false});
    clearInterval(this.timer);
    console.log('TODO --- COMPLETE END GAME...');
  }

  moveSnake(dir = this.state.dir) {
      // triggers a setTimeout that moves the snake in that direction every second or 1.5 seconds (depending on level)
      const board = this.state.board.map(i => i);
      switch (dir) {
        case 'up':
          this.wasTailOnPiece();
          this.isTailOnPiece();
          this._moveBody();
          if (!this.canIGo('up')) return this.gameOver();
          board[this.snake.head.r - 1][this.snake.head.c] = 1;
          board[this.snake.head.r][this.snake.head.c] = 2;
          this.snake.head.r = this.snake.head.r - 1;
          this.takenSpots[this.snake.head.r] = this.takenSpots[this.snake.head.r] || {};
          this.takenSpots[this.snake.head.r][this.snake.head.c] = true;
          this.setState({board});
          return;
        case 'right':
          this.wasTailOnPiece();
          this.isTailOnPiece();
          this._moveBody();
          if (!this.canIGo('right')) return this.gameOver();
          board[this.snake.head.r][this.snake.head.c + 1] = 1;
          board[this.snake.head.r][this.snake.head.c] = 2;
          this.snake.head.c = this.snake.head.c + 1;
          this.takenSpots[this.snake.head.r] = this.takenSpots[this.snake.head.r] || {};
          this.takenSpots[this.snake.head.r][this.snake.head.c] = true;
          this.setState({board});
          return;
        case 'down':
          this.wasTailOnPiece();
          this.isTailOnPiece();
          this._moveBody();
          if (!this.canIGo('down')) return this.gameOver();
          board[this.snake.head.r + 1][this.snake.head.c] = 1;
          board[this.snake.head.r][this.snake.head.c] = 2;
          this.snake.head.r = this.snake.head.r + 1;
          this.takenSpots[this.snake.head.r] = this.takenSpots[this.snake.head.r] || {};
          this.takenSpots[this.snake.head.r][this.snake.head.c] = true;
          this.setState({board});
          return;
        case 'left':
          this.wasTailOnPiece();
          this.isTailOnPiece();
          this._moveBody();
          if (!this.canIGo('left')) return this.gameOver();
          board[this.snake.head.r][this.snake.head.c - 1] = 1;
          board[this.snake.head.r][this.snake.head.c] = 2;
          this.snake.head.c = this.snake.head.c - 1;
          this.takenSpots[this.snake.head.r] = this.takenSpots[this.snake.head.r] || {};
          this.takenSpots[this.snake.head.r][this.snake.head.c] = true;
          this.setState({board});
          return;
      }
    }

  _moveBody(dir) {
    let node = this.snake.tail;
    this.takenSpots[node.r] = this.takenSpots[node.r] || {};
    delete this.takenSpots[node.r][node.c];
    while (node.prev) {
      node.r = node.prev.r;
      node.c = node.prev.c;
      node = node.prev;
    }
  }

  wasTailOnPiece() {
    if (this.state.tailOnPiece) {
      this.snake.tail.next = {r: this.state.food.r, c: this.state.food.c, next: null, prev: this.snake.tail};
      this.snake.tail = this.snake.tail.next;
      this.takenSpots[this.state.food.r] = this.takenSpots[this.state.food.r] || {};
      this.takenSpots[this.state.food.r][this.state.food.c] = true;
      let newSpeed = this.state.speed - 50;
      if (newSpeed < 50) newSpeed = 50;
      this.setState({speed: newSpeed}, () => this._moveSnake(this.moveSnake));
      this.summonFood();
    } 
  }

  isTailOnPiece() {
    if (this.snake.tail.r === this.state.food.r && this.snake.tail.c === this.state.food.c) {
      this.setState({tailOnPiece: true})
      return true;
    } else {
      this.setState({tailOnPiece: false});
      return false;
    }
  }

  handleStartClick(evt) {
    this.setMove = this.startGame(evt);
  }

  togglePause(evt) {
    evt.preventDefault();
    this.setState({paused: !this.state.paused});
  }

  handleEndBtn(evt) {
    evt.preventDefault();
    this.endGame();
  }

  genBoard() {
    const n = this.state.level;

    return this.state.board.map((row, r) => (
      <div key={r} className="game-row">
        {
          row.map((cell, c) => {
            return (
              <div key={c} className={"game-cell" + " " +
                (
                  (c === this.state.food.c && r === this.state.food.r && this.takenSpots[r] && this.takenSpots[r][c] ? 'green' : '') ||
                  (c === this.state.food.c && r === this.state.food.r ? 'red' : '') ||
                  (this.takenSpots[r] && this.takenSpots[r][c] ? 'black' : '')
                )

              }></div>
            )
          })
        }
      </div>
    ))
  }

  summonFood() {
    // choose random row from viable rows
    const viableSpots = [];
    this.state.board.forEach((row, r) => {
      row.forEach((col, c) => {
        if (this.takenSpots[r] && this.takenSpots[r][c]) return;
        viableSpots.push(r * this.state.length + c);
      });
    });
      // choose random col from viable cols
    const randIdx = Math.floor(Math.random() * viableSpots.length);
    const randCell = viableSpots[randIdx];
    const row = Math.floor(randCell / this.state.length);
    const col = randCell % this.state.length;
    this.setState({food: {r: row, c: col} });
    // update the board state to mark that cell with a food piece
  }



  render() {
    return (
      <div id='snakes-game-container'>
        <div id="game-options">
          <div id='game-btns'>
            {
              this.state.started ? null :
              <button onClick={this.handleStartClick} className="btn btn-default" id="toggle-start">Start!</button>
            }
            {
              this.state.started ? 
              <button onClick={this.togglePause} id="pause" className="btn btn-default">{this.state.paused ? "Continue" : "Pause"}</button> : null 
            }
            <button ref={el => this.endBtn = el} onClick={this.handleEndBtn} className='btn btn-default'>End</button>
          </div>
          <div onClick={this.changeGameDifficulty} id='game-difficulty'>
            <div id='easy'>Easy</div>
            <div id='medium'>Medium</div>
            <div id='hard'>Hard</div>
          </div>
          <div id='scoreboard'>
            <div id="curr-score">Curr score: {this.state.currScore}</div>
            <div id="your-best-score">Your best: {this.state.yourBest}</div>
          </div>
          <div id="best-ever-score">Leaderboard: {this.state.leader.user} - {this.state.leader.score}</div>
        </div>
        <div id="game-board">
          { this.genBoard() }
        </div>
      </div>
    )
  }
}