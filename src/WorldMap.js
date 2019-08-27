const MAP_WATER_COLOR = "#00A2E8";

class WorldMapScreen extends Screen {
	constructor() {
		super();
		var mapWidth = settings.width-200;
		var mapHeight = mainHeight();
		this.map = new WorldMapMap(mapWidth, mapHeight);
		this.hideButton = new Button(mapWidth+10, mapHeight-100, 180, 45, "Hide", "Mouse over to hide all locales and paths, showing only the physical landscape.");
		this.backButton = new Button(mapWidth+10, mapHeight-50, 180, 45, "Back", "Return to the Locale", ()=>currentLoc.buildScreen());
		this.centerButton = new Button(mapWidth+10, mapHeight-150, 180, 45, "Center", "Center the camera on your current location.", ()=>this.map.centerOnCurrent());
		this.zoomSlider = new Slider(mapWidth+10, 20, 180, 30, "Zoom", "Use this slider to adjust the zoom. You can also scroll.", this.map.minZoom, this.map.maxZoom, val=>this.map.setZoom(Math.round(val*4)/4), ()=>this.map.zoom); //TODO scroll events
		this.objects = [this.backButton, this.hideButton, this.centerButton, this.zoomSlider];
		this.map.centerOnCurrent();
		if (!getFlag("beginningTalkToClaire")) {
			dialog.begin(
				new DialogLine("Player", null, "This is no time to be leaving."),
				function(){Pocutop.buildScreen();});
			return;
		}
		if (!getFlag("seenWorldMap")) {
			setFlag("seenWorldMap");
			this.hideButton.hovered = false;
			/*dialog.begin(
				"This is the World Map. As you can see, it's quite expansive, but until you complete the Departure Trial, you'll be seeing only a very small part of it.",
				"Your current location is shown by the green-filled circle. In this case, see all the way to the west, inside the grey circle.",
				"The circles are Locales, which are towns, villages, dungeons, waypoints, and other landmarks. White means you've been there, and transparent grey means you haven't.",
				"Lines represent paths, which are roads, trails, or simply the most direct route over an open field. Each path connects two locales.",
				"Many paths can be traveled along from either of its two connections. Some, however, are hidden or locked somehow, and must be made available somehow. "+InceptiveTrailWest.available?"For example, you unlocked Inceptive Trail (West) when you spoke to Doctor Clair.":"Inceptive Trail (West), the only path leading out of Pocutop, is unavailable. You'll need to talk to Doctor lair.",
				"You can mouse over a path to learn its length and encounter level. The typical path will have a random encounter about every "+TYPICAL_ENCOUNTER_DELAY+" distance.",
				"To begin traveling, just click on any Locale connected to yours by an available path.");
				*/
		}
	}
	update() {
		advanceTime(1, true);
		this.map.update();
		this.objects.forEach(oj => oj.update());
	}
	draw() {
		clearBack();
		this.map.draw(!this.hideButton.hovered)
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.map.x + this.map.width, 0, settings.width - this.map.x + this.map.width + 1, mainHeight());
		this.objects.forEach(oj => oj.draw());
	}
}

class WorldMapMap extends DynamicCamera {
	constructor(width, height) {
		super(0, 0, width, height);
	}
	update() {
		super.update();
		LOCALES.forEach(dab => dab.updatePoint(this));
		PATHS.forEach(dab => dab.updateLine(this));
	}
	draw(polit) {
		ctx.globalAlpha = 1;
		ctx.fillStyle = MAP_WATER_COLOR;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.drawImage(this.fullMapImg, this.drawX(0), this.drawY(0), this.fullMapImg.width*this.zoom, this.fullMapImg.height*this.zoom); 
		if (polit) {
			PATHS.forEach(dab => dab.drawLine(this));
			LOCALES.forEach(dab => dab.drawPoint(this));
		}
	}
	centerOnCurrent() {
		this.center(currentLoc.x, currentLoc.y);
	}
	localeClicked(loc) {
		var interPath = currentLoc.pathTo(loc);
		if (interPath) {
			/*if (interPath.underwater) {
				if (bluh) {
					pathScreen.begin(interPath);
				} else if (player.spells.includes(WaterBreathing)) {
					dialog.begin(WaterBreathing.execute(player, player));
				} else {
					dialog.begin("The path to this locale is underwater. You must be able to breath water in order to travel there.");
				}
				return;
			}*/
			beginPath(interPath);
		}
	}
}
WorldMapMap.prototype.fullMapImg = makeImage("src/WorldMap.png"),
WorldMapMap.prototype.draggable = true;
WorldMapMap.prototype.minZoom = .5;
WorldMapMap.prototype.maxZoom = 3;
