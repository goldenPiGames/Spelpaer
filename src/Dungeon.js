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
		new DungeonScreen().begin(dungeon, floor, x, y, facing);
	}
}
