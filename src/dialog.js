const SPEAKER_BOX_WIDTH = 200;
const SPEAKER_BOX_HEIGHT = 50;

var dialog = {
	//height : 200,
	begin : function() {
		//console.log("bah");
		var arrayguments = Array.prototype.slice.call(arguments);
		this.list = Array.isArray(arrayguments[0]) ? (Array.isArray(arrayguments[0][0]) ?  arrayguments[0][0]: arrayguments[0]) : arrayguments;
		this.index = 0;
		//console.log("new list");
		this.advanceBuffer = true;
		this.justBegun = true;
		//console.log(overlay);
		overlay = this;
		this.skipButton = new Button(settings.width - 65, 5, 60, 40, "Skip");
	},
	update : function() {
		this.skipButton.update();
		//console.log(this.index, mouse.clicked, this.advanceBuffer);
		var currentLine = this.list[this.index];
		if (!currentLine.isSplit && (this.skipButton.held || mouse.clicked && !this.advanceBuffer)) {
			this.index ++;
			this.checkCurrent();
		}
		if (currentLine.isSplit) {
			var clickedButton = currentLine.choiceButtons.filter(oj=>{oj.update(); return oj.clicked})[0];
			if (clickedButton) {
				this.shoveIn(clickedButton.lines);
				this.index++;
				this.checkCurrent();
			}
		}
		//console.log(this.index);
		this.advanceBuffer = false;
		this.justBegun = false;
		return false;
	},
	checkCurrent : function() {
		if (this.index >= this.list.length) {
			//console.log(overlay);
			if (overlay != tutorialOverlay)
				overlay = null;
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
		
		ctx.fillStyle = settings.background_color + "80";
		ctx.fillRect(0, 0, settings.width, settings.height);
		
		if (currentLine.sprite && settings.dialogPortraits) {
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
		drawParagraphInRect(currentLine.text, 0, settings.height - settings.infoHeight + 5, settings.width, settings.infoHeight - 5, 20);
		/*ctx.font = fontSize + "px "+settings.font;
		ctx.textAlign = "start";
		var lines = getLines(currentLine.text, canvas.width - (SIDE_MARGINS * 2));
		for (i = 0; i < lines.length; i++) { 
			ctx.fillText(lines[i], SIDE_MARGINS, canvas.height-settings.infoHeight + SIDE_MARGINS + 1.2 * fontSize * i);
		}*/
		
		if (currentLine.isSplit) {
			currentLine.choiceButtons.forEach(oj=>oj.draw());
		}
		
		//speaker
		ctx.textAlign = "left";
		ctx.font = fontSize + "px " + settings.font;
		var displaySpeaker = currentLine.speaker;
		switch (currentLine.speaker) {
			case "Player":
				ctx.fillStyle = player.color;
				displaySpeaker = player.name;
				break;
			case "Companion":
				ctx.fillStyle = companion.color;
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
		
		this.skipButton.draw();
		
		return false;
	},
	add : function(what) {
		this.list.push(...what);
	},
	shoveIn : function(stuff) {
		if (Array.isArray(stuff))
			this.list.splice(this.index+1, 0, ...stuff);
		else
			this.list.splice(this.index+1, 0, ...Array.prototype.slice.call(arguments))
	}
}

//---------------------------------------- Dialog Line -----------------------------

var DialogLine = function(speaker, sprite, text, time) {
    this.speaker = speaker;
    this.sprite = sprite;
	this.text = text;
	this.time = time;
}
DialogLine.prototype.isDialogLine = true;

function isDialogLine(obj) {
	if (typeof obj == "string")
		return true;
	return (obj.isDialogLine == true);
}

/*function doNothing() {
	
}*/

//----------------------------------------- Dialog Split ----------------------------------

var DialogSplit = function(speaker, sprite = sprite, text) {
	this.speaker = speaker;
	this.sprite = sprite;
	this.text = text;
	this.choices = Array.prototype.slice.call(arguments, 3).map(oj => {
		if (oj.isDialogSplitChoice) {
			return oj;
		} else {
			return new DialogSplitChoice(oj[0], ...(oj.slice(1)));
		}
	});
	this.choiceButtons = this.choices.map((oj, dex, ray) => {
		let butt = new Button(settings.width/4, settings.height-40*(ray.length-dex), settings.width/2, 30, oj.text);
		butt.lines = oj.lines;
		return butt;
	});
}
DialogSplit.prototype.isSplit = true;

/*DialogSplit.prototype.draw = function(ctx) {
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
}*/

//----------------------------------------- Dialog Split Choice ----------------------------------

function DialogSplitChoice(text) {
	this.text = text;
	this.lines = Array.prototype.slice.call(arguments, 1);
}
DialogSplitChoice.prototype.isDialogSplitChoice = true;

function isDialogSplitChoice(obj) {
	return obj.isDialogSplitChoice == true;
}