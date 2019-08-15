function Smite(level, user) {
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
			let shade = 128 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = Math.cos(direction) * speed;
			let dy = Math.sin(direction) * speed;
			engine.particles.push(new Ember(x, y, dx, dy, 3, color, .025));
		}
	},*/
}; TECHNIQUES.push(Smite);
Smite.prototype = Object.create(Technique);
Smite.prototype.name = "Smite";
Smite.prototype.flavor = "An attack imbued with light.";
Smite.prototype.attack = true;
Smite.prototype.powerMult = 1.3;
Smite.prototype.attribute = ATTRIBUTE_INDICES.radiant;
Smite.prototype.hitrate = 0.75;
Smite.prototype.attackStat = STAT_INDICES.Strength;
Smite.prototype.usesWeapon = true;
Smite.prototype.defenseStat = STAT_INDICES.Constitution;
Smite.prototype.usesArmor = true;
Smite.prototype.accuracyStat = STAT_INDICES.Charisma;
Smite.prototype.evasionStat = STAT_INDICES.Agility;
Smite.prototype.delay = 110;
Smite.prototype.cooldownMult = 500;
Smite.prototype.cooldownStat = STAT_INDICES.Charisma;
Smite.prototype.prerequisites = [];

function BrilliantBlade(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.maxCooldown = this.cooldownMult * this.level;
	this.user = user;
	/*this.animate : function(user, target, battle) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = 0; i < 22; i++) {
			let direction = randomDirection();
			let speed = i/4 + 2 * Math.random();
			let shade = 128 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = Math.cos(direction) * speed;
			let dy = Math.sin(direction) * speed;
			engine.particles.push(new Ember(x, y, dx, dy, 3, color, .025));
		}
	},*/
}; TECHNIQUES.push(BrilliantBlade);
BrilliantBlade.prototype = Object.create(Technique);
BrilliantBlade.prototype.name = "Brilliant Blade";
BrilliantBlade.prototype.flavor = "An immaterial blade made of pure radiant light.";
BrilliantBlade.prototype.attack = true;
BrilliantBlade.prototype.powerMult = 1.2;
BrilliantBlade.prototype.attribute = ATTRIBUTE_INDICES.radiant;
BrilliantBlade.prototype.hitrate = 0.75;
BrilliantBlade.prototype.attackStat = STAT_INDICES.Charisma;
BrilliantBlade.prototype.usesWeapon = true;
BrilliantBlade.prototype.defenseStat = STAT_INDICES.Constitution;
BrilliantBlade.prototype.usesArmor = false;
BrilliantBlade.prototype.accuracyStat = STAT_INDICES.Charisma;
BrilliantBlade.prototype.evasionStat = STAT_INDICES.Agility;
BrilliantBlade.prototype.delay = 110;
BrilliantBlade.prototype.cooldownMult = 900;
BrilliantBlade.prototype.cooldownStat = STAT_INDICES.Charisma;
BrilliantBlade.prototype.prerequisites = [];