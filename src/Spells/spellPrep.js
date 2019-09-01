function PrepScreen() {
	var wid = settings.width;
	this.pointsLabel = new Label(wid*3/8, 0, wid/4, 30, "Points", "How many spell points you have.");
	this.knownLabel = new Label(wid/8, 0, wid/4, 30, "Spells Known", "All of the spells that you have collected throughout your journey. Click in this column to add them to your prepared list. You can add the same spell more than once.");
	this.preparedLabel = new Label(wid*5/8, 0, wid/4, 30, "Spells Prepared", "All of the spells that you currently have prepared. Click in this column to remove them and get their points back.");
	var hafw = settings.width/2;
	var hit = mainHeight();
	this.sortButton = new Button(hafw, hit-45, 145, 40, "Sort", "Sort your spells.", ()=>{sortSpells();this.preparedMenu.putItems()});
	this.finishedButton = new Button(wid-150, hit-45, 145, 40, "Finished", "Finish studying and go about your day.", ()=>this.finish());
	this.autoButton = new Button(10, hit-45, 140, 40, "Auto", "Automatically prepare spells.", ()=>this.autoPrepare());
	this.lastButton = new Button(160, hit-45, 140, 40, "Last", "Prepare the same set of spells that you did last time.", ()=>this.prepareLast());
	this.knownMenu = new ScrollMenu(0, 30, hafw, hit-80, val=>this.knownClicked(val), [], val=>val.prototype.cost, val=>val.prototype.description);
	this.preparedMenu = new ScrollMenu(hafw, 30, hafw, hit-80, val=>this.preparedClicked(val), [], "cost", "description");
	this.objects = [this.pointsLabel, this.knownLabel, this.preparedLabel, this.knownMenu, this.preparedMenu, this.autoButton, this.lastButton, this.sortButton, this.finishedButton];
}
PrepScreen.prototype = Object.create(ScreenBase);
PrepScreen.prototype.begin = function(amount, after) {
	player.spells = [];
	refreshSpellDescriptions(player);
	refreshKnownSpells();
	playMusic("Decisions");
	this.maxPoints = Math.ceil(amount * getSpellPoints());
	this.points = this.maxPoints;
	this.pointsLabel.text = outof(this.points, this.maxPoints);
	this.after = after;
	this.knownMenu.setItems(knownSpells);
	this.knownMenu.currentScroll = 0;
	this.preparedMenu.setItems(player.spells);
	this.preparedMenu.currentScroll = 0;
	switchScreen(this);
	//console.log(currentTime, difficulty);
	if (currentTime < 14*HOURS && difficulty < 2) {
		this.doTutorial();
	}
}
PrepScreen.prototype.doTutorial = function() {
	tutorialOverlay.begin(
		{text:"Welcome to the Spell Preparation screen. (Click here to continue)", textX:settings.width/3, textY:settings.height/4, textWidth:settings.width/3, textHeight:200},
		{text:"Preparing your spells is very important - you should tailor your spells according to your character's build, as well as what you expect to encounter that day."},
		{text:"Or you can just get like four Magic Missiles and fill up the rest with Cure Wounds. Honestly, that'll work for you most of the time."},
		{text:"This menu on the left shows all the spells that are available to be prepared - that is to say, it's been found and its level is less than or equal to <Player>'s.", opening:this.knownMenu, textX:settings.width/2, textY:settings.height/4, textWidth:settings.width/2, textHeight:200, updateRunnee:UPDATE_RUNNEE_IN_OPENING},
		{text:"Hover over a spell to get all its juicy details."},
		{text:"You can prepare the same spell multiple times, in which case each instance keeps track of its cooldown separately."},
		{text:"This shows you how many points of spells you can prepare. There's no reason not to use every single point.", opening:this.pointsLabel},
		{text:"This menu on the right shows the spells you've currently prepared. You can click on them to remove them and get their points back.", opening:this.preparedMenu, textX:0, textY:settings.height/4, textWidth:settings.width/2, textHeight:200, updateRunnee:UPDATE_RUNNEE_IN_OPENING},
		{text:"Use his button to automatically prepare spells. Its algorithm isn't very good, so it's not recommended.", opening:this.autoButton, textX:settings.width/3, textY:settings.height/3, textWidth:settings.width/3, textHeight:200, updateRunnee:UPDATE_RUNNEE_NEVER},
		{text:"Use this button to prepare the same spells that you did last time.", opening:this.lastButton},
		{text:"When you finish preparing spells, your prepared spells are immediately saved. Even if you refresh or get a game over without saving your game, you can reuse your last list."},
		{text:"Use this button to sort your list of prepared spells.", opening:this.sortButton},
		{text:"Use this button when you're finished preparing spells and you're ready to face the day ahead.", opening:this.finishedButton},
	);
}
PrepScreen.prototype.knownClicked = function(val) {
	if (!val)
		return;
	if (this.points >= val.prototype.cost && val.prototype.isPreparable()) {
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
	while (this.points >= 1 && loops <= 100) {
		//this.knownClicked(randomTerm(choices));
		var stat = raffle(player.stats[STAT_INDICES.Intelligence]*2, STAT_INDICES.Intelligence, player.stats[STAT_INDICES.Wisdom], STAT_INDICES.Wisdom, player.stats[STAT_INDICES.Charisma], STAT_INDICES.Charisma, player.level, "All");
		//console.log(loops, stat);
		//console.log(filterKnown(spellsByStat(stat)));
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
PrepScreen.prototype.prepareLast = function() {
	var loaded = localStorage.getItem("SpelpaerLastSpells");
	if (loaded) {
		JSON.parse(loaded).forEach((sp)=>this.knownClicked(SPELLS_BY_NAME[sp]));
	}
}
PrepScreen.prototype.finish = function() {
	if (player.spells.length > 0)
		localStorage.setItem("SpelpaerLastSpells", JSON.stringify(player.spells.map((sp)=>sp.iname)));
	this.after();
}

function sortSpells() {
	player.spells.sort(function(a, b){return a.index - b.index});
}