var runnee;
const FPS = 30;
var particles = [];
/*var CoreEngine {
    this.FPS = 1000 / FPS;
    this.setupCanvas();
	
	this.music = document.createElement("audio");
	this.music.preload = "auto";
	this.music.controls = "none";
	this.music.style.display = "none";
	this.music.loop = true;
	document.body.appendChild(this.music);
}*/
var coreEngine = {
    frameDelay : 1000 / FPS,
	particles : [],
	run : function() {
		var desiredTime = Date.now() + this.frameDelay;
		musicLoopCheck();
		var thisser = this;
		infoField.update();
		if (dialogActive)
			dialog.update();
		else
			runnee.update();
		if (mouse.clicked)
			particles.push(new ParticleRing(mouse.x, mouse.y, 1.5, settings.click_color, .04));
		runnee.draw();
		if (dialogActive)
			dialog.draw();
		else {
			infoField.draw();
			particles.push(randomEmber());
		}
		var i = 0;
		while (i < particles.length) {
			if (particles[i].dead || particles[i].alpha < 0) {
				particles.splice(i, 1);
			} else {
				particles[i].go();
				i++;
			}
		}
		mouse.unClick();
		setTimeout(function(){thisser.run()}, Math.max(0, desiredTime-Date.now()));
	},
}

/*
CoreEngine.prototype.setupCanvas = function() {
    ctx.textBaseline = "top";
    this.context2D.mouse = {
        x: 0,
        y: 0,
        clicked: false,
        down: false
    };
 
    var engine = this;
	
	//this.canvas
    document.addEventListener("mousemove", function(e) {
        engine.context2D.mouse.x = e.offsetX;
        engine.context2D.mouse.y = e.offsetY;
        engine.context2D.mouse.clicked = (e.which == 1 && !engine.context2D.mouse.down);
        engine.context2D.mouse.down = (e.which == 1);
    });
 
    document.addEventListener("mousedown", function(e) {
        engine.context2D.mouse.clicked = !engine.context2D.mouse.down;
        engine.context2D.mouse.down = true;
    });
 
    document.addEventListener("mouseup", function(e) {
        engine.context2D.mouse.down = false;
        engine.context2D.mouse.clicked = false;
    });
}
/*
CoreEngine.prototype.run = function() {
	var desiredTime = Date.now() + this.FPS;
	runnee.update();
	runnee.draw();
	var interval = Math.max(0, desiredTime-Date.now());
	setTimeout(_.bind(this.run, this), interval);
}*/

GeneralEngine = {
	objects : [],
	update : function() {
		this.objects.forEach(function(oj) {
			oj.update();
		});
	},
	draw : function() {
		var thisser = this;
		clearBack();		
		this.objects.forEach(function(oj) {
			oj.draw();
		});
	}
}