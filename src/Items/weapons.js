var Weapon = {
	slot : SLOT_INDICES.RightHand,
	forPlayer : false,
	forCompanion : true,
	usableInBattle : true,
	delay : 90,
}
Object.setPrototypeOf(Weapon, Equipment);

function PocutopSword() {
	
}
ITEMS.push(PocutopSword);
PocutopSword.prototype = Object.create(Weapon);
PocutopSword.prototype.name = "Pocutop Sword";
PocutopSword.prototype.flavor = "Knight's armor crafted traditionally in Pocutop.";
PocutopSword.prototype.statMods = statsToArray({
	Weapon : 10,
}, 0);