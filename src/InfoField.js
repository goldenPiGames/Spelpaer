const INFO_DEFAULT_MESSAGE = "Mouse over something to learn more.";
const SIDE_MARGINS = 10;

var infoField = {
	__proto__ : UIObjectBase,
	clicked : false,
	hovered : false,
	text : "S U C C",
	update : function() {
		this.updateMouse();
		this.text = INFO_DEFAULT_MESSAGE;
		this.used = false;
	},
	draw : function() {
		//console.log(this.text);
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(0, settings.height-settings.infoHeight, settings.width, settings.infoHeight);
		
		ctx.lineWidth = 2;
		ctx.strokeStyle = settings.normal_color;
		ctx.beginPath();
		ctx.moveTo(settings.width, settings.height-settings.infoHeight);
		ctx.lineTo(0, settings.height-settings.infoHeight);
		ctx.stroke();
		
		//text
		var fontSize = 20;
		ctx.fillStyle = (this.text == INFO_DEFAULT_MESSAGE) ? "#666666" : settings.normal_color;
		ctx.font = fontSize + "px "+settings.font;
		ctx.textAlign = "start";
		var lines = getLines(this.text, settings.width - (SIDE_MARGINS * 2));
		//console.log(lines);
		for (i = 0; i < lines.length; i++) { 
			ctx.fillText(lines[i], SIDE_MARGINS, settings.height-settings.infoHeight + SIDE_MARGINS + 1.1 * fontSize * i);
		}
		if (currentTime) {
			ctx.fillStyle = settings.normal_color;
			ctx.font = "25px monospace";
			ctx.fillText(getDisplayTime(), 5, settings.height-25);
		}
	},
	setText : function(text) {
		if (text == 0)
			return;
		this.text = text;
		this.used = true;
	}
}

/**
 * @author @crazy2b from StackOverflow
 */
function getLines(text, maxWidth) {
	//console.log(text)
	if (!text)
		return [""]//["Something was passed undefined text.", "Nice coding there, boyo."];
	if (Array.isArray(text))
		return text;
	if (typeof text != "string")
		return [""];
	var words = text.split(" ");
	var lines = [];
	var currentLine = "";

	for (var i = 0; i < words.length; i++) {
		var word = words[i];
		word = word.replace("<Player>", player.name)
		word = word.replace("<Companion>", companion.name)
		var width = ctx.measureText(currentLine + " " + word).width;
		if (word == "<br>") {
			lines.push(currentLine);
			currentLine = "";
		} else if (width < maxWidth) {
			currentLine += word + " ";
		} else {
			lines.push(currentLine);
			currentLine = word + " ";
		}
	}
	lines.push(currentLine);
	return lines;
}