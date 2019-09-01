class Weapon extends Equipment {
	
}
Weapon.prototype.slot = SLOT_INDICES.RightHand;
Weapon.prototype.forPlayer = false;
Weapon.prototype.forCompanion = true;
Weapon.prototype.usableInBattle = true;
Weapon.prototype.delay = 90;

class PocutopSword extends Weapon {
	
}
ITEMS.push(PocutopSword);
PocutopSword.prototype.name = "Pocutop Sword";
PocutopSword.prototype.flavor = "Knight's armor crafted traditionally in Pocutop.";
PocutopSword.prototype.statMods = statsToArray({
	Weapon : 10,
}, 0);