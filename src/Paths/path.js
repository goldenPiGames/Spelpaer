const PATH_DETECTION_WIDTH = 15;
const TYPICAL_ENCOUNTER_DELAY = 15*MINUTES;

const SECTOR_W = "W";

var Path = {
	available : true,
	isPath : true,
	avgEncounterDelay : TYPICAL_ENCOUNTER_DELAY,
	encounterLevelIncrease : 10,
	getEncounterLevel : function() {
		return this.encounterLevelBase + this.encounterLevelIncrease * numberOfAnqorsPurified();
	},
	beginRandomEncounter : function(after) {
		var level = this.getEncounterLevel();
		var row = randomTerm(this.encounterTable); //TODO weights
		return battle.begin(
			row.enemies.map((col) => new (col.enemy)(PRound(level * (col.levelMult || 1.0)))),
			row.music || this.battleMusic,
			row.onWin ? ()=>{row.onWin(); after()} : after,
			row.onLose || gameOver,
		);
	},
	otherConnection : function(firstConnection) {
		return (firstConnection == this.connectionEast) ? this.connectionWest : this.connectionEast;
	},
	shown : function() {
		return (this.available && (this.connectionWest.visited || this.connectionEast.visited));
	},
	updateLine : function(map) {
		if (map.hovered && this.shown()) {
			this.hovered = distanceToSegment(map.mouse.x, map.mouse.y, this.connectionWest.x, this.connectionWest.y, this.connectionEast.x, this.connectionEast.y) <= PATH_DETECTION_WIDTH/2;
			this.clicked = this.hovered && mouse.clicked;
		} else {
			this.hovered = false;
			this.clicked = false;
		}
		if (this.hovered && this.shown()) {
			infoField.setText(this.getInfo());
		}
	},
	drawLine : function(map) {
		ctx.strokeWidth = 2;
		ctx.strokeStyle = this.shown() ? (this.hovered ? settings.hover_color : "#FFFFFF") : "#FFFFFF42";
		ctx.beginPath();
		ctx.moveTo(map.drawX(this.connectionWest.x), map.drawY(this.connectionWest.y));
		ctx.lineTo(map.drawX(this.connectionEast.x), map.drawY(this.connectionEast.y));
		ctx.stroke();
	},
	encounterDelay : function() {
		return this.avgEncounterDelay * (.7 + .6*Math.random());
	},
	getWeatherObject : function() {
		return new BlankUIObject();
	},
	getBattleWeatherObject : function() {
		return new BlankUIObject();
	},
	getInfo : function() {
		return this.name + " <br> " + 
		"Distance: " + getLongDuration(this.distance) + " <br> " + 
		"Encounter level: " + this.getEncounterLevel() + " <br> " + 
		this.description;
	}
}

function distanceBetween(vx, vy, wx, wy) {
	return Math.sqrt(Math.pow(vx - wx, 2) + Math.pow(vy - wy, 2));
}

function distanceToSegment(px, py, vx, vy, wx, wy) {
	var l2 = Math.pow(distanceBetween(vx, vy, wx, wy), 2);
	if (l2 <= 0)
		return distanceBetween(px, py, vx, vy);
	var t = Math.max(0, Math.min(1, ((px - vx) * (wx - vx) + (py - vy) * (wy - vy)) / l2));
	//console.log(l2, t)
	return distanceBetween(px, py, vx + t * (wx - vx), vy + t * (wy - vy));
}