function longRest(amount = 1.0) {
	player.hp = player.maxhp;
	player.effects = [];
	companion.hp = companion.maxhp;
	companion.effects = [];
	advanceTime(8*HOURS);
	saveGame(saveSlot, amount);
	dialog.begin(
		"Game saved to slot "+saveSlot+".", 
		function(){
			new PrepScreen().begin(amount, function(){
				currentLoc.returnFromRest();
			});
		});
}

function longRestPoor() {
	longRest(0.8);
}

var RestPOI = function(name, description, restfulness = 1.0, cost = 0) {
	this.name = name;
	this.description = description;
	this.restfulness = restfulness;
	this.cost = cost;
}
RestPOI.prototype.type = "Rest";
RestPOI.prototype.activate = function() {
	if (!(money < this.cost)) {
		money -= this.cost;
		longRest(this.restfulness);
	}
}

