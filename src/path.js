const PATH_DETECTION_WIDTH = 15;
const TYPICAL_ENCOUNTER_DELAY = 15*MINUTES;

var Path = {
	available : true,
	isPath : true,
	avgEncounterDelay : TYPICAL_ENCOUNTER_DELAY,
	randomEncounter : function() {
		var i = Math.floor(Math.random()*this.encounterList.length);
		var list1 = this.encounterList[i];
		var level = Math.sqrt(sqr(this.encounterLevel) / list1.length);
		var list2 = [];
		for (i = 0; i < list1.length; i++) {
			list2.push(new list1[i](PRound(level)));
		}
		return list2;
	},
	otherConnection : function(firstConnection) {
		return (firstConnection == this.connectionEast) ? this.connectionWest : this.connectionEast;
	},
	shown : function() {
		return (this.available && (this.connectionWest.visited || this.connectionEast.visited));
	},
	updateLine : function() {
		var wx = (this.connectionWest.latitude - WorldMapScreen.centerX) * WorldMapScreen.zoom + 400;
		var wy = (this.connectionWest.longitude - WorldMapScreen.centerY) * WorldMapScreen.zoom + 225;
		var ex = (this.connectionEast.latitude - WorldMapScreen.centerX) * WorldMapScreen.zoom + 400;
		var ey = (this.connectionEast.longitude - WorldMapScreen.centerY) * WorldMapScreen.zoom + 225;
		this.drawWX = wx;
		this.drawWY = wy;
		this.drawEX = ex;
		this.drawEY = ey;
		if (ctx != null) {
			var distance = distToSegment(mouse.x, mouse.y, wx, wy, ex, ey);
			this.hovered = (distance <= (PATH_DETECTION_WIDTH/2 * WorldMapScreen.zoom));
			this.clicked = (this.hovered && mouse.clicked);
			if (this.hovered && this.shown()) {
				infoField.text = this.getInfo();
				WorldMapScreen.info.show(this);
			}
		} else {
			this.hovered = false;
			this.clicked = false;
		}
	},
	drawLine : function() {
		
		ctx.strokeWidth = 2;
		ctx.strokeStyle = this.shown() ? (this.hovered ? settings.hover_color : "#FFFFFF") : "#FFFFFF42";
		ctx.beginPath();
		ctx.moveTo(this.drawWX, this.drawWY);
		ctx.lineTo(this.drawEX, this.drawEY);
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
		"Distance: " + this.distance + " <br> " + 
		"Encounter level: " + this.encounterLevel + " <br> " + 
		this.description;
	}
}

function sqr(x) { return x * x }

function dist(vx, vy, wx, wy) { return Math.sqrt(sqr(vx - wx) + sqr(vy - wy)) }

function distToSegment(px, py, vx, vy, wx, wy) {
	var l2 = sqr(dist(vx, vy, wx, wy));
	if (l2 == 0) return dist(px, py, vx, vy);
	var t = ((px - vx) * (wx - vx) + (py - vy) * (wy - vy)) / l2;
	t = Math.max(0, Math.min(1, t));
	return dist(px, py, vx + t * (wx - vx), vy + t * (wy - vy));
}