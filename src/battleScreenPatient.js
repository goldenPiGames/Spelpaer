//console.log("F")
function BattleScreenPatient() {
	var thisser = this;
	this.delayScaleX = Math.max(10, (settings.width-800)/20);
	this.fieldX = (this.delayScaleX*10);
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
		menuWidth = Math.floor(rightTotalWidth-110);
		menuHeight = mainHeight() - menuY;
		var rightButtonX = menuX + menuWidth + 5;
		var rightButtonWidth = settings.width - rightButtonX;
		this.attackButton = new Button(rightX+5, 5, hafwid-10, 35, "Attack", "Use your current attack.", function(){
			thisser.selectedAction = thisser.taker.getAttack(); thisser.currentMenu = null});
		this.playerSpellButton = new Button(rightX+hafwid+5, 5, hafwid-5, 75, "Spell", "Choose one of your spells.", function(){thisser.currentMenu = thisser.playerSpellMenu});
		this.itemButton = new Button(rightX+5, 45, hafwid-5, 35, "Item", "Use an item from your inventory.", function(){thisser.currentMenu = thisser.itemMenu});
		this.companionTechniqueButton = new Button(rightX+hafwid+5, 5, hafwid-5, 75, "Technique", "Choose one of your techniques.", function(){thisser.currentMenu = thisser.companionTechniquePalette});
	}
	this.playerSpellMenu = new ScrollMenu(menuX, menuY, menuWidth, menuHeight, function(val){thisser.selectedAction = val}, [], "cost", "description", function(val){return val.isAvailable()}, function(val){return val == thisser.selectedAction});
		this.companionTechniquePalette = new TechniquePalette(menuX, menuY, menuWidth, menuHeight, function(val){thisser.selectedAction = val}, [], function(val){return val == thisser.selectedAction});
	this.fieldY = 100;
	this.fieldHeight = mainHeight() - this.fieldY - 100
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
	//this.updateStats();
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
	if (!player.alive || !companion.alive)
		battle.lose();
	else if (battle.numberOfLivingEnemies() <= 0)
		battle.win();
}
BattleScreenPatient.prototype.draw = function() {
	var thisser = this;
	clearBack();
	ctx.lineWidth = 4;
	ctx.strokeStyle = this.taker ? this.taker.color : settings.normal_color;
	ctx.beginPath();
	ctx.moveTo(0, 9);
	ctx.lineTo(this.delayScaleX*10, 9);
	ctx.stroke();
	battle.allUnits().forEach(function(peep, index) {
		if (peep.alive)
			thisser.drawCooldownArrow(peep.delay, index, peep.color);
		peep.draw(thisser);
	});
	if (player.isReady()) {
		this.attackButton.draw();
		this.playerSpellButton.draw();
		this.itemButton.draw();
		if (this.currentMenu)
			this.currentMenu.draw();
	} else if (companion.isReady()) {
		this.attackButton.draw();
		this.companionTechniqueButton.draw();
		this.itemButton.draw();
		if (this.currentMenu)
			this.currentMenu.draw();
	}
}
BattleScreenPatient.prototype.drawCooldownArrow = function(delay, index, color = settings.normal_color) {
	ctx.lineWidth = 2;
	ctx.strokeStyle = color;
	ctx.lineJoin = 'miter';
	var dsx = this.delayScaleX;
	var basex = (index+.5)*dsx;
	var basey = delay+10;
	ctx.beginPath();
	ctx.moveTo(basex-dsx/2, basey+dsx);
	ctx.lineTo(basex, basey);
	ctx.lineTo(basex+dsx/2, basey+dsx);
	ctx.lineTo(basex, basey+dsx);
	ctx.lineTo(basex, basey+dsx*2);
	ctx.stroke();
}

