'use strict';
const SIZE = 10;
const WALL = '#';
const EMPTY = ' ';
const FOOD = '▪';
const SUPER = '⚪';
const CHERRY = '🍒';

var gIntervalCherry;
var gNumOfEeatableItems;
var gBoard;
var gGame = {
	score: 0,
	isOn: false,
};

function init() {
	console.log('***INITIALIZE GAME***');
	gGame = { score: 0, isOn: true};
	gNumOfEeatableItems = -1; //every cell is an option if it isnt contains pacman itself
	gBoard = buildBoard();
	createPacman(gBoard);
	createGhosts(gBoard);
	printMat(gBoard, '.board-container');
	gIntervalCherry = setInterval(addCherry, 15000);
	
	//HTML UPDATE
	document.querySelector('.game-over').style.display = "none";
	document.querySelector('.img-game-over').style.display = "none";
	document.querySelector('.img-victorious').style.display = "none";
}

function buildBoard() {
	var board = [];
	for (var i = 0; i < SIZE; i++) {
		board.push([]);
		for (var j = 0; j < SIZE; j++) {
			if (isWallCell(i, j)) board[i][j] = WALL;
			else {
				board[i][j] = FOOD;
				gNumOfEeatableItems++;
			}
		}
	}
    board[1][1] = board[1][SIZE - 2] = board[SIZE - 2][1] = board[SIZE - 2][SIZE - 2] = SUPER;
    return board;
}

function isWallCell(i, j) {
	return (
		i === 0 ||
		i === SIZE - 1 ||
		j === 0 ||
		j === SIZE - 1 ||
		(j === 3 && i > 4 && i < SIZE - 2)
	);
}

function updateScore(diff) {
    if (--gNumOfEeatableItems !== 0){
    	gGame.score += diff;
	    document.querySelector('.score span').innerText = gGame.score;
    }
    else {
        console.log(`****PACMAN WON****\nthere aren't more edible items at board!`);
		document.querySelector('.img-victorious').style.display="block"
		return gameOver();
    }
}

function gameOver() {
	console.log('Game Over');
	gGame.isOn = false;
	clearInterval(gIntervalGhosts);
	clearInterval(gIntervalCherry);
	document.querySelector('.game-over').style.display="inline-block"
	document.querySelector('.img-game-over').style.display="block"
}

function addCherry() {
	var cherryLocation = getRandomEmptyLocation();
	while (!cherryLocation) cherryLocation = getRandomEmptyLocation();
	console.log(`cherry added randomly to board at location ${cherryLocation.i},${cherryLocation.j}`);
    if (gBoard[cherryLocation.i][cherryLocation.j] === EMPTY) gNumOfEeatableItems++;
	//MODEL
	gBoard[cherryLocation.i][cherryLocation.j] = CHERRY;
	//DOM
	renderCell(cherryLocation, CHERRY);
}
