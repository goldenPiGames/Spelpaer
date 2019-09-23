class DungeonScreen extends Screen {
	constructor() {
		super();
		this.stuffX = Math.ceil(settings.width*3/4);
		this.stuffWidth = settings.width-this.stuffX;
		var height = mainHeight();
		this.encounterTimer = 1;
		this.camera = new DungeonCamera(this.stuffX, height, this);
		this.menuButton = new Button(settings.width-95, 5, 90, 40, "Menu", "Open up the menu.", ()=>openGameMenu(()=>this.doWall()));
		this.dungeonLabel = new Label(this.stuffX, 50, this.stuffWidth, 30, "Dungeon Name", "Description of the dungeon.");
		this.roomLabel = new Label(this.stuffX, 30, this.stuffWidth, 30, "F,X,Y,F", "Floor, X, Y, facing.");
		this.leftButton = new Button(0, 250, 40, 150, "<", "Turn left 90 degrees.", ()=>this.turnLeft());
		this.rightButton = new Button(this.stuffX-40, 250, 40, 150, ">", "Turn right 90 degrees.", ()=>this.turnRight());
	}
	update() {
		advanceTime(1, true);
		this.camera.update();
		this.uiStuff.forEach(oj=>oj.update())
	}
	draw() {
		clearBack();
		this.camera.draw();
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.stuffX, 0, settings.width-this.stuffX+1, settings.height);
		this.uiStuff.forEach(oj=>oj.draw())
	}
	begin(dungeon, which = 1) {
		switchScreen(this);
		this.dungeon = dungeon;
		this.layout = dungeon.loadLayout();
		currentLoc = dungeon;
		this.dungeonLabel.text = dungeon.name;
		this.dungeonLabel.hoverText = dungeon.description;
		//this.encounterTimer = 3 + Math.floor(2 * Math.random());
		playMusic(dungeon.music);
		dungeon.enterDungeonEvent();
		this.doWall(this.layout.getEntrance(which));
	}
	enterDoor() {
		this.doWall();
		this.dungeon.enterRoomEvent(this.floor, this.x, this.y);
	}
	doWall(now) {
		if (now)
			this.currentView = now;
		this.camera.setWall(this.currentView);
		this.roomLabel.text = this.currentView.positionText;
		//this.roomLabel.hoverText = "You are on floor "+this.floor+". You are in room "+this.x+","+this.y+". You are facing "+directionName(this.facing, false)+".";
		player.setDisplay(this.stuffX, mainHeight()-200, this.stuffWidth, 100, this);
		companion.setDisplay(this.stuffX, mainHeight()-100, this.stuffWidth, 100, this);
		this.uiStuff = [this.menuButton, this.dungeonLabel, this.roomLabel, this.leftButton, this.rightButton, player, companion];
		switchScreen(this);
		particles.push(new ColorFade(4, this.camera.x, this.camera.y, this.camera.width, this.camera.height));
	}
	turnLeft() {
		this.doWall(this.currentView.toLeft);
	}
	turnRight() {
		this.doWall(this.currentView.toRight);
	}
	unitClicked() {
		
	}
}

class DungeonCamera extends DynamicCamera {
	constructor(width, height, parent) {
		super(0, 0, width, height);
		this.parent = parent;
		//this.centerX = 0;
	}
	setWall(wall) {
		this.wallImg = wall.wallImg;
		this.boundLeft = 0;
		this.boundRight = this.wallImg.width;
		this.boundTop = 0;
		this.boundBottom = this.wallImg.height;
		this.objects = wall.objects;
	}
	update() {
		super.update();
		this.objects.forEach(oj=>oj.update(this));
	}
	draw() {
		this.drawSprite(this.wallImg, 0, 0);
		this.objects.forEach(oj=>oj.draw(this));
	}
	moveTo(to) {
		this.parent.doWall(to);
	}
	returnFromBattle() {
		this.parent.doWall();
	}
}
DungeonCamera.prototype.minZoom = .5;
DungeonCamera.prototype.maxZoom = 3;
DungeonCamera.prototype.directPan = true;