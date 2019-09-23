class Boar extends Unit {
	constructor(level) {
		super(level);
	}
	chooseAction() {
		if (this.lastHitBy)
			return {action: this.findTechnique(WildGore) || this.findTechnique(BasicAttack), target: this.lastHitBy}
		else
			return {action: this.findTechnique(BasicAttack), target: this.pickRandomEnemy()}
	}
}
Boar.prototype.name = "Boar";
Boar.prototype.description = "A forest animal, dangerous and aggressive when rutting.";
Boar.prototype.image = makeImage("src/Enemies/Boar.png"); //Pigboar, Master of the Monster Lair
Boar.prototype.hpMult = 5.0;
Boar.prototype.statMults = statsToArray({
	Vitality : 1.0,
	Strength : 1.5,
	Constitution : 1.6,
	Dexterity : 0.8,
	Agility : 1.1,
	Intelligence : 0.2,
	Wisdom : 0.7,
	Charisma : 0.6,
	Potential : 0.5,
	Weapon : .3,
	Armor : 0,
	Implement : 0,
	Resistance : .5,
});
Boar.prototype.effectiveness = attributesToArray({
	piercing : 1.3,
}, STANDARD_EFFECTIVENESS_ANIMAL);
Boar.prototype.weaponAttribute = ATTRIBUTE_INDICES.piercing;
Boar.prototype.techniqueTable = [
	BasicAttack,
	WildGore,
]
Boar.prototype.dropTable = [
	{item:HideShirt, chance:.05, minLevel:5, maxLevel:20, condition:DROP_CONDITIONS.deadOnly},
	{item:TuskNecklace, chance:.20, minLevel:10, maxLevel:20, condition:DROP_CONDITIONS.deadOnly},
]

class Moose extends Unit {
	constructor(level) {
		super(level);
	}
	chooseAction() {
		if (this.hpPortion() <= 1/2) {
			if (this.findTechnique(Desperation))
				return {action: this.foundAction, target: this};
		}
		return {action: this.findTechnique(BasicAttack), target: this.pickRandomEnemy()};
	}
}
Moose.prototype.name = "Moose";
Moose.prototype.description = "A majestic moose. Mind you, moose bites can be pretty nasty."
Moose.prototype.image = makeImage("src/Enemies/Moose.png"); //http://wikiclipart.com/moose-clipart_10850/
Moose.prototype.hpMult = 5.0;
Moose.prototype.statMults = statsToArray({
	Vitality : 1.3,
	Strength : 1.4,
	Constitution : 1.7,
	Dexterity : 0.8,
	Agility : 0.9,
	Intelligence : 0.2,
	Wisdom : 0.9,
	Charisma : 0.5,
	Potential : 0.5,
	Weapon : .5,
	Armor : 0,
	Implement : 0,
	Resistance : .5,
});
Moose.prototype.effectiveness = attributesToArray({
	fire : 1.3,
	cold : .7,
}, STANDARD_EFFECTIVENESS_ANIMAL);
Moose.prototype.weaponAttribute = ATTRIBUTE_INDICES.bludgeoning;
Moose.prototype.techniqueTable = [
	BasicAttack,
	//WildGore,
	Desperation,
]
Moose.prototype.dropTable = [
	{item:HideShirt, chance:.10, minLevel:5, maxLevel:20, condition:DROP_CONDITIONS.deadOnly},
	//TODO put something here
]

class Wolf extends Unit {
	constructor(level) {
		super(level);
	}
	chooseAction() {
		var target = this.pickEnemy(oj=>1-oj.hpPortion()+Math.random()/5);
		return {
			action: !target.findEffect(AnkleBiteEffect) && this.findTechnique(AnkleBite) ||
					//target.findEffect(AnkleBiteEffect) && this.findTechnique(Artery) ||
					battle.membersOfSide(this.team, true) >= 2 && this.findTechnique(PackAttack) ||
					this.findTechnique(BasicAttack),
			target: target
		}
	}
}
Wolf.prototype.name = "Wolf";
Wolf.prototype.description = "A wild canine. They hunt in packs.";
Wolf.prototype.image = makeImage("src/Enemies/Wolf.png");
Wolf.prototype.hpMult = 5.0;
Wolf.prototype.statMults = statsToArray({
	Vitality : 0.8,
	Strength : 1.0,
	Constitution : 1.0,
	Dexterity : 1.4,
	Agility : 1.6,
	Intelligence : 0.3,
	Wisdom : 0.9,
	Charisma : 0.9,
	Potential : 0.5,
	Weapon : 0,
	Armor : 0,
	Implement : 0,
	Resistance : .5,
});
Wolf.prototype.effectiveness = attributesToArray({
	
}, STANDARD_EFFECTIVENESS_ANIMAL);
Wolf.prototype.weaponAttribute = ATTRIBUTE_INDICES.piercing;
Wolf.prototype.techniqueTable = [
	BasicAttack,
	AnkleBite,
	//ArteryBite,
	PackAttack,
]
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
