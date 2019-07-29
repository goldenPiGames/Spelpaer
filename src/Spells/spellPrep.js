function PrepScreen() {
	var thisser = this;
	var wid = settings.width;
	this.pointsLabel = new Label(wid*3/8, 0, wid/4, 30, "Points", "How many spell points you have.");
	this.knownLabel = new Label(wid/8, 0, wid/4, 30, "Spells Known", "All of the spells that you have collected throughout your journey. Click in this column to add them to your prepared list. You can add the same spell more than once.");
	this.preparedLabel = new Label(wid*5/8, 0, wid/4, 30, "Spells Prepared", "All of the spells that you currently have prepared. Click in this column to remove them and get their points back.");
	var hafw = settings.width/2;
	var hit = mainHeight();
	this.sortButton = new Button(hafw, hit-45, 145, 40, "Sort", "Sort your spells.", function(){sortSpells();thisser.preparedMenu.putItems()});
	this.finishedButton = new Button(wid-150, hit-45, 145, 40, "Finished", "Finish studying and go about your day.");
	this.autoButton = new Button(50, hit-45, 140, 40, "Auto", "Automatically prepare spells.", function(){thisser.autoPrepare()});
	this.knownMenu = new ScrollMenu(0, 30, hafw, hit-80, function(value){thisser.knownClicked(value)}, [], function(val){return val.prototype.cost}, function(val){return val.prototype.description});
	this.preparedMenu = new ScrollMenu(hafw, 30, hafw, hit-80, function(value){thisser.preparedClicked(value)}, [], "cost", "description");
	this.objects = [this.pointsLabel, this.knownLabel, this.preparedLabel, this.knownMenu, this.preparedMenu, this.autoButton, this.sortButton, this.finishedButton];
}
PrepScreen.prototype = Object.create(ScreenBase);
PrepScreen.prototype.begin = function(amount, finishedFunction) {
	player.spells = [];
	refreshKnownSpells();
	playMusic("Decisions");
	this.maxPoints = Math.ceil(amount * getSpellPoints());
	this.points = this.maxPoints;
	this.pointsLabel.text = outof(this.points, this.maxPoints);
	this.finishedButton.handler = finishedFunction;
	this.knownMenu.setItems(knownSpells);
	this.knownMenu.currentScroll = 0;
	this.preparedMenu.setItems(player.spells);
	this.preparedMenu.currentScroll = 0;
	switchScreen(this);
}
PrepScreen.prototype.knownClicked = function(val) {
	if (!val)
		return;
	if (this.points >= val.prototype.cost) {
		this.points -= val.prototype.cost;
		this.pointsLabel.text = outof(this.points, this.maxPoints);
		player.spells.push(new val(player));
		this.preparedMenu.putItems();
	}
}
PrepScreen.prototype.preparedClicked = function(value) {
	this.points += value.cost;
	this.pointsLabel.text = outof(this.points, this.maxPoints);
	player.spells.splice(player.spells.indexOf(value), 1);
	this.preparedMenu.putItems();
}
PrepScreen.prototype.autoPrepare = function() {
	var thisser = this;
	knownSpells.forEach(function(sp) {
		if (sp.prototype.shouldAutoPrepare())
			thisser.knownClicked(sp);
	});
	var loops = 0;
	//let general = filterKnown(SPELLS_GENERAL);
	while (this.points >= 2 && loops <= 1000) {
		//this.knownClicked(randomTerm(choices));
		var stat = raffle(player.Intelligence, "Intelligence", player.Wisdom, "Wisdom", player.Charisma, "Charisma", player.level, "All");
		//console.log(loops, stat);
		this.knownClicked(randomTerm(filterKnown(spellsByStat(stat))));
		loops++;
	}
	//loops -= 50;
	/*let cheap = filterKnown(SPELLS_CHEAP);
	while (this.points >= 1 && loops <= 1000) {
		this.knownClicked(randomTerm(cheap));
		loops++;
	}*/
	sortSpells();
	this.preparedMenu.putItems();
}

function sortSpells() {
	player.spells.sort(function(a, b){return a.index - b.index});
}