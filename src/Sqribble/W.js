function SqribbleWL(level) {
	this.level = level;
	this.techniques = [
		new BasicAttack(level, this),
		new WildGore(level, this),
	];
	this.spells = [];
	this.init();
}
SqribbleWL.prototype = Object.create(Unit);
SqribbleWL.prototype.name = "SQ-R____-_/Sp������_-W";
SqribbleWL.prototype.description = ".";
SqribbleWL.prototype.hpMult = 40;
SqribbleWL.prototype.statMults = statsToArray({
	Vitality : 1.0,
	Strength : 0,
	Constitution : 0.5,
	Dexterity : 1.0,
	Agility : 1.0,
	Intelligence : 2.0,
	Wisdom : 3.0,
	Charisma : 2.0,
	Potential : 1.5,
	Weapon : 0,
	Armor : 0,
});
SqribbleWL.prototype.effectiveness = attributesToArray({
	fear : 0,
	positive : -1.0,
});
SqribbleWL.prototype.weaponAttribute = ATTRIBUTE_INDICES.piercing;

function SqribbleWR(level) {
	
}
SqribbleWR.prototype.statMults = statsToArray({
	Vitality : 1.0,
	Strength : 2.0,
	Constitution : 2.0,
	Dexterity : 1.0,
	Agility : 1.0,
	Intelligence : 0,
	Wisdom : 3.0,
	Charisma : 2.0,
	Potential : 1.5,
	Weapon : 1.5,
	Armor : 2.0,
});
SqribbleWR.prototype.effectiveness = attributesToArray({
	thought : 0,
	fear : 0,
	positive : -1.0,
});