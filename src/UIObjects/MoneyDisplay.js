function MoneyDisplay(x, y, width, height, normalColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.clicked = false;
    this.hovered = false;
	this.normalColor = normalColor || settings.normal_color;
}
MoneyDisplay.prototype = Object.create(UIObjectBase);

MoneyDisplay.prototype.update = function() {
    this.updateMouse(ctx);
	if (this.hovered)
		infoField.setText("You currently have "+money+" worth of currency and random stuff.");
}

MoneyDisplay.prototype.draw = function() {
	ctx.fillStyle = this.hovered ? settings.hover_color : settings.normal_color;
    ctx.font = this.height + "px " + settings.font;
	ctx.textAlign = "right";
	
    ctx.fillText(money, this.x + this.width, this.y);
}