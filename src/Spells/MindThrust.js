var MindThrustBase = {
	flavor : "Deliver an assault of thoughts into the target's mind.",
	attribute : ATTRIBUTE_INDICES.thought,
	hitrate : 0.8,
	damageInflection : 1.2,
	attackStat : STAT_INDICES.Charisma,
	defenseStat : STAT_INDICES.Charisma,
	accuracyStat : STAT_INDICES.Intelligence,
	evasionStat : STAT_INDICES.Wisdom,
	cooldownStat : STAT_INDICES.Intelligence,
	delay : 110,
}
Object.setPrototypeOf(MindThrustBase, Spell);

function MindThrust1(user) {
	this.user = user;
}; SPELLS.push(MindThrust1);
MindThrust1.prototype = Object.create(MindThrustBase);
MindThrust1.prototype.name = "Mind Thrust I";
MindThrust1.prototype.level = 15;
MindThrust1.prototype.power = 20;
MindThrust1.prototype.cost = 2;

function MindThrust2(user) {
	this.user = user;
}; SPELLS.push(MindThrust2);
MindThrust2.prototype = Object.create(MindThrustBase);
MindThrust2.prototype.name = "Mind Thrust II";
MindThrust2.prototype.level = 25;
MindThrust2.prototype.power = 32;
MindThrust2.prototype.cost = 3;

function MindThrust3(user) {
	this.user = user;
}; SPELLS.push(MindThrust3);
MindThrust3.prototype = Object.create(MindThrustBase);
MindThrust3.prototype.name = "Mind Thrust III";
MindThrust3.prototype.level = 35;
MindThrust3.prototype.power = 44;
MindThrust3.prototype.cost = 4;

function MindThrust4(user) {
	this.user = user;
}; SPELLS.push(MindThrust4);
MindThrust4.prototype = Object.create(MindThrustBase);
MindThrust4.prototype.name = "Mind Thrust IV";
MindThrust4.prototype.level = 45;
MindThrust4.prototype.power = 56;
MindThrust4.prototype.cost = 5;

function MindThrust5(user) {
	this.user = user;
}; SPELLS.push(MindThrust5);
MindThrust5.prototype = Object.create(MindThrustBase);
MindThrust5.prototype.name = "Mind Thrust V";
MindThrust5.prototype.level = 55;
MindThrust5.prototype.power = 69;
MindThrust5.prototype.cost = 6;
