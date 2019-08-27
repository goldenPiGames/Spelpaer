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
	}
	setZoom(nuuz) {
		let centerX = this.xoff + this.width/2 / this.zoom;
		let centerY = this.yoff + this.height/2 / this.zoom;
		this.zoom = nuuz;
		this.center(centerX, centerY);
	}
	drawX(realX) {
		return (realX - this.xoff) * this.zoom + this.x;
	}
	drawY(realY) {
		return (realY - this.yoff) * this.zoom + this.y;
	}
}