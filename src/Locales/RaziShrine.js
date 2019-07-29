var RaziShrine = {
	__proto__ : Locale,
    name : "Razi Shrine",
	description : "A shrine dedicated to weather. Contains several spells related to the protection from and control of weather.",
	//image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Fuji",
	x : 285,
	y : 225,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		pois.push(new intoDungeonPOI("Interior", "The interior of the Razi Shrine, carved into the mountain.", RaziShrineInterior, 0, 0, 0, 1));
		return pois;
	},
	firstArriveEvent : function() {
	},
	population : 0,
	getWeatherObject : getDefaultRain
}

filePrefix = "src/DungeonAssets/RaziShrine/";
var RaziShrineInterior = {
	__proto__ : Dungeon,
	name : "Departure Shrine",
	description : "The interior of the Razi Shrine, carved into the mountain.",
	music : "Hong Kong Midnight",
	wallImages : [makeImage(filePrefix+"Wall0.png")],
	doorImage : makeImage(filePrefix+"Door.png"),
	windowBackImg : makeImage(filePrefix+"WindowBack.png"),
	windowFrontImg : makeImage(filePrefix+"WindowFront.png"),
	getPOIs : function(floor, x, y, facing) {
		var thisser = this;
		var pois = [];
		switch(floor+","+x+","+y+","+facing) {
		//Entrance Room
			case "0,0,0,0": pois.push(new BasicDoor(this.doorImage)); break;
			case "0,0,0,3": pois.push(new DungeonExit(RaziShrine, this.doorImage)); break;
		//Meditation Room
			case "0,0,-1,2": pois.push(new BasicDoor(this.doorImage)); break;
			case "0,0,-1,3": pois.push(new DungeonPOI(100, 100, this.windowBackImg, "This window offers a nice view of the surrounding landscape."),
					new RainWindow(108, 108, 184, 234, -0.5, 32, 0.5, "#8090B0", 1.0),
					new DungeonPOI(100, 100, this.windowFrontImg)); break;
		}
		return pois;
	},
	enterDungeonEvent : function() {
		
	},
	enterRoomEvent : function(floor, x, y) {
		
	},
}