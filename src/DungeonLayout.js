class SquareDungeonLayout {
	constructor(matrix) {
		this.entrances = [];
		console.log(matrix)
		this.matrix = matrix;
		for	(let f = 0; f < matrix.length; f++) {
			for	(let x = 0; x < matrix[f].length; x++) {
				//console.log(f, x);
				for	(let y = 0; y < matrix[f][x].length; y++) {
					if (matrix[f][x][y] != null) {
						for (let d = 0; d < 4; d++) {
							let curr = matrix[f][x][y][d];
							curr.positionText = f+"F,"+x+","+y+","+directionInitial(d);
							curr.toLeft = matrix[f][x][y][(d+3)%4];
							curr.toRight = matrix[f][x][y][(d+1)%4];
							let door = curr.objects.find(oj=>oj instanceof BasicDoor);
							//console.log(f, x, y, d)
							if (door)
								door.destination = matrix[f][x+directionDX(d)][y+directionDY(d)][d];
							if (curr.entrance)
								this.entrances[matrix[f][x][y][d].entrance] = matrix[f][x][y][d];
						}
					}
				}
			}
		}
	}
	getEntrance(index) {
		return (this.entrances[index]);
	}
}

class DungeonWall {
	constructor(wallImg, objects, others) {
		this.wallImg = wallImg;
		this.objects = objects;
		for (var thing in others) {
			this[thing] = others[thing];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
		}
	}
}

function directionDX(direction) {
	switch (direction) {
		case 0: return 0; break;
		case 1: return 1; break;
		case 2: return 0; break;
		case 3: return -1; break;
	}
}

function directionDY(direction) {
	switch (direction) {
		case 0: return -1; break;
		case 1: return 0; break;
		case 2: return 1; break;
		case 3: return 0; break;
	}
}

function directionName(direction, caps = true) {
	var name;
	switch (direction) {
		case 0: name = "North"; break;
		case 1: name = "East"; break;
		case 2: name = "South"; break;
		case 3: name = "West"; break;
	}
	if (!caps)
		return name.toLowerCase();
	return name;
}

function directionInitial(direction) {
	return directionName(direction)[0];
}