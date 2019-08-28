function BattleScreenPatient() {
	var thisser = this;
	this.fieldX = 10 * Math.max(10, (settings.width-800)/20);
	this.delayMeter = new DelayMeter(this.fieldX, this);
	this.fieldWidth = Math.min(600, settings.width-300);
	var rightX = this.fieldX + this.fieldWidth;
	var rightTotalWidth = settings.width - rightX;
	//console.log(this.fieldX, this.fieldWidth, rightTotalWidth)
	var menuX;
	var menuY;
	var menuWidth;
	var menuHeight;
	this.tabsAbove = (rightTotalWidth < 300)
	if (!this.tabsAbove) {
		menuX = rightX;
		menuY = 50;
		menuWidth = Math.floor(rightTotalWidth*2/3);
		menuHeight = mainHeight() - menuY;
		var rightButtonX = menuX + menuWidth + 5;
		var rightButtonWidth = settings.width - rightButtonX;
		this.attackButton = new Button(rightButtonX, 100, rightButtonWidth, 45, "Attack", "Use your current attack.", function(){
			thisser.selectedAction = thisser.taker.getAttack(); thisser.currentMenu = null});
		this.playerSpellButton = new Button(rightButtonX, 150, rightButtonWidth, 95, "Spell", "Choose one of your spells.", function(){thisser.currentMenu = thisser.playerSpellMenu});
		this.itemButton = new Button(rightButtonX, 250, rightButtonWidth, 45, "Item", "Use an item from your inventory.", function(){thisser.currentMenu = thisser.itemMenu});
		this.companionTechniqueButton = new Button(rightButtonX, 150, rightButtonWidth, 95, "Technique", "Choose one of your techniques.", function(){thisser.currentMenu = thisser.companionTechniquePalette});
	} else {
		var hafwid = rightTotalWidth/2;
		menuX = rightX;
		menuY = 85;
		menuWidth = Math.floor(rightTotalWidth);
		menuHeight = mainHeight() - menuY;
		var rightButtonX = menuX + menuWidth + 5;
		var rightButtonWidth = settings.width - rightButtonX;
		this.attackButton = new Button(rightX, 5, hafwid-5, 35, "Attack", "Use your current attack.", function(){
			thisser.selectedAction = thisser.taker.getAttack(); thisser.currentMenu = null});
		this.itemButton = new Button(rightX, 45, hafwid-5, 35, "Item", "Use an item from your inventory.", function(){thisser.currentMenu = thisser.itemMenu});
		this.playerSpellButton = new Button(rightX+hafwid, 5, hafwid, 75, "Spell", "Choose one of your spells.", function(){thisser.currentMenu = thisser.playerSpellMenu});
		this.companionTechniqueButton = new Button(rightX+hafwid, 5, hafwid, 75, "Technique", "Choose one of your techniques.", function(){thisser.currentMenu = thisser.companionTechniquePalette});
	}
	this.playerSpellMenu = new ScrollMenu(menuX, menuY, menuWidth, menuHeight, function(val){thisser.selectedAction = val}, [], (oj)=>oj.getCDDesc(player), "description", (val)=>val.isAvailable(), val=>val==thisser.selectedAction);
	this.companionTechniquePalette = new TechniquePalette(menuX, menuY, menuWidth, menuHeight, function(val){thisser.selectedAction = val}, [], function(val){return val == thisser.selectedAction});
	this.itemMenu = new ScrollMenu(menuX, menuY, menuWidth, menuHeight, function(val){thisser.selectedAction = val}, [], "spec", "description", (val)=>true, val=>val==thisser.selectedAction);
	this.fieldY = 50;
	this.fieldHeight = mainHeight() - this.fieldY - 100;
	var fieldBottom = this.fieldY + this.fieldHeight;
	var fieldMiddle = this.fieldX + this.fieldWidth/2;
	player.setDisplay(fieldMiddle-150, fieldBottom, 150, mainHeight()-fieldBottom, this);
	companion.setDisplay(fieldMiddle, fieldBottom, 150, mainHeight()-fieldBottom, this);
	this.playerSpellMenu.setItems(player.spells);
	this.currentMenu = null;
	this.taker = null;
	this.companionTechniquePalette.setTechniques(companion.techniques);
	var wid = Math.min(this.fieldWidth/battle.enemies.length, 150);
	var pact = true;
	if (wid >= this.fieldWidth/4) {
		wid = this.fieldWidth/4;
		pact = false;
	}
	battle.enemies.forEach((nem, dex, lisp) => nem.setDisplay(/*pact ? this.fieldX + wid * dex : */this.fieldX + this.fieldWidth/2 + wid*(dex-lisp.length/2), 0, wid, this.fieldY, this));
	this.selectedAction = null;
	this.selectedTarget = null;
	//this.ticking = true;
}
BattleScreenPatient.prototype = Object.create(ScreenBase);
BattleScreenPatient.prototype.update = function() {
	this.taker = null;
	if (player.isReady()) {
		this.taker = player;
	} else if (companion.isReady()) {
		this.taker = companion;
	}
	//this.updateMouse();
	//var tickSeed = Math.random();
	battle.allUnits().forEach(oj=>oj.update(this));
	this.delayMeter.update();
	if (this.taker) {
		if (this.taker == player) {
			this.playerSpellButton.update();
		} else if (this.taker == companion) {
			this.companionTechniqueButton.update();
		}
		this.attackButton.update();
		this.itemButton.update();
		if (this.currentMenu)
			this.currentMenu.update();
	} else {
		battle.tick();
	}
	if (this.taker && this.taker.isReady() && this.selectedAction && this.selectedAction.isAvailable() && (this.selectedAction.selfOnly || this.selectedTarget)) {
		battle.executeAction(this.taker, this.selectedAction, this.selectedTarget || this.taker);
		this.currentMenu = null;
		this.selectedAction = null;
		this.selectedTarget = null;
	}
}
BattleScreenPatient.prototype.unitClicked = function(unit) {
	if (this.selectedAction && unit.isActive()) {
		this.selectedTarget = unit;
	}
}
BattleScreenPatient.prototype.delayClicked = function(mount) {
	if (this.taker) {
		this.selectedAction = new Wait(mount);
	}
}
BattleScreenPatient.prototype.draw = function() {
	var thisser = this;
	clearBack();
	battle.allUnits(false).forEach(function(peep, index) {
		peep.draw(thisser);
	});
	this.delayMeter.draw();
	if (this.taker == player) {
		this.attackButton.draw();
		this.playerSpellButton.draw();
		this.itemButton.draw();
		if (this.currentMenu)
			this.currentMenu.draw();
	} else if (this.taker == companion) {
		this.attackButton.draw();
		this.companionTechniqueButton.draw();
		this.itemButton.draw();
		if (this.currentMenu)
			this.currentMenu.draw();
	}
}

