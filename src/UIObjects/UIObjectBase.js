class UIObject {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	update() {
		this.updateMouse();
	}
	intersectsMouse() {
		return mouse.x >= this.x && mouse.x < this.x + this.width && mouse.y >= this.y && mouse.y < this.y + this.height;
	}
	updateMouse() {
		this.hovered = this.intersectsMouse();
		this.wasPressed = this.pressed;
		this.pressed = mouse.down && this.hovered;
		this.clicked = mouse.clicked && this.hovered;
		this.held = (this.clicked || (this.held && mouse.down)) ? this.held+1 : 0;
	}
}

var UIObjectBase = {
    intersects: function(obj, mouse) {
		var xIntersect = mouse.x > obj.x && mouse.x < obj.x + obj.width;
        var yIntersect = mouse.y > obj.y && mouse.y < obj.y + obj.height;
        return xIntersect && yIntersect;
    },
    updateMouse: function(canvas){
        this.hovered = this.intersects(this, mouse);
		this.wasPressed = this.pressed;
		this.pressed = mouse.down && this.hovered;
		this.clicked = mouse.clicked && this.hovered;
		this.held = (this.clicked || (this.held && mouse.down));
    }
};

class BlankUIObject extends UIObject {
	draw() {
		
	}
}