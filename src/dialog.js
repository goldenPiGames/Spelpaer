var dialogActive = false;
//const settings.infoHeight = 225;
const SPEAKER_BOX_WIDTH = 200;
const SPEAKER_BOX_HEIGHT = 50;

var dialog = {
	height : 200,
	begin : function() {
		var arrayguments = Array.prototype.slice.call(arguments);
		this.list = Array.isArray(arguments[0]) ? (Array.isArray(arguments[0][0]) ?  arguments[0][0]: arguments[0]) : arguments;
		this.index = 0;
		//console.log("new list");
		this.advanceBuffer = true;
		this.justBegun = true;
		dialogActive = true;
	},
	update : function() {
		//console.log(this.index, mouse.clicked, this.advanceBuffer);
		if (mouse.clicked && !this.advanceBuffer)
			this.index ++;
		//console.log(this.index);
		this.advanceBuffer = false;
		this.checkCurrent();
		this.justBegun = false;
	},
	checkCurrent : function() {
		if (this.index >= this.list.length) {
			dialogActive = false;
			return;
		}
		if ((typeof this.list[this.index] == "function")) {
			this.list[this.index]();
			if (!this.justBegun) {
				this.index++;
				this.checkCurrent();
			}
			return;
		}
	},
	draw : function() {
		var currentLine = this.list[this.index];
		if (typeof currentLine == "string")
			currentLine = new DialogLine("Narration", null, currentLine);
		
		if (currentLine.sprite) {
			//var sprit = currentLine.sprite;
			//console.log(sprit.image, sprit.x, sprit.y, sprit.width, sprit.height, canvas.width/2 - sprit.width/2, canvas.height - sprit.height, sprit.width, sprit.height);
			//ctx.drawImage(sprit.image, sprit.x, sprit.y, sprit.width, sprit.height, Math.ceil(canvas.width/2-sprit.width/2), canvas.height - sprit.height, sprit.width, sprit.height);
			drawSprite(currentLine.sprite, canvas.width/2, canvas.height, 1/2, 1);
		}
		
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(0, canvas.height-settings.infoHeight, canvas.width, settings.infoHeight);
		ctx.fillRect(0, canvas.height-settings.infoHeight - SPEAKER_BOX_HEIGHT, SPEAKER_BOX_WIDTH, SPEAKER_BOX_HEIGHT);
		
		ctx.lineWidth = 2;
		ctx.strokeStyle = settings.normal_color;
		ctx.beginPath();
		ctx.moveTo(canvas.width, canvas.height - settings.infoHeight);
		ctx.lineTo(1, canvas.height-settings.infoHeight);
		ctx.lineTo(1, canvas.height-settings.infoHeight - SPEAKER_BOX_HEIGHT);
		ctx.lineTo(SPEAKER_BOX_WIDTH, canvas.height-settings.infoHeight - SPEAKER_BOX_HEIGHT);
		ctx.lineTo(SPEAKER_BOX_WIDTH, canvas.height-settings.infoHeight);
		ctx.stroke();
		
		//main text
		var fontSize = 20;
		ctx.fillStyle = settings.normal_color;
		ctx.font = fontSize + "px "+settings.font;
		ctx.textAlign = "start";
		
		var lines = getLines(currentLine.text, canvas.width - (SIDE_MARGINS * 2));
		for (i = 0; i < lines.length; i++) { 
			ctx.fillText(lines[i], SIDE_MARGINS, canvas.height-settings.infoHeight + SIDE_MARGINS + 1.2 * fontSize * i);
		}
		
		//speaker
		var displaySpeaker = currentLine.speaker;
		switch (currentLine.speaker) {
			case "Player":
				ctx.fillStyle = settings.player_color;
				displaySpeaker = player.name;
				break;
			case "Companion":
				ctx.fillStyle = settings.companion_color;
				displaySpeaker = companion.name;
				break;
			case "Anymos":
				ctx.fillStyle = "#00FFFF";
				break;
			default:
				ctx.fillStyle = settings.normal_color;
				break;
		}
		
		ctx.fillText(displaySpeaker, SIDE_MARGINS, canvas.height-settings.infoHeight - SPEAKER_BOX_HEIGHT/2 - fontSize/2);
	},
	add : function(what) {
		this.dialogList.splice(-1, what);
	}
}

//---------------------------------------- Dialog Line -----------------------------

var DialogLine = function(speaker, sprite, text, currentTime) {
    this.speaker = speaker;
    this.sprite = sprite;
	this.text = text;
	this.currentTime = currentTime;
}
DialogLine.prototype.isDialogLine = true;
DialogLine.prototype.isDialogPausing = true;

