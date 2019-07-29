var pathScreen;
var pathPosition;
const PATH_LINE_Y = 250;
const PATH_SPEEDS = [1, 2, 5, 15, 30, 60]

function PathScreen(paff) {
	var thisser = this;
	this.encounterTimer = 1;
	this.speed = 1;
	this.path = paff;
	this.pathLabel = new Label(250, 20, 300, 30, this.path.name, this.path.description);
	this.westLabel = new Label(0, PATH_LINE_Y - 60, 200, 25, this.path.connectionWest.name, this.path.connectionWest.description); this.westLabel.align = "left";
	this.eastLabel = new Label(settings.width-200, PATH_LINE_Y - 60, 200, 25, this.path.connectionEast.name, this.path.connectionEast.description); this.eastLabel.align = "right";
	this.stopButton = new Button(550, 400, 100, 40, "Pause", "Pause the traveling so you can cast spells or whatever.", function(){thisser.toggleMove()});
	this.speedSlider = new Slider(settings.width/2-150, mainHeight()-50, 300, 35, "Speed", "Change the rate at which you view this journey.", 0, PATH_SPEEDS.length-1, val=>thisser.setSpeedIndex(val), function(){return thisser.speedIndex});
	this.distance = 0;
	this.distanceLabel = new Label(275, 350, 250, 20, "Distance left: blegh", "The distance between you and your destination.");
	this.objects = [this.pathLabel, this.westLabel, this.eastLabel, this.distanceLabel, this.stopButton, this.speedSlider, this.path.getWeatherObject()];
	//console.log(path);
	var departure = currentLoc; 
	currentLoc = this.path;
	if (departure == this.path.connectionWest) {
		pathPosition = 1;
		this.direction = true;
	} else {
		pathPosition = this.path.distance-1;
		this.direction = false;
	}
	this.lineWest = 50;
	this.lineEast = settings.width - 50;
	this.setSpeedIndex(0);
	//this.distanceTotal = path.distance;
	//this.distanceLeft = path.distance;
}
PathScreen.prototype = Object.create(ScreenBase);
PathScreen.prototype.resume = function() {
	switchScreen(this);
	playMusic(this.path.music)
	this.encounterTimer = this.path.encounterDelay();
	this.move();
}
PathScreen.prototype.update = function() {
	this.objects.forEach(oj=>oj.update());
	if (this.moving) {
		this.encounterTimer -= this.speed;
		if (this.encounterTimer <= 0) {
			var thisser = this;
			battle.begin(this.path.randomEncounter(), this.path.battleMusic, function(){thisser.resume();});
			return;
		}
		pathPosition += (this.direction?1:-1) * this.speed;
		advanceTime(this.speed);
	} else {
		advanceTime(1);
	}
	this.distanceLabel.text = "Distance left: "+Math.ceil(this.direction ? this.path.distance-pathPosition : pathPosition);
	if (pathPosition <= 0) {
		this.path.connectionWest.arrive();
	}
	if (pathPosition >= this.path.distance) {
		this.path.connectionEast.arrive();
	}
}
PathScreen.prototype.draw = function() {
	clearBack();
	ctx.lineWidth = 3;
	ctx.strokeStyle = settings.normal_color;
	ctx.beginPath();
	ctx.moveTo(this.lineWest, PATH_LINE_Y);
	ctx.lineTo(this.lineEast, PATH_LINE_Y);
	ctx.stroke();
	
	ctx.beginPath();
	var basex = this.lineWest + (this.lineEast-this.lineWest)*pathPosition/this.path.distance;
	ctx.moveTo(basex, PATH_LINE_Y);
	ctx.lineTo(basex - 10, PATH_LINE_Y - 20);
	ctx.lineTo(basex + 10, PATH_LINE_Y - 20);
	ctx.lineTo(basex, PATH_LINE_Y);
	ctx.stroke();
	this.objects.forEach(oj=>oj.draw());
}
PathScreen.prototype.toggleMove = function() {
	if (this.moving)
		this.stop();
	else
		this.move();
}
PathScreen.prototype.stop = function() {
	this.moving = false;
	this.stopButton.text = "Move";
}
PathScreen.prototype.move = function() {
	this.moving = true;
	this.stopButton.text = "Stop";
}
PathScreen.prototype.setSpeedIndex = function(val) {
	this.speedIndex = Math.round(val);
	this.speed = PATH_SPEEDS[this.speedIndex];
}

function beginPath(paff) {
	new PathScreen(paff).resume();
}