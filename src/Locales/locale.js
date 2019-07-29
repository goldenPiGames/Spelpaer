const LOCALES = []//Pocutop, DepartureShrine, DepartureGate]//, Bordebulle, Coimer, Innsport, HoblinsDen, Sterand, Walld, DeepTown, DeepGrotto, Lethodge, Bordasca, RaziShrine, HilHin];
const SUBLOCALES = [];
const PATHS = []//InceptiveTrailWest, InceptiveTrailEast, AroundTheBubbleEast, AroundTheBubbleNorth, MernBeach, RaidersPath, StarBeach, OceanDescent, DeepFlee, WayOfApathy, GreyHorizonWay, StormApproachWest];

var Locale = {
	isLocale : true,
	visited : false,
	pathTo : function(otherLoc = currentLoc) {
		var availPaths = this.availablePaths();
		for (var i = 0; i < availPaths.length; i++) {
			if (availPaths[i].otherConnection(this) === otherLoc)
				return availPaths[i];
		}
		return null;
	},
	availablePaths : function() {
		var soFar = [];
		for (var i = 0; i < this.paths.length; i++) {
			if (this.paths[i].available)
				soFar.push(this.paths[i]);
		}
		return soFar;
	},
	arrive : function() {
		playMusic(this.music);
		this.buildScreen();
		if (!this.visited && this.firstArriveEvent != undefined)
			this.firstArriveEvent();
		this.visited = true;
		currentLoc = this;
	},
	buildScreen : function() {
		switchScreen(new LocaleScreen(this.getPOIs(), false, this.image));
		/*localeScreen.setLeaveButton(false);
		//this.hovered = false;
		//this.clicked = false;
		//var weather = this.getWeatherObject();
		localeScreen.bgimg = this.image;
		localeScreen.POImenu.setItems(this.getPOIs());
		//GeneralEngine.objects = [bgimg, leaveButton, poiMenu, weather];*/
	},
	updatePoint : function(map) {
		var wasNotClicked = !this.clicked;
		this.drawX = map.drawX(this.x);
		this.drawY = map.drawY(this.y);
		this.drawRadius = 8 * map.zoom;
		if (ctx != null) {
			this.hovered = mouse.x <= map.mainWidth && mouse.y <= map.mainHeight && Math.pow(this.drawX - mouse.x, 2) + Math.pow(this.drawY - mouse.y, 2) < Math.pow(this.drawRadius, 2);
			this.clicked = (this.hovered && mouse.clicked);
			if (this.hovered) {
				infoField.setText(this.getInfo());
				//map.info.show(this);
			}
			if (this.clicked && wasNotClicked)
				map.localeClicked(this);
		} else {
			this.hovered = false;
			this.clicked = false;
		}
	},
	drawPoint : function(map) {
		ctx.strokeWidth = 2;
		ctx.strokeStyle = (this.hovered) ? settings.hover_color : (this.visited ? settings.normal_color : settings.normal_color+"80");
		ctx.fillStyle = (this == currentLoc) ? settings.click_color : settings.background_color+"69";
		
		ctx.beginPath();
		ctx.arc(this.drawX, this.drawY, this.drawRadius-1, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	},
	returnFromRest : function() {
		playMusic(this.music);
		this.buildScreen();
	},
	population : 0,
	getWeatherObject : function() {
		return new BlankUIObject();
	},
	getBattleWeatherObject : function() {
		return new BlankUIObject();
	},
	getInfo : function() {
		return this.name + " <br> " + 
		this.description;
	}
}
function activatePOI(poi) {
	poi.activate();
}

var SubLocale = {
	isLocale : true,
	type : "Sublocale",
	arrive : function() {
		playMusic(this.music);
		this.buildScreen();
		if (this.enterEvent)
			this.enterEvent();
		this.visited = true;
		currentLoc = this;
	},
	activate : function() {
		this.arrive();
	},
	buildScreen : function() {
		switchScreen(new LocaleScreen(this.getPOIs(), true, this.image));
	},
	returnFromRest : function() {
		playMusic(this.music);
		this.buildScreen();
	},
	population : 0,
	getWeatherObject : function() {
		return new BlankUIObject();
	},
	getBattleWeatherObject : function() {
		return new BlankUIObject();
	}
}

function longRest(amount = 1.0) {
	player.hp = player.maxhp;
	player.effects = [];
	companion.hp = companion.maxhp;
	companion.effects = [];
	advanceTime(8*HOURS);
	saveGame(saveSlot, amount);
	dialog.begin(
		"Game saved to slot "+saveSlot+".", 
		function(){
			new PrepScreen().begin(amount, function(){
				currentLoc.returnFromRest();
			});
		});
}

function longRestPoor() {
	longRest(0.8);
}