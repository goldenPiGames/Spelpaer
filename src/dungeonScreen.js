var dungeonScreen = {
	encounterTimer : 1,
	floor : 0,
	x : 0,
	y : 0,
	facing : 0,
	clicked : false,
	hovered : false,
	//wallImage : new ImageHolder(0, 0),
	dungeonLabel : new Label(900, 0, 300, 30, "Dungeon Name", "Description of the dungeon."),
	roomLabel : new Label(900, 30, 300, 30, "F,X,Y,F", "Floor, X, Y, facing."),
	leftButton : new Button(0, 250, 40, 150, "<", "Turn left 90 degrees.", function(){dungeonScreen.turnLeft();}),
	rightButton : new Button(860, 250, 40, 150, ">", "Turn right 0.5π radians.", function(){dungeonScreen.turnRight();}),
	init : function() {
		
	},
	update : function() {
		advanceTime(1);
		this.dungeonLabel.update();
		this.roomLabel.update();
		this.leftButton.update();
		this.rightButton.update();
		this.pois.forEach(function(oj) {
			oj.update();
		});
	},
	draw : function() {
		clearBack();
		//console.log("blarp");
		drawSprite(this.wallImage, 0,0)//this.picx, this.picy);
		this.dungeonLabel.draw();
		this.roomLabel.draw();
		this.leftButton.draw();
		this.rightButton.draw();
		this.pois.forEach(function(oj) {
			oj.draw();
		});
	},
	begin : function(dungeon, floor=0, x=0, y=0, facing=0) {
		runnee = this;
		this.dungeon = dungeon;
		this.floor = floor;
		this.x = x;
		this.y = y;
		this.facing = facing;
		currentLoc = dungeon;
		dungeonActive = true;
		this.dungeonLabel.text = dungeon.name;
		this.dungeonLabel.hoverText = dungeon.description;
		this.encounterTimer = 3 + Math.floor(2 * Math.random());
		playMusic(dungeon.music);
		this.doWall();
		dungeon.enterDungeonEvent();
	},
	enterDoor : function() {
		switch (this.facing) {
			case 0: this.y--; break;
			case 1: this.x++; break;
			case 2: this.y++; break;
			case 3: this.x--; break;
		}
		this.doWall();
		this.dungeon.enterRoomEvent(this.floor, this.x, this.y);
	},
	doWall : function() {
		this.wallImage = this.dungeon.getWallImage(this.floor, this.x, this.y, this.facing);
		//this.picx = 450-this.wallImage.width/2;
		//this.picy = Math.floor(337.5-this.wallImage.height/2);
		this.roomLabel.text = this.floor+"F,"+this.x+","+this.y+","+directionInitial(this.facing);
		this.roomLabel.hoverText = "You are on floor "+this.floor+". You are in room "+this.x+","+this.y+". You are facing "+directionName(this.facing, false)+".";
		this.pois = this.dungeon.getPOIs(this.floor, this.x, this.y, this.facing);
		player.makeComponents(1000, 400, 200, 100);
		companion.makeComponents(1000, 500, 200, 100);
		particles.push(new ColorFade(4));
	},
	turnLeft : function() {
		this.facing--;
		if (this.facing < 0)
			this.facing = 3;
		this.doWall();
	},
	turnRight : function() {
		this.facing++;
		if (this.facing > 3)
			this.facing = 0;
		this.doWall();
	},
}

function directionName(direction, caps) {
	var name;
	switch (direction) {
		case 0: name = "North"; break;
		case 1: name = "East"; break;
		case 2: name = "South"; break;
		case 3: name = "West"; break;
	}
	if (!caps)
		return name.toLowerCase();
	return name;
}

function directionInitial(direction) {
	switch (direction) {
		case 0: return "N"; break;
		case 1: return "E"; break;
		case 2: return "S"; break;
		case 3: return "W"; break;
	}
}