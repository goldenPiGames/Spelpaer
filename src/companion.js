var companion = {name:"Companion"};

var Companion = function(gender, Strength, Constitution, Intelligence, Wisdom, Dexterity, Agility, Charisma, techniques = [BasicAttack]) {
    this.name = "Companion";
	this.gender = gender;
	this.team = true;
	this.description = "Your strong and loyal companion. Will follow you to the ends of the earth.";
	this.level = 10;
	this.experience = 0;
	this.techniquePoints = 0;
	this.hp = 100;
	this.maxhp = 100;
    this.Strength = Strength;
	this.Constitution = Constitution;
	this.Intelligence = Intelligence;
	this.Wisdom = Wisdom;
	this.Dexterity = Dexterity;
	this.Agility = Agility;
	this.Charisma = Charisma;
	this.techniques = techniques;
	this.effectiveness = {
		slashing : 1.0,
		pierce : 1.0,
		bludgeoning : 1.0,
		fire : 1.0,
		cold : 1.0,
		electricity : 1.0,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.5,
		negative : 1.0
	};
	this.weaponAttribute = "slashing";
	techniques.forEach(function (item) {
		item.known = true;
	});
	this.spells = [];
	this.color = COMPANION_COLOR;
	this.init();
}
Companion.prototype = Object.create(Unit);
Companion.prototype.toNextLevel = Player.prototype.toNextLevel;

Companion.prototype.makeComponents = function(x, y, width = 150, height = 100) {
	this.description = "Your strong and loyal companion. "+cgender("He","She")+" will follow you to the ends of the earth.";
	this.selectionButton = new Button(x, y, width, height, "");
	this.nameLabel = new Label(x, y+2, width, 18, this.name, this.description, COMPANION_COLOR);
	this.levelLabel = new Label(x, y+20, width, 14, "Lv "+this.level, this.toNextLevel() + " experience to the next level. This is directly proportional to damage dealt by attack techniques, and also determines maximum hit points.");
	this.hpLabel = new Label(x, y+33, width, 14, this.hp+"/"+this.maxhp, "If this reaches 0, "+this.name+" dies. If you have no resurrection spells, that means a Game Over.");
	this.imageHolder = new ImageHolder(x+width/2, y);
	this.components = [this.selectionButton, this.nameLabel, this.levelLabel, this.hpLabel];
}

function cgender(male, female) {
	return companion.gender ? male : female;
}

function shipswitch(friend, sibling, lover) {
	switch (relationshipType) {
		case 0: return friend; break;
		case 1: return sibling; break;
		case 2: return lover; break;
	}
}

function Tactic(name, description, func) {
	this.name = name;
	this.description = description;
	this.func = func;
}

const TACTICS = [
	new Tactic("At will", "<Companion> acts on their own initiative.",
		function() {
			var tar = battle.enemies[0];
			return {skill : BasicAttack, target : tar};
		}),
	new Tactic("Finish them.", "<Companion> attacks the enemy with the lowest current HP.",
		function() {
			var tar = battle.enemies[0];
			var lowest = Infinity;
			battle.enemies.forEach(function(nem) {
				if (!nem.dead && nem.hp < lowest) {
					tar = nem;
					lowest = nem.hp;
				}
			});
			return {skill : BasicAttack, target : tar};
		}),
]