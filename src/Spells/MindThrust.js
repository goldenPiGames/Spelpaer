function MindThrust1(user) {
	this.user = user;
}; SPELLS.push(MindThrust1);
MindThrust1.prototype = Object.create(Spell);
MindThrust1.prototype.name = "Mind Thrust I";
MindThrust1.prototype.description = "Deliver an assault of thoughts into the target's mind.";
MindThrust1.prototype.level = 15;
MindThrust1.prototype.attack = true;
MindThrust1.prototype.power = 19;
MindThrust1.prototype.attribute = "mind";
MindThrust1.prototype.hitrate = 0.8;
MindThrust1.prototype.attackStat = "Charisma";
MindThrust1.prototype.defenseStat = "Charisma";
MindThrust1.prototype.accuracyStat = "Intelligence";
MindThrust1.prototype.evasionStat = "Wisdom";
MindThrust1.prototype.delay = 100;
MindThrust1.prototype.cost = 9;

function MindThrust2(user) {
	this.user = user;
}; SPELLS.push(MindThrust2);
MindThrust2.prototype = Object.create(MindThrust1.prototype);
MindThrust2.prototype.name = "Mind Thrust II";
MindThrust2.prototype.level = 25;
MindThrust2.prototype.power = 31;
MindThrust2.prototype.cost = 16;
MindThrust2.prototype.known = false;

function MindThrust3(user) {
	this.user = user;
}; SPELLS.push(MindThrust3);
MindThrust3.prototype = Object.create(MindThrust1.prototype);
MindThrust3.prototype.name = "Mind Thrust III";
MindThrust3.prototype.level = 35;
MindThrust3.prototype.power = 44;
MindThrust3.prototype.cost = 25;
MindThrust3.prototype.known = false;

function MindThrust4(user) {
	this.user = user;
}; SPELLS.push(MindThrust4);
MindThrust4.prototype = Object.create(MindThrust1.prototype);
MindThrust4.prototype.name = "Mind Thrust IV";
MindThrust4.prototype.level = 45;
MindThrust4.prototype.power = 56;
MindThrust4.prototype.cost = 35;
MindThrust4.prototype.known = false;

function MindThrust5(user) {
	this.user = user;
}; SPELLS.push(MindThrust5);
MindThrust5.prototype = Object.create(MindThrust1.prototype);
MindThrust5.prototype.name = "Mind Thrust V";
MindThrust5.prototype.level = 55;
MindThrust5.prototype.power = 69;
MindThrust5.prototype.cost = 48;
MindThrust5.prototype.known = false;

/*var MindThrust6 = {
	__proto__ : protoMindThrust,
	name : "Mind Thrust VI",
	known : false,
	level : 65,
	power : 81,
	cost : 60
}; SPELLS.push(MindThrust6);*/