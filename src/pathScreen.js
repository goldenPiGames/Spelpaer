var pathScreen;
var pathPosition;
const PATH_LINE_Y = 250;

var pathScreen = {
	__proto__ : UIObjectBase,
	encounterTimer : 1,
	speed : 1,
	playing : false,
	pathLabel : new Label(250, 20, 300, 30, "Path", "When you go from one place to another."),
	westLabel : new Label(0, PATH_LINE_Y - 60, 200, 25, "Departure", "The place you're leaving from."),
	eastLabel : new Label(1000, PATH_LINE_Y - 60, 200, 25, "Destination", "The place you're going to."),
	stopButton : new Button(550, 400, 100, 40, "Pause", "Pause the traveling so you can cast spells or whatever."),
	speedSlider : new Slider(400, 500, 400, 30, "Speed", "Change the rate at which you view this journey.", 1, 30, function(val){pathScreen.speed = val}, function(){return pathScreen.speed}),
	distance : 0,
	distanceLabel : new Label(275, 350, 250, 20, "Distance left: blegh", "The distance between you and your destination."),
	init : function() {
		var thisser = this;
		this.stopButton.handler = function(){thisser.toggleMove()};
	},
	begin : function(path) {
		//console.log(path);
		var departure = currentLoc;
		currentLoc = path;
		this.path = path;
		if (departure == path.connectionWest) {
			pathPosition = 1;
			this.direction = true;
		} else {
			pathPosition = path.distance-1;
			this.direction = false;
		}
		//this.distanceTotal = path.distance;
		//this.distanceLeft = path.distance;
		this.pathLabel.text = path.name;
		this.pathLabel.hoverText = path.description;
		this.westLabel.text = path.connectionWest.name;
		this.westLabel.hoverText = path.connectionWest.description;
		this.eastLabel.text = path.connectionEast.name;
		this.eastLabel.hoverText = path.connectionEast.description;
		this.resume();
	},
	resume : function() {
		runnee = this;
		this.objects = [this.pathLabel, this.westLabel, this.eastLabel, this.distanceLabel, this.stopButton, this.speedSlider, this.path.getWeatherObject()];
		playMusic(this.path.music)
		this.encounterTimer = this.path.encounterDelay();
		this.move();
	},
	update : function() {
		this.objects.forEach(function(oj) {
			oj.update();
		});
		if (this.moving) {
			this.encounterTimer -= this.speed;
			if (this.encounterTimer <= 0) {
				var thisser = this;
				this.playing = false;
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
	},
	draw : function() {
		clearBack();
		ctx.lineWidth = 3;
		ctx.strokeStyle = settings.normal_color;
		ctx.beginPath();
		ctx.moveTo(100, PATH_LINE_Y);
		ctx.lineTo(1100, PATH_LINE_Y);
		ctx.stroke();
		
		ctx.beginPath();
		var basex = 100 + 1000*pathPosition/this.path.distance
		ctx.moveTo(basex, PATH_LINE_Y);
		ctx.lineTo(basex - 10, PATH_LINE_Y - 20);
		ctx.lineTo(basex + 10, PATH_LINE_Y - 20);
		ctx.lineTo(basex, PATH_LINE_Y);
		ctx.stroke();
		this.objects.forEach(function(oj) {
			oj.draw();
		});
	},
	toggleMove : function() {
		if (this.moving)
			this.stop();
		else
			this.move();
	},
	stop : function() {
		this.moving = false;
		this.stopButton.text = "Move";
	},
	move : function() {
		this.moving = true;
		this.stopButton.text = "Stop";
	},
}