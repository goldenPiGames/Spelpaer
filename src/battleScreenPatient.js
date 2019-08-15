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
	player.makeComponents(fieldMiddle-150, fieldBottom, 150, mainHeight()-fieldBottom);
	companion.makeComponents(fieldMiddle, fieldBottom, 150, mainHeight()-fieldBottom);
	this.playerSpellMenu.setItems(player.spells);
	this.currentMenu = null;
	this.taker = null;
	this.companionTechniquePalette.setTechniques(companion.techniques);
	var wid = Math.min(this.fieldWidth/battle.enemies.length, 150);
	battle.enemies.forEach(function(nem, dex, lisp) {
		nem.makeComponents(thisser.fieldX + thisser.fieldWidth*(dex+1)/(lisp.length+1) - wid/2, 0, wid, thisser.fieldY);
	});
	this.selectedAction = null;
	this.selectedTarget = null;
	//this.ticking = true;
}
BattleScreenPatient.prototype = Object.create(ScreenBase);
BattleScreenPatient.prototype.update = function() {
	var thisser = this;
	this.taker = null;
	if (player.isReady()) {
		this.taker = player;
	} else if (companion.isReady()) {
		this.taker = companion;
	}
	//this.updateMouse();
	//var tickSeed = Math.random();
	battle.allUnits().forEach(function(oj) {
		oj.update(thisser);
		if (oj.clicked && thisser.selectedAction) {
			thisser.selectedTarget = oj;
		}
	});
	if (this.taker == player) {
		this.attackButton.update();
		this.playerSpellButton.update();
		this.itemButton.update();
		if (this.currentMenu)
			this.currentMenu.update();
	} else if (this.taker == companion) {
		this.attackButton.update();
		this.companionTechniqueButton.update();
		this.itemButton.update();
		if (this.currentMenu)
			this.currentMenu.update();
	} else {
		battle.tick();
	}
	if (this.taker && this.taker.isReady() && this.selectedAction && this.selectedAction.isAvailable() && (this.selectedAction.selfOnly || this.selectedTarget)) {
		battle.executeAction(this.taker, this.selectedAction, this.selectedTarget);
		this.currentMenu = null;
		this.selectedAction = null;
		this.selectedTarget = null;
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
	var bspdm = this.battleScreen.delayMeter;
	dialog.begin(
		new DialogLine("Marcel", null, "Don't worry, nobody's going to die here."),
		new DialogLine("Spelpaer", null, "Please direct your attention to the left side of the screen."),
		()=>this.setWindow(bspdm.x-5, bspdm.y-5, bspdm.width+10, bspdm.height+10),
		new DialogLine("Spelpaer", null, "That's the Delay Meter. Each arrow represents one character in the battle."),
		new DialogLine("Spelpaer", null, "Each unit's position at the start of battle is determined by both their Agility stat and a random factor."),
		new DialogLine("Spelpaer", null, "During battle, each arrow moves upwards at a constant rate. When one reaches the top, its corresponding unit takes an action."),
		new DialogLine("Spelpaer", null, "You two are represented by the two leftmost arrows , which are also color-coded, while the enemies are to the right."),
		function(){thisser.clearWindow()},
		new DialogLine("Spelpaer", null, "For now, just wait until it gets to be your turn."),
	);
}
BattleScreenPatientTutorial.prototype.update = function() {
	var thisser = this;
	this.battleScreen.update();
	if (this.battleScreen.taker == player) {
		if (!this.shownPlayerTurn) {
			this.shownPlayerTurn = true;
			var bsppsb = this.battleScreen.playerSpellButton;
			//()=>this.setWindow(bsppsb.x-5, bsppsb.y-5, bsppsb.width+10, bsppsb.height+10);
			dialog.begin(
				new DialogLine("Manz", null, "You're up, <Player>."),
				new DialogLine("Manz", null, "You are a primary spellcaster, like me. It's time to use those spells that you prepared this morning."),
				()=>this.setWindow(bsppsb.x-5, bsppsb.y-5, bsppsb.width+10, bsppsb.height+10),
				new DialogLine("Spelpaer", null, "To cast a Spell, first click on the Spell button."),
				function(){thisser.clearWindow()},
			);
			this.battleScreen.attackButton.active = false;
		} else if (!this.shownSpells && this.battleScreen.currentMenu == this.battleScreen.playerSpellMenu) {
			this.shownSpells = true;
			var bsppsm = this.battleScreen.playerSpellMenu;
			this.setWindow(bsppsm.x-5, bsppsm.y-5, bsppsm.width+10, bsppsm.height+10);
			dialog.begin(
				new DialogLine("Spelpaer", null, "Your Spells are shown on this scroll menu. To use one, click on it and then click on the target."),
				new DialogLine("Spelpaer", null, "Just like when preparing, you can hover over a spell to see its details."),
				function(){thisser.clearWindow()},
			);
		} else {
			this.battleScreen.attackButton.active = true;
			this.battleScreen.itemButton.active = true;
		}
	} else if (this.battleScreen.taker == companion) {
		if (!this.shownCompanionTurn) {
			//this.battleScreen.itemButton.active = false;
			this.shownCompanionTurn = true;
			var bspctb = this.battleScreen.companionTechniqueButton;
			dialog.begin(
				new DialogLine("Marcel", null, "You're up, <Companion>."),
				new DialogLine("Marcel", null, "You're a martial fighter, like me. You have a variety of Techniques at your disposal."),
				()=>this.setWindow(bspctb.x-5, bspctb.y-5, bspctb.width+10, bspctb.height+10),
				new DialogLine("Spelpaer", null, "To use a Technique, first click on the Technique button."),
				function(){thisser.clearWindow()},
			);
		} else if (!this.shownTechniques && this.battleScreen.currentMenu == this.battleScreen.companionTechniquePalette) {
			this.shownTechniques = true;
			var bspctp = this.battleScreen.companionTechniquePalette;
			this.setWindow(bspctp.x-5, bspctp.y-5, bspctp.width+10, bspctp.getTotalHeight()+10);
			dialog.begin(
				new DialogLine("Spelpaer", null, "Your Techniques are shown on this Palette. To use one, click on it and then click on the target."),
				new DialogLine("Spelpaer", null, "You can hover over a technique to see its details."),
				new DialogLine("Spelpaer", null, "When you use a Technique (other than basic ones like Attack or Guard), it'll be a certain amount of time before you can use it again."),
				function(){thisser.clearWindow()},
			);
		} else {
			this.battleScreen.itemButton.active = true;
		}
	}
	if (player.hpPortion() <= .5 || companion.hpPortion() <= .5 || battle.enemies[0].hpPortion() <= .5 || battle.enemies[1].hpPortion() <= .5) {
		dialog.begin(
			new DialogLine("Marcel", null, "That's enough."),
			function(){battle.win();},
		);
	}
}
BattleScreenPatientTutorial.prototype.draw = function() {
	this.battleScreen.draw();
	if (this.showingWindow) {
		ctx.fillStyle = settings.background_color + "80";
		ctx.fillRect(0, 0, canvas.width, this.windowy);
		ctx.fillRect(0, this.windowy, this.windowx, this.windowheight); //left
		ctx.fillRect(this.windowx+this.windowwidth, this.windowy, canvas.width-this.windowx-this.windowwidth, this.windowheight);
		ctx.fillRect(0, this.windowy+this.windowheight, canvas.width, canvas.height-this.windowy-this.windowheight);
		ctx.strokeStyle = settings.foreground_color;
		ctx.lineWidth = 2;
		ctx.strokeRect(this.windowx, this.windowy, this.windowwidth, this.windowheight);
	}
}
BattleScreenPatientTutorial.prototype.setWindow = function(x, y, width, height) {
	this.showingWindow = true;
	this.windowx = x;
	this.windowy = y;
	this.windowwidth = width;
	this.windowheight = height;
}
BattleScreenPatientTutorial.prototype.clearWindow = function() {
	this.showingWindow = false;
}