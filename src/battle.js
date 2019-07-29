const ENEMY_WIDTH = 120;
var battle = {
	playerAction : null,
	playerTarget : null,
	companionAction : null,
	companionEnemyTarget : null,
	companionAllyTarget : null,
	currentPlayerMenu : null,
	playing : true,
	ticking : false,
	/*attackButton : new Button(5, 100, 90, 45, "Attack", "Use your current attack.", function(){battle.playerAction = player.getAttack()}),
	spellButton : new Button(5, 150, 90, 45, "Spell", "Choose one of your spells.", function(){battle.currentPlayerMenu = battle.playerSpellMenu}),
	playerSpellMenu : new ScrollMenu(80, 100, 220, 575, function(val){battle.playerAction = val}, [], "cost", "description", function(val){return val == battle.playerAction}),
	//itemButton : new Button(5, 200, 90, 45, "Item", "Use an item from your inventory.", function(){battle.currentPlayerMenu = battle.playerItemMenu},
	companionTechniquePalette : new TechniquePalette(1000, 100, 200, 60, function(val){battle.companionAction = val}, []),*/
	init : function() {
		
	},
	begin : function(initialEnemies, music, winFunction, loseFunction = gameOver) {
		this.enemies = initialEnemies;
		if (music)
			playMusic(music);
		this.winFunction = winFunction;
		this.loseFunction = loseFunction;
		refreshKnownTechniques();
		this.rollForInitiative();
		this.patient = (difficulty < 1);
		if (this.patient) {
			this.screen = new BattleScreenPatient();
		} else {
			this.screen = new BattleScreenRealTime();
		}
		switchScreen(this.screen);
		/*if (!Flags.seenBattle) {
			Flags.seenBattle = true;
			dialog.begin("You've just gotten into a battle. Now listen up, because I'll only explain this once.",
				"To the right is the Delay Sequence. It keeps track of what order everybody's going to act. Each arrow represents a single unit: "+settings.player_color+" for <Player>, "+settings.companion_color+" for <Companion>, and "+settings.normal_color+" for enemies. Your starting position is determined by both Agility and random chance.",
				"During battle, all of the arrows will move upwards in real currentTime. When an arrow reaches the top, its corresponding unit will take an action.",
				"You can choose a Technique or a Spell. Once you have it selected, you can choose a target by clicking on its header at the top of the screen.",
				"Note that you can attack your allies or heal your enemies if you want. You probably shouldn't, but just be aware that you have that option.")
		}*/
	},
	beginTutorial : function() {
		if (this.patient) {
			switchScreen(new BattleScreenPatientTutorial(this.screen));
		} else {
			switchScreen(new BattleScreenRealTimeTutorial(this.screen));
		}
	},
	rollForInitiative : function() {
		var units = this.allUnits();
		var highestAgility = 0;
		for (var i = 0; i < units.length; i++) {
			let agility = units[i].getStat("Agility");
			highestAgility = Math.max(highestAgility, agility);
		}
		for (var i = 0; i < units.length; i++) {
			this.setCooldown(units[i], 90 + highestAgility * 2 + Math.floor(20 * Math.random()) - units[i].getStat("Agility") * 2);
		}
	},
	/*update : function() {
		var thisser = this;
		if (this.patient) {
			if (player.isReady()) {
				this.currentPlayerMenu.update();
			} else if (companion.isReady()) {
				this.companionTechniquePalette.update();
			}
		} else {
			this.currentPlayerMenu.update();
			this.companionTechniquePalette.update();
		}
		//this.updateStats();
		//var tickSeed = Math.random();
		this.allUnits().forEach(function(oj) {
			oj.update();
			if (oj.clicked) {
				if (oj.patient) {
					
				} else {
					if (thisser.playerAction)
						thisser.playerTarget = oj;
					else {
						if (oj.team)
							thisser.companionAllyTarget = oj;
						else
							thisser.companionEnemyTarget = oj;
					}
				}
			}
		});
		if (this.ticking) {
			this.allUnits().forEach(function(peep) {
				peep.battleTick();
			});
			if (player.isReady() && this.playerAction && this.playerAction.isAvailable() && this.playerTarget) {
				this.executeAction(player, this.playerAction, this.playerTarget);
				this.playerAction = null;
				this.playerTarget = null;
			}
			if (companion.isReady() && this.companionAction && this.companionAction.isAvailable()) {
				this.executeAction(companion, this.companionAction, this.companionEnemyTarget);
				this.companionAction = null;
			}
			for (var i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i].isReady()) {
					var taker = this.enemies[i];
					taker.avail();
					var act = taker.chooseAction();
					this.executeAction(taker, act.skill, act.target);
					return;
				}
			}
			//this.taker = null;
		}
		advanceTime(1);
	},*/
	tick : function() {
		this.allUnits().forEach(function(peep) {
			peep.battleTick();
		});
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].isReady()) {
				var taker = this.enemies[i];
				taker.avail();
				var act = taker.chooseAction();
				this.executeAction(taker, act.skill, act.target);
				return;
			}
		}
		advanceTime(1);
	},
	/*draw : function() {
		clearBack();
		ctx.lineWidth = 3;
		ctx.strokeStyle = settings.normal_color;
		ctx.beginPath();
		ctx.moveTo(5, 9);
		ctx.lineTo(25+this.enemies.length*10, 9);
		ctx.stroke();
		this.allUnits().forEach(function(peep, index) {
			if (peep.alive)
				drawCooldownArrow(peep.delay, index, peep.color);
			peep.draw();
		});
		this.currentPlayerMenu.draw();
		this.companionTechniquePalette.draw();
	},*/
	takeTurn : function(taker) {
		//this.ticking = false;
		this.currentSkill = false;
		taker.avail();
	},
	/*setMenu : function(type) {
		this.selectedSkill = null;
		var options = null;
		switch(type) {
			case "technique":
				options = this.taker.availableTechniques;
				break;
			case "spell":
				options = this.taker.spells;
				break;
		}
		engine.gameObjects = [currentLoc.getBattleWeatherObject(), this.pauseButton, this.techniqueButton, this.spellButton, this.itemButton, this.parleyButton, this.otherButton, this.waitButton].concat(this.allUnits(), this.skillLabel, this.skillMenu, this);
		this.skillMenu.setItems(options);
		
	},*/
	unitSelected : function(unit) {
		if (this.selectedSkill != null && !engine.gameObjects.includes(this.skillMenu)) {
			this.executeAction(new Action(this.selectedSkill, unit));
		}
	},
	menuReturn : function(dab) {
		this.selectedSkill = dab;
		this.menuActive = false;
		engine.gameObjects = [this.pauseButton, this.techniqueButton, this.spellButton, this.itemButton, this.parleyButton, this.otherButton, this.waitButton].concat(this.allUnits(), this.skillLabel, this, currentLoc.getBattleWeatherObject());
		this.skillLabel.text = this.selectedSkill.name;
		this.skillLabel.hoverText = this.selectedSkill.description;
	},
	executeAction : function(user, skill, target) {
		//this.ticking = false;
		/*var messageList = ass.skill.execute(this.taker, ass.target, this);
		ass.skill.animate(this.user, ass.target, this);
		var thisser = this;
		this.taker.selectionButton.hovered = true;
		ass.target.unClickHover();
		ass.target.selectionButton.clicked = true;
		this.setCooldown(this.taker, ass.skill.delay);
		messageList.push(function(){thisser.resume();});
		this.selectedSkill = null;
		this.skillLabel.text = "";
		this.skillLabel.hoverText = null;
		dialog.begin(messageList);*/
		
		//console.log(user, skill, target);
		skill.execute(user, target);
		skill.expend();
		user.delay = skill.delay;
		user.animSkill(skill, target);
	},
	resume : function() {
		//Win
		if (this.numberOfLivingEnemies() <= 0) {
			this.win();
			return;
		}
		//Lose
		if (!player.alive || !companion.alive) {
			this.lose();
			return;
		}
		battleActive = true;
		this.ticking = true;
		this.deactivateButtons();
	},
	win : function() {
		var exp = 0;
		var tech = 0;
		var cash = 0;
		var stuff = [];
		this.enemies.forEach(function(nem) {
			exp += nem.expYield();
			tech += nem.techYield();
			cash += nem.moneyYield();
			var nus = nem.itemYield();
			if (nus) {
				if (Array.isArray(nus)) {
					stuff = stuff.concat(nus);
				} else {
					stuff.push(nus);
				}
			}
		});
		spoilsScreen.begin(exp, tech, cash, stuff, this.winFunction);
	},
	lose : function() {
		this.loseFunction();
	},
	leftOf : function(center) {
		if (center == null)
			return null;
		if (center === player)
			return null;
		if (center === companion)
			return player;
		centerIndex = this.indexOfEnemy(center);
		if (centerIndex <= 0)
			return null;
		return this.enemies[centerIndex - 1];
	},
	rightOf : function(center) {
		if (center == null)
			return null;
		if (center === player)
			return companion;
		if (center === companion)
			return null;
		centerIndex = this.indexOfEnemy(center);
		if (centerIndex >= this.enemies.length-1)
			return null;
		return this.enemies[centerIndex + 1];
	},
	membersOfSide : function(team) {
		if (team)
			return [player, companion];
		var livingEnemies = [];
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].alive)
				livingEnemies.push(this.enemies[i]);
		}
		return livingEnemies;
	},
	indexOfEnemy : function(enemy) {
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i] === enemy)
				return i;
		}
		return null;
	},
	setCooldown : function(peep, amount) {
		peep.delay = amount;
		this.checkTie(peep);
	},
	checkTie : function(peep) {
		var others = this.allUnits();
		for (var i = 0; i < others.length; i++) {
			if (others[i].delay == peep.delay && others[i] !== peep) {
				peep.delay++;
				return this.checkTie(peep);
			}
		}
	},
	allUnits : function() {
		return [player, companion].concat(this.enemies);
	},
	numberOfLivingEnemies : function() {
		var soFar = 0;
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].alive)
				soFar++;
		}
		return soFar;
	},
	deactivateButtons : function() {
		this.techniqueButton.active = false;
		this.spellButton.active = false;
		this.itemButton.active = false;
		this.parleyButton.active = false;
		this.otherButton.active = false;
		this.waitButton.active = false;
	},
	/*togglePause : function() {
		if (this.playing)
			this.pause();
		else
			this.play();
	},
	pause : function() {
		this.playing = false;
		this.pauseButton.text = "Play";
	},
	play : function() {
		this.playing = true;
		this.pauseButton.text = "Pause";
	}*/
}

/*function drawCooldownArrow(currentTime, index, color = settings.normal_color) {
	ctx.strokeStyle = color;
	ctx.lineJoin='miter';
	ctx.beginPath();
	ctx.moveTo(5+index*10, 20+currentTime);
	ctx.lineTo(10+index*10, 10+currentTime);
	ctx.lineTo(15+index*10, 20+currentTime);
	ctx.lineTo(10+index*10, 20+currentTime);
	ctx.lineTo(10+index*10, 30+currentTime);
	ctx.stroke();
}*/

function gameOver() {
	runnee = GeneralEngine;
	GeneralEngine.objects = [new Label(50, 150, 700, 50, "Game Over", "you are succ. You'll have to refresh the page if you want to replay; too many stray variables.")];
}
