function InflictMinor(user) {
	this.user = user;
}; SPELLS.push(InflictMinor);
InflictMinor.prototype = Object.create(Spell);
InflictMinor.prototype.name = "Inflict Minor";
InflictMinor.prototype.flavor = "A very small surge of negative energy.";
InflictMinor.prototype.level = 4;
InflictMinor.prototype.power = 5;
InflictMinor.prototype.damageInflection = 0.7;
InflictMinor.prototype.attribute = "negative";
InflictMinor.prototype.hitrate = 0.65
InflictMinor.prototype.attackStat = "Wisdom";
InflictMinor.prototype.defenseStat = "Vitality";
InflictMinor.prototype.accuracyStat = "Wisdom";
InflictMinor.prototype.evasionStat = "Charisma";
InflictMinor.prototype.delay = 100;
InflictMinor.prototype.cost = 2;

function InflictLight(user) {
	this.user = user;
}; SPELLS.push(InflictLight);
InflictLight.prototype = Object.create(InflictMinor.prototype);
InflictLight.prototype.name = "Inflict Light";
InflictLight.prototype.flavor = "A surge of negative energy.";
InflictLight.prototype.level = 10;
InflictLight.prototype.power = 14;
InflictLight.prototype.cost = 5;

function InflictModerate(user) {
	this.user = user;
}; SPELLS.push(InflictModerate);
InflictModerate.prototype = Object.create(InflictMinor.prototype);
InflictModerate.prototype.name = "Inflict Moderate";
InflictModerate.prototype.flavor = "A surge of negative energy.";
InflictModerate.prototype.level = 20;
InflictModerate.prototype.power = 28;
InflictModerate.prototype.cost = 12;

function InflictSerious(user) {
	this.user = user;
}; SPELLS.push(InflictSerious);
InflictSerious.prototype = Object.create(InflictMinor.prototype);
InflictSerious.prototype.name = "Inflict Moderate";
InflictSerious.prototype.flavor = "A surge of negative energy.";
InflictSerious.prototype.level = 30;
InflictSerious.prototype.power = 42;
InflictSerious.prototype.cost = 20;

function InflictCritical(user) {
	this.user = user;
}; SPELLS.push(InflictCritical);
InflictCritical.prototype = Object.create(InflictMinor.prototype);
InflictCritical.prototype.name = "Inflict Moderate";
InflictCritical.prototype.flavor = "A surge of negative energy.";
InflictCritical.prototype.level = 40;
InflictCritical.prototype.power = 56;
InflictCritical.prototype.cost = 30;

function InflictExtreme(user) {
	this.user = user;
}; SPELLS.push(InflictExtreme);
InflictExtreme.prototype = Object.create(InflictMinor.prototype);
InflictExtreme.prototype.name = "Inflict Moderate";
InflictExtreme.prototype.flavor = "A surge of negative energy.";
InflictExtreme.prototype.level = 50;
InflictExtreme.prototype.power = 70;
InflictExtreme.prototype.cost = 41;
