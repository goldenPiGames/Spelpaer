function WildGore(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.maxCooldown = this.cooldownMult * this.level;
	this.user = user;
	/*animate : function(user, target, battle) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = 0; i < 22; i++) {
			let direction = randomDirection();
			let speed = i/4 + 2 * Math.random();
			let shade = 64 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = Math.cos(direction) * speed;
			let dy = Math.sin(direction) * speed;
			engine.particles.push(new Ember(x, y, dx, dy, 3, color, .025));
		}
	},*/
}//; TECHNIQUES.push(WildGore);
WildGore.prototype = Object.create(Technique);
WildGore.prototype.name = "Wild Gore";
WildGore.prototype.flavor = "A reckless and powerful attack with tusks, horns, antlers, or the like.";
WildGore.prototype.attack = true;
WildGore.prototype.powerMult = 2.0;
WildGore.prototype.attribute = ATTRIBUTE_INDICES.piercing;
WildGore.prototype.hitrate = 0.45;
WildGore.prototype.attackStat = STAT_INDICES.Strength;
WildGore.prototype.usesWeapon = false;
WildGore.prototype.defenseStat = STAT_INDICES.Constitution;
WildGore.prototype.usesArmor = true;
WildGore.prototype.accuracyStat = STAT_INDICES.Dexterity;
WildGore.prototype.evasionStat = STAT_INDICES.Agility;
WildGore.prototype.delay = 140;
WildGore.prototype.cooldownMult = 250;
WildGore.prototype.cooldownStat = STAT_INDICES.Constitution;
WildGore.prototype.prerequisites = [BasicAttack];