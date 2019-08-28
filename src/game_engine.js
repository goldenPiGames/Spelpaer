var runnee;
var overlay;
const FPS = 30;
var particles = [];

var coreEngine = {
    frameDelay : 1000 / FPS,
	particles : [],
	run : function() {
		var desiredTime = Date.now() + this.frameDelay;
		musicLoopCheck();
		var thisser = this;
		infoField.update();
		//console.log(overlay)
		if (!overlay || overlay.update())
			runnee.update();
		if (mouse.clicked)
			particles.push(new ParticleRing(mouse.x, mouse.y, 1.5, settings.click_color, .04));
		runnee.draw();
		if (!overlay || overlay.draw()) {
			infoField.draw();
			addRandomEmbers();
		}
		var i = 0;
		particles = particles.filter((oj)=>oj.go());
		mouse.unClick();
		setTimeout(()=>this.run(), Math.max(0, desiredTime-Date.now()));
	},
}

GeneralEngine = {
	objects : [],
	update : function() {
		this.objects.forEach(function(oj) {
			oj.update();
		});
	},
	draw : function() {
		clearBack();		
		this.objects.forEach(function(oj) {
			oj.draw();
		});
	}
}