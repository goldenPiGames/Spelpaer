const SAVEABLE_CHARACTER_THINGS = ["name", "gender", "color", "level", "experience", "techniquePoints", "baseStats"];

function saveGame(slot, restfulness = 1.0) {
	console.log("Saving game to slot "+slot+".");
	localStorage.setItem("SpelpaerSlot"+slot+"exists", "yeh");
	var toSave = {
		currentLoc : currentLoc.name,
		currentTime : currentTime,
		money : money,
		difficulty : difficulty,
		spells : {},
		techniques : {},
		locales : {},
		paths : {},
		flags : Flags,
		player : {},
		companion : {},
		restfulness : restfulness,
	};
	var known = 0;
	SPELLS.forEach(function(item) {
		toSave.spells[item.name] = item.prototype.known;
		if (item.prototype.known)
			known++;
	});
	toSave.numSpells = known;
	//kongregate.stats.submit("SpellsKnown", known);
	TECHNIQUES.forEach(function(item) {
		toSave.techniques[item.name] = item.prototype.known;
	});
	LOCALES.forEach(function(item) {
		toSave.locales[item.name] = item.visited;
	});
	PATHS.forEach(function(item) {
		toSave.paths[item.name] = item.available;
	});
	/*for (var prop in Flags) {
		localStorage.setItem(slot+prop, Flags[prop]);
	};*/
	SAVEABLE_CHARACTER_THINGS.forEach(function(thing) {
		toSave.player[thing] = player[thing];
		toSave.companion[thing] = companion[thing];
	});
	toSave.player.equipped = player.equipped.map(quip=>saveItem(quip));
	toSave.companion.equipped = companion.equipped.map(quip=>saveItem(quip));
	toSave.inventory = inventory.map(quip=>saveItem(quip));
	//kongregate.stats.submit("PlayerLevel", player.level);
	localStorage.setItem("SpelpaerSlot"+slot, JSON.stringify(toSave));
	console.log("Game saved to slot "+slot+".");
}

function loadGame(slot) {
	saveSlot = slot;
	/*if (!localStorage.getItem(slot+"exists")) {
		dialog.begin("You do not have a game in slot "+slot+".");
		buildMainMenu();
		return;
	}*/
	var loaded = JSON.parse(localStorage.getItem("SpelpaerSlot"+slot));
	currentLoc = getLocationByName(loaded.currentLoc);
	currentTime = loaded.currentTime;
	money = loaded.money;
	difficulty = loaded.difficulty;
	var known = 0;
	SPELLS.forEach(function(item) {
		item.prototype.known = loaded.spells[item.name];
		if (item.known)
			known++;
	});
	//kongregate.stats.submit("SpellsKnown", known);
	TECHNIQUES.forEach(function(item) {
		item.prototype.known = loaded.techniques[item.name];
	});
	LOCALES.forEach(function(item) {
		item.visited = loaded.locales[item.name];
	});
	PATHS.forEach(function(item) {
		item.available = loaded.paths[item.name];
	});
	Flags = loaded.flags;
	player = new Player();
	companion = new Companion();
	SAVEABLE_CHARACTER_THINGS.forEach(function(stat) {
		player[stat] = loaded.player[stat];
		companion[stat] = loaded.companion[stat];
	});
	player.equipped = loaded.player.equipped.map((quip)=>loadItem(quip));
	companion.equipped = loaded.companion.equipped.map((quip)=>loadItem(quip));
	player.recalculateStats();
	companion.recalculateStats();
	inventory = loaded.inventory.map((quip)=>loadItem(quip));
	refreshKnownTechniques();
	//kongregate.stats.submit("PlayerLevel", player.level);
	new PrepScreen().begin(loaded.restfulness, function(){currentLoc.returnFromRest();});
}

function fileExists(slot) {
	return localStorage.getItem("SpelpaerSlot"+slot+"exists");
}

function fileTitle(slot) {
	var loaded = JSON.parse(localStorage.getItem("SpelpaerSlot"+slot));
	return DIFFICULTY_NAMES[loaded.difficulty] + " " + loaded.player.name+" lv." + loaded.player.level;
}
function deleteFile(slot) {
	//console.log("deleting "+slot);
	localStorage.removeItem("SpelpaerSlot"+slot+"exists");
}

function fileDescription(slot) {
	try {
		var loaded = JSON.parse(localStorage.getItem("SpelpaerSlot"+slot));
		return [
			DIFFICULTY_NAMES[loaded.difficulty] + "; "+getDisplayTime(loaded.currentTime),
			loaded.player.name + " " + (["","♂","♀",""])[loaded.player.gender] + " level " + loaded.player.level + "; " + loaded.numSpells + " spells found",
			loaded.companion.name + " " + (["","♂","♀",""])[loaded.companion.gender] + " level " + loaded.companion.level,
			"Currently in "+loaded.currentLoc];    
	} catch (e) {
		return "Error in retrieving save preview.";
	}
}