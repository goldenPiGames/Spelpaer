function Label(x, y, width, height, text, hoverText, normalColor = settings.normal_color, align = "center") {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.hoverText = hoverText;
	this.normalColor = normalColor;
	this.align = align;
	this.clicked = false;
	this.hovered = false;
}
 
Label.prototype = Object.create(UIObjectBase);

Label.prototype.update = function() {
	this.updateMouse();
	if (this.hovered && this.hoverText != undefined)
		infoField.setText(this.hoverText);
}

Label.prototype.draw = function() {
	ctx.fillStyle = (this.hovered) ? settings.hover_color : this.normalColor;
	ctx.font = this.height + "px " + settings.font;
	ctx.textAlign = this.align;
	
	ctx.fillText(this.text, this.x + (this.align=="left" ? 0 : this.align=="right" ? 1 : .5) * this.width, this.y);
}

function outof(current, max) {
	return current + "/" + max;
}