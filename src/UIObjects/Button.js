const BUTTON_BORDER_WIDTH = 2;

var Button = function(x, y, width, height, text, hoverText, handler = doNothing, active) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
	this.hoverText = hoverText;
	this.handler = handler;
    this.clicked = false;
    this.hovered = false;
	this.active = true;
}
Button.prototype = Object.create(UIObjectBase);

Button.prototype.update = function() {
	this.updateMouse();
	if (this.hovered && this.hoverText != undefined) {
		infoField.setText(this.hoverText);
	}
    if (this.clicked && !this.wasClicked && this.active)
		this.handler();
}

Button.prototype.draw = function() {
	ctx.globalAlpha = 1;
	var color = this.active ? (this.clicked ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color)) : settings.disabled_color;
	ctx.lineWidth = BUTTON_BORDER_WIDTH;
	ctx.strokeStyle = color;
	
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
	var bbw = BUTTON_BORDER_WIDTH;
	ctx.strokeRect(this.x + bbw/2, this.y + bbw/2, this.width - bbw, this.height - bbw);
	
    var fontSize = 20;
	ctx.fillStyle = color;
    ctx.font = fontSize + "px "+settings.font;
	ctx.textBaseline = "top";
	ctx.textAlign = "center";
	
    ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2 - fontSize/2);
}