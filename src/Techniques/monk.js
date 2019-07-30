function StunningKick(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.maxCooldown = this.cooldownMult * this.level;
	this.user = user;
	/*effectRate : .55,
	effectAccuracyStat : "Wisdom",
	effectEvasionStat : "Constitution",
	effectStat : "speed",
	effectAmount : -1.0,
	effectDuration : 80,*/
	
}; TECHNIQUES.push(StunningKick);
StunningKick.prototype = Object.create(Technique);
StunningKick.prototype.name = "Stunning Fist";
StunningKick.prototype.flavor = "Strike a foe's pressure point with a well-placed punch to temporarily stun them.";
StunningKick.prototype.attack = true;
StunningKick.prototype.powerMult = 0.8;
StunningKick.prototype.attribute = "bludgeoning";
StunningKick.prototype.hitrate = 0.75;
StunningKick.prototype.attackStat = "Strength";
StunningKick.prototype.usesWeapon = false;
StunningKick.prototype.defenseStat = "Constitution";
StunningKick.prototype.usesArmor = true;
StunningKick.prototype.accuracyStat = "Dexterity";
StunningKick.prototype.evasionStat = "Agility";
StunningKick.prototype.delay = 90;
StunningKick.prototype.cooldownMult = 400;
StunningKick.prototype.cooldownStat = "Wisdom";
StunningKick.prototype.prerequisites = [BasicAttack];

function ShadowSnap(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.maxCooldown = this.cooldownMult * this.level;
	this.user = user;
}; TECHNIQUES.push(ShadowSnap);
ShadowSnap.prototype = Object.create(Technique);
ShadowSnap.prototype.name = "Shadow Snap";
ShadowSnap.prototype.flavor = "A kick so fast, it takes almost no time at all.";
ShadowSnap.prototype.attack = true;
ShadowSnap.prototype.powerMult = 0.9;
ShadowSnap.prototype.attribute = "bludgeoning";
ShadowSnap.prototype.hitrate = 0.85;
ShadowSnap.prototype.attackStat = "Strength";
ShadowSnap.prototype.usesWeapon = false;
ShadowSnap.prototype.defenseStat = "Constitution";
ShadowSnap.prototype.usesArmor = true;
ShadowSnap.prototype.accuracyStat = "Dexterity";
ShadowSnap.prototype.evasionStat = "Agility";
ShadowSnap.prototype.delay = 10;
ShadowSnap.prototype.cooldownMult = 1000;
ShadowSnap.prototype.cooldownStat = "Wisdom";
ShadowSnap.prototype.prerequisites = [QuickStab, StunningKick];

/*function ScorpionStrike(level, user) {
	this.name : "Scorpion Strike",
	this.flavor : "Strike a foe's pressure point with a well-placed punch to slow them.",
	this.attack : true,
	this.power : 0.8*level,
	this.attribute : "bludgeoning",
	this.hitrate : 0.7,
	this.attackStat : "Strength",
	this.usesWeapon : false,
	this.defenseStat : "Constitution",
	this.usesArmor : true,
	this.accuracyStat : "Dexterity",
	this.evasionStat : "Agility",
	
	this.effectRate : .65,
	this.effectAccuracyStat : "Wisdom",
	this.effectEvasionStat : "Constitution",
	this.effectStat : "speed",
	this.effectAmount : -0.25,
	this.effectDuration : 500,
	
	this.delay : 120,
	this.availability : .40,
	
}; TECHNIQUES.push(ScorpionStrike);
ScorpionStrike.prototype = Object.create(Technique);
.prototype.name = "";
.prototype.flavor = ".";
.prototype.attack = true;
.prototype.powerMult = ;
.prototype.hitrate = ;
.prototype.attackStat = "Strength";
.prototype.usesWeapon = true;
.prototype.defenseStat = "Constitution";
.prototype.usesArmor = true;
.prototype.accuracyStat = "Dexterity";
.prototype.evasionStat = "Agility";
.prototype.delay = ;
.prototype.cooldownMult = ;
.prototype.prerequisites = [];

function GorgonsFist(level, user) {
	this.name : "Gorgon's Fist",
	this.flavor : "Strike a foe who is already slowed (such as from Scorpion Strike) in order to slow them further.",
	this.attack : true,
	this.power : 0.8,
	this.attribute : "bludgeoning",
	this.hitrate : 0.7,
	this.attackStat : "Strength",
	this.defenseStat : "Constitution",
	this.accuracyStat : "Dexterity",
	this.evasionStat : "Agility",
	
	this.effectRate : .85,
	this.effectAccuracyStat : "Wisdom",
	this.effectEvasionStat : "Constitution",
	this.effectStat : "speed",
	this.effectAmount : -0.35,
	this.effectDuration : 200,
	this.tryEffect : function(messageList, attacker, defender, dmg) {
		if (target.getStat("speed") < 1.0) {
			var thisser = this;
			var rate = this.hitrate;
			var acc = attacker.getStat(this.effectAccuracyStat);
			var eva = defender.getStat(this.effectEvasionStat);
			var truerate = rate * acc / (rate * acc + (1-rate) * eva);
			
			var hit = (Math.random() < truerate);
			if (Math.random() < truerate || attacker.team == defender.team) {
				this.applyEffect(messageList, attacker, defender, dmg);
			} else {
				//messageList.push(function(){target.dodge(0)});
				messageList.push(new DialogLine("Battle", null, "The effect fails to take hold on "+defender.name+".", MESSAGE_TIME));
			}
		} else {
			messageList.push(new DialogLine("Battle", null, "But "+defender.name+" was not already slowed, and was not affected.", MESSAGE_TIME));
		}
	},
	
	this.delay : 120,
}; TECHNIQUES.push(GorgonsFist);
GorgonsFist.prototype = Object.create(Technique);
.prototype.name = "";
.prototype.flavor = ".";
.prototype.attack = true;
.prototype.powerMult = ;
.prototype.hitrate = ;
.prototype.attackStat = "Strength";
.prototype.usesWeapon = true;
.prototype.defenseStat = "Constitution";
.prototype.usesArmor = true;
.prototype.accuracyStat = "Dexterity";
.prototype.evasionStat = "Agility";
.prototype.delay = ;
.prototype.cooldownMult = ;
.prototype.prerequisites = [];*/
