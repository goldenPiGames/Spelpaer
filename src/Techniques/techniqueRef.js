/*function TechniqueInstance(technique, level, user) {
	this.base = technique;
	this.level = level;
	this.name = this.base.name+" "+this.level;
	this.user = user;
	this.power = this.base.powerMult * this.level;
	this.execute = this.base.execute;
	this.maxCooldown = this.base.cooldownMult * level;
	this.cooldown = 0;
}
TechniqueInstance.prototype = Object.create(BattleAction);

TechniqueInstance.prototype.getDescription = function() {
	var str = "";
	str += this.power;
	return str;
}
TechniqueInstance.prototype.expend = function() {
	this.cooldown = this.maxCooldown;
}
TechniqueInstance.prototype.tick = function() {
	if (this.maxCooldown > 0)
		this.cooldown = Math.max(0, this.cooldown - this.user.getStat(this.base.cooldownStat));
	else
		this.cooldown = 0;
}
TechniqueInstance.prototype.isAvailable = function() {
	return (this.cooldown <= 0);
}*/

function refreshKnownTechniques() {
	companion.techniques = [];
	TECHNIQUES.forEach(function(item) {
		if (item.prototype.known)
			companion.techniques.push(new item(item.prototype.known, companion));
	});
}