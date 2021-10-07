'use strict';
var gPacman;
const PACMAN = '😃';

function createPacman(board) {
	gPacman = {
		location: { i: 3, j: 5, },
		isSuper: false,
	};
	board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
	if (gGame.isOn) {
		var nextLocation = getNextLocation(ev);
		if (!nextLocation) return;
		var nextCell = gBoard[nextLocation.i][nextLocation.j];
		switch (nextCell) {
			case WALL:
				return;
			case FOOD:
				updateScore(1);
				break;
			case CHERRY:
				updateScore(10);
				break;
			case SUPER:
				{
					updateScore(1);
					if (!gPacman.isSuper) {
						toggleSuperMode();
						setTimeout(toggleSuperMode, 5000);
					}
				}
				break;
			case GHOST: {
				renderCell(gPacman.location, EMPTY);
				gameOver();
				return;
			}
			case DEAD_GHOST: {
				var idx = getGhostByLocation(nextLocation);
				var ghostCurrCellContent = gGhosts[idx].currCellContent;
				if ([FOOD, SUPER].includes(ghostCurrCellContent)) updateScore(1);
				else if (ghostCurrCellContent === CHERRY) updateScore(10);
				gGhosts.splice(idx, 1);
			}
			default:
				break;
		}
		// CURRENT CELL UPDATE:
		// MODEL
		gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
		// DOM
		renderCell(gPacman.location, EMPTY);

		// NEW CELL UPDATE
		gPacman.location = nextLocation;
		// MODEL
		gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
		// DOM
		renderCell(gPacman.location, getPacmanHTML());
	}
}

function toggleSuperMode() {
	gPacman.isSuper = !gPacman.isSuper;
	console.log(gPacman.isSuper ? `IN SUPER MODE` : `SUPER MODE ENDS` );
	for (var i = 0; i < gGhosts.length; i++) {
		gGhosts[i].isDead = gPacman.isSuper;
		gBoard[gGhosts[i].location.i][gGhosts[i].location.j] = gGhosts[i].isDead ? DEAD_GHOST : GHOST;
		renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
	}
}

function getNextLocation(eventKeyboard) {
	var nextLocation = {
		i: gPacman.location.i,
		j: gPacman.location.j,
	};
	switch (eventKeyboard.code) {
		case 'ArrowUp':
			nextLocation.i--;
			break;
		case 'ArrowDown':
			nextLocation.i++;
			break;
		case 'ArrowLeft':
			nextLocation.j--;
			break;
		case 'ArrowRight':
			nextLocation.j++;
			break;
		default:
			return null;
	}
	return nextLocation;
}

function getPacmanHTML() {
	return '<div class="cell pacman"></div>';
}
