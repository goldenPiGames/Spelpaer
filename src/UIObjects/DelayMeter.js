class DelayMeter extends UIObject {
	constructor(width, parent) {
		super(0, 10, width, 400);
		this.parent = parent;
	}
	update() {
		super.update();
		if (this.clicked) {
			this.parent.delayClicked(mouse.y - this.y);
		}
	}
	draw() {
		var thisser = this;
		ctx.lineWidth = 4;
		ctx.strokeStyle = this.parent.taker ? this.parent.taker.color : settings.normal_color;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.width, this.y);
		ctx.stroke();
		var units = battle.allUnits(true);
		var shouldRedo = false;
		units.forEach(function(oj, dex, ray) {
			if (oj.delayMeterIndex == undefined)
				shouldRedo = true;
		});
		if (shouldRedo) {
			units.forEach(function(oj, dex, ray) {
				oj.delayMeterIndex = dex;
			});
			this.length = units.length;
		}
		ctx.globalAlpha = 1;
		ctx.lineWidth = 2;
		ctx.lineJoin = 'miter';
		units.forEach(function(oj) {
			ctx.strokeStyle = oj.color;
			var dsx = thisser.width / thisser.length;
			var basex = (oj.delayMeterIndex+.5) * dsx;
			var basey = thisser.y + oj.delay;
			ctx.beginPath();
			ctx.moveTo(basex-dsx/2, basey+dsx);
			ctx.lineTo(basex, basey);
			ctx.lineTo(basex+dsx/2, basey+dsx);
			ctx.lineTo(basex, basey+dsx);
			ctx.lineTo(basex, basey+dsx*2);
			ctx.stroke();
		});
	}
}