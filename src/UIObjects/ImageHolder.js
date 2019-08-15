var ImageHolder = function(x, y, image) {
	this.x = x;
	this.y = y;
	this.image = image;
	if (this.image != undefined) {
		this.width = image.width;
		this.height = image.height;
	} else {
		this.height = 0;
		this.width = 0;
	}
}
ImageHolder.prototype = Object.create(UIObjectBase);

ImageHolder.prototype.update = function() {
	this.updateMouse(ctx);
}

ImageHolder.prototype.draw = function() {
	if (this.image != null && this.image != undefined)
		ctx.drawImage(this.image, this.x, this.y);
}