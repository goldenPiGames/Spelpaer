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

var Equipment = {
	forPlayer : false,
	forCompanion : false,
	statMods : statsToArray({
		
	}, 0),
	attributeResists : attributesToArray({
		
	}, 0),
	execute : function(user) {
		user.equip(this);
	},
}
Object.setPrototypeOf(Equipment, Item);

function NoWeapon() {
	
}
ITEMS.push(NoWeapon);
NoWeapon.prototype = Object.create(Equipment);
NoWeapon.prototype.name = "No Weapon";
NoWeapon.prototype.description = "<Player> cannot equip a weapon."
NoWeapon.prototype.slot = SLOT_INDICES.RightHand;
NoWeapon.prototype.statMods = statsToArray({
	
}, 0);