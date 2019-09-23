class DungeonObject {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	update(duncam) {
		this.updateMouse(duncam);
	}
	intersectsMouse(duncam) {
		return duncam.mouse.x >= this.x && duncam.mouse.x <= this.x + this.width && duncam.mouse.y >= this.y && duncam.mouse.y <= this.y + this.height;
	}
	updateMouse(duncam) {
		this.hovered = this.intersectsMouse(duncam);
		this.wasPressed = this.pressed;
		this.pressed = mouse.down && this.hovered;
		this.clicked = mouse.clicked && this.hovered;
		this.held = (this.clicked || (this.held && mouse.down));
	}
	shortcutForward() {
		return false;
	}
}

class DungeonScenery extends DungeonObject {
	constructor(x, y, image, hoverText, interact = doNothing) {
		super(x, y, image.width, image.height);
		this.image = image;
		this.hoverText = hoverText;
		if (typeof interact == "string" || interact instanceof DialogLine) {
			let dia = Array.prototype.slice.call(arguments, 4);
			this.handler = ()=>dialog.begin(dia);
		} else
			this.handler = interact;
	}
	update(cam) {
		super.update(cam);
		if (!this.width) {
			this.width = this.image.width;
			this.height = this.image.height;
		}
		if (this.hovered)
			infoField.setText(this.hoverText);
		if (this.clicked)
			this.handler();
	}
	draw(cam) {
		cam.drawSprite(this.image, this.x, this.y);
	}
}

class CustomDungeonObject extends DungeonObject {
	constructor(x, y, width, height, updatex, draw, stuff) {
		super(x, y, width, height);
		this.updatex = updatex;
		this.draw = draw;
		for (var im in stuff) {
			this[im] = stuff[im];
		}
	}
	update(cam) {
		super.update(cam);
		this.updatex(cam);
	}
}

//------------------------------------- Dungeon Exit --------------------------------------------
/*var EXIT_HOVER = "This is the exit out of the dungeon.";

var DungeonExit = function(destination, image) {
	this.destination = destination;
	this.image = image;
	this.width = image.width;
	this.height = image.height;
	this.x = 300 - this.width/2;
	this.y = 400 - this.height;
}
DungeonExit.prototype = Object.create(UIObjectBase);

DungeonExit.prototype.update = function(ctx) {
	this.updateMouse(ctx);
	if (this.hovered) {
		infoField.setText(EXIT_HOVER);
	}
	if (this.clicked && wasNotClicked) {
		dungeonActive = false;
		this.destination.arrive();
	}
}

DungeonExit.prototype.draw = function(ctx) {
	drawSprite(this.image, this.x, this.y);
}*/