var Boar = function(level) {
	this.name = "Boar";
	this.description = "A forest animal, dangerous and aggressive when rutting."
	this.level = level;
	this.Vitality =     Math.floor(level*1.0);
	this.Strength =     Math.floor(level*1.7);
	this.Constitution = Math.floor(level*1.6);
	this.Intelligence = 2;
	this.Wisdom =       Math.floor(level*0.5);
	this.Dexterity =    Math.floor(level*1.0);
	this.Agility =      Math.floor(level*1.0);
	this.Charisma =     Math.floor(level*0.4);
	this.Potential =    Math.floor(level*0.5);
	this.Weapon =       0;
	this.Armor =        0;
	this.maxhp = Math.ceil(this.Vitality*2.5);
	this.hp = this.maxhp;
	this.effectiveness = {
		piercing : 1.5,
		positive : -1.0,
	};
	this.weaponAttribute = "piercing";
	this.techniques = [
		new BasicAttack(level, this),
		new WildGore(level, this),
	];
	this.spells = [];
	this.init();
}
Boar.prototype = Object.create(Unit);
Boar.prototype.image = makeImage("src/Enemies/Boar.png"); //Pigboar, Master of the Monster Lair

var Moose = function(level) {
	this.name = "Moose";
	this.description = "A majestic moose. Mind you, moose bites can be pretty nasty."
	this.level = level;
	this.Vitality =     Math.floor(level*1.0);
	this.Strength =     Math.floor(level*1.5);
	this.Constitution = Math.floor(level*1.8);
	this.Intelligence = 2;
	this.Wisdom =       Math.floor(level*0.7);
	this.Dexterity =    Math.floor(level*0.9);
	this.Agility =      Math.floor(level*0.7);
	this.Charisma =     Math.floor(level*0.4);
	this.Potential =    Math.floor(level*0.5);
	this.Weapon =       0;
	this.Armor =        0;
	this.maxhp = Math.ceil(this.Vitality*2.5);
	this.hp = this.maxhp;
	this.effectiveness = {
		fire : 1.5,
		cold : .5,
		positive : -1.0,
	};
	this.weaponAttribute = "bludgeoning";
	this.techniques = [
		new BasicAttack(level, this),
		new WildGore(level, this),
	];
	this.spells = [];
	this.init();
}
Moose.prototype = Object.create(Unit);
Moose.prototype.image = makeImage("src/Enemies/Moose.png"); //http://wikiclipart.com/moose-clipart_10850/

var Wolf = function(level) {
	this.name = "Wolf";
	this.description = "A wild canine. They hunt in packs."
	this.level = level;
	this.Vitality =     Math.floor(level*1.0);
	this.Strength =     Math.floor(level*1.1);
	this.Constitution = Math.floor(level*1.0);
	this.Intelligence = 4;
	this.Wisdom =       Math.floor(level*0.8);
	this.Dexterity =    Math.floor(level*1.5);
	this.Agility =      Math.floor(level*1.6);
	this.Charisma =     Math.floor(level*0.6);
	this.Potential =    Math.floor(level*0.5);
	this.Weapon =       0;
	this.Armor =        0;
	this.maxhp = Math.ceil(this.Vitality*2.5);
	this.hp = this.maxhp;
	this.effectiveness = {
		fire : 1.5,
		positive : -1.0,
	};
	this.weaponAttribute = "piercing";
	this.techniques = [
		new BasicAttack(level, this),
	];
	this.spells = [];
	this.init();
}
Wolf.prototype = Object.create(Unit);
Wolf.prototype.image = makeImage("src/Enemies/Wolf.png");

/*var Squid = function(level) {
	this.name = "Squid";
	this.description = "It's a squid now. It's a squid now. It's a squid, it's a squid, it's a... you get the idea.";
	this.level = level;
	this.hp = Math.ceil(2.5*level);
	this.maxhp = Math.ceil(2.5*level);
	this.Strength = 11;
	this.Constitution = 8;
	this.Intelligence = 1;
	this.Wisdom = 6;
	this.Dexterity = 14;
	this.Agility = 16;
	this.Charisma = 3;
	this.effectiveness = {
		slashing : 1.5,
		piercing : 1.0,
		bludgeoning : 1.0,
		fire : 0.5,
		cold : 1.0,
		electricity : 1.5,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.0,
		negative : 1.0
	};
	this.weaponAttribute = "bludgeoning";
	this.techniques = [BasicAttack];
	this.spells = [];
	this.effects = [];
}
Squid.prototype = Object.create(Unit);
Squid.prototype.image = makeImage("src/Enemies/Squid.png"); //http://www.flickriver.com/photos/jovino/4526999689/

var Shark = function(level) {
	this.name = "Shark";
	this.description = "It's not invisible because it's made of glass. It's invisible because I don't have any image for it yet. It does love the fat kid, though.";
	this.level = level;
	this.hp = Math.ceil(3*level);
	this.maxhp = Math.ceil(3*level);
	this.Strength = 15;
	this.Constitution = 12;
	this.Intelligence = 1;
	this.Wisdom = 6;
	this.Dexterity = 12;
	this.Agility = 13;
	this.Charisma = 3;
	this.effectiveness = {
		slashing : 1.0,
		piercing : 1.5,
		bludgeoning : 0.75,
		fire : 0.75,
		cold : 0.75,
		electricity : 1.5,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.0,
		negative : 1.0
	};
	this.weaponAttribute = "piercing";
	this.techniques = [BasicAttack, WildGore];
	this.spells = [];
	this.effects = [];
}
Shark.prototype = Object.create(Unit);*/

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
WildGore.prototype.attribute = "piercing";
WildGore.prototype.hitrate = 0.45;
WildGore.prototype.attackStat = "Strength";
WildGore.prototype.usesWeapon = false;
WildGore.prototype.defenseStat = "Constitution";
WildGore.prototype.usesArmor = true;
WildGore.prototype.accuracyStat = "Dexterity";
WildGore.prototype.evasionStat = "Agility";
WildGore.prototype.delay = 140;
WildGore.prototype.cooldownMult = 250;
WildGore.prototype.cooldownStat = "Constitution";
WildGore.prototype.prerequisites = [BasicAttack];