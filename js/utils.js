function printMat(mat, selector) {
	var ghostShows = 0;
	var strHTML = '<table border="0" align="center"><tbody>';
	for (var i = 0; i < mat.length; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < mat[0].length; j++) {
			var cell = mat[i][j];
			if (cell === PACMAN) cell = getPacmanHTML();
			if (cell === GHOST || cell === DEAD_GHOST) cell = getGhostHTML(gGhosts[ghostShows++]);
			var className = `cell cell${i}-${j} ${cell === WALL ? 'wall' : ''}`;
			strHTML += `<td class="${className}">${cell}</td>`;
		}
		strHTML += '</tr>';
	}
	strHTML += '</tbody></table>';
	var elContainer = document.querySelector(selector);
	elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
	document.querySelector(`.cell${location.i}-${location.j}`).innerHTML = value;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function getRandomEmptyLocation() {
	var rndI = getRandomInt(1, 8);
	var rndJ = getRandomInt(1, 10);
	return ([FOOD,EMPTY].includes(gBoard[rndI][rndJ])? { i: rndI, j: rndJ } : null);
}
