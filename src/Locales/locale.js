const LOCALES = []
const SUBLOCALES = [];
const PATHS = [];

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
		switchScreen(new LocaleScreen(this));
		/*localeScreen.setLeaveButton(false);
		//this.hovered = false;
		//this.clicked = false;
		//var weather = this.getWeatherObject();
		localeScreen.bgimg = this.image;
		localeScreen.POImenu.setItems(this.getPOIs());
		//GeneralEngine.objects = [bgimg, leaveButton, poiMenu, weather];*/
	},
	radius : 8,
	updatePoint : function(map) {
		//this.drawX = map.drawX(this.x);
		//this.drawY = map.drawY(this.y);
		//var drawRadius = 8 * map.zoom;
		this.hovered = Math.pow(this.x - map.mouse.x, 2) + Math.pow(this.y - map.mouse.y, 2) < Math.pow(this.radius, 2);
		this.clicked = this.hovered && mouse.clicked;
		if (this.hovered) {
			infoField.setText(this.getInfo());
		}
		if (this.clicked)
			map.localeClicked(this);
	},
	drawPoint : function(map) {
		ctx.strokeWidth = 2;
		ctx.strokeStyle = (this.hovered) ? settings.hover_color : (this.visited ? settings.normal_color : settings.normal_color+"80");
		ctx.fillStyle = (this == currentLoc) ? settings.click_color : settings.background_color+"69";
		ctx.beginPath();
		ctx.arc(map.drawX(this.x), map.drawY(this.y), this.radius*map.zoom-1, 0, 2*Math.PI);
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
	isSub : true,
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
		switchScreen(new LocaleScreen(this));
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

function BasicPOI(name, description, stuff) {
	this.name = name;
	this.description = description;
	if (!Array.isArray(this.stuff));
		stuff = Array.prototype.slice.call(arguments, 2);
	this.stuff = stuff;
}
BasicPOI.prototype.type = "";
BasicPOI.prototype.activate = function() {
	dialog.begin(this.stuff);
}