function BattleScreenPatientTutorial(battleScreen) {
	var thisser = this;
	this.clearWindow();
	this.shownPlayerTurn = false;
	this.shownCompanionTurn = false;
	this.shownSpells = false;
	this.shownTechniques = false;
	this.battleScreen = battleScreen;
	tutorialOverlay.begin(
		{text:"Please direct your attention to the left side of the screen.", opening:this.battleScreen.delayMeter, updateRunnee:UPDATE_RUNNEE_NEVER, textX:settings.width/2, textY:settings.height/4, textWidth:settings.width/2, textHeight:300},
		{text:"That's the Delay Meter. Each arrow represents one character in the battle."},
		{text:"Each unit's position at the start of battle is determined by both their Agility stat and a random factor."},
		{text:"During battle, each arrow moves upwards at a constant rate. When one reaches the top, its corresponding unit takes an action."},
		{text:"You two are represented by the two leftmost arrows , which are also color-coded, while the enemies are to the right."},
		{text:"After you close this tutorial box, just wait until it gets to be your turn."},
	);
	console.log(overlay);
}
BattleScreenPatientTutorial.prototype.update = function() {
	var thisser = this;
	this.battleScreen.update();
	if (this.battleScreen.taker == player) {
		if (!this.shownPlayerTurn) {
			this.shownPlayerTurn = true;
			tutorialOverlay.begin(
				{text:"It's <Player>'s turn. <Player> is a primary spellcaster.", opening:false, updateRunnee:UPDATE_RUNNEE_NEVER, textX:settings.width/4, textY:200, textWidth:settings.width/3, textHeight:200},
				{text:"To cast a Spell, first click on the Spell button.", opening:this.battleScreen.playerSpellButton, updateRunnee:UPDATE_RUNNEE_IN_OPENING, advance:()=>this.battleScreen.currentMenu==this.battleScreen.playerSpellMenu},
				{text:"Now pick a spell. Again, you can get all kinds of information by hovering them.", opening:this.battleScreen.playerSpellMenu, updateRunnee:UPDATE_RUNNEE_IN_OPENING, advance:()=>this.battleScreen.selectedAction instanceof Spell && this.battleScreen.selectedAction.isAvailable()},
			);
		}
	} else if (this.battleScreen.taker == companion) {
		if (!this.shownCompanionTurn) {
			this.shownCompanionTurn = true;
			tutorialOverlay.begin(
				{text:"It's <Companion>'s turn. <Companion> is a martial fighter.", opening:false, updateRunnee:UPDATE_RUNNEE_NEVER, textX:settings.width/4, textY:200, textWidth:settings.width/3, textHeight:200},
				{text:"To use a technique, first click on the Technique button.", opening:this.battleScreen.companionTechniqueButton, updateRunnee:UPDATE_RUNNEE_IN_OPENING, advance:()=>this.battleScreen.currentMenu==this.battleScreen.companionTechniquePalette},
				{text:"Now pick a technique. Again, you can get all kinds of information by hovering over them.", opening:this.battleScreen.companionTechniquePalette, updateRunnee:UPDATE_RUNNEE_IN_OPENING, advance:()=>this.battleScreen.selectedAction instanceof Technique && this.battleScreen.selectedAction.isAvailable()},
			);
		}
	}
	if (player.hpPortion() <= .5 || companion.hpPortion() <= .5 || battle.enemies[0].hpPortion() <= .5 || battle.enemies[1].hpPortion() <= .5) {
		tutorialOverlay.begin(
			new DialogLine("Marcel", null, "That's enough."),
			function(){battle.win();},
		);
	}
}
BattleScreenPatientTutorial.prototype.draw = function() {
	this.battleScreen.draw();
}
BattleScreenPatientTutorial.prototype.clearWindow = function() {
	this.showingWindow = false;
}