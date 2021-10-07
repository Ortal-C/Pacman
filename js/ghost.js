'use strict';
const NUM_OF_GHOSTS = 3;
const GHOST = '👻';
const DEAD_GHOST = 'XX';

var gGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
	var ghost = {
		location: { i: 3, j: 3, },
		color: getRandomColor(),
		currCellContent: FOOD,
		isDead: false,
	};
	gGhosts.push(ghost);
	board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
	gGhosts = [];
	for (var i = 0; i < NUM_OF_GHOSTS; i++) createGhost(board);
	gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
	for (var i = 0; i < gGhosts.length; i++) {
		moveGhost(gGhosts[i]);
	}
}

function moveGhost(ghost) {
	var moveDiff = getMoveDiff();
	var nextLocation = {
		i: ghost.location.i + moveDiff.i,
		j: ghost.location.j + moveDiff.j,
	};
	var nextCell = gBoard[nextLocation.i][nextLocation.j];
	if ([WALL,GHOST,DEAD_GHOST].includes(nextCell)) return;
	if (nextCell === PACMAN){
		if (gPacman.isSuper) return;
		else return gameOver()
	}

	// model
	gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
	if (  ghost.currCellContent === PACMAN) debugger
	// dom
	renderCell(ghost.location, ghost.currCellContent);

	// model
	ghost.location = nextLocation;
	ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
	gBoard[ghost.location.i][ghost.location.j] = ghost.isDead ? DEAD_GHOST : GHOST;
	// dom
	renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
	var randNum = getRandomInt(1, 4);
	switch (randNum) {
		case 1: return { i: 0,	j: 1  };
		case 2: return { i: -1,	j: 0  };
		case 3: return { i: 0,	j: -1 };
		case 4: return { i: 1,	j: 0  };
		default: break;
	}
}

function getGhostByLocation(location){
	for (var i = 0; i < gGhosts.length; i++) {
		if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) return i;
	}
	return -1;
}

function getGhostHTML(ghost) {
	//returns html string of ghost
	var ghostColor = ghost.isDead ? 'darkblue' : ghost.color;
	return `<div class="ghost" style="background-color: ${ghostColor};">\n<div class="eyes">\n<div class="eye leftEye"><div class="iris"></div></div>\n<div class="eye rightEye"><div class="iris"></div></div>\n</div>\n<div class="ghostTail" style="background: linear-gradient(-12deg, transparent 75%, ${ghostColor} 75%) 0 25%, linear-gradient(12deg, transparent 75%, ${ghostColor} 75%) 0 25%;"></div>\n</div>`;
}