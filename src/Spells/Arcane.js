class RayOfFrost extends Spell {
	
}; SPELLS.push(RayOfFrost);
RayOfFrost.prototype = Object.create(Spell);
RayOfFrost.prototype.name = "Ray of Frost";
RayOfFrost.prototype.flavor = "A small beam of frigid air.";
RayOfFrost.prototype.level = 5;
RayOfFrost.prototype.power = 7;
RayOfFrost.prototype.attribute = ATTRIBUTE_INDICES.cold;
RayOfFrost.prototype.hitrate = 0.7;
RayOfFrost.prototype.attackStat = STAT_INDICES.Intelligence;
RayOfFrost.prototype.defenseStat = STAT_INDICES.Constitution;
RayOfFrost.prototype.accuracyStat = STAT_INDICES.Dexterity;
RayOfFrost.prototype.evasionStat = STAT_INDICES.Agility;
RayOfFrost.prototype.delay = 90;
RayOfFrost.prototype.maxCooldown = 1500;
RayOfFrost.prototype.cooldownStat = STAT_INDICES.Intelligence;
RayOfFrost.prototype.cost = 1;

class AcidSplash extends Spell {
	
}; SPELLS.push(AcidSplash);
AcidSplash.prototype = Object.create(Spell);
AcidSplash.prototype.name = "Acid Splash";
AcidSplash.prototype.flavor = "A small orb of corrosive liquid.";
AcidSplash.prototype.level = 5;
AcidSplash.prototype.power = 7;
AcidSplash.prototype.attribute = ATTRIBUTE_INDICES.acid;
AcidSplash.prototype.hitrate = 0.7;
AcidSplash.prototype.attackStat = STAT_INDICES.Intelligence;
AcidSplash.prototype.defenseStat = STAT_INDICES.Wisdom;
AcidSplash.prototype.accuracyStat = STAT_INDICES.Dexterity;
AcidSplash.prototype.evasionStat = STAT_INDICES.Agility;
AcidSplash.prototype.delay = 90;
AcidSplash.prototype.maxCooldown = 1500;
AcidSplash.prototype.cooldownStat = STAT_INDICES.Intelligence;
AcidSplash.prototype.cost = 1;

class BurningHands extends Spell {
	
}; SPELLS.push(BurningHands);
BurningHands.prototype = Object.create(Spell);
BurningHands.prototype.name = "Burning Hands";
BurningHands.prototype.flavor = "Create a cone of fire from your hands.";
BurningHands.prototype.level = 11;
BurningHands.prototype.power = 12;
BurningHands.prototype.splash = 0.5;
BurningHands.prototype.attribute = ATTRIBUTE_INDICES.fire;
BurningHands.prototype.hitrate = 0.8;
BurningHands.prototype.attackStat = STAT_INDICES.Intelligence;
BurningHands.prototype.defenseStat = STAT_INDICES.Wisdom;
BurningHands.prototype.accuracyStat = STAT_INDICES.Dexterity;
BurningHands.prototype.evasionStat = STAT_INDICES.Agility;
BurningHands.prototype.delay = 120;
BurningHands.prototype.maxCooldown = 540000;
BurningHands.prototype.cooldownStat = STAT_INDICES.Intelligence;
BurningHands.prototype.cost = 2;

class ShockingGrasp extends Spell {
	
}; SPELLS.push(ShockingGrasp);
ShockingGrasp.prototype = Object.create(Spell);
ShockingGrasp.prototype.name = "Shocking Grasp";
ShockingGrasp.prototype.flavor = "Touch an enemy to discharge an electrical shock.";
ShockingGrasp.prototype.level = 12;
ShockingGrasp.prototype.power = 16;
ShockingGrasp.prototype.attribute = ATTRIBUTE_INDICES.electricity;
ShockingGrasp.prototype.hitrate = 0.75;
ShockingGrasp.prototype.attackStat = STAT_INDICES.Intelligence;
ShockingGrasp.prototype.defenseStat = STAT_INDICES.Wisdom;
ShockingGrasp.prototype.accuracyStat = STAT_INDICES.Dexterity;
ShockingGrasp.prototype.evasionStat = STAT_INDICES.Agility;
ShockingGrasp.prototype.delay = 120;
ShockingGrasp.prototype.cost = 6;

class AcidArrow extends Spell {
	
}; SPELLS.push(AcidArrow);
AcidArrow.prototype = Object.create(Spell);
AcidArrow.prototype.name = "Acid Arrow";
AcidArrow.prototype.flavor = "Launch a projectile made of acid.";
AcidArrow.prototype.attack = true;
AcidArrow.prototype.level = 17;
AcidArrow.prototype.power = 22;
AcidArrow.prototype.attribute = ATTRIBUTE_INDICES.acid;
AcidArrow.prototype.hitrate = 0.75;
AcidArrow.prototype.attackStat = STAT_INDICES.Intelligence;
AcidArrow.prototype.defenseStat = STAT_INDICES.Wisdom;
AcidArrow.prototype.accuracyStat = STAT_INDICES.Dexterity;
AcidArrow.prototype.evasionStat = STAT_INDICES.Agility;
AcidArrow.prototype.delay = 100;
AcidArrow.prototype.cost = 10;

class ScorchingRayBase extends Spell {
	
}
ScorchingRayBase.prototype.attribute = ATTRIBUTE_INDICES.fire;
ScorchingRayBase.prototype.hitrate = 0.75;
ScorchingRayBase.prototype.attackStat = STAT_INDICES.Intelligence;
ScorchingRayBase.prototype.defenseStat = STAT_INDICES.Wisdom;
ScorchingRayBase.prototype.accuracyStat = STAT_INDICES.Dexterity;
ScorchingRayBase.prototype.evasionStat = STAT_INDICES.Agility;
ScorchingRayBase.prototype.delay = 100;
ScorchingRayBase.prototype.cooldownStat = STAT_INDICES.Intelligence;

class ScorchingRay1 extends ScorchingRayBase {
	
}; SPELLS.push(ScorchingRay1);
ScorchingRay1.prototype.name = "Scorching Ray";
ScorchingRay1.prototype.description = "Fire a thin beam of intense heat.";
ScorchingRay1.prototype.level = 21;
ScorchingRay1.prototype.power = 27;
ScorchingRay1.prototype.cost = 3;
ScorchingRay1.prototype.maxCooldown = 25200;

class ScorchingRay2 extends ScorchingRayBase {
	
}; SPELLS.push(ScorchingRay2);
ScorchingRay2.prototype.name = "Double Scorching Ray";
ScorchingRay2.prototype.description = "Fire a two beams of intense heat.";
ScorchingRay2.prototype.level = 42;
ScorchingRay2.prototype.power = 54;
ScorchingRay2.prototype.cost = 6;
ScorchingRay2.prototype.maxCooldown = 50400;

class ScorchingRay3 extends ScorchingRayBase {
	
}; SPELLS.push(ScorchingRay3);
ScorchingRay3.prototype.name = "Triple Scorching Ray";
ScorchingRay3.prototype.description = "Fire a three beams of intense heat.";
ScorchingRay3.prototype.level = 63;
ScorchingRay3.prototype.power = 81;
ScorchingRay3.prototype.cost = 9;
ScorchingRay3.prototype.maxCooldown = 75600;
