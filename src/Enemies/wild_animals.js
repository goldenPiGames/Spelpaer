var Boar = function(level) {
	this.level = level;
	this.techniques = [
		new BasicAttack(level, this),
		new WildGore(level, this),
	];
	this.spells = [];
	this.init();
}
Boar.prototype = Object.create(Unit);
Boar.prototype.name = "Boar";
Boar.prototype.description = "A forest animal, dangerous and aggressive when rutting.";
Boar.prototype.image = makeImage("src/Enemies/Boar.png"); //Pigboar, Master of the Monster Lair
Boar.prototype.hpMult = 2.5;
Boar.prototype.statMults = statsToArray({
	Vitality : 1.0,
	Strength : 1.7,
	Constitution : 1.6,
	Dexterity : 0.8,
	Agility : 1.1,
	Intelligence : 0.2,
	Wisdom : 0.7,
	Charisma : 0.6,
	Potential : 0.5,
	Weapon : 0,
	Armor : 0,
});
Boar.prototype.effectiveness = attributesToArray({
	piercing : 1.3,
	positive : -1.0,
	thought : 0.4,
});
Boar.prototype.weaponAttribute = ATTRIBUTE_INDICES.piercing;
Boar.prototype.dropTable = [
	{item:HideShirt, chance:.15, min:5, max:20, condition:DROP_CONDITIONS.deadOnly},
	{item:TuskNecklace, chance:.20, min:10, max:20, condition:DROP_CONDITIONS.deadOnly},
]


var Moose = function(level) {
	this.level = level;
	this.techniques = [
		new BasicAttack(level, this),
		new WildGore(level, this),
	];
	this.spells = [];
	this.init();
}
Moose.prototype = Object.create(Unit);
Moose.prototype.name = "Moose";
Moose.prototype.description = "A majestic moose. Mind you, moose bites can be pretty nasty."
Moose.prototype.image = makeImage("src/Enemies/Moose.png"); //http://wikiclipart.com/moose-clipart_10850/
Moose.prototype.hpMult = 2.5;
Moose.prototype.statMults = statsToArray({
	Vitality : 1.3,
	Strength : 1.5,
	Constitution : 1.7,
	Dexterity : 0.8,
	Agility : 0.9,
	Intelligence : 0.2,
	Wisdom : 0.9,
	Charisma : 0.5,
	Potential : 0.5,
	Weapon : 0,
	Armor : 0,
});
Moose.prototype.effectiveness = attributesToArray({
	fire : 1.4,
	ice : .6,
	positive : -1.0,
	thought : 0.4,
});
Moose.prototype.weaponAttribute = ATTRIBUTE_INDICES.bludgeoning;
Moose.prototype.dropTable = [
	//TODO put something here
]

var Wolf = function(level) {
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
		//TODO add "Ankle Bite" or something
	];
	this.spells = [];
	this.init();
}
Wolf.prototype = Object.create(Unit);
Wolf.prototype.name = "Wolf";
Wolf.prototype.description = "A wild canine. They hunt in packs.";
Wolf.prototype.image = makeImage("src/Enemies/Wolf.png");
Wolf.prototype.hpMult = 2.5;
Wolf.prototype.statMults = statsToArray({
	Vitality : 0.8,
	Strength : 1.1,
	Constitution : 1.0,
	Dexterity : 1.5,
	Agility : 1.6,
	Intelligence : 0.3,
	Wisdom : 0.7,
	Charisma : 0.9,
	Potential : 0.5,
	Weapon : 0,
	Armor : 0,
});
Wolf.prototype.effectiveness = attributesToArray({
	fire : 1.3,
	thought : 0.4,
});
Wolf.prototype.weaponAttribute = ATTRIBUTE_INDICES.piercing;
Wolf.prototype.dropTable = [
	//TODO put something here
]

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
