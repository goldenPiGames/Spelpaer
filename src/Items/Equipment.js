const SLOT_NAMES = [
	"RightHand",
	"LeftHand",
	"Armor",
	"Bling",
]

const SLOT_INDICES = {};

SLOT_NAMES.forEach(function(nom, dex) {
	SLOT_INDICES[nom] = dex;
	//SLOT_INDICES[nom.substring(0, 3).toUpperCase()] = dex;
});

class Equipment extends Item {
	constructor() {
		super();
	}
	execute(user) {
		if (this.equippableTo(user))
			user.equip(this);
		else
			return false;
	}
	equippableTo(character) {
		return this.forPlayer && character instanceof Player || this.forCompanion && character instanceof Companion;
	}
	getDescription() {
		var desc = this.name;
		desc += " <br> Stats: ";
		var comma = false;
		for (var i = 0; i < STAT_NAMES.length; i++) {
			let fec = this.statMods[i];
			if (fec) {
				if (comma)
					desc += ", ";
				else
					comma = true;
				if (fec > 0)
					desc += STAT_ABBS[i] + " +" + fec;
				else
					desc += STAT_ABBS[i] + " " + fec;
			}
		}
		desc += " <br> " + this.flavor;
		return desc;
	}
}
Equipment.prototype.selfOnly = true;
Equipment.prototype.forPlayer = false;
Equipment.prototype.forCompanion = false;
Equipment.prototype.statMods = statsToArray({
	
}, 0);
Equipment.prototype.attributeResists = attributesToArray({
	
}, 0);

class NoWeapon extends Equipment {
	/*constructor() {
		super();
	}*/
	getDescription() {
		return "<Player> cannot equip a weapon.";
	}
}
ITEMS.push(NoWeapon);
NoWeapon.prototype.name = "No Weapon";
NoWeapon.prototype.description = "<Player> cannot equip a weapon.";
NoWeapon.prototype.slot = SLOT_INDICES.RightHand;
NoWeapon.prototype.statMods = statsToArray({
	
}, 0);