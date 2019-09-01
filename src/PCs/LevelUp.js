function checkLevelUps(after) {
	if (player.toNextLevel() <= 0) {
		player.experience -= forNextLevel(player.level);
		player.level ++;
		switchScreen(new LevelUpScreen(player, after));
	} else if (companion.toNextLevel() <= 0) {
		companion.experience -= forNextLevel(companion.level);
		companion.level ++;
		switchScreen(new LevelUpScreen(companion, after));
	} else {
		after();
	}
}

const LEVEL_UP_Y_START = 200;
const LEVEL_UP_Y_INCREMENT = 60;
const LEVEL_UP_STAT_DESCRIPTIONS_PLAYER = statsToArray({
	"Vitality" : "Maximum hit points <br> Effect evasion against poison-based effects <br> Immediately restore hp",
	"Strength" : "Attack with most weapon spells",
	"Constitution" : "Defense against most physical attacks",
	"Dexterity" : "Accuracy with most attacks",
	"Agility" : "Evasion against most attacks",
	"Intelligence" : "Attack with most arcane spells <br> Evasion against illusion spells",
	"Wisdom" : "Attack with most divine spells <br> Defense against many spells",
	"Charisma" : "Attack with most psionic spells <br> Defense against most psionic spells",
}, "lol");
const LEVEL_UP_STAT_DESCRIPTIONS_COMPANION = statsToArray({
	"Vitality" : "Maximum hit points <br> Effect evasion against poison-based effects <br> Immediately restore hp",
	"Strength" : "Attack with most techniques",
	"Constitution" : "Defense against most physical attacks <br> Cooldown for exerting techniques, such as Power Chop and Cleave",
	"Dexterity" : "Accuracy with most attacks",
	"Agility" : "Evasion against most attacks",
	"Intelligence" : "Cooldown for analytical and tactical techniques, such as Armor Pierce and Defensive Position <br> Immediately gain bonus Technique Points",
	"Wisdom" : "Defense against many spells <br> Evasion against illusion spells <br> Cooldown and effect accuracy for monk-like techniques, such as Stunning Kick",
	"Charisma" : "Defense against most psionic spells <br> Cooldown for paladin-like techniques, such as Smite",
}, "lol");
function LevelUpScreen(leveler, after) {
	var descriptions = leveler == player ? LEVEL_UP_STAT_DESCRIPTIONS_PLAYER : LEVEL_UP_STAT_DESCRIPTIONS_COMPANION;
	this.after = after;
	this.leveler = leveler;
	this.objects = [
		new Label(settings.width/3, 0, settings.width/3, 60, this.leveler.name, "", this.leveler.color),
	]
	var stripXStart = settings.width / 7;
	var stripXIncrement = settings.width / 7;
	this.yStart = 80;
	this.yIncrement = Math.floor((mainHeight() - this.yStart) / 8);
	//console.log(descriptions)
	for (var i = 0; i < 8; i++) {
		//console.log(descriptions[i])
		this.objects.push(new Label(5, this.yStart + this.yIncrement*i, settings.width, this.yIncrement, STAT_ABBS[i], descriptions[i], settings.normal_color, "left"));
	}
	this.increases = getLevelUpIncreases(leveler.level, leveler == companion);
	this.strips = [];
	for (var i = 0; i < this.increases.length; i++) {
		this.strips.push(new LevelUpStrip(stripXStart + stripXIncrement * i, stripXIncrement, this.increases[i], this));
	}
	this.objects.push(...this.strips);
	if (this.leveler == player && player.level == 11 && difficulty < 2) {
		this.doTutorial();
	}
}
LevelUpScreen.prototype.hoveredIncreases = [0,0,0,0,0,0,0,0,0];

