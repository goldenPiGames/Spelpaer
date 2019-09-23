class PipePath extends DungeonObject {
	constructor(level, x, y, width, solveFunction = doNothing) {
		var pipeData = level.pipeData;
		var pipeSize = width / pipeData.length;
		super(x, y, width, pipeData[0].length * pipeSize); 
		this.level = level;
		this.pieces = [];
		for (var i = 0; i < pipeData.length; i++) {
			this.pieces[i] = [];
			for (var j = 0; j < pipeData[i].length; j++) {
				this.pieces[i][j] = new PipePiece(x + i * pipeSize, y + j * pipeSize, pipeSize, pipeData[i][j]);
			}
		}
		this.entranceSide = level.entranceSide;
		this.entrancePosition = level.entrancePosition;
		this.exitSide = level.exitSide;
		this.exitPosition = level.exitPosition;
		this.pipeSize = pipeSize;
		this.solved = false;
		this.solveFunction = solveFunction;
	}
	update(cam) {
		super.update(cam);
		if (!this.solved) {
			this.pieces.forEach(function(item1, index1, array1) {
				item1.forEach(function(item2, index2, array2) {
					item2.update(cam);
				});
			});
			//evaluations
			var d = (this.entranceSide + 2) % 4;
			var x;
			var y;
			switch (this.entranceSide) {
				case 0: x = this.entrancePosition;
						y = -1;
						break;
				case 1: x = this.pieces.length;
						y = this.entrancePosition;
						break;
				case 2: x = this.entrancePosition;
						y = this.pieces[0].length;
						break;
				case 3: x = -1;
						y = this.entrancePosition;
						break;
			}
			var i = 0;
			while (i < 100) {
				i++;
				x += directionDX(d);
				y += directionDY(d);
				if (x < 0 || y < 0 || x >= this.pieces.length || y >= this.pieces[0].length) {
					if (d == this.exitSide && (x == this.exitPosition || y == this.exitPosition)) {
						this.solved = true;
						this.pieces.forEach(function(item1, index1, array1) {
							item1.forEach(function(item2, index2, array2) {
								item2.hovered = false;
							});
						});
						this.solveFunction();
					}
					return;
				}
				d = (this.pieces[x][y]).outFrom(d);
				if (d == null) {
					return;
				}
			}
		}
	}
	draw(cam) {
		this.drawEntrance(cam, this.entranceSide, this.entrancePosition);
		this.drawEntrance(cam, this.exitSide, this.exitPosition);
		cam.fillRect(this.x, this.y, this.width, this.height, settings.background_color);
		
		this.pieces.forEach(function(item1, index1, array1) {
			item1.forEach(function(item2, index2, array2) {
				item2.draw(cam);
			});
		});
	}
	drawEntrance(cam, side, position) {
		ctx.strokeStyle = settings.normal_color;
		ctx.fillStyle = settings.background_color;
		let x;
		let y;
		switch (side) {
			case 1: y = this.y + this.pipeSize * (position + 3/8);
					cam.fillRect(this.x + this.width, y, this.pipeSize/2, this.pipeSize/4);
					cam.drawLine(this.x + this.width, y, this.x + this.width + this.pipeSize/2, y);
					cam.drawLine(this.x + this.width, y + this.pipeSize/4, this.x + this.width + this.pipeSize/2, y + this.pipeSize/4);
					break;
			case 3: y = this.y + this.pipeSize * (position + 3/8);
					cam.fillRect(this.x - this.pipeSize/2, y, this.pipeSize/2, this.pipeSize/4);
					cam.drawLine(this.x, y, this.x - this.pipeSize/2, y);
					cam.drawLine(this.x, y + this.pipeSize/4, this.x - this.pipeSize/2, y + this.pipeSize/4);
					break;
		}
		ctx.stroke();
	}
}
//----------------------------------------------------------- Pipe Piece ----------------------------------------------------------------------------

class PipePiece extends DungeonObject {
	constructor(x, y, size, type) {
		super(x, y, size, size);
		this.type = type;
		this.rotation = Math.floor(Math.random() * (type == 0 ? 2 : 4));
		this.hoverText = "Click on this pipe piece to rotate it clockwise. Make a path from start to finish to complete the puzzle.";
	}
	update(cam) {
		this.updateMouse(cam);
		if (this.hovered) {
			infoField.setText(this.hoverText);
		}
		if (this.clicked) {
			this.rotation = (this.rotation + 1) % (this.type == 0 ? 2 : 4);
		}
	}
	draw(cam) {
		ctx.strokeStyle = this.hovered ? settings.hover_color : settings.normal_color;
		//ctx.lineWidth = 2 * cam.zoom;
		if (this.type) {
			switch (this.rotation) {
				case 0: cam.drawArc(this.x + this.width, this.y, this.width * 3/8, Math.PI/2, Math.PI, 2);
						cam.drawArc(this.x + this.width, this.y, this.width * 5/8, Math.PI/2, Math.PI, 2);
						break;
				case 1: cam.drawArc(this.x + this.width, this.y + this.height, this.width * 3/8, Math.PI, 3*Math.PI/2, 2);
						cam.drawArc(this.x + this.width, this.y + this.height, this.width * 5/8, Math.PI, 3*Math.PI/2, 2);
						break;
				case 2: cam.drawArc(this.x, this.y + this.height, this.width * 3/8, 3*Math.PI/2, 2*Math.PI, 2);
						cam.drawArc(this.x, this.y + this.height, this.width * 5/8, 3*Math.PI/2, 2*Math.PI, 2);
						break;
				case 3: cam.drawArc(this.x, this.y, this.width * 3/8, 0, Math.PI/2, 2);
						cam.drawArc(this.x, this.y, this.width * 5/8, 0, Math.PI/2, 2);
						break;
			}
		} else {
			if (this.rotation % 2) {
				cam.drawLine(this.x, this.y + this.height * 3/8, this.x + this.width, this.y + this.height * 3/8);
				cam.drawLine(this.x, this.y + this.height * 5/8, this.x + this.width, this.y + this.height * 5/8);
			} else {
				cam.drawLine(this.x + this.width * 3/8, this.y, this.x + this.width * 3/8, this.y + this.height);
				cam.drawLine(this.x + this.width * 5/8, this.y, this.x + this.width * 5/8, this.y + this.height);
			}
		}
	}
	outFrom(into) {
		switch (this.type+","+this.rotation+":"+into) {
			case "0,0:0": return 0;
			case "0,0:2": return 2;
			case "0,1:1": return 1;
			case "0,1:3": return 3;
			case "1,0:2": return 1;
			case "1,0:3": return 0;
			case "1,1:0": return 1;
			case "1,1:3": return 2;
			case "1,2:0": return 3;
			case "1,2:1": return 2;
			case "1,3:1": return 0;
			case "1,3:2": return 3;
			default : return null;
		}
	}
}

/*function directionDX(direction) {
	switch (direction) {
		case 0: return 0;
		case 1: return 1;
		case 2: return 0;
		case 3: return -1;
	}
}
function directionDY(direction) {
	switch (direction) {
		case 0: return -1;
		case 1: return 0;
		case 2: return 1;
		case 3: return 0;
	}
}*/
