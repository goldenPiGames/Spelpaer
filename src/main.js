//const PLAYER_COLOR = "#3434FF";
//const COMPANION_COLOR = "#FFFF00";
//const MAIN_AREA_HEIGHT = 450;
var difficulty;
var saveSlot = 0;
var money;
var gameInterval;
var canvas;// = document.getElementById("GraphicsBox");
var ctx;
var engine;
var eventCatcher;
var currentLoc;
var loadingTotal = 0;
var loadedYet = 0;

const DIFFICULTY_NAMES = ["Relaxed", "Deliberate", "Panicked"];

function startLoading() {
	backDiv = document.getElementById("BackgroundBox");
	canvas = document.getElementById("GraphicsBox");
	ctx = canvas.getContext("2d");
	//gameInterval = setInterval(hasLoaded, 250);
	
	eventCatcher = document.getElementById("GraphicsBox");
	addEvents();
	loadSettings();
	initTextInput();
	
	startGame();
}

/*function hasLoaded() {
	console.log("Loaded", loadedYet, "of", loadingTotal);
	if (loadedYet >= loadingTotal) // Check to see if all info is loaded
	{
		clearInterval(gameInterval);
		startGame();
	}
}*/

function startGame() {
    ctx.textBaseline = "top";
	//pathScreen.init();
	//dungeonScreen.init();
	//prepScreen.init();
	//battle.init();
	runnee = new MainMenu();
	initMusic();
	coreEngine.run();
}

function getValue(obj, value) {
	if (typeof value == 'function')
		return object.value()
	return object.value;
}



function doNothing() {
	
};

var emptyGameObject = {
	update : doNothing,
	draw : doNothing,
}

function clearBack() {
	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSprite(sprite, x, y, woff = 0, hoff = 0) {
	if (!sprite)
		return;
	if (sprite instanceof HTMLImageElement) {
		ctx.drawImage(sprite, Math.round(x - woff*sprite.width), Math.round(y - hoff*sprite.height));
	} else if (sprite.image) {
		//console.log(sprite.image)
		//console.log(sprite.x, sprite.y, sprite.width, sprite.height, x - woff*sprite.width, y - hoff*sprite.height, sprite.width, sprite.height)
		ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, Math.round(x - woff*sprite.width), Math.round(y - hoff*sprite.height), sprite.width, sprite.height)
	}
}

function makeImage(sauce) {
	var img = new Image();
	loadingTotal++;
	img.onload = function() {
		loadedYet++;
		//console.log("shub");
		//img.crossOrigin = "anonymous";
	};
	img.src = sauce;
	return img;
}

function makeSprites(sauce, sec) {
	if (typeof sauce == "string") {
		sauce = makeImage(sauce);
	}
	var sheetData = {};
	if (Array.isArray(sec)) {
		var subs = Array.prototype.slice.call(arguments, 1);
		subs.forEach(function(oj) {
			oj.image = sauce;
			sheetData[oj.name] = oj;
			oj.parent = sheetData;
		});
	} else {
		for (sub in sec) {
			sheetData[sub] = sec[sub];
			sheetData[sub].image = sauce;
			sheetData[sub].parent = sheetData;
		}
	}
	return sheetData;
}

function drawTextInRect(text, x, y, width, height) {
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = height+"px "+settings.font;
	var wid = ctx.measureText(text).width;
	if (wid > width)
		ctx.font = (height*width/wid)+"px "+settings.font;
	ctx.fillText(text, x+width/2, y+height/2);
}

function drawParagraphInRect(text, x, y, width, height, size) {
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.font = size+"px "+settings.font;
	if (Array.isArray(text))
		text = text.join(" <br> ");
	//console.log(text);
	text = text.replace(/<Player>/g, player.name);
	text = text.replace(/<Companion>/g, companion.name);
	//console.log(text);
	var words = text.split(" ");
	var cx = x;
	var cy = y;
	for (var i = 0; i < words.length; i++) {
		var word = words[i];
		var wwid = ctx.measureText(word).width;
		if (word == "<br>" || cx + wwid > x + width) {
			cy += size;
			cx = x;
		}
		//console.log(word, cx, cy);
		if (word != "<br>") {
			ctx.fillText(word, cx, cy);
			cx += wwid + ctx.measureText(" ").width;
		}
	}
}
