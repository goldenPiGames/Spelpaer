var companion = {name:"Companion"};

var Companion = function() {
	this.team = true;
	this.description = "Your strong and loyal companion. Will follow you to the ends of the earth.";
	this.level = 10;
	this.experience = 0;
	this.techniquePoints = 0;
	this.baseEffectiveness = elementsToArray({
		positive : -1.0
	});
	this.spells = [];
	this.init();
}
Companion.prototype = Object.create(PC);
Companion.prototype.weaponAttribute = "cutting";
Companion.prototype.baseEffectiveness = elementsToArray({
	positive : -1.0
});

Companion.prototype.makeComponents = function(x, y, width = 150, height = 100) {
	this.description = "Your strong and loyal companion. "+cgender("He","She","They")+" will follow you to the ends of the earth.";
	this.selectionButton = new Button(x, y, width, height, "");
	this.nameLabel = new Label(x, y+2, width, 18, this.name, this.description, COMPANION_COLOR);
	this.levelLabel = new Label(x, y+20, width, 14, "Lv "+this.level, this.toNextLevel() + " experience to the next level. This is directly proportional to damage dealt by attack techniques, and also determines maximum hit points.");
	this.hpLabel = new Label(x, y+33, width, 14, this.hp+"/"+this.maxhp, "If this reaches 0, "+this.name+" dies. If you have no resurrection spells, that means a Game Over.");
	this.imageHolder = new ImageHolder(x+width/2, y);
	this.components = [this.selectionButton, this.nameLabel, this.levelLabel, this.hpLabel];
}

function shipswitch(friend, sibling, lover) {
	switch (relationshipType) {
		case 0: return friend; break;
		case 1: return sibling; break;
		case 2: return lover; break;
	}
}

/*function Tactic(name, description, func) {
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
]*/