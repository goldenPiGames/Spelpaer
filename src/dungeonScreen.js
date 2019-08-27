class DungeonScreen {
	constructor() {
		this.encounterTimer = 1;
		this.dungeonLabel = new Label(900, 0, 300, 30, "Dungeon Name", "Description of the dungeon.");
		this.roomLabel = new Label(900, 30, 300, 30, "F,X,Y,F", "Floor, X, Y, facing.");
		this.leftButton = new Button(0, 250, 40, 150, "<", "Turn left 90 degrees.", ()=>this.turnLeft());
		this.rightButton = new Button(860, 250, 40, 150, ">", "Turn right 90 degrees.", ()=>this.turnRight());
	}
	update() {
		advanceTime(1, true);
		this.dungeonLabel.update();
		this.roomLabel.update();
		this.leftButton.update();
		this.rightButton.update();
		this.dungeonCamera.update();
	}
	draw() {
		clearBack();
		//console.log("blarp");
		drawSprite(this.wallImage, 0,0)//this.picx, this.picy);
		this.dungeonLabel.draw();
		this.roomLabel.draw();
		this.leftButton.draw();
		this.rightButton.draw();
		this.dungeonCamera.draw();
	}
	begin(dungeon, floor=0, x=0, y=0, facing=0) {
		switchScreen(this);
		this.dungeon = dungeon;
		this.floor = floor;
		this.x = x;
		this.y = y;
		this.facing = facing;
		currentLoc = dungeon;
		this.dungeonLabel.text = dungeon.name;
		this.dungeonLabel.hoverText = dungeon.description;
		this.encounterTimer = 3 + Math.floor(2 * Math.random());
		playMusic(dungeon.music);
		this.doWall();
		dungeon.enterDungeonEvent();
	}
	enterDoor() {
		switch (this.facing) {
			case 0: this.y--; break;
			case 1: this.x++; break;
			case 2: this.y++; break;
			case 3: this.x--; break;
		}
		this.doWall();
		this.dungeon.enterRoomEvent(this.floor, this.x, this.y);
	}
	doWall() {
		this.wallImage = this.dungeon.getWallImage(this.floor, this.x, this.y, this.facing);
		//this.picx = 450-this.wallImage.width/2;
		//this.picy = Math.floor(337.5-this.wallImage.height/2);
		this.roomLabel.text = this.floor+"F,"+this.x+","+this.y+","+directionInitial(this.facing);
		this.roomLabel.hoverText = "You are on floor "+this.floor+". You are in room "+this.x+","+this.y+". You are facing "+directionName(this.facing, false)+".";
		this.pois = this.dungeon.getPOIs(this.floor, this.x, this.y, this.facing);
		player.setDisplay(1000, 400, 200, 100);
		companion.setDisplay(1000, 500, 200, 100);
		particles.push(new ColorFade(4));
	}
	turnLeft() {
		this.facing--;
		if (this.facing < 0)
			this.facing = 3;
		this.doWall();
	}
	turnRight() {
		this.facing++;
		if (this.facing > 3)
			this.facing = 0;
		this.doWall();
	}
}

class DungeonCamera extends DynamicCamera {
	constructor(width, height) {
		super(0, 0, width, height);
		//this.centerX = 0;
	}
}

function directionName(direction, caps = north) {
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
	return directionName(direction)[0];
}