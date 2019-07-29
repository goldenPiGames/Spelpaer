const MAP_WATER_COLOR = "#00A2E8";

function WorldMap() {
	zoom = 1,
	this.mainWidth = settings.width-200;
	this.mainHeight = mainHeight();
	this.centerX = currentLoc.x;
	this.centerY = currentLoc.y;
	this.hideButton = new Button(this.mainWidth+10, mainHeight()-100, 180, 45, "Hide", "Mouse over to hide all locales and paths, showing only the physical landscape.");
	this.backButton = new Button(this.mainWidth+10, mainHeight()-50, 180, 45, "Back", "Return to the Locale", ()=>currentLoc.buildScreen());
	this.zoomSlider = new Slider(this.mainWidth+10, 20, 180, 30, "Zoom", "Use this slider to adjust the zoom.", .5, 3, val=>this.zoom = val, ()=>this.zoom);
	this.objects = [this.backButton, this.hideButton, this.zoomSlider];
}
WorldMap.prototype = Object.create(ScreenBase);
WorldMap.prototype.fullMapImg = makeImage("src/WorldMap.png"),
WorldMap.prototype.beginFromCurrentLocale = function() {
	switchScreen(this);
	var thisser = this;
	runnee = this;
	this.zoom = 1;
	//this.info.show(null);
	/*PATHS.forEach(function(dab){
		dab.updateLine(null, thisser);
	});
	LOCALES.forEach(function(dab){
		dab.updatePoint(null, thisser);
	});*/
	LOCALES.forEach(dab => dab.updatePoint(thisser));
	PATHS.forEach(dab => dab.updateLine(thisser));
	if (!Flags.beginningTalkToClaire) {
		dialog.begin(
			new DialogLine("Player", null, "This is no time to be leaving."),
			function(){Pocutop.buildScreen();});
		return;
	}
	if (!Flags.seenWorldMap) {
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
WorldMap.prototype.update = function() {
	advanceTime(1);
	var thisser = this;
	//this.info.show(null);
	//this.litPathYet = false;
	this.objects.forEach(oj => oj.update());
	this.clicked = mouse.clicked && mouse.x <= this.mainWidth && mouse.y <= this.mainHeight;
	this.held = this.clicked || (mouse.down && this.held);
	if (this.held) {
		this.centerX += (mouse.lastX - mouse.x) / this.zoom;
		this.centerY += (mouse.lastY - mouse.y) / this.zoom;
	}
	LOCALES.forEach(dab => dab.updatePoint(thisser));
	PATHS.forEach(dab => dab.updateLine(thisser));
}
WorldMap.prototype.draw = function() {
	clearBack();
	ctx.globalAlpha = 1;
	ctx.fillStyle = MAP_WATER_COLOR;
	ctx.fillRect(0, 0, this.mainWidth, mainHeight());
	ctx.drawImage(this.fullMapImg, this.drawX(0), this.drawY(0), this.fullMapImg.width*this.zoom, this.fullMapImg.height*this.zoom); 
	var thisser = this;
	if (!this.hideButton.hovered) {
		PATHS.forEach(dab => dab.drawLine(thisser));
		LOCALES.forEach(dab => dab.drawPoint(thisser));
	}
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(this.mainWidth, 0, settings.width-this.mainWidth, this.mainHeight);
	this.objects.forEach(oj => oj.draw());
}
WorldMap.prototype.localeClicked = function(loc) {
	var interPath = currentLoc.pathTo(loc);
	if (interPath) {
		if (interPath.underwater) {
			if (player.getStat("waterbreathing") > .5) {
				pathScreen.begin(interPath);
			} else if (player.spells.includes(WaterBreathing)) {
				dialog.begin(WaterBreathing.execute(player, player, battleOutOfBattle));
			} else {
				dialog.begin("The path to this locale is underwater. You must be able to breath water in order to travel there.");
			}
			return;
		}
		beginPath(interPath);
	}
}
WorldMap.prototype.drawX = function(realX) {
	return (realX - this.centerX) * this.zoom + this.mainWidth/2;
}
WorldMap.prototype.drawY = function(realY) {
	return (realY - this.centerY) * this.zoom + mainHeight()/2;
}
/*WorldMap.prototype.info = {
	__proto__ : UIObjectBase,
	x : 5,
	y : 5,
	width : 290,
	height : 440,
	update : function() {
		this.x = mouse.x <= canvas.width/2 ? 700 - this.width - this.y*2 : this.y;
	},
	draw : function() {
		if (this.thing == null)
			return;
		ctx.fillStyle = settings.background_color;
		ctx.strokeStyle = settings.normal_color;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		ctx.fillStyle = settings.normal_color;
		ctx.font = "20px "+settings.font;
		ctx.fillText(this.thing.name, this.x + 5, this.y + 5);
		
		if (this.thing.isLocale) {
			
		} else {
			ctx.fillText("Distance: "+this.thing.distance, this.x + 5, this.y + 30);
			ctx.fillText("Encounter Level: "+this.thing.encounterLevel, this.x + 5, this.y + 55);
		}
	},
	show : function(thing) {
		this.thing = thing;
	},
}*/

