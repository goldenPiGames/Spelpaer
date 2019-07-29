const DUNGEON_FLOOR_Y = 600;
const DUNGEON_WIDTH = 900;

var Dungeon = {
	//type : "Dungeon",
	darknessImage : makeImage("src/DungeonAssets/Darkness.png"),
	activate : function() {
		dungeonScreen.begin(this);
	},
	getWallImage : function(floor, x, y, facing) {
		return this.wallImages[(60 + floor + x + y + facing) % this.wallImages.length];
	},
	enterRoomEvent : function(floor, x, y) {},
	getBattleWeatherObject : function() {
		return new BlankUIObject();
	}
}

//----------------------------------------- Into Dungeon ----------------------------------------
var intoDungeonPOI = function(name, description, dungeon, floor, x, y, facing) {
	this.type = "Dungeon";
	this.name = name;
	this.description = description;
	this.activate = function() {
		dungeonScreen.begin(dungeon, floor, x, y, facing);
	}
}

//------------------------------------- Dungeon POI ------------------------------------
var DungeonPOI = function(x, y, image, hoverText = null, handler = doNothing) {
	this.image = image;
	this.hoverText = hoverText;
	this.width = image.width;
	this.height = image.height;
	this.x = x;
	this.y = y;
	if (isDialogLine(handler) || typeof handler == "string" || Array.isArray(handler)) {
		let dia = Array.prototype.slice.call(arguments, 4);
		this.handler = function(){dialog.begin(dia);};
	} else
		this.handler = handler;
}
DungeonPOI.prototype = Object.create(UIObjectBase);

DungeonPOI.prototype.update = function() {
	this.updateStats(ctx);
	if (this.hovered) {
		infoField.setText(this.hoverText);
	}
	if (this.clicked && wasNotClicked) {
		this.handler();
	}
}

DungeonPOI.prototype.draw = function() {
	drawSprite(this.image, this.x, this.y);
}

//------------------------------------- Door --------------------------------------------
var DOOR_HOVER = "This negative object which stands before you is in all likelihood a doorway of some variety.";

var BasicDoor = function(image) {
	this.image = image;
	this.width = image.width;
	this.height = image.height;
	this.x = DUNGEON_WIDTH/2 - this.width/2;
	this.y = DUNGEON_FLOOR_Y - this.height;
}
BasicDoor.prototype = Object.create(UIObjectBase);

BasicDoor.prototype.update = function() {
	this.updateStats();
	if (this.hovered) {
		infoField.setText(DOOR_HOVER);
	}
	if (this.clicked && wasNotClicked) {
		dungeonScreen.enterDoor();
	}
}

BasicDoor.prototype.draw = function() {
	drawSprite(this.image, this.x, this.y);
}

//------------------------------------- Dungeon Exit --------------------------------------------
var EXIT_HOVER = "This is the exit out of the dungeon.";

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
	this.updateStats(ctx);
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
}