var UIObjectBase = {
    intersects: function(obj, mouse) {
		var xIntersect = mouse.x > obj.x && mouse.x < obj.x + obj.width;
        var yIntersect = mouse.y > obj.y && mouse.y < obj.y + obj.height;
        return xIntersect && yIntersect;
    },
    updateStats: function(canvas){
        this.hovered = this.intersects(this, mouse);
		this.wasPressed = this.pressed;
		this.pressed = mouse.down && this.hovered;
		this.clicked = mouse.clicked && this.hovered;
		this.held = (this.clicked || (this.held && mouse.down));
    }
};

var BlankUIObject = function(x = 0, y = 0, width = 0, height = 0) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
BlankUIObject.prototype = Object.create(UIObjectBase);

BlankUIObject.prototype.update = UIObjectBase.updateStats;

BlankUIObject.prototype.draw = doNothing;