const TECHNIQUES = [];

var Technique = {
	__proto__ : BattleAction,
	known : false,
	isTechnique : true,
	isSpell : false,
	damageInflection : 1.0,
	cooldown : 0,
	getDescription : function() {
		var desc = this.name + " lv. " + this.level;
		desc += " <br> Delay: " + this.delay;
		if (this.maxCooldown)
			desc += "; Cooldown: " + this.maxCooldown + "/" + this.cooldownStat;
		else
			desc += "; Cooldown: None";
		if (this.power)
			desc += " <br> Power: " + this.power + " " + this.attribute + " (" + this.attackStat + (this.usesWeapon?" + Weapon":"") + " vs. " + this.defenseStat + (this.usesArmor?" + Armor":"") + (this.damageInflection != 1.0 ? ", damage inflection "+this.damageInflection+")" : ")");
		if (this.hitrate) {
			desc += " <br> Hitrate: " + asPercent(this.hitrate, 0)
			if (this.hitrate < 1.0)
				desc += " (" + this.accuracyStat + " vs " + this.evasionStat + ")";
		}
		if (this.effect) {
			var fect = new this.effect(this);
			desc += " <br> Effect: " + fect.getDescription();
		}
		desc += " <br> " + this.flavor;
		return desc;
	},
	isAvailable : function() {
		return !(this.cooldown > 0);
	},
	cooldownPortion : function() {
		return 1-(this.cooldown/this.maxCooldown);
	},
	expend : function() {
		this.cooldown = this.maxCooldown;
	},
	tick : function(user) {
		if (this.cooldown > 0) {
			this.cooldown = Math.max(0, this.cooldown - user.getStat(this.cooldownStat));
		}
	},
}

function BasicAttack(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.user = user;
	this.attribute = this.user.weaponAttribute;
}; TECHNIQUES.push(BasicAttack);
BasicAttack.prototype = Object.create(Technique);
BasicAttack.prototype.name = "Attack";
BasicAttack.prototype.flavor = "The most basic combat technique.";
BasicAttack.prototype.attack = true;
BasicAttack.prototype.powerMult = 1.0;
BasicAttack.prototype.hitrate = 0.75;
BasicAttack.prototype.attackStat = "Strength";
BasicAttack.prototype.usesWeapon = true;
BasicAttack.prototype.defenseStat = "Constitution";
BasicAttack.prototype.usesArmor = true;
BasicAttack.prototype.accuracyStat = "Dexterity";
BasicAttack.prototype.evasionStat = "Agility";
BasicAttack.prototype.delay = 100;
BasicAttack.prototype.cooldownMult = 0;
BasicAttack.prototype.isAvailable = function() {
	return true;
},
BasicAttack.prototype.cooldownPortion = function() {
	return 1.0;
},
BasicAttack.prototype.prerequisites = [];

function PowerChop(level, user) {
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
}; TECHNIQUES.push(PowerChop);
PowerChop.prototype = Object.create(Technique);
PowerChop.prototype.name = "Power Chop";
PowerChop.prototype.flavor = "A more powerful two-handed attack.";
PowerChop.prototype.attack = true;
PowerChop.prototype.powerMult = 1.5;
PowerChop.prototype.attribute = "slashing";
PowerChop.prototype.hitrate = 0.6;
PowerChop.prototype.attackStat = "Strength";
PowerChop.prototype.usesWeapon = true;
PowerChop.prototype.defenseStat = "Constitution";
PowerChop.prototype.usesArmor = true;
PowerChop.prototype.accuracyStat = "Dexterity";
PowerChop.prototype.evasionStat = "Agility";
PowerChop.prototype.delay = 120;
PowerChop.prototype.cooldownMult = 200;
PowerChop.prototype.cooldownStat = "Constitution";
PowerChop.prototype.prerequisites = [BasicAttack];

function Cleave(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.maxCooldown = this.cooldownMult * this.level;
	this.user = user;
	/*animate : function(user, target, battle) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = -12; i < 8; i++) {
			let ty = y - 25 + 50 * Math.random();
			let shade = 64 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = (i + 4 * Math.random()) * 0.7;
			engine.particles.push(new Ember(x, y - 10 + 20*Math.random(), dx, 0, 3, color, .02));
		}
	},*/
	prerequisites : [BasicAttack]
}; TECHNIQUES.push(Cleave);
Cleave.prototype = Object.create(Technique);
Cleave.prototype.name = "Cleave";
Cleave.prototype.flavor = "A sideways strike that also hits enemies to either side of the main target.";
Cleave.prototype.attack = true;
Cleave.prototype.powerMult = 0.9;
Cleave.prototype.attribute = "slashing";
Cleave.prototype.splash = 0.6;
Cleave.prototype.hitrate = 0.65;
Cleave.prototype.attackStat = "Strength";
Cleave.prototype.usesWeapon = true;
Cleave.prototype.defenseStat = "Constitution";
Cleave.prototype.usesArmor = true;
Cleave.prototype.accuracyStat = "Dexterity";
Cleave.prototype.evasionStat = "Agility";
Cleave.prototype.delay = 120;
Cleave.prototype.cooldownMult = 250;
Cleave.prototype.cooldownStat = "Constitution";
Cleave.prototype.execute = executeSplashAttack;
Cleave.prototype.prerequisites = [];

