class DynamicCamera extends UIObject {
	constructor(x, y, width, height) {
		super(x, y, width, height);
		this.zoom = 1;
		this.xoff = 0;
		this.yoff = 0;
		this.mouse = {
			x : mouse.x,
			y : mouse.y,
		}
	}
	update() {
		super.update();
		if (mouse.scrolled) {
			this.setZoom(Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom - 1/4 * mouse.scrolled)));
		}
		if (this.draggable && this.held && !this.clicked) {
			this.xoff += (mouse.lastX - mouse.x) / this.zoom;
			this.yoff += (mouse.lastY - mouse.y) / this.zoom;
			this.checkBounds();
		}
		if (this.directPan && this.hovered) {
			//console.log("bup");
			this.xoff = this.boundLeft + ((mouse.x - this.x) / this.width) * (this.boundRight-this.width/this.zoom-this.boundLeft);
			this.yoff = this.boundTop + ((mouse.y - this.y) / this.height) * (this.boundBottom-this.height/this.zoom-this.boundTop);
			//this.yoff = (mouse.lastY - mouse.y) / this.zoom;
			this.checkBounds();
		}
		if (this.hovered) {
			this.mouse.x = (mouse.x - this.x) / this.zoom + this.xoff;
			this.mouse.y = (mouse.y - this.y) / this.zoom + this.yoff;
		} else {
			this.mouse.x = NaN;
			this.mouse.y = NaN;
		}
	}
	center(x, y) {
		this.xoff = x - this.width/2 / this.zoom;
		this.yoff = y - this.height/2 / this.zoom;
		this.checkBounds();
	}
	setZoom(nuuz) {
		let centerX = this.xoff + this.width/2 / this.zoom;
		let centerY = this.yoff + this.height/2 / this.zoom;
		this.zoom = nuuz;
		this.center(centerX, centerY);
		this.checkBounds();
	}
	checkBounds() {
		if (this.width/this.zoom < this.boundRight-this.boundLeft)
			this.xoff = Math.max(this.boundLeft, Math.min(this.boundRight-this.width/this.zoom, this.xoff));
		else
			this.xoff = (this.boundLeft + this.boundRight) / 2 - this.width/2 / this.zoom;
		
		if (this.height/this.zoom < this.boundBottom-this.boundTop)
			this.yoff = Math.max(this.boundTop, Math.min(this.boundBottom-this.height/this.zoom, this.yoff));
		else
			this.yoff = (this.boundTop + this.boundBottom) / 2 - this.height/2 / this.zoom;
	}
	drawX(realX) {
		return (realX - this.xoff) * this.zoom + this.x;
	}
	drawY(realY) {
		return (realY - this.yoff) * this.zoom + this.y;
	}
	drawSprite(sprite, x, y) {
		if (sprite instanceof HTMLImageElement) {
			ctx.drawImage(sprite, Math.round(this.drawX(x)), Math.round(this.drawY(y)), sprite.width*this.zoom, sprite.height*this.zoom);
		} else if (sprite.image) {
			ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, Math.round(this.drawX(x)), this.drawY(y), sprite.width*this.zoom, sprite.height*this.zoom);
		} else {
			throw sprite + " is not an image or sprite";
		}
	}
	drawLine(x1, y1, x2, y2) {
		ctx.beginPath();
		ctx.moveTo(this.drawX(x1), this.drawY(y1));
		ctx.lineTo(this.drawX(x2), this.drawY(y2));
		ctx.stroke();
	}
	drawArc(x, y, r, t1, t2, w) {
		if (w)
			ctx.lineWidth = w * this.zoom;
		ctx.beginPath();
		ctx.arc(this.drawX(x), this.drawY(y), r*this.zoom, t1, t2);
		ctx.stroke();
	}
	drawRect(x, y, width, height, line, color, stroke) {
		this.fillRect(x, y, width, height, color);
		this.strokeRect(x, y, width, height, line, stroke);
	}
	fillRect(x, y, width, height, color) {
		if (color)
			ctx.fillStyle = color;
		ctx.fillRect(this.drawX(x), this.drawY(y), width*this.zoom, height*this.zoom);
	}
	strokeRect(x, y, width, height, line, color) {
		if (line)
			ctx.lineWidth = line * this.zoom;
		if (color)
			ctx.strokeStyle = color;
		ctx.strokeRect(this.drawX(x), this.drawY(y), width*this.zoom, height*this.zoom);
	}
}
DynamicCamera.prototype.boundLeft = -Infinity;
DynamicCamera.prototype.boundRight = Infinity;
DynamicCamera.prototype.boundTop = -Infinity;
DynamicCamera.prototype.boundBottom = Infinity;