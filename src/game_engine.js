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
		if (!overlay || overlay.update())
			runnee.update();
		if (mouse.clicked)
			particles.push(new ParticleRing(mouse.x, mouse.y, 1.5, settings.click_color, .04));
		runnee.draw();
		if (overlay)
			dialog.draw();
		else {
			infoField.draw();
			addRandomEmbers();
		}
		var i = 0;
		particles = particles.filter((oj)=>oj.go());
		/*while (i < particles.length) {
			if (particles[i].dead || particles[i].alpha < 0) {
				particles.splice(i, 1);
			} else {
				particles[i].go();
				i++;
			}
		}*/
		mouse.unClick();
		setTimeout(function(){thisser.run()}, Math.max(0, desiredTime-Date.now()));
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