var spoilsScreen = {
	begin : function(xp, tech, cash, stuff, after) {
		var thisser = this;
		runnee = this;
		//this.after = after;
		this.experience = xp;
		this.moneyBefore;
		this.money = cash;
		this.items = stuff;
		this.playerExperienceBefore = player.experience;
		this.companionExperienceBefore = companion.experience;
		player.experience += xp;
		companion.experience += xp;
		companion.techniquePoints += tech;
		this.moneyBefore = money;
		money += cash;
		this.objects = [
			new Label(450, 50, 300, 40, "Experience: "+xp, "This is how much experience you got just now. Both characters get full experience; it's not divided."),
			new Label(50, 200, 200, 40, player.name, "Player", settings.player_color),
			new Label(50, 300, 200, 40, companion.name, "Companion", settings.companion_color),
			new Label(900, 200, 300, 30, player.toNextLevel()<=0 ? forNextLevel(player.level)+"-LEVEL UP!" : (player.experience+"/"+forNextLevel(player.level)), "exp"),
			new Label(900, 300, 300, 30, companion.toNextLevel()<=0 ? forNextLevel(companion.level)+"-LEVEL UP!" : (companion.experience+"/"+forNextLevel(companion.level)), "exp"),
			new Label(50, 500, 200, 40, this.moneyBefore, "How much money you had before."),
			new Label(50, 550, 200, 40, this.money, "How much money you just got."),
			new Label(50, 600, 200, 40, money, "How much money you have now."),
			new Button(1000, 600, 195, 70, "Continue", "Go on. Level yourself up or whatever.", function() {levelUpScreen.begin(after)}),
		];
	},
	update : function() {
		this.objects.forEach(function(oj) {
			oj.update();
		});
	},
	draw : function() {
		clearBack();
		this.objects.forEach(function(oj) {
			oj.draw();
		});
		ctx.lineWidth = 2;
		ctx.strokeStyle = settings.normal_color;
		ctx.strokeRect(300, 200, 600, 50);
		ctx.strokeRect(300, 300, 600, 50);
		ctx.fillStyle = settings.click_color;
		ctx.fillRect(300, 200, 600 * Math.min(player.experience/forNextLevel(player.level), 1.0), 50);
		ctx.fillRect(300, 300, 600 * Math.min(companion.experience/forNextLevel(companion.level), 1.0), 50);
		ctx.fillStyle = settings.normal_color;
		ctx.fillRect(300, 200, 600*this.playerExperienceBefore/forNextLevel(player.level), 50);
		ctx.fillRect(300, 300, 600*this.companionExperienceBefore/forNextLevel(companion.level), 50);
	},
}

const LEVEL_UP_Y_START = 200;
const LEVEL_UP_Y_INCREMENT = 60;
const LEVEL_UP_STAT_DESCRIPTIONS_PLAYER = {
	"Vitality" : "Maximum hit points <br> Effect evasion against poison-based effects <br> Immediately restore hit points",
	"Strength" : "Attack with many weapons",
	"Constitution" : "Defense against most physical attacks",
	"Dexterity" : "Accuracy with most attacks",
	"Agility" : "Evasion against most attacks",
	"Intelligence" : "Attack with most arcane spells <br> Evasion against illusion spells",
	"Wisdom" : "Attack with most divine spells <br> Defense against most arcane and divine spells",
	"Charisma" : "Attack with most psionic spells <br> Defense against most psionic spells",
	"Potential" : "lol",
};
const LEVEL_UP_STAT_DESCRIPTIONS_COMPANION = {
	"Vitality" : "Maximum hit points <br> Effect evasion against poison-based effects <br> Immediately restore hit points",
	"Strength" : "Attack with most techniques",
	"Constitution" : "Defense against most physical attacks <br> Cooldown for exerting techniques, such as Power Chop and Cleave",
	"Dexterity" : "Accuracy with most attacks",
	"Agility" : "Evasion against most attacks",
	"Intelligence" : "Recharge for tactical techniques, such as Defensive Position <br> Immediately gain bonus Technique Points",
	"Wisdom" : "Defense against most divine spells <br> Cooldown and effect accuracy for monk-like techniques, such as Stunning Fist",
	"Charisma" : "Defense against most psionic spells <br> Cooldown for paladin-like techniques, such as Smite",
	"Potential" : "lol",
};
var levelUpScreen = {
	begin : function(after) {
		var descriptions;
		if (after)
			this.after = after;
		if (player.toNextLevel()<=0) {
			this.leveler = player;
			descriptions = LEVEL_UP_STAT_DESCRIPTIONS_PLAYER;
			player.experience -= forNextLevel(player.level);
			player.level++;
		} else if (companion.toNextLevel()<=0) {
			this.leveler = companion;
			descriptions = LEVEL_UP_STAT_DESCRIPTIONS_COMPANION;
			companion.experience -= forNextLevel(companion.level);
			companion.level++;
		} else {
			this.after();
			return;
		}
		runnee = this;
		this.objects = [
			new Label(400, 0, 400, 80, this.leveler.name, "", this.leveler.color),
		]
		for (var i = 0; i < 8; i++) {
			this.objects.push(new Label(0, LEVEL_UP_Y_START + LEVEL_UP_Y_INCREMENT*i, 200, 30, STATS_ARRAY[i], descriptions[STATS_ARRAY[i]]));
		}
		this.increases = 
			[[1,1,1,1,1,1,1,1,1],
			 [2,2,2,1,1,0,0,0,1],
			 [0,0,0,1,1,2,2,2,1]];
		this.strips = [];
		for (var i = 0; i < 3; i++) {
			this.objects.push(new LevelUpStrip(300+200*i, 200, this.increases[i]));
		}
	},
	update : function() {
		var thisser = this;
		this.objects.forEach(function(oj) {
			oj.update();
		});
	},
	draw : function() {
		clearBack();
		this.objects.forEach(function(oj) {
			oj.draw();
		});
	},
	stripClicked : function(strip) {
		var increases = strip.increases;
		for (var i = 0; i < 9; i++) {
			this.leveler[STATS_ARRAY[i]] += strip.increases[i];
		}
		this.leveler.maxhp = this.leveler.Vitality * 10;
		this.leveler.hp = Math.min(this.leveler.hp + this.leveler.maxhp*strip.increases[0]/2, this.leveler.maxhp);
		if (this.leveler == companion) {
			companion.techniquePoints += companion.Intelligence * strip.increases[5];
		}
		this.begin();
	},
}

