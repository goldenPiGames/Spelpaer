const PALETTE_RATIO = 1/6;
function TechniquePalette(x, y, width, height, returnFunction = doNothing, list = [], highlightProperty = function(val){return false}) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.returnFunction = returnFunction;
	this.highlightProperty = highlightProperty;
	this.elements = [];
}
TechniquePalette.prototype = Object.create(UIObjectBase);
TechniquePalette.prototype.setTechniques = function(lisp) {
	this.elementHeight = Math.min(this.height/lisp.length, this.width*PALETTE_RATIO);
	this.elements = [];
	for (var i = 0; i < lisp.length; i++) {
		this.elements[i] = new TechniquePaletteElement(this.x, this.y+this.elementHeight*i, this.width, this.elementHeight, this, lisp[i]);
	}
}
TechniquePalette.prototype.update = function() {
	this.elements.forEach(function(mint) {
		mint.update();
	});
}
TechniquePalette.prototype.draw = function() {
	this.elements.forEach(function(mint, dex) {
		//console.log(dex, mint);
		mint.draw();
	});
}

TechniquePalette.prototype.returnItem = function(value) {
	//console.log(value);
	this.returnFunction(value);
}

TechniquePalette.prototype.getTotalHeight = function() {
	return this.height * this.elements.length;
}

function TechniquePaletteElement(x, y, width, height, parent, tech) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.parent = parent;
	this.tech = tech;
}
TechniquePaletteElement.prototype = Object.create(UIObjectBase);
TechniquePaletteElement.prototype.update = function() {
	this.updateStats();
	if (this.tech) {
		if (this.hovered) {
			infoField.setText(this.tech.getDescription());
		}
		if (this.clicked)
			this.parent.returnItem(this.tech);
	}
}
TechniquePaletteElement.prototype.draw = function() {
	ctx.globalAlpha = 1;
	ctx.fillStyle = (this.clicked || this.parent.highlightProperty(this.tech)) ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
	ctx.beginPath();
	ctx.arc(this.x+this.height/2, this.y+this.height/2, this.height/2-2, -Math.PI/2, 2*Math.PI*(this.tech.cooldownPortion()-1/4));
	ctx.lineTo(this.x+this.height/2, this.y+this.height/2);
	ctx.closePath();
	ctx.fill();
	if (!this.tech.isAvailable())
		ctx.fillStyle = settings.disabled_color;
	ctx.font = this.height/2 + "px " + settings.font;
	ctx.textAlign = "start";
	ctx.fillText(this.tech.name, this.x+this.height+3, this.y+this.height*1/4);
}