function BattleScreenPatientTutorial(battleScreen) {
	var thisser = this;
	this.clearWindow();
	this.shownPlayerTurn = false;
	this.shownCompanionTurn = false;
	this.shownSpells = false;
	this.shownTechniques = false;
	this.battleScreen = battleScreen;
	dialog.begin(
		new DialogLine("Manz", null, "Now take a good look around."),
		new DialogLine("Marcel", null, "Don't worry, nobody's going to die here."),
		new DialogLine("Manz", null, "Now direct your attention to the left side of the screen."),
		function(){thisser.setWindow(5, 5, 190, 600)},
		new DialogLine("Manz", null, "That's the Delay Sequence. Each arrow represents one character in the battle."),
		new DialogLine("Manz", null, "Their position at the start of battle is determined by both the Agility stat and randomness."),
		new DialogLine("Manz", null, "During battle, each arrow moves upwards at a constant rate. When one reaches the top, its corresponding unit takes an action."),
		new DialogLine("Marcel", null, "You two are represented by the two on left, which are also color-coded, while Manz and I are the other two."),
		function(){thisser.clearWindow()},
		new DialogLine("Manz", null, "For now, just wait until it gets to be your turn."),
	);
}
BattleScreenPatientTutorial.prototype.update = function() {
	var thisser = this;
	this.battleScreen.update();
	if (player.isReady()) {
		if (!this.shownPlayerTurn) {
			this.shownPlayerTurn = true;
			var bsppsb = this.battleScreen.playerSpellButton;
			this.setWindow(bsppsb.x-5, bsppsb.y-5, bsppsb.width+10, bsppsb.height+10);
			dialog.begin(
				new DialogLine("Manz", null, "You're up, <Player>."),
				new DialogLine("Manz", null, "You are a primary spellcaster, like me. It's time to use those spells that you prepared this morning."),
				new DialogLine("Manz", null, "To cast a Spell, first select the Spell button."),
				function(){thisser.clearWindow()},
			);
		} else if (!this.shownSpells && this.battleScreen.currentMenu == this.battleScreen.playerSpellMenu) {
			this.shownSpells = true;
			var bsppsm = this.battleScreen.playerSpellMenu;
			this.setWindow(bsppsm.x-5, bsppsm.y-5, bsppsm.width+10, bsppsm.height+10);
			dialog.begin(
				new DialogLine("Manz", null, "Your Spells are shown on this scroll menu. To use one, click on it and then click on the target."),
				new DialogLine("Manz", null, "Your Spells have a variety of effects. You can mouse over them to learn more about them."),
				new DialogLine("Manz", null, "When you use a Spell, that spell can't be used again for the rest of the day - unless, of course, you prepared it multiple times."),
				function(){thisser.clearWindow()},
			);
		} else {
			this.battleScreen.playerAttackButton.active = true;
			this.battleScreen.itemButton.active = true;
		}
	} else if (companion.isReady()) {
		if (!this.shownCompanionTurn) {
			//this.battleScreen.itemButton.active = false;
			this.shownCompanionTurn = true;
			var bspctb = this.battleScreen.companionTechniqueButton;
			this.setWindow(bspctb.x-5, bspctb.y-5, bspctb.width+10, bspctb.height+10);
			dialog.begin(
				new DialogLine("Marcel", null, "You're up, <Companion>."),
				new DialogLine("Marcel", null, "You're a martial fighter, like me. You have a variety of Techniques at your disposal."),
				new DialogLine("Marcel", null, "To use a Technique, first select the Technique button."),
				function(){thisser.clearWindow()},
			);
		} else if (!this.shownTechniques && this.battleScreen.currentMenu == this.battleScreen.companionTechniquePalette) {
			this.shownTechniques = true;
			var bspctp = this.battleScreen.companionTechniquePalette;
			this.setWindow(bspctp.x-5, bspctp.y-5, bspctp.width+10, bspctp.getTotalHeight()+10);
			dialog.begin(
				new DialogLine("Marcel", null, "Your Techniques are shown on this Palette. To use one, click on it and then click on the target."),
				new DialogLine("Marcel", null, "Your Techniques have a variety of effects. You can mouse over them to get all the details."),
				new DialogLine("Marcel", null, "When you use a Technique (other than basic ones like Attack or Guard), it'll be a certain amount of time before you can use it again."),
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