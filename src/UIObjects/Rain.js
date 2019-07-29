var RainWindow = function(x, y, width, height, dx, dy, frequency, color = "#7080A0", thickness = 3) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.dx = dx;
	this.dy = dy;
	this.frequency = frequency;
	this.color = color;
	this.thickness = thickness;
	this.drops = [];
	for (var i = 0; i < this.height / this.dy; i++) {
		this.update();
	}
}
RainWindow.prototype = Object.create(UIObjectBase);

RainWindow.prototype.update = function(ctx) {
	
}

RainWindow.prototype.draw = function(ctx) {
	var makeDrops = PRound(this.frequency);
	var newDrop;
	for (var i = 0; i < makeDrops; i++) {
		newDrop = {x : 0, y : 0};
		newDrop.x = this.x + Math.random() * this.width;
		newDrop.y = this.y;
		this.drops.push(newDrop);
	}
	var i = 0;
	var currentDrop;
	while (i < this.drops.length) {
		currentDrop = this.drops[i];
		currentDrop.x += this.dx;
		currentDrop.y += this.dy;
		if (currentDrop.x > this.x + this.width || currentDrop.y < this.y || currentDrop.y > this.y + this.height) {
			this.drops.splice(i, 1);
		} else {
			i++;
		}
	}
	
	var thisser = this;
	ctx.strokeStyle = this.color;
	this.drops.forEach(function(drip) {
		ctx.beginPath();
		ctx.moveTo(drip.x - thisser.dx, drip.y - thisser.dy, thisser.thickness);
		ctx.lineTo(Math.min(Math.max(drip.x + thisser.dx, thisser.x), thisser.x + thisser.width), Math.min(drip.y + thisser.dy, thisser.y + thisser.height), thisser.thickness);
		ctx.stroke();
	});
}

var standardRain = new RainWindow(0, 0, 800, 450, -0.5, 32, 4.0, "#7080A0", 1.0);

function getDefaultRain() {
	return standardRain;
}

function getStandardRain() {
	return standardRain;
}

var standardBattleRain = new RainWindow(150, 50, 500, 300, -0.375, 12, 1.5, "#7080A0", 2);

function getStandardBattleRain() {
	return standardBattleRain;
}

/*
//--------------------------------------------------------- Raindrop ------------------------------------------
var Raindrop = function(x, y, maxx, maxy, dx, dy, width, color) {
	this.x = x;
	this.y = y;
	this.maxy = maxy;
	this.dx = dx;
	this.dy = dy;
	this.width = width;
	this.color = color;
	this.fade = 0;
}
Raindrop.prototype = Object.create(ParticleBase);

//Raindrop.prototype.staysOffSides = true;

Raindrop.prototype.draw = function(ctx) {
	if (this.y >= this.maxy) {
		this.die(); return;
	}
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.moveTo(this.x - this.dx, this.y - this.dy, this.width);
	ctx.lineTo(this.x + this.dx, this.y + this.dy, this.width);
	ctx.stroke();
}
*/