function LevelUpStrip(x, width, increases) {
	this.x = x;
	this.y = LEVEL_UP_Y_START;
	this.width = width;
	this.height = LEVEL_UP_Y_INCREMENT*8;
	this.increases = increases;
}
LevelUpStrip.prototype = Object.create(UIObjectBase);
LevelUpStrip.prototype.update = function() {
	this.updateStats();
	if (this.clicked) {
		levelUpScreen.stripClicked(this)
	}
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
		if (this.increases[i]) {
			ctx.fillText(this.increases[i] > 1 ? "+ +" : "+", this.x+this.width/2, LEVEL_UP_Y_START + LEVEL_UP_Y_INCREMENT*i);
		}
	}
}

/*function doLevelUp(returnFunction) {
	if (player.experience >= forNextLevel(player.level)) {
		player.experience -= forNextLevel(player.level);
		player.level++;
		player.hp = Math.ceil(player.hpPortion() * player.level * 10);
		player.maxhp = Math.ceil(player.level * 10);
		dialog.begin(//"You have leveled up to level "+player.level+".",
			new DialogSplit("Player", null, "I'm now level "+player.level+". Which stat should I increase?",
				new DialogSplitChoice(getStatChoice1(player.level), function(){player[getStatChoice1(player.level)]++;}),
				new DialogSplitChoice(getStatChoice2(player.level, true), function(){player[getStatChoice2(player.level, true)]++;})),
			function(){doLevelUp(returnFunction);});
		return;
	}
	if (companion.experience >= forNextLevel(companion.level)) {
		companion.experience -= forNextLevel(companion.level);
		companion.level++;
		companion.techniquePoints++;
		companion.hp = Math.ceil(companion.hpPortion() * companion.level * 10);
		companion.maxhp = Math.ceil(companion.level * 10);
		dialog.begin(//companion.name+" has leveled up to level "+companion.level+".",
			new DialogSplit("Companion", null, "Oh, hey! I just reached level "+companion.level+"! Which of these STATS_ARRAY do you think I should increase?",
				new DialogSplitChoice(getStatChoice1(companion.level), function(){companion[getStatChoice1(companion.level)]++;}),
				new DialogSplitChoice(getStatChoice2(companion.level, false), function(){companion[getStatChoice2(companion.level, false)]++;})),
			function(){doLevelUp(returnFunction);});
		return;
	}
	returnFunction();
}*/

function forNextLevel(level) {
	return Math.ceil(Math.pow(level, 2.2) * 5);
}

/*const STAT_CHOICES1 = ["Strength", "Constitution", "Intelligence", "Wisdom", "Dexterity", "Agility", "Charisma"];
const STAT_CHOICES2 = ["Charisma", "Agility", "Wisdom", "Intelligence", "Constitution", "Strength"];

function getStatChoice1(level, isPlayer) {
	return STAT_CHOICES1[(level + isPlayer?5:3) % STAT_CHOICES1.length];
}

function getStatChoice2(level, isPlayer) {
	var choice2 = STAT_CHOICES2[(level + isPlayer?0:5) % STAT_CHOICES2.length];
	if (choice2 == getStatChoice1(level, isPlayer))
		return "Dexterity";
	return choice2;
}*/