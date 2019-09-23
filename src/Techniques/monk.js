class StunningKick extends Technique {
	constructor(level) {
		super(level);
	}
	/*effectRate : .55,
	effectAccuracyStat : STAT_INDICES.Wisdom,
	effectEvasionStat : STAT_INDICES.Constitution,
	effectStat : "speed",
	effectAmount : -1.0,
	effectDuration : 80,*/
	
}; TECHNIQUES.push(StunningKick);
StunningKick.prototype = Object.create(Technique);
StunningKick.prototype.name = "Stunning Kick";
StunningKick.prototype.flavor = "Strike a foe's pressure point with a well-placed kick to temporarily stun them.";
StunningKick.prototype.attack = true;
StunningKick.prototype.powerMult = 0.7;
StunningKick.prototype.attribute = ATTRIBUTE_INDICES.bludgeoning;
StunningKick.prototype.hitrate = 0.75;
StunningKick.prototype.attackStat = STAT_INDICES.Strength;
StunningKick.prototype.attackStat2 = false;
StunningKick.prototype.defenseStat = STAT_INDICES.Constitution;
StunningKick.prototype.defenseStat2 = STAT_INDICES.Armor;
StunningKick.prototype.accuracyStat = STAT_INDICES.Dexterity;
StunningKick.prototype.evasionStat = STAT_INDICES.Agility;
StunningKick.prototype.delay = 90;
StunningKick.prototype.cooldownMult = 400;
StunningKick.prototype.cooldownStat = STAT_INDICES.Wisdom;
//TODO add stunning effect
StunningKick.prototype.prerequisites = [BasicAttack];

class ShadowSnap extends Technique {
	constructor(level) {
		super(level);
	}
}; TECHNIQUES.push(ShadowSnap);
ShadowSnap.prototype = Object.create(Technique);
ShadowSnap.prototype.name = "Shadow Snap";
ShadowSnap.prototype.flavor = "A kick so fast, it takes almost no time at all.";
ShadowSnap.prototype.attack = true;
ShadowSnap.prototype.powerMult = 0.6;
ShadowSnap.prototype.attribute = ATTRIBUTE_INDICES.bludgeoning;
ShadowSnap.prototype.hitrate = 0.85;
ShadowSnap.prototype.attackStat = STAT_INDICES.Strength;
ShadowSnap.prototype.attackStat2 = false;
ShadowSnap.prototype.defenseStat = STAT_INDICES.Constitution;
ShadowSnap.prototype.defenseStat2 = STAT_INDICES.Armor;
ShadowSnap.prototype.accuracyStat = "Dexterity";
ShadowSnap.prototype.evasionStat = STAT_INDICES.Agility;
ShadowSnap.prototype.delay = 15;
ShadowSnap.prototype.cooldownMult = 1000;
ShadowSnap.prototype.cooldownStat = STAT_INDICES.Wisdom;
ShadowSnap.prototype.prerequisites = [QuickStab, StunningKick];

/*function ScorpionStrike(level, user) {
	this.name : "Scorpion Strike",
	this.flavor : "Strike a foe's pressure point with a well-placed punch to slow them.",
	this.attack : true,
	this.power : 0.8*level,
	this.attribute : "bludgeoning",
	this.hitrate : 0.7,
	this.attackStat : STAT_INDICES.Strength,
	this.usesWeapon : false,
	this.defenseStat : STAT_INDICES.Constitution,
	this.usesArmor : true,
	this.accuracyStat : "Dexterity",
	this.evasionStat : STAT_INDICES.Agility,
	
	this.effectRate : .65,
	this.effectAccuracyStat : STAT_INDICES.Wisdom,
	this.effectEvasionStat : STAT_INDICES.Constitution,
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
.prototype.attackStat = STAT_INDICES.Strength;
.prototype.attackStat2 = STAT_INDICES.Weapon;
.prototype.defenseStat = STAT_INDICES.Constitution;
.prototype.defenseStat2 = STAT_INDICES.Armor;
.prototype.accuracyStat = "Dexterity";
.prototype.evasionStat = STAT_INDICES.Agility;
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
	this.attackStat : STAT_INDICES.Strength,
	this.defenseStat : STAT_INDICES.Constitution,
	this.accuracyStat : "Dexterity",
	this.evasionStat : STAT_INDICES.Agility,
	
	this.effectRate : .85,
	this.effectAccuracyStat : STAT_INDICES.Wisdom,
	this.effectEvasionStat : STAT_INDICES.Constitution,
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
.prototype.attackStat = STAT_INDICES.Strength;
.prototype.attackStat2 = STAT_INDICES.Weapon;
.prototype.defenseStat = STAT_INDICES.Constitution;
.prototype.defenseStat2 = STAT_INDICES.Armor;
.prototype.accuracyStat = "Dexterity";
.prototype.evasionStat = STAT_INDICES.Agility;
.prototype.delay = ;
.prototype.cooldownMult = ;
.prototype.prerequisites = [];*/