function isDialogLine(obj) {
	if (typeof obj == "string")
		return true;
	return (obj.isDialogLine == true);
}

/*function doNothing() {
	
}*/

//----------------------------------------- Dialog Split ----------------------------------

var DialogSplit = function(speaker, image, text) {
	this.speaker = speaker;
	this.image = image;
	this.text = text;
	this.choices = Array.prototype.slice.call(arguments, 3);
	this.x = 0;
	this.width = 800;
	
	
}
DialogSplit.prototype.isDialogSplit = true;
DialogSplit.prototype.isDialogPausing = true;

DialogSplit.prototype.init = function(ctx) {
	ctx.font = "20px "+settings.font;
	this.lines = getLines(ctx, this.text, this.width - (SIDE_MARGINS * 2));
	
	this.height = Math.max(SIDE_MARGINS * 2 + 24 * this.lines.length + this.choices.length * 36, dialog.height);
	this.y = 600 - this.height;
	var buttons = [];
	var y = this.y;
	
	var lineCount = this.lines.length;
	this.choices.forEach(function(dab, index) {
		buttons.push(new Button(100, y + SIDE_MARGINS + 24 * lineCount + index * 36, 600, 31, dab.text, dab.hoverText, dab.handler));
	});
	this.buttons = buttons;
}

DialogSplit.prototype.update = function(ctx) {
	if (!this.lines) {
		this.init(ctx);
	}
	this.buttons.forEach(function(dab){
		dab.update(ctx);
	});
}

DialogSplit.prototype.draw = function(ctx) {
	ctx.fillStyle = "#808080";
	ctx.globalAlpha = .20;
	if (!battleActive)
		ctx.fillRect(0, 0, 800, 450);
	if (!this.lines) {
		this.init(ctx);
	}
	
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = settings.background_color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y - SPEAKER_BOX_HEIGHT, SPEAKER_BOX_WIDTH, SPEAKER_BOX_HEIGHT);
	
	if (this.image != null && this.image != undefined)
		ctx.drawImage(this.image, 400 - this.image.width/2, 600 - this.image.height);
	
	ctx.globalAlpha = .69;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y - SPEAKER_BOX_HEIGHT, SPEAKER_BOX_WIDTH, SPEAKER_BOX_HEIGHT);
	ctx.globalAlpha = 1;
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = settings.normal_color;
	ctx.beginPath();
	ctx.moveTo(document.getElementById("GraphicsBox").width, this.y);
	ctx.lineTo(1, this.y);
	ctx.lineTo(1, this.y - SPEAKER_BOX_HEIGHT);
	ctx.lineTo(SPEAKER_BOX_WIDTH, this.y - SPEAKER_BOX_HEIGHT);
	ctx.lineTo(SPEAKER_BOX_WIDTH, this.y);
	ctx.stroke();
	
    //main text
	var fontSize = 20;
	ctx.fillStyle = settings.normal_color;
    ctx.font = fontSize+"px "+settings.font;
	//ctx.fillText(this.text, this.x + SIDE_MARGINS, this.y + SIDE_MARGINS);
	for (i = 0; i < this.lines.length; i++) { 
		ctx.fillText(this.lines[i], this.x + SIDE_MARGINS, this.y + SIDE_MARGINS + 1.2 * fontSize * i);
	}
	
	//speaker
	var displaySpeaker = this.speaker;
	switch (this.speaker) {
		case "You":
			displaySpeaker = player.name;
			ctx.fillStyle = PLAYER_COLOR;
			break;
		case "Player":
			displaySpeaker = player.name;
			ctx.fillStyle = PLAYER_COLOR;
			break;
		case "Companion":
			displaySpeaker = companion.name;
			ctx.fillStyle = COMPANION_COLOR;
			break;
		case "Game":
			ctx.fillStyle = "#AAAAAA";
			break;
		default:
			ctx.fillStyle = settings.normal_color;
			break;
	}
    ctx.fillText(displaySpeaker, SIDE_MARGINS, this.y - SPEAKER_BOX_HEIGHT/2 - fontSize/2);
	
	this.buttons.forEach(function(dab) {
		dab.draw(ctx);
	});
}

function isDialogSplit(obj) {
	return obj.isDialogSplit == true;
}

//----------------------------------------- Dialog Split Choice ----------------------------------

var DialogSplitChoice = function(text, handler = doNothing) {
	this.text = text;
	this.handler = function(){dialogIndex++; handler();};
}
DialogSplitChoice.prototype.isDialogSplitChoice = true;

function isDialogSplitChoice(obj) {
	return obj.isDialogSplitChoice == true;
}