LevelUpScreen.prototype.doTutorial = function() {
	tutorialOverlay.begin([
		{text:"It looks like you've leveled up. On this screen, you'll need to decide how to increases the characters' stats.", textX:settings.width/4, textY:0, textWidth:settings.width/2, textHeight:this.yStart-5},
		{text:"There are nine different stats, as shown to the right. Hover over them to see how that stat affects the character.", opening:{x:0, y:this.yStart, width:this.strips[0].x-1, height:this.yIncrement*8}, updateRunnee:UPDATE_RUNNEE_IN_OPENING},
		{text:"You have five different choices, as shown here by these five columns.", opening:{x:this.strips[0].x, y:this.yStart, width:this.strips[this.strips.length-1].x + this.strips[this.strips.length-1].width, height:this.yIncrement*8}, updateRunnee:UPDATE_RUNNEE_NEVER},
		{text:"Each choice gives you the same total increase of nine, distributed differently into the nine stats,"},
		{text:"Although they may seem random, they are are not."},
		{text:"A certain character at a certain level will always have the same choices, so no save-scumming."},
	]);
}
LevelUpScreen.prototype.update = function() {
	this.hoveredIncreases = [0,0,0,0,0,0,0,0,0];
	this.objects.forEach((oj)=>oj.update());
}
LevelUpScreen.prototype.draw = function() {
	clearBack();
	this.objects.forEach((oj)=>oj.draw());
	ctx.textAlign = "right";
	for (var i = 0; i < 8; i++) {
		ctx.fillStyle = this.hoveredIncreases[i] ? settings.hover_color : settings.normal_color;
		ctx.fillText(this.leveler.stats[i] + this.hoveredIncreases[i], settings.width - 5, this.yStart + this.yIncrement*i, settings.width/8, 30);
	}
}
LevelUpScreen.prototype.stripClicked = function(strip) {
	for (var i = 0; i < 9; i++) {
		this.leveler.baseStats[i] += strip.increases[i];
	}
	this.leveler.baseStats[STAT_INDICES.HReduce] = this.leveler.level;
	this.leveler.recalculateStats();
	this.leveler.hp = Math.min(this.leveler.hp + this.leveler.maxhp*strip.increases[STAT_INDICES.Vitality]/2, this.leveler.maxhp);
	if (this.leveler == companion) {
		companion.techniquePoints += companion.level * strip.increases[STAT_INDICES.Intelligence] * 5;
	}
	checkLevelUps(this.after);
}
LevelUpScreen.prototype.stripHovered = function(strip) {
	this.hoveredIncreases = strip.increases;
}

function LevelUpStrip(x, width, increases, parent) {
	this.x = x;
	this.y = parent.yStart;
	this.width = width;
	this.height = parent.yIncrement*8;
	this.increases = increases;
	this.parent = parent;
}
LevelUpStrip.prototype = Object.create(UIObjectBase);
LevelUpStrip.prototype.update = function() {
	this.updateMouse();
	if (this.clicked)
		this.parent.stripClicked(this);
	else if (this.hovered)
		this.parent.stripHovered(this);
}
LevelUpStrip.prototype.draw = function() {
	ctx.lineWidth = 2;
	var color = this.hovered ? settings.hover_color : settings.normal_color;
	ctx.strokeStyle = color;
	ctx.strokeRect(this.x+1, this.y, this.width-2, this.height);
	ctx.font = "30px "+settings.font;
	ctx.textAlign = "center";
	ctx.fillStyle = color;
	for (var i = 0; i < 8; i++) {
		if (this.increases[i])
			ctx.fillText(this.increases[i] > 1 ? "+ +" : "+", this.x+this.width/2, this.parent.yStart + this.parent.yIncrement*i);
	}
}

function getLevelUpIncreases(level, isCompanion) {
	var startseed = level * 161 + (isCompanion ? 314 : 0);
	//console.log(startseed);
	sm64rng.rng = startseed;
	var unordered = 
		[[1,1,1,1,1],
		 [1,1,0,1,2],
		 [1,1,2,0,1],
		 [1,1,1,2,0],
		 [0,0,1,2,2],
		 [2,0,0,1,2],
		 [2,2,0,0,1],
		 [1,2,2,0,0],
		 [0,1,2,2,0]];
	var ordered = [];
	while (unordered.length > 0) {
		ordered.push(...unordered.splice(sm64rng.rng_function() % unordered.length, 1));
	}
	return transposeArray(ordered);
}

function forNextLevel(level) {
	return Math.ceil(Math.pow(level, 2) * (5-difficulty));
}

