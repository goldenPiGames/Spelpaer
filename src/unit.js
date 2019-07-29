var Unit = {
	alive : true,
	team : false,
	speed : 1.0,
	battleTick : function(tickSeed) {
		var thisser = this;
		if (this.alive) {
			this.delay = Math.max(this.delay-1, 0)//PRound(battleSpeed * this.getStat("speed"), tickSeed);
		}
		this.effects = this.effects.filter(fmega => fmega.tick());
		this.techniques.forEach(function(quiche) {
			//console.log(quiche);
			quiche.tick(thisser);
		});
	},
    update : function() {
		this.components.forEach(function(obj) {
			obj.update();
		});
		this.selectionButton.update();
		this.clicked = this.selectionButton.clicked;
	},
	draw : function() {
		this.selectionButton.draw();
		this.components.forEach(function(obj) {
			obj.draw();
		});
		this.drawField();
		//if (this.image)
			//ctx.drawImage(this.image, this.selectionButton.x + this.selectionButton.width/2 - this.image.width/2, 320 - this.image.height/2);
	},
	drawField : function() {
		if (this.team)
			return;
		var pic;
		if (this.alive) {
			if (this.sprites) {
				//console.log(this.sprites);
				this.animTime--;
				if (this.animTime <= 0)
					this.animState = "Normal";
				pic = this.sprites[this.animState];
			} else if (this.image)
				pic = this.image;
		}
		if (this.animoffX > 0) {
			this.animoffX --;
		} else if (this.animoffX < 0) {
			this.animoffX ++;
		}
		if (this.animoffY > 0) {
			this.animoffY --;
		} else if (this.animoffY < 0) {
			this.animoffY ++;
		}
		drawSprite(pic, this.animbaseX + this.animoffX, 320 + this.animoffY, 1/2, 1/2);
	},
	animoffX : 0,
	animoffY : 0,
	animTime : 0,
	animState : "Normal",
	init : function() {
		this.emptyEffects();
		if (!this.color)
			this.color = settings.normal_color;
	},
	hpPortion : function() {
		return this.hp / this.maxhp;
	},
	getStat : function(statName) {
		var base = this[statName];
		var buff = 0;
		var nerf = 0;
		this.effects.forEach(function(oof) {
			var ton = oof.effectOn(statName);
			if (ton) {
				if (ton > buff)
					buff = ton;
				if (ton < nerf)
					nerf = ton;
			}
		});
		return Math.max(base, 1) * (base+buff) / Math.max((base-nerf), 1);
	},
	effectiveness : {
		slashing : 1.0,
		piercing : 1.0,
		bludgeoning : 1.0,
		fire : 1.0,
		cold : 1.0,
		electricity : 1.0,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.0,
		negative : 1.0
	},
	getEffectiveness : function(name) {
		if (this.effectiveness[name] == undefined)
			return 1.0;
		return this.effectiveness[name];
	},
	makeComponents : function(x, y, width = 150, height = 100) {
		this.selectionButton = new Button(x, y, width, height, "");
		this.nameLabel = new Label(x, y+2, width, 18, this.name, this.description, settings.normal_color);
		this.levelLabel = new Label(x, y+20, width, 14, "Lv "+this.level, "The overall measure of this individual's power.");
		this.hpLabel = new Label(x, y+33, width, 14, this.hp+"/"+this.maxhp, "If this reaches 0, this individual is defeated.");
		this.components = [this.selectionButton, this.nameLabel, this.levelLabel, this.hpLabel];
		this.animbaseX = x + width/2;
	},
/*	initComponents : function(width = ENEMY_WIDTH, height = 50) {
		this.selectionButton = new Button(0, 0, width, height, "", null);
		this.nameLabel = new Label(0, 0, width, 18, this.name, this.description);
		this.levelLabel = new Label(0, 0, width, 14, "Lv "+this.level, "Level directly determines the damage of Techniques, and the maximum level of Spells that can be cast.");
		this.hpLabel = new Label(0, 0, width, 14, this.hp+"/"+this.maxhp, "The unit's health. When this reaches 0, it is ded.");
		this.imageHolder = new ImageHolder(0, 0, this.image);
		this.components = [this.selectionButton, this.nameLabel, this.levelLabel, this.hpLabel, this.imageHolder];
	},*/
	setPosition : function(x, y) {
		this.selectionButton.x = x; this.selectionButton.y = y;
		this.nameLabel.x = x; this.nameLabel.y = y+2;
		this.levelLabel.x = x; this.levelLabel.y = y+20;
		this.hpLabel.x = x; this.hpLabel.y = y+33;
		this.imageHolder.x = x + this.selectionButton.width/2 - this.imageHolder.width/2; this.imageHolder.y = 200 - this.imageHolder.height/2;
	},
	animationX : function() {
		return (this.imageHolder || this.selectionButton).x + (this.imageHolder || this.selectionButton).width/2;
	},
	animationY : function() {
		return (this.imageHolder || this.selectionButton).y + (this.imageHolder || this.selectionButton).height/2;
	},
	unClickHover : function() {
		this.selectionButton.clicked = false; this.selectionButton.hovered = false;
		this.nameLabel.clicked = false; this.nameLabel.hovered = false;
		this.levelLabel.clicked = false; this.levelLabel.hovered = false;
		this.hpLabel.clicked = false; this.hpLabel.hovered = false;
	},
	unHover : function() {
		this.components.forEach(function(obj){
			obj.hovered = false;
		});
	},
	setSelectionHandler : function(listener) {
		var thisser = this;
		this.selectionButton.handler = function(){
			thisser.unHover();
			listener.unitSelected(thisser);
		};
	},
	isReady : function() {
		return (this.delay <= 0);
	},
	takeDamage : function(amount, canKill = true) {
		if (amount < 0) {
			this.heal(-amount)
			return;
		}
		this.hp -= amount;
		if (!canKill && this.hp <= 0)
			this.hp = 1;
		this.hpLabel.text = this.hp + "/" + this.maxhp;
		particles.push(new ParticleText("-"+amount, this.animationX(), this.animationY(), 0, .3, 40, "#FF4040", settings.normal_color, .05));
		this.animHurt(amount);
		if (this.hp <= 0)
			this.die()
	},
	heal : function(amount) {
		if (amount < 0) {
			this.takeDamage(-amount);
			return;
		}
		this.hp += amount;
		if (this.hp > this.maxhp) {
			this.hp = this.maxhp;
		}
		this.hpLabel.text = this.hp + "/" + this.maxhp;
		particles.push(new ParticleText("+"+amount, this.animationX(), this.animationY(), 0, .3, 40, "#00DD00", settings.normal_color, .05))
	},
	dodge : function(amount) {
		particles.push(new ParticleText("MISS", this.animationX(), this.animationY(), 0, .3, 40, "#4040FF", settings.normal_color, .05))
		this.animDodge();
	},
	die : function(message) {
		this.alive = false;
		this.delay = 400;
		//this.hp = 0;
		this.selectionButton.active = false;
		this.unClickHover();
		this.components.splice(this.components.indexOf(this.imageHolder));
		this.hpLabel.text = message;
	},
	emptyEffects : function() {
		this.effects = [];
		this.ailments = {
			Stun : 0,
		};
	},
	applyEffect : function(fect) {
		this.effects.push(fect);
	},
	hasSpells : function() {
		return (this.spells.length > 0);
	},
	avail : function() {
		this.availableTechniques = this.techniques.filter(function(tech){return tech.isAvailable()});
		this.availableSpells = this.spells.filter(function(spel){return spel.isAvailable()});
	},
	chooseAction : function() {
		var act = {};
		var choices = this.availableTechniques.concat(this.availableSpells);
		act.skill = randomTerm(choices);
		act.target = randomTerm(battle.membersOfSide(!this.side));
		return act;
	},
	getAttack : function() {
		return this.techniques[0];
	},
	expYield : function() {
		return this.level * this.maxhp * this.expMult;
	},
	expMult : 1,
	techYield : function() {
		return this.level * this.techMult;
	},
	techMult : 1,
	moneyYield : function() {
		return (this.hp <= 0) * this.maxhp * this.cashMult;
	},
	cashMult : 1,
	itemYield : function() {
		return [];
	},
	animDodge : function() {
		if (this.sprites && this.sprites.Dodge) {
			this.animState = "Dodge";
			this.animTime = 10;
		} else
			this.animoffX = 10;
	},
	animHurt : function(amount) {
		if (this.sprites && this.sprites.Hurt) {
			this.animState = "Hurt";
			this.animTime = 5;
		} else
			this.animoffY = -5;
	},
	animSkill : function(skill) {
		if (skill.isSpell) {
			if (this.sprites && this.sprites.Cast) {
				this.animState = "Cast";
				this.animTime = 15;
			}
		} else {
			if (this.sprites && this.sprites.Attack) {
				this.animState = "Attack";
				this.animTime = 15;
			} else
				this.animoffY = 25;
		}
	},
	waterbreathing : 0,
}