function Guard(level, user) {
	this.level = level;
	this.user = user;
}; TECHNIQUES.push(Guard);
Guard.prototype = Object.create(Technique);
Guard.prototype.name = "Guard";
Guard.prototype.flavor = "The most basic defensive technique.";
Guard.prototype.attack = false;
Guard.prototype.hitrate = 1.00;
Guard.prototype.accuracyStat = "Dexterity";
Guard.prototype.evasionStat = "Agility";
Guard.prototype.delay = 100;
Guard.prototype.isAvailable = function() {
	return true;
},
Guard.prototype.cooldownPortion = function() {
	return 1.0;
},
Guard.prototype.prerequisites = [];

Guard.prototype.effect = function(source) {
	this.source = source;
	this.amount = source.level;
}
Guard.prototype.effect.prototype = Object.create(SingleBuff);
Guard.prototype.effect.prototype.target = true;
Guard.prototype.effect.prototype.stat = "Armor";
Guard.prototype.effect.prototype.duration = 100;