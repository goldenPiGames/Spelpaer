const UPDATE_RUNNEE_NEVER = 0;
const UPDATE_RUNNEE_IN_OPENING = 1;
const UPDATE_RUNNEE_ALWAYS = 2;

var tutorialOverlay = {
	begin : function() {
		var arrayguments = Array.prototype.slice.call(arguments);
		this.list = Array.isArray(arrayguments[0]) ? (Array.isArray(arrayguments[0][0]) ? arrayguments[0][0]: arrayguments[0]) : arrayguments;
		//console.log(this.list);
		this.updateRunnee = UPDATE_RUNNEE_NEVER;
		this.index = 0;
		this.opening = false;
		//this.advanceBuffer = true;
		this.checkCurrent();
		overlay = this;
	},
	update : function() {
		//console.log("bup")
		var line = this.list[this.index];
		var mouseInOpening = UIObject.prototype.intersectsMouse.call(this.opening);
		//console.log(mouseInOpening);
		if (this.advance(mouseInOpening)) {
			//console.log("bap")
			this.index ++;
			this.checkCurrent();
		}
		//console.log(this.updateRunnee == UPDATE_RUNNEE_ALWAYS || this.updateRunnee == UPDATE_RUNNEE_IN_OPENING && mouseInOpening)
		return this.updateRunnee == UPDATE_RUNNEE_ALWAYS || this.updateRunnee == UPDATE_RUNNEE_IN_OPENING && mouseInOpening;
	},
	checkCurrent : function() {
		if (this.index >= this.list.length) {
			overlay = null;
			return;
		}
		var line = this.list[this.index];
		if ((typeof line == "function")) {
			this.list[this.index]();
			this.index++;
			this.checkCurrent();
			return;
		}
		this.text = line.text;
		if (typeof line.textX == "number") {
			this.textX = line.textX;
			this.textY = line.textY;
			this.textWidth = line.textWidth;
			this.textHeight = line.textHeight;
		}
		if (line.opening == false) {
			this.opening = false;
		} else if (line.opening) {
			if (line.opening instanceof UIObject) {
				this.opening = {
					x : line.opening.x - 5,
					y : line.opening.y - 5,
					width : line.opening.width + 10,
					height : line.opening.height + 10,
				};
			} else {
				this.opening = line.opening;
			}
		}
		if (typeof line.updateRunnee == "number")
			this.updateRunnee = line.updateRunnee;
		this.advance = line.advance || (this.updateRunnee == UPDATE_RUNNEE_IN_OPENING ? ((inOp)=>mouse.clicked && !inOp) : (()=>mouse.clicked));
	},
	draw : function() {
		//console.log("bap")
		if (this.opening) {
			ctx.fillStyle = settings.background_color + "80";
			ctx.fillRect(0, 0, settings.width, this.opening.y); //top
			ctx.fillRect(0, this.opening.y, this.opening.x, this.opening.height); //left
			ctx.fillRect(this.opening.x+this.opening.width, this.opening.y, settings.width-this.opening.x-this.opening.width, this.opening.height); //right
			ctx.fillRect(0, this.opening.y+this.opening.height, settings.width, settings.height-this.opening.y-this.opening.height); //bottom
			ctx.strokeStyle = settings.normal_color;
			ctx.lineWidth = 2;
			ctx.strokeRect(this.opening.x, this.opening.y, this.opening.width, this.opening.height);
		} else {
			ctx.fillStyle = settings.background_color + "80";
			ctx.fillRect(0, 0, settings.width, settings.height);
		}
		ctx.fillStyle = settings.background_color + "80";
		ctx.fillRect(this.textX, this.textY, this.textWidth, this.textHeight);
		//console.log(settings.normal_color + "80", this.textX, this.textY, this.textWidth, this.textHeight);
		ctx.strokeStyle = settings.normal_color + "C0";
		ctx.strokeRect(this.textX, this.textY, this.textWidth, this.textHeight);
		ctx.fillStyle = settings.normal_color;
		drawParagraphInRect(this.text, this.textX+5, this.textY+5, this.textWidth-10, this.textHeight-10, 20);
		return true;//this.updateRunnee == UPDATE_RUNNEE_ALWAYS || this.updateRunnee == UPDATE_RUNNEE_IN_OPENING && mouseInOpening;
	},
}