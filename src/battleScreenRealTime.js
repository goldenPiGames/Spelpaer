var battleScreenRealTime = {
	begin : function() {
		runnee = this;
		player.makeComponents(450, 550, 150, 125);
		companion.makeComponents(600, 550, 150, 125);
		this.playerSpellMenu.setItems(player.spells);
		this.currentPlayerMenu = this.playerSpellMenu;
		this.companionTechniquePalette.setTechniques(companion.techniques);
		this.enemies.forEach(function(nem, dex, lisp) {
			nem.makeComponents(canvas.width/2 + ENEMY_WIDTH*(dex - lisp.length/2), 0, ENEMY_WIDTH, 100);
		});
		this.playerAction = null;
		this.playerTarget = null;
		this.companionAction = null;
		this.companionEnemyTarget = randomTerm(this.enemies);
		this.companionAllyTarget = player;
		this.ticking = true;
		particles.push(new ColorFade(4, 0, 0));
	},
	update : function() {
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
		//this.updateMouse();
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
	},
	draw : function() {
		clearBack();
		ctx.lineWidth = 3;
		ctx.strokeStyle = settings.normal_color;
		/*if (companion.delay <= 0)
			ctx.strokeStyle = COMPANION_COLOR;
		if (player.delay <= 0)
			ctx.strokeStyle = PLAYER_COLOR;*/
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
	},
}