/*function InfinitySlash(level, user) {
	__proto__ : Technique,
	name : "Infinity Slash",
	flavor : "A mighty sideways slash so powerful it could cleave the entire world in twain",
	attack : true,
	powerMult : 5.0,
	attribute : "slashing",
	hitrate : 0.5,
	attackStat : "Strength",
	defenseStat : "Constitution",
	accuracyStat : "Dexterity",
	evasionStat : "Agility",
	delay : 200,
	cooldownMult : 2000,
	cooldownStat : "Potential",
	execute : executeLineAttack,
	animate : function(user, target, battle) {
		var y = target.animationY();
		for(var x = 130; x < 670; x+=10) {
			let ty = y - 25 + 50 * Math.random();
			let color = randomTerm(["#00DDFF", "#FFFF00", "#CC0011", "#BB00FF", "#00FF77", "#FF8800"]);
			let dx = randomN(7);
			let dy = randomN(4);
			engine.particles.push(new Ember(x, y - 10 + 20*Math.random(), dx, dy, 3, color, .02));
		}
	},
	
	skillCost : 20,
	prerequisites : [Cleave]
}; TECHNIQUES.push(InfinitySlash);
InfinitySlash.prototype = Object.create(Technique);
.prototype.name = "";
.prototype.flavor = ".";
.prototype.attack = true;
.prototype.powerMult = ;
.prototype.hitrate = ;
.prototype.attackStat = "Strength";
.prototype.usesWeapon = true;
.prototype.defenseStat = "Constitution";
.prototype.usesArmor = true;
.prototype.accuracyStat = "Dexterity";
.prototype.evasionStat = "Agility";
.prototype.delay = ;
.prototype.cooldownMult = ;
.prototype.prerequisites = [];*/

function QuickStab(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.user = user;
	this.maxCooldown = this.cooldownMult * this.level;
}; TECHNIQUES.push(QuickStab);
QuickStab.prototype = Object.create(Technique);
QuickStab.prototype.name = "Quick Stab";
QuickStab.prototype.flavor = "A fast and accurate but weak attack.";
QuickStab.prototype.attack = true;
QuickStab.prototype.powerMult = 0.6;
QuickStab.prototype.attribute = "piercing";
QuickStab.prototype.hitrate = 0.85;
QuickStab.prototype.attackStat = "Strength";
QuickStab.prototype.usesWeapon = true;
QuickStab.prototype.defenseStat = "Constitution";
QuickStab.prototype.usesArmor = true;
QuickStab.prototype.accuracyStat = "Dexterity";
QuickStab.prototype.evasionStat = "Agility";
QuickStab.prototype.delay = 65;
QuickStab.prototype.cooldownMult = 200;
QuickStab.prototype.cooldownStat = "Agility";
QuickStab.prototype.prerequisites = [BasicAttack];

function ArmorPierce(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.user = user;
	this.maxCooldown = this.cooldownMult * this.level;
}; TECHNIQUES.push(ArmorPierce);
ArmorPierce.prototype = Object.create(Technique);
ArmorPierce.prototype.name = "Armor Pierce";
ArmorPierce.prototype.flavor = "Stabby stabby.";
ArmorPierce.prototype.attack = true;
ArmorPierce.prototype.powerMult = 0.8;
ArmorPierce.prototype.attribute = "piercing";
ArmorPierce.prototype.hitrate = 0.75;
ArmorPierce.prototype.attackStat = "Strength";
ArmorPierce.prototype.usesWeapon = true;
ArmorPierce.prototype.defenseStat = "Constitution";
ArmorPierce.prototype.usesArmor = 0.5;
ArmorPierce.prototype.accuracyStat = "Dexterity";
ArmorPierce.prototype.evasionStat = "Agility";
ArmorPierce.prototype.delay = 110;
ArmorPierce.prototype.cooldownMult = 500;
ArmorPierce.prototype.cooldownStat = "Intelligence";
ArmorPierce.prototype.prerequisites = [BasicAttack];
ArmorPierce.prototype.effect = function(source) {
	this.source = source;
	this.amount = source.level;
}
ArmorPierce.prototype.effect.prototype = Object.create(SingleNerf);
ArmorPierce.prototype.effect.prototype.target = true;
ArmorPierce.prototype.effect.prototype.stat = "Armor";
ArmorPierce.prototype.effect.prototype.duration = 300;
ArmorPierce.prototype.effect.prototype.rate = 1.0;