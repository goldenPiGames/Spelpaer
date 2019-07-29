function CureMinor(user) {
	this.user = user;
}; SPELLS.push(CureMinor);
CureMinor.prototype = Object.create(Spell);
CureMinor.prototype.name = "Cure Minor";
CureMinor.prototype.flavor = "A very small surge of positive energy.";
CureMinor.prototype.level = 4;
CureMinor.prototype.power = 5;
CureMinor.prototype.damageInflection = 0.7;
CureMinor.prototype.attribute = "positive";
CureMinor.prototype.hitrate = 0.65
CureMinor.prototype.attackStat = "Wisdom";
CureMinor.prototype.defenseStat = "Vitality";
CureMinor.prototype.accuracyStat = "Wisdom";
CureMinor.prototype.evasionStat = "Charisma";
CureMinor.prototype.delay = 100;
CureMinor.prototype.cost = 2;

function CureLight(user) {
	this.user = user;
}; SPELLS.push(CureLight);
CureLight.prototype = Object.create(CureMinor.prototype);
CureLight.prototype.name = "Cure Light";
CureLight.prototype.flavor = "A surge of positive energy.";
CureLight.prototype.level = 10;
CureLight.prototype.power = 14;
CureLight.prototype.cost = 5;

function CureModerate(user) {
	this.user = user;
}; SPELLS.push(CureModerate);
CureModerate.prototype = Object.create(CureMinor.prototype);
CureModerate.prototype.name = "Cure Moderate";
CureModerate.prototype.flavor = "A surge of positive energy.";
CureModerate.prototype.level = 20;
CureModerate.prototype.power = 28;
CureModerate.prototype.cost = 12;

function CureSerious(user) {
	this.user = user;
}; SPELLS.push(CureSerious);
CureSerious.prototype = Object.create(CureMinor.prototype);
CureSerious.prototype.name = "Cure Moderate";
CureSerious.prototype.flavor = "A surge of positive energy.";
CureSerious.prototype.level = 30;
CureSerious.prototype.power = 42;
CureSerious.prototype.cost = 20;

function CureCritical(user) {
	this.user = user;
}; SPELLS.push(CureCritical);
CureCritical.prototype = Object.create(CureMinor.prototype);
CureCritical.prototype.name = "Cure Moderate";
CureCritical.prototype.flavor = "A surge of positive energy.";
CureCritical.prototype.level = 40;
CureCritical.prototype.power = 56;
CureCritical.prototype.cost = 30;

function CureExtreme(user) {
	this.user = user;
}; SPELLS.push(CureExtreme);
CureExtreme.prototype = Object.create(CureMinor.prototype);
CureExtreme.prototype.name = "Cure Moderate";
CureExtreme.prototype.flavor = "A surge of positive energy.";
CureExtreme.prototype.level = 50;
CureExtreme.prototype.power = 70;
CureExtreme.prototype.cost = 41;

function RepairLight(user) {
	this.user = user;
}
RepairLight.prototype = Object.create(CureLight.prototype);
RepairLight.prototype.attribute = "repair";