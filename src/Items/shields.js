var Shield = {
	slot : SLOT_INDICES.LeftHand,
	forPlayer : false,
	forCompanion : true,
	usableInBattle : true,
	delay : 150,
}
Object.setPrototypeOf(Shield, Equipment);

function PocutopShield() {
	
}
ITEMS.push(PocutopShield);
PocutopShield.prototype = Object.create(Shield);
PocutopShield.prototype.name = "Pocutop Shield";
PocutopShield.prototype.flavor = "Knight's shield crafted traditionally in Pocutop.";
PocutopShield.prototype.statMods = statsToArray({
	Armor : 5,
}, 0);