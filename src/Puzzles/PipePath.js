var PipePath = function(level, x, y, width, solveFunction = doNothing) {
	this.level = level;
	var pipeData = level.pipeData;
	var pipeSize = width / pipeData.length;
	this.pieces = [];
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = width * pipeData[0].length / pipeData.length;
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
PipePath.prototype = Object.create(UIObjectBase);

PipePath.prototype.update = function() {
	this.updateMouse();
	if (!this.solved) {
		this.pieces.forEach(function(item1, index1, array1) {
			item1.forEach(function(item2, index2, array2) {
				item2.update();
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
			x += dxOf(d);
			y += dyOf(d);
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

PipePath.prototype.draw = function() {
	this.drawEntrance(ctx, this.entranceSide, this.entrancePosition);
	this.drawEntrance(ctx, this.exitSide, this.exitPosition);
	ctx.fillStyle = "#000000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
	
	this.pieces.forEach(function(item1, index1, array1) {
		item1.forEach(function(item2, index2, array2) {
			item2.draw(ctx);
		});
	});
}

PipePath.prototype.drawEntrance = function(side, position) {
	ctx.strokeStyle = /*this.hovered ? settings.hover_color :*/ "#FFFFFF";
	ctx.fillStyle = "#000000";
	let x;
	let y;
	switch (side) {
		case 1: y = this.y + this.pipeSize * (position + 3/8);
				ctx.fillRect(this.x + this.width, y, this.pipeSize/2, this.pipeSize/4);
				ctx.moveTo(this.x + this.width, y);
				ctx.lineTo(this.x + this.width + this.pipeSize/2, y);
				ctx.moveTo(this.x + this.width, y + this.pipeSize/4);
				ctx.lineTo(this.x + this.width + this.pipeSize/2, y + this.pipeSize/4);
				break;
		case 3: y = this.y + this.pipeSize * (position + 3/8);
				ctx.fillRect(this.x - this.pipeSize/2, y, this.pipeSize/2, this.pipeSize/4);
				ctx.moveTo(this.x, y);
				ctx.lineTo(this.x - this.pipeSize/2, y);
				ctx.moveTo(this.x, y + this.pipeSize/4);
				ctx.lineTo(this.x - this.pipeSize/2, y + this.pipeSize/4);
				break;
	}
	ctx.stroke();
}

//----------------------------------------------------------- Pipe Piece ----------------------------------------------------------------------------

var PipePiece = function(x, y, size, type) {
	this.x = x;
	this.y = y;
	this.width = size;
	this.height = size;
	this.type = type;
	this.rotation = Math.floor(Math.random() * (type == 0 ? 2 : 4));
	this.hoverText = "Click on this pipe piece to rotate it clockwise. Make a path from start to finish to complete the puzzle.";
}
PipePiece.prototype = Object.create(UIObjectBase);

PipePiece.prototype.update = function() {
	this.updateMouse(ctx);
	if (this.hovered && this.hoverText != undefined) {
		infoField.setText(this.hoverText);
	}
    if (this.clicked && wasNotClicked) {
		this.rotation = (this.rotation + 1) % (this.type == 0 ? 2 : 4);
	}
}

PipePiece.prototype.draw = function() {
	ctx.strokeStyle = this.hovered ? settings.hover_color : "#FFFFFF";
	if (this.type) {
		ctx.beginPath();
		switch (this.rotation) {
			case 0: ctx.arc(this.x + this.width, this.y, this.width * 3/8, Math.PI/2, Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(this.x + this.width, this.y, this.width * 5/8, Math.PI/2, Math.PI);
					break;
			case 1: ctx.arc(this.x + this.width, this.y + this.height, this.width * 3/8, Math.PI, 3*Math.PI/2);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(this.x + this.width, this.y + this.height, this.width * 5/8, Math.PI, 3*Math.PI/2);
					break;
			case 2: ctx.arc(this.x, this.y + this.height, this.width * 3/8, 3*Math.PI/2, 2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(this.x, this.y + this.height, this.width * 5/8, 3*Math.PI/2, 2*Math.PI);
					break;
			case 3: ctx.arc(this.x, this.y, this.width * 3/8, 0, Math.PI/2);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(this.x, this.y, this.width * 5/8, 0, Math.PI/2);
					break;
			default : doNothing();
		}
		ctx.stroke();
	} else {
		if (this.rotation % 2) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y + this.height * 3/8);
			ctx.lineTo(this.x + this.width, this.y + this.height * 3/8);
			ctx.moveTo(this.x, this.y + this.height * 5/8);
			ctx.lineTo(this.x + this.width, this.y + this.height * 5/8);
			ctx.stroke();
		} else {
			ctx.beginPath();
			ctx.moveTo(this.x + this.width * 3/8, this.y);
			ctx.lineTo(this.x + this.width * 3/8, this.y + this.height);
			ctx.moveTo(this.x + this.width * 5/8, this.y);
			ctx.lineTo(this.x + this.width * 5/8, this.y + this.height);
			ctx.stroke();
		}
	}
}

PipePiece.prototype.outFrom = function(into) {
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

function dxOf(direction) {
	switch (direction) {
		case 0: return 0;
		case 1: return 1;
		case 2: return 0;
		case 3: return -1;
	}
}

function dyOf(direction) {
	switch (direction) {
		case 0: return -1;
		case 1: return 0;
		case 2: return 1;
		case 3: return 0;
	}
}

var PipeLevel1 = {
	pipeData : [
	[1,0,1,0,1],
	[0,1,1,1,0],
	[1,1,1,0,1],
	[0,1,0,1,0],
	[1,0,0,1,0],
	[1,1,0,1,1],
	],
	entranceSide : 3,
	entrancePosition : 2,
	exitSide : 1,
	exitPosition : 1
}