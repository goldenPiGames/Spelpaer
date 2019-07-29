const SAVEABLE_STATS = ["name", "gender", "color", "level", "experience", "techniquePoints", "hp", "maxhp", "Vitality", "Strength", "Constitution", "Intelligence", "Wisdom", "Dexterity", "Agility", "Charisma", "Potential", "Weapon", "Armor"];

function saveGame(slot, restfulness) {
	console.log("Saving game to slot "+slot+".");
	localStorage.setItem(slot+"exists", "yeh");
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
		restfulness : {},
	};
	//localStorage.setItem(slot+"currentLoc", currentLoc.name);
	localStorage.setItem(slot+"currentTime", currentTime);
	localStorage.setItem(slot+"money", money);
	localStorage.setItem(slot+"difficulty", difficulty);
	var known = 0;
	SPELLS.forEach(function(item) {
		localStorage.setItem(slot+item.name, item.prototype.known);
		if (item.prototype.known)
			known++;
	});
	kongregate.stats.submit("SpellsKnown", known);
	TECHNIQUES.forEach(function(item) {
		localStorage.setItem(slot+item.name, item.prototype.known);
	});
	LOCALES.forEach(function(item) {
		localStorage.setItem(slot+item.name, item.visited);
	});
	PATHS.forEach(function(item) {
		localStorage.setItem(slot+item.name, item.available);
	});
	for (var prop in Flags) {
		localStorage.setItem(slot+prop, Flags[prop]);
	};
	SAVEABLE_STATS.forEach(function(stat) {
		localStorage.setItem(slot+"player"+stat, player[stat]);
		localStorage.setItem(slot+"companion"+stat, companion[stat]);
	});
	kongregate.stats.submit("PlayerLevel", player.level);
	localStorage.setItem(slot+"restfulness", restfulness);
	console.log("Game saved to slot "+slot+".");
}

function loadGame(slot) {
	saveSlot = slot;
	if (!localStorage.getItem(slot+"exists")) {
		dialog.begin("You do not have a game in slot "+slot+".");
		buildMainMenu();
		return;
	}
	currentLoc = getLocaleByName(localStorage.getItem(slot+"currentLoc"));
	currentTime = parse(localStorage.getItem(slot+"currentTime"));
	money = parse(localStorage.getItem(slot+"money"));
	difficulty = parse(localStorage.getItem(slot+"difficulty"));
	var known = 0;
	SPELLS.forEach(function(item) {
		item.prototype.known = localStorage.getItem(slot+item.name) == "true";
		if (item.known)
			known++;
	});
	//kongregate.stats.submit("SpellsKnown", known);
	TECHNIQUES.forEach(function(item) {
		item.prototype.known = parse(localStorage.getItem(slot+item.name));
	});
	LOCALES.forEach(function(item) {
		if (localStorage.getItem(slot+item.name) != undefined)
			item.visited = localStorage.getItem(slot+item.name) == "true";
	});
	PATHS.forEach(function(item) {
		if (localStorage.getItem(slot+item.name) != undefined)
			item.available = localStorage.getItem(slot+item.name) == "true";
	});
	for (var prop in Flags) {
		Flags[prop] = parse(localStorage.getItem(slot+prop));
	};
	player = new Player();
	companion = new Companion();
	SAVEABLE_STATS.forEach(function(stat) {
		player[stat] = parse(localStorage.getItem(slot+"player"+stat));
		companion[stat] = parse(localStorage.getItem(slot+"companion"+stat));
	});
	refreshKnownTechniques();
	//kongregate.stats.submit("PlayerLevel", player.level);
	new PrepScreen().begin(localStorage.getItem(slot+"restfulness"), function(){currentLoc.returnFromRest();});
}

function fileExists(slot) {
	return localStorage.getItem(slot+"exists");
}

function fileTitle(slot) {
	return DIFFICULTY_NAMES[parseInt(localStorage.getItem(slot+"difficulty"))] + " " + localStorage.getItem(slot+"playername")+" lv." + localStorage.getItem(slot+"playerlevel");
}
function deleteFile(slot) {
	//console.log("deleting "+slot);
	localStorage.removeItem(slot+"exists");
}

function fileDescription(slot) {
	return [
		DIFFICULTY_NAMES[localStorage.getItem(slot+"difficulty")]+ "; "+getDisplayTime(parseInt(localStorage.getItem(slot+"currentTime"))),
		localStorage.getItem(slot+"playername")+" "+(localStorage.getItem(slot+"playergender")=="true"?"♂":"♀")+" level " + localStorage.getItem(slot+"playerlevel") + " ",
		localStorage.getItem(slot+"companionname")+" "+(localStorage.getItem(slot+"companiongender")=="true"?"♂":"♀") + " level " + localStorage.getItem(slot+"companionlevel")+" ",
		"Currently in "+localStorage.getItem(slot+"currentLoc")+"."];     
}