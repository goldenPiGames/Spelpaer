var ParticleBase = {
	dead : false,
	overInfo : false,
	dx : 0,
	dy : 0,
	alpha : 1,
    go: function() {
		this.updatePosition();
		ctx.globalAlpha = this.alpha;
		this.draw(ctx);
		this.updateAlpha();
    },
    updatePosition: function() {
        this.x += this.dx;
		this.y += this.dy;
		if (this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > (this.overInfo ? canvas.height : (canvas.height-infoField.height)))
			this.die();
    },
	updateAlpha: function(ctx) {
		this.alpha -= (this.fade > 1) ? (1/this.fade) : this.fade;
		if (this.alpha <= 0)
			this.die();
    },
	die : function(ctx) {
		this.dead = true;
	}
};

//--------------------------------------------------------- Ember ------------------------------------------
var Ember = function(x, y, dx, dy, radius, color, fade) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.fade = fade;
}
Ember.prototype = Object.create(ParticleBase);
Ember.prototype.overInfo = false;

Ember.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function randomEmber() {
	var direction = randomDirection();
	var speed = .5 + .5 * Math.random();
	var color = mouse.down ? settings.click_color : (infoField.used ? settings.hover_color : settings.normal_color);
	var dx = Math.cos(direction) * speed;
	var dy = Math.sin(direction) * speed;
	return new Ember(mouse.x - dx, mouse.y - dy, dx, dy, 2, color, .03);
	if (EXTRA_EMBER) {
		var direction = randomDirection();
		var speed = .5 + .5 * Math.random();
		var color = mouse.down ? settings.click_color : (infoField.used ? settings.hover_color : settings.normal_color);
		var dx = Math.cos(direction) * speed;
		var dy = Math.sin(direction) * speed;
		return new Ember((mouse.x + mouse.lastx) / 2, (mouse.y + mouse.lasty) / 2, dx, dy, 2, color, .03);
	}
}

//------------------------------------ Ring --------------------------
var ParticleRing = function(x, y, growth, color, fade) {
	this.x = x;
	this.y = y;
	this.radius = 0;
	this.growth = growth;
	this.color = color;
	this.fade = fade;
}
ParticleRing.prototype = Object.create(ParticleBase);
ParticleRing.prototype.overInfo = true;

ParticleRing.prototype.draw = function(ctx) {
	this.radius += this.growth;
	ctx.globalAlpha = this.alpha;
	ctx.strokeWidth = 3;
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
}

function randomDirection() {
	return Math.random() * 2 * Math.PI; 
}

function rgb(r, g, b) {
	return "rgb("+Math.round(r)+", "+Math.round(g)+", "+Math.round(b)+")";
}