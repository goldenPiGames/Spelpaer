var MoneyDisplay = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.clicked = false;
    this.hovered = false;
	this.normalColor = normalColor;
}
MoneyDisplay.prototype = Object.create(UIObjectBase);

MoneyDisplay.prototype.update = function() {
    this.updateStats(ctx);
	if (this.hovered)
		infoField.setText("You currently have "+money+" worth of currency and random stuff.");
}

MoneyDisplay.prototype.draw = function() {
	var text = "" + money;
	
	//set color
	ctx.fillStyle = (this.hovered) ? settings.hover_color : this.normalColor;
    ctx.font = this.height + "px " + settings.font;
	
    //draw the text
    ctx.fillText(text, this.x + this.width - ctx.measureText(text).width, this.y);
}