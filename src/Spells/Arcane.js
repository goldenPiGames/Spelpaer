function RayOfFrost(user) {
	this.user = user;
}; SPELLS.push(RayOfFrost);
RayOfFrost.prototype = Object.create(Spell);
RayOfFrost.prototype.name = "Ray of Frost";
RayOfFrost.prototype.flavor = "A small beam of frigid air.";
RayOfFrost.prototype.attack = true;
RayOfFrost.prototype.level = 5;
RayOfFrost.prototype.power = 7;
RayOfFrost.prototype.attribute = "cold";
RayOfFrost.prototype.hitrate = 0.75;
RayOfFrost.prototype.attackStat = "Intelligence";
RayOfFrost.prototype.defenseStat = "Constitution";
RayOfFrost.prototype.accuracyStat = "Dexterity";
RayOfFrost.prototype.evasionStat = "Agility";
RayOfFrost.prototype.delay = 80;
RayOfFrost.prototype.cost = 2

function AcidSplash(user) {
	this.user = user;
}; SPELLS.push(AcidSplash);
AcidSplash.prototype = Object.create(Spell);
AcidSplash.prototype.name = "Acid Splash";
AcidSplash.prototype.flavor = "A small orb of corrosive liquid.";
AcidSplash.prototype.attack = true;
AcidSplash.prototype.level = 5;
AcidSplash.prototype.power = 7;
AcidSplash.prototype.attribute = "acid";
AcidSplash.prototype.hitrate = 0.75;
AcidSplash.prototype.attackStat = "Intelligence";
AcidSplash.prototype.defenseStat = "Wisdom";
AcidSplash.prototype.accuracyStat = "Dexterity";
AcidSplash.prototype.evasionStat = "Agility";
AcidSplash.prototype.delay = 80;
AcidSplash.prototype.cost = 2

function BurningHands(user) {
	this.user = user;
}; SPELLS.push(BurningHands);
BurningHands.prototype = Object.create(Spell);
BurningHands.prototype.name = "Burning Hands";
BurningHands.prototype.flavor = "Create a cone of fire from your hands.";
BurningHands.prototype.attack = true;
BurningHands.prototype.level = 10;
BurningHands.prototype.power = 10;
BurningHands.prototype.splash = 0.5;
BurningHands.prototype.attribute = "fire";
BurningHands.prototype.hitrate = 0.8;
BurningHands.prototype.attackStat = "Intelligence";
BurningHands.prototype.defenseStat = "Wisdom";
BurningHands.prototype.accuracyStat = "Dexterity";
BurningHands.prototype.evasionStat = "Agility";
BurningHands.prototype.delay = 100;
BurningHands.prototype.cost = 6;

function ShockingGrasp(user) {
	this.user = user;
}; SPELLS.push(ShockingGrasp);
ShockingGrasp.prototype = Object.create(Spell);
ShockingGrasp.prototype.name = "Shocking Grasp";
ShockingGrasp.prototype.flavor = "Touch an enemy to discharge an electrical shock.";
ShockingGrasp.prototype.attack = true;
ShockingGrasp.prototype.level = 12;
ShockingGrasp.prototype.power = 16;
ShockingGrasp.prototype.attribute = "electricity";
ShockingGrasp.prototype.hitrate = 0.75;
ShockingGrasp.prototype.attackStat = "Intelligence";
ShockingGrasp.prototype.defenseStat = "Wisdom";
ShockingGrasp.prototype.accuracyStat = "Dexterity";
ShockingGrasp.prototype.evasionStat = "Agility";
ShockingGrasp.prototype.delay = 120;
ShockingGrasp.prototype.cost = 6;
/*class ShockingGrasp extends SpellC {
	constructor() {
		super();
	}
	name = "Shocking Grasp";
	flavor = "Touch an enemy to discharge an electrical shock.";
	attack = true;
	level = 12;
	power = 16;
	attribute = "electricity";
	hitrate = 0.75;
	attackStat = "Intelligence";
	defenseStat = "Wisdom";
	accuracyStat = "Dexterity";
	evasionStat = "Agility";
	delay = 110;
	cost = 6;
}
SPELLS.push(ShockingGrasp);*/


function AcidArrow(user) {
	this.user = user;
}; SPELLS.push(AcidArrow);
AcidArrow.prototype = Object.create(Spell);
AcidArrow.prototype.name = "Acid Arrow";
AcidArrow.prototype.flavor = "Launch a projectile made of acid.";
AcidArrow.prototype.attack = true;
AcidArrow.prototype.level = 17;
AcidArrow.prototype.power = 22;
AcidArrow.prototype.attribute = "acid";
AcidArrow.prototype.hitrate = 0.75;
AcidArrow.prototype.attackStat = "Intelligence";
AcidArrow.prototype.defenseStat = "Wisdom";
AcidArrow.prototype.accuracyStat = "Dexterity";
AcidArrow.prototype.evasionStat = "Agility";
AcidArrow.prototype.delay = 100;
AcidArrow.prototype.cost = 10;

/*var ScorchingRay = {
	__proto__ : Spell,
	name : "Scorching Ray",
	description : "Fire a thin beam of intense heat.",
	source : ".",
	attack : true,
	level : 21,
	power : 27,
	attribute : "fire",
	hitrate : 0.75,
	attackStat : "Intelligence",
	defenseStat : "Wisdom",
	accuracyStat : "Dexterity",
	evasionStat : "Agility",
	delay : 100,
	cost : 13
}; SPELLS.push(ScorchingRay);

var ScorchingRay2 = {
	__proto__ : Spell,
	name : "Scorching Ray x2",
	description : "Fire two thin beams of intense heat.",
	source : ".",
	attack : true,
	level : 42,
	power : 54,
	attribute : "fire",
	hitrate : 0.75,
	attackStat : "Intelligence",
	defenseStat : "Wisdom",
	accuracyStat : "Dexterity",
	evasionStat : "Agility",
	delay : 100,
	cost : 32
}; SPELLS.push(ScorchingRay2);*/