class MindThrustBase extends Spell {
	constructor() {
		super();
	}
}
MindThrustBase.prototype.flavor = "Deliver an assault of thoughts into the target's mind.",
MindThrustBase.prototype.attribute = ATTRIBUTE_INDICES.thought;
MindThrustBase.prototype.hitrate = 0.8;
MindThrustBase.prototype.damageInflection = 1.2;
MindThrustBase.prototype.attackStat = STAT_INDICES.Charisma;
MindThrustBase.prototype.defenseStat = STAT_INDICES.Charisma;
MindThrustBase.prototype.accuracyStat = STAT_INDICES.Intelligence;
MindThrustBase.prototype.evasionStat = STAT_INDICES.Wisdom;
MindThrustBase.prototype.cooldownStat = STAT_INDICES.Intelligence;
MindThrustBase.prototype.delay = 110;

class MindThrust1 extends MindThrustBase {
	constructor() {
		super();
	}
}; SPELLS.push(MindThrust1);
MindThrust1.prototype = Object.create(MindThrustBase);
MindThrust1.prototype.name = "Mind Thrust I";
MindThrust1.prototype.level = 15;
MindThrust1.prototype.power = 20;
MindThrust1.prototype.cost = 2;

class MindThrust2 extends MindThrustBase {
	constructor() {
		super();
	}
}; SPELLS.push(MindThrust2);
MindThrust2.prototype = Object.create(MindThrustBase);
MindThrust2.prototype.name = "Mind Thrust II";
MindThrust2.prototype.level = 25;
MindThrust2.prototype.power = 32;
MindThrust2.prototype.cost = 3;

class MindThrust3 extends MindThrustBase {
	constructor() {
		super();
	}
}; SPELLS.push(MindThrust3);
MindThrust3.prototype = Object.create(MindThrustBase);
MindThrust3.prototype.name = "Mind Thrust III";
MindThrust3.prototype.level = 35;
MindThrust3.prototype.power = 44;
MindThrust3.prototype.cost = 4;

class MindThrust4 extends MindThrustBase {
	constructor() {
		super();
	}
}; SPELLS.push(MindThrust4);
MindThrust4.prototype = Object.create(MindThrustBase);
MindThrust4.prototype.name = "Mind Thrust IV";
MindThrust4.prototype.level = 45;
MindThrust4.prototype.power = 56;
MindThrust4.prototype.cost = 5;

class MindThrust5 extends MindThrustBase {
	constructor() {
		super();
	}
}; SPELLS.push(MindThrust5);
MindThrust5.prototype = Object.create(MindThrustBase);
MindThrust5.prototype.name = "Mind Thrust V";
MindThrust5.prototype.level = 55;
MindThrust5.prototype.power = 69;
MindThrust5.prototype.cost = 6;
