function SQwest(level) {
	
}
SQwest.prototype = Object.create(Unit);
SQwest.prototype.name = "SQ-R1881-3/SpelpaerW-PDB";

RedactΑ = function(user) {
	this.user = user;
}
RedactΑ.prototype = Object.create(Spell);
RedactΑ.prototype.name = "Redact Α";
RedactΑ.prototype.flavor = "██████";
RedactΑ.prototype.attack = true;
RedactΑ.prototype.level = 10;
RedactΑ.prototype.power = 15;
RedactΑ.prototype.attribute = "Data";
RedactΑ.prototype.hitrate = 0.75;
RedactΑ.prototype.attackStat = "Intelligence";
RedactΑ.prototype.defenseStat = "Wisdom";
RedactΑ.prototype.accuracyStat = "Charisma";
RedactΑ.prototype.evasionStat = "Charisma";
RedactΑ.prototype.delay = 100;
RedactΑ.prototype.cost = 2