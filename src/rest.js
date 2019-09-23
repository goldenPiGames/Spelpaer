function longRest(amount = 1.0) {
	player.hp = player.maxhp;
	player.effects = [];
	companion.hp = companion.maxhp;
	companion.effects = [];
	setFlag("restBegun");
	advanceTime(8*HOURS);
	setFlag("restEnded");
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
	if (timeSince(getFlag("restEnded")) < 2*HOURS) {
		dialog.begin(new DialogSplit("Player", null, "Do I really need to go back to sleep already?",
			new DialogSplitChoice("Yes", ()=>this.activate2()),
			new DialogSplitChoice("No"),
		));
	} else
		this.activate2();
}
RestPOI.prototype.activate2 = function() {
	if (money < this.cost) {
		dialog.begin("I can't afford to stay here.");
	} else {
		if (this.cost)
			money -= this.cost;
		longRest(this.restfulness);
	}
}