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
			let agility = units[i].getStat(STAT_INDICES.Agility);
			highestAgility = Math.max(highestAgility, agility);
		}
		units.forEach(oj => oj.delay = Math.floor(this.getBaseStartDelay() + 150 * (1 - oj.getStat(STAT_INDICES.Agility) / highestAgility) + 20 * Math.random()));
	},
	getBaseStartDelay : function() {
		switch (difficulty) {
			case 0: return 60; break;
			case 1: return 120; break;
			case 2: return 60; break;
		}
	},
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
		if (this.numberOfActiveEnemies() <= 0) {
			this.win();
			return;
		}
		if (player.defeated == DEFEAT_INDICES.Dead || companion.defeated == DEFEAT_INDICES.Dead || (!player.isActive() && !companion.isActive())) {
			//console.log(player, companion)
			this.lose();
			return;
		}
		advanceTime(1);
	},
	executeAction : function(user, skill, target) {
		skill.execute(user, target);
		skill.expend();
		user.delay = skill.delay;
		user.animSkill(skill, target);
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
		getSpoils(exp, tech, cash, stuff, this.winFunction);
	},
	lose : function() {
		this.loseFunction();
	},
	leftOf : function(center) {
		var nits = this.membersOfSide(center.team);
		var dex = nits.indexOf(center);
		return nits[dex-1] || null;
		/*if (center == null)
			return null;
		if (center === player)
			return null;
		if (center === companion)
			return player;
		centerIndex = this.indexOfEnemy(center);
		if (centerIndex <= 0)
			return null;
		return this.enemies[centerIndex - 1];*/
	},
	rightOf : function(center) {
		var nits = this.membersOfSide(center.team);
		var dex = nits.indexOf(center);
		return nits[dex+1] || null;
		/*if (center == null)
			return null;
		if (center === player)
			return companion;
		if (center === companion)
			return null;
		centerIndex = this.indexOfEnemy(center);
		if (centerIndex >= this.enemies.length-1)
			return null;
		return this.enemies[centerIndex + 1];*/
	},
	membersOfSide : function(team, activeOnly = false) {
		if (team)
			return [player, companion];
		else {
			if (activeOnly)
				return this.enemies.filter(oj => oj.isActive());
			else
				return this.enemies;
		}
	},
	/*indexOfEnemy : function(enemy) {
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i] === enemy)
				return i;
		}
		return null;
	},*/
	allUnits : function(first = false) {
		return this.membersOfSide(first, false).concat(this.membersOfSide(!first, false));
	},
	allActiveUnits : function(first = false) {
		return this.membersOfSide(first, true).concat(this.membersOfSide(!first, true));
	},
	numberOfActiveEnemies : function() {
		var soFar = 0;
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].isActive())
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
	//throw "succ";
	runnee = GeneralEngine;
	GeneralEngine.objects = [new Label(50, 150, 700, 50, "Game Over", "you are succ. You'll have to refresh the page if you want to replay; too many stray variables.")];
}
