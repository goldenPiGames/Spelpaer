//mouse
var mouse = {x:0,y:0,clicked:false,down:false,
	unClick : function() {
		this.clicked = false;
		this.wasPressed = this.pressed;
		this.lastX = this.x;
		this.lastY = this.y;
		this.scrolled = 0;
	}
}

const COMMAND_LIST = ["left", "right", "up", "down", "jump", "attack", "shoot", "special", "interact", "switch", "zoomOut", "zoomIn", "minimap", "trueSight", "pause", "restart", "any"]
//const GAMEPAD_COMMANDS = ["jump", "attack", "shoot", "switch", "interact", "special", "trueSight", "debug", "restart", "pause", "?", "?"]//, "up", "down", "left", "right"];
var usingGamepad = false;
var controller = {
	keyCodeToCommand: function(keyCode) {
		switch(keyCode) {
			case 37 : return "left";
			case 39 : return "right";
			case 38 : return "up";
			case 40 : return "down";
			case 65 : return "jump";
			case 83 : return "attack";
			case 68 : return "shoot";
			case 16 : return "special";
			case 32 : return "interact";
			case 81 : return "switch";
			case 189 : return "zoomOut";
			case 187 : return "zoomIn";
			case 48 : return "minimap";
			case 17 : return "trueSight";
			case 80 : return "pause";
			case 82 : return "restart";
			case 192 : return "debug"
			default : return "other";
		}
	},
	doKey : function(name, pressed) {
		if (pressed && !this[name])
			this[name+"Clicked"] = true;
	},
	unClick : function() {
		COMMAND_LIST.forEach(function(nom) {
			controller[nom+"Clicked"] = false;
		});
	},
	fromGamepad : function() {
		var gamepad = navigator.getGamepads()[gpindex];
		//console.log(gamepad)
		usingGamepad = !!gamepad;
		if (!gamepad)
			return;
		var thisser = this;
		GAMEPAD_COMMANDS.forEach(function(nom, num) {
			thisser.doKey(nom, gamepad.buttons[num].pressed);
		});
		this.doKey("up", gamepad.buttons[12].pressed || gamepad.axes[1] <= -.7);
		this.doKey("down", gamepad.buttons[13].pressed || gamepad.axes[1] >= .7);
		this.doKey("left", gamepad.buttons[14].pressed || gamepad.axes[0] <= -.7);
		this.doKey("right", gamepad.buttons[15].pressed || gamepad.axes[0] >= .7);
		this.doKey("zoomIn", gamepad.axes[3] <= -.8);
		this.doKey("zoomOut", gamepad.axes[3] >= .8);
		this.doKey("minimap", gamepad.axes[2] <= -.8);
		//this.doKey("trueSight", gamepad.axes[2] >= .8);
	}
}

COMMAND_LIST.forEach(function(nom) {
	controller[nom] = false;
});



var gamepad;
var gpindex;
window.addEventListener("gamepadconnected", function(e) {
	gp = e.gamepad//navigator.getGamepads()[e.gamepad.index];
	//console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);
	if (gp.buttons.length >= 4)
		gpindex = e.gamepad.index
		//gamepad = gp;
});

var controllerHelp = {
	update : function() {
		this.dead = true;
	},
	draw : function() {
		this.dead = false;
		ctx.drawImage(miscSprites.Gamepad, x, y, canvas.width/2-miscSprites.Gamepad.width/2, canvas.height/2-miscSprites.Gamepad.width/2);
	}
}
//controllerHelp.prototype = Object.create(GameObjectBase);

var wasNotClicked = true;

function addEvents() {
	eventCatcher.addEventListener("mousemove", function(e) {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
		//mouse.clicked = (e.which == 1 && !mouse.down);
		//mouse.down = (e.which == 1);
	});
	
	eventCatcher.addEventListener("mousedown", function(e) {
		mouse.clicked = true;// !mouse.down;
		mouse.down = true;
	});
	
	document.addEventListener("mouseup", function(e) {
		mouse.down = false;
		mouse.clicked;
	});
	
	/*eventCatcher.addEventListener("mousewheel", function(e) {
		mouse.scrolled += e.deltaY / 3;
		console.log(mouse.scrolled);
	});*/
	
	eventCatcher.addEventListener("wheel", function(e) {
		mouse.scrolled += e.deltaY > 0 ? 1 : -1;
		//console.log(mouse.scrolled);
	});
	
	document.addEventListener("keydown", function(e) {
		if (textInput.disabled)
			e.preventDefault();
		if (!controller[controller.keyCodeToCommand(e.keyCode)])
			controller[controller.keyCodeToCommand(e.keyCode)+"Clicked"] = true;
		controller[controller.keyCodeToCommand(e.keyCode)] = true;
		controller.anyClicked = true;
		//console.log(controller.keyCodeToCommand(e.keyCode));
	});

	document.addEventListener("keyup", function(e) {
		controller[controller.keyCodeToCommand(e.keyCode)] = false;
	});
}