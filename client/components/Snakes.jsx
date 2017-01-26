import React from 'react';

import { Queue } from '../Utils';

Array.prototype.fillWithFn = function(fn) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    this[i] = (fn());
  }
  return this;
}


export default class Snakes extends React.Component {
  constructor() {
    super();

    this.state = {
      started: false,
      paused: false,
      currScore: 0,
      yourBest: 0,
      leader: {user: '', score: 0},
      length: 31,
      level: 'easy',
      speed: 900,
      step: 50,
      foodValue: 10,
      multiplier: 1,
      board: new Array(31).fillWithFn(() => new Array(31).fill(2)),
      food: {r: null, c: null},
      newFood: {r: null, c: null},
      tailOnPiece: false,
      dir: 'right',
      showLeaderBoard: false
    }

    this.takenSpots = {};
    this.snakeLength = 1;
    this.dirQueue = new Queue();
    this.prevDir = 'right';
    this.snake = {head: {r: -1, c: -1}, tail: {r: -1, c: -1}};
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
    this.setMove = this.setMove.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.initSnake = this.initSnake.bind(this);
    this.toggleLeaderBoard = this.toggleLeaderBoard.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.eatPiece = this.eatPiece.bind(this);
    this.grow = this.grow.bind(this);
    this.isThisFood = this.isThisFood.bind(this);
    this.commenceRaving = this.commenceRaving.bind(this);
    this.pleaseNoMore = this.pleaseNoMore.bind(this);
    this.hoverRave = this.hoverRave.bind(this);
    this.stopHoverRave = this.stopHoverRave.bind(this);
  }

  componentDidMount() {
    Array.prototype.slice.call(this.scoreForm.querySelectorAll('input')).forEach(i => i.disabled = true);
    this.initSnake(this.state.board);
    this.endBtn.disabled = true;
    this.insaneTimers = {hover: null, click: null};
    this.insaneColors = [
      'red', 'orange', 'yellow', 'blue', 'violet', 'purple', 'green'
    ];
    this.currentColor = 0;
    this.areYouCrazy.addEventListener('mouseover', this.hoverRave);

    this.areYouCrazy.addEventListener('mouseout', this.stopHoverRave)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEvent);
    this.areYouCrazy.removeEventListener('mouseover', this.hoverRave)
    this.areYouCrazy.removeEventListener('mouseout', this.stopHoverRave)
  }

  pleaseNoMore(insanity) {
    // if (this.insaneTimers.hover === insanity) {
    //   console.log("Not your jam, huh. It's ok, the mountain tops are not meant for everyone ;)")
    // } else {
    //   console.log("Can't shuffle no mo'");
    // }
    clearInterval(insanity);
    if (this.insaneTimers.hover === insanity) this.insaneTimers.hover = null;
    else if (this.insaneTimers.click === insanity) this.insaneTimers.click = null;
    this.areYouCrazy.style.color = 'white';
    this.currentColor = 0;
  }

  hoverRave() {
    this.insaneTimers.hover = this.commenceRaving();
  }
  stopHoverRave() {
    this.pleaseNoMore(this.insaneTimers.hover);
  }

  commenceRaving(origin?) {
    if (origin === 'click' && this.insaneTimers.click !== null) {
      console.log('EAT, SLEEP, RAVE, REPEAT!!!!!!');
      return this.insaneTimers.click;
    }
    console.log('Eat, sleep, rave, repeat');
    return setInterval(() => {
      this.areYouCrazy.style.color = this.insaneColors[this.currentColor];
      this.currentColor++;
      this.currentColor %= this.insaneColors.length;
    }, 100);
  }

  initSnake(board) {
    const mid = Math.floor(board.length / 2);
    board[mid][mid] = 1;
    this.takenSpots = {};
    this.takenSpots[mid] = this.takenSpots[mid] || {};
    this.takenSpots[mid][mid] = 1;
    this.snake = {head: null, tail: null};
    this.snake.head = {r: mid, c: mid, prev: null, next: null};
    this.snake.tail = this.snake.head;
    this.setState({board});
  }

  resetGame(cb) {
    let speed, length, step, multiplier = 1;
    switch (this.state.level) {
      case 'easy': 
        speed = 900;
        length = 31;
        step = 50;
        break;
      case 'medium':
        speed = 500;
        length = 21;
        step = 50;
        break;
      case 'hard':
        speed = 300;
        length = 11;
        step = 50;
        break;
      case 'insane':
        speed = 200;
        length = 15;
        step = 30;
        multiplier = 2;
        break;
    }
    const board = new Array(length).fillWithFn(() => new Array(length).fill(2));
    this.initSnake(board);
    this.setState({length, speed, multiplier, step, currScore: 0, food: {r: null, c: null}, newFood: {r: null, c: null}}, cb);
    this.dirQueue = new Queue();
    this.snakeLength = 1;
  }

  summonFood() {
    const viableSpots = [];
    this.state.board.forEach((row, r) => {
      row.forEach((col, c) => {
        if (this.takenSpots[r] && this.takenSpots[r][c]) return;
        viableSpots.push(r * this.state.length + c);
      });
    });
    const randIdx = Math.floor(Math.random() * viableSpots.length);
    const randCell = viableSpots[randIdx];
    const row = Math.floor(randCell / this.state.length);
    const col = randCell % this.state.length;
    const oldFood = this.state.newFood.r === null ? {r: row, c: col} : this.state.newFood;
    this.setState({food: oldFood, newFood: {r: row, c: col} });
  }

  handleStartClick(evt) {
    this.startGame(evt);
  }

  startGame(evt) {
    window.addEventListener('keydown', this.handleKeyEvent);
    this.endBtn.disabled = false;
    evt.preventDefault();
    this.setState({ started: true});
    this.resetGame(() => {
      this.summonFood();
      this._moveSnake(this.moveSnake)
    });
    this.pauseMenu.style.display = 'none';
    this.gameOverMenu.style.display = 'none';
  }

  togglePause(evt) {
    evt.preventDefault();
    if (this.state.paused) {
      this._moveSnake(this.moveSnake);
      this.pauseMenu.style.display = 'none';
    }
    else {
      clearInterval(this.timer);
      this.pauseMenu.style.display = 'flex';
    }
    this.setState({paused: !this.state.paused});
  }

  handleEndBtn(evt) {
    evt.preventDefault();
    this.endGame();
  }

  gameOver() {
    this.endGame();
  }

  endGame() {
    this.endBtn.disabled = true;
    this.setState({started: false, paused: false});
    clearInterval(this.timer);
    
    this.gameOverMenu.style.display = 'flex';

    window.removeEventListener('keydown', this.handleKeyEvent);
  }

  changeGameDifficulty(evt) {
    if (this.state.started) return;

    const target = evt.target;

    switch (target.id) {
      case 'easy':
        target.classList.add('active');
        this.levelMedium.classList.remove('active');
        this.levelHard.classList.remove('active');
        this.areYouCrazy.classList.remove('active');
        this.pleaseNoMore(this.insaneTimers.click);
        return this.setState({level: 'easy', foodValue: 10}, this.resetGame);
      case 'medium':
        target.classList.add('active');
        this.levelEasy.classList.remove('active');
        this.levelHard.classList.remove('active');
        this.areYouCrazy.classList.remove('active');
        this.pleaseNoMore(this.insaneTimers.click);
        return this.setState({level: 'medium', foodValue: 30},this.resetGame);
      case 'hard':
        target.classList.add('active');
        this.levelEasy.classList.remove('active');
        this.levelMedium.classList.remove('active');
        this.areYouCrazy.classList.remove('active');
        this.pleaseNoMore(this.insaneTimers.click);
        return this.setState({level: 'hard', foodValue: 50}, this.resetGame);
      case 'omg':
        this.insaneTimers.click = this.commenceRaving('click');
        this.levelEasy.classList.remove('active');
        this.levelMedium.classList.remove('active');
        this.levelHard.classList.remove('active');
        return this.setState({level: 'insane', foodValue: 100000}, this.resetGame);
      default: return;
    }
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
        if (!this.state.started) this.startGame(evt);
        if (this.dirQueue.first() === 'up') return;
        return this.setMove('up');
      case right: 
        evt.preventDefault();
        if (!this.state.started) this.startGame(evt);
        if (this.dirQueue.first() === 'right') return;
        return this.setMove('right');
      case down: 
        evt.preventDefault();
        if (!this.state.started) this.startGame(evt);
        if (this.dirQueue.first() === 'down') return;
        return this.setMove('down');
      case left: 
        evt.preventDefault();
        if (!this.state.started) this.startGame(evt);
        if (this.dirQueue.first() === 'left') return;
        return this.setMove('left');
      default: return;
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

  setMove(dir) {
    this.dirQueue.enqueue(dir);
  }

  _moveSnake(moveFn) {
    clearInterval(this.timer);
    this.timer = setInterval(moveFn, this.state.speed);
  }

  moveSnake() {
    let dir;
    // check queue for next dir
    if (this.dirQueue.size()) {
      dir = this.dirQueue.dequeue();
      this.prevDir = dir;
    } else {
      // if nothing in queue, check prevDir
      dir = this.prevDir;
    }

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
        this.takenSpots[this.snake.head.r][this.snake.head.c] = 1;
        this.isThisFood();
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
        this.takenSpots[this.snake.head.r][this.snake.head.c] = 1;
        this.isThisFood();
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
        this.takenSpots[this.snake.head.r][this.snake.head.c] = 1;
        this.isThisFood();
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
        this.takenSpots[this.snake.head.r][this.snake.head.c] = 1;
        this.isThisFood();
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
      this.takenSpots[node.r][node.c] += 1;
      node = node.prev;
    }
    if (this.state.tailOnPiece) this.grow();
  }

  incrementScore() {
    const yourBest = Math.max(this.state.currScore + this.state.foodValue, this.state.yourBest);
    this.setState({currScore: this.state.currScore + this.state.foodValue, yourBest});
  }

  isThisFood() {
    if (this.snake.head.r === this.state.newFood.r && this.snake.head.c === this.state.newFood.c) this.eatPiece();
  }

  eatPiece() {
    this.incrementScore();
    this.summonFood();
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

  wasTailOnPiece() {
    if (this.state.tailOnPiece) {
      // this.grow();
    } 
  }

  grow() {
    this.snakeLength += 1;
    this.snake.tail.next = {r: this.state.food.r, c: this.state.food.c, next: null, prev: this.snake.tail};
    this.snake.tail = this.snake.tail.next;
    this.takenSpots[this.state.food.r] = this.takenSpots[this.state.food.r] || {};
    this.takenSpots[this.state.food.r][this.state.food.c] = this.snakeLength;
    
    let step = this.state.step;
    let newSpeed = this.state.speed - step;
    if (newSpeed <= step) {
      newSpeed = step;
    }
    this.setState({speed: newSpeed, foodValue: this.state.foodValue + this.state.multiplier, multiplier: this.state.multiplier * this.state.multiplier, food: {r: null, c: null}}, () => this._moveSnake(this.moveSnake));
  }

  genBoard() {

    return this.state.board.map((row, r) => (
      <div key={r} className="game-row">
        {
          row.map((cell, c) => {
            const opacity = this.takenSpots[r] && String(this.takenSpots[r][c]/(this.snakeLength+1));
            return (
              <div key={c} style={{opacity: (c === this.state.food.c && r === this.state.food.r && this.takenSpots[r] && this.takenSpots[r][c] ? opacity : 1) }} className={"game-cell" + " " +
                (
                  (c === this.snake.head.c && r === this.snake.head.r && c === this.state.food.c && r === this.state.food.r ? 'yellow' : '') ||
                  (c === this.snake.head.c && r === this.snake.head.r ? 'snake' : '') ||
                  (c === this.state.newFood.c && r === this.state.newFood.r ? 'blue' : '') ||
                  (this.takenSpots[r] && this.takenSpots[r][c] ? 'black' : '')
                )

              }></div>
            )
          })
        }
      </div>
    ))
  }

  submitScore(evt) {
    evt.preventDefault();
    console.log('TODO! -- submit score');
  }

  closeMenu() {
    this.pauseMenu.style.display = this.gameOverMenu.style.display = 'none';
  }

  toggleLeaderBoard() {
    this.setState({showLeaderBoard: !this.state.showLeaderBoard});
  }

  render() {
    return (
      <div id='snakes-game-container'>
        <div id="game-options">
          <div id='game-btns'>
            {
              this.state.started ? null :
              <button onClick={this.handleStartClick} className="btn btn-primary" id="toggle-start">Start!</button>
            }
            {
              this.state.started ? 
              <button onClick={this.togglePause} id="pause" className="btn btn-default">{this.state.paused ? "Continue" : "Pause"}</button> : null 
            }
            <button ref={el => this.endBtn = el} onClick={this.handleEndBtn} className='btn btn-danger'>End</button>
          </div>
          <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-end'}}>
            <div onClick={this.changeGameDifficulty} id='game-difficulty'>
              <div ref={el => this.areYouCrazy = el} id='omg'>INSANE</div>
              <div ref={el => this.levelEasy = el} id='easy'>Easy</div>
              <div ref={el => this.levelMedium = el} id='medium'>Medium</div>
              <div ref={el => this.levelHard = el} id='hard'>Hard</div>
            </div>
            <div>
              <div id='scoreboard'>
                <div id="curr-score">Curr score: {this.state.currScore}</div>
                <div id="your-best-score">Your best: {this.state.yourBest}</div>
              </div>
              <div id="best-ever-score">Leaderboard: {this.state.leader.score}</div>
            </div>
          </div>
        </div>
        <div id="game-board">
          { this.genBoard() }
          <div className="menu" ref={el => this.pauseMenu = el} id='pause-menu'>
            <div className="menu-title">Game Paused</div>
            <div className="menu-help">Press spacebar to continue</div>
            <div className="btn-container">
              <button onClick={this.togglePause} className="btn btn-default">Resume</button>
              <button onClick={this.handleEndBtn} className="btn btn-danger">End Game</button>
            </div>
          </div>
          <div className="menu" ref={el => this.gameOverMenu = el} id='game-over-menu'>
            <div className="menu-title">Game Over!</div>
            <div id="game-score">Score : {this.state.currScore} </div>
            <form ref={el=> this.scoreForm = el} onSubmit={this.submitScore} id="submit-score">
              <input className="form-control" placeholder="Coming soon!" />
              <input className="btn btn-default" type='submit' value="Submit!" />
            </form>
            <div id="leaderboard-toggle" onClick={this.toggleLeaderBoard}>
              {
                !this.state.showLeaderBoard ? 
                  <div>Show Leaderboard</div> :
                  <div>Hide Leaderboard</div>
              }
            </div>
            {
              this.state.showLeaderBoard ? 
              <div id='leaderboard'> 
                Coming soon!
              </div> : null
            }
            <div className="btn-container">
              <button onClick={this.startGame} className="btn btn-primary">Start Over</button>
              <button onClick={this.closeMenu} className="btn btn-default">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}