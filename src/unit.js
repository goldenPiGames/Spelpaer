var Unit = {
//------------------------------------------------------------------ CRUNCH --------------------------------------------
	defeated : 0,
	team : false,
	speed : 1.0,
	init : function() {
		if (!this.stats) {
			this.stats = statsFromMults(this.statMults, this.level);
		}
		if (!this.maxhp)
			this.maxhp = Math.floor(this.hpMult * this.stats[STAT_INDICES.Vitality]);
		if (!this.hp)
			this.hp = this.maxhp;
		this.spells = this.spells.filter((sp)=>sp.level<=this.level);
		this.emptyEffects();
		if (!this.color)
			this.color = settings.normal_color;
	},
	battleTick : function(tickSeed) {
		var thisser = this;
		if (!this.defeated) {
			this.delay = Math.max(this.delay-1, 0)//PRound(battleSpeed * this.getStat("speed"), tickSeed);
		}
		this.effects = this.effects.filter(fmega => fmega.tick());
		this.allActions().forEach(function(quiche) {
			//console.log(quiche);
			quiche.tick(thisser);
		});
	},
	getStat : function(statIndex) {
		var base = this.stats[statIndex];
		var buff = 0;
		var nerf = 0;
		this.effects.forEach(function(oof) {
			var ton = oof.effectOnStat(statIndex);
			if (ton) {
				if (ton > buff)
					buff = ton;
				if (ton < nerf)
					nerf = ton;
			}
		});
		return Math.max(base, 1) * (base+buff) / Math.max((base-nerf), 1);
	},
	getEffectiveness : function(index) {
		if (this.effectiveness[index] == undefined)
			return 1.0;
		return this.effectiveness[index];
	},
	isReady : function() {
		return (this.delay <= 0);
	},
	takeDamage : function(amount, source) {
		if (amount < 0) {
			this.heal(-amount)
			return;
		}
		this.hp -= amount;
		//this.hpLabel.text = this.hp + "/" + this.maxhp;
		particles.push(new ParticleText("-"+amount, this.textX(), this.textY(), 0, .3, 40, "#FF4040", settings.normal_color, .05));
		this.animHurt(amount);
		if (this.hp <= 0)
			this.die(source);
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
		//this.hpLabel.text = this.hp + "/" + this.maxhp;
		particles.push(new ParticleText("+"+amount, this.textX(), this.textY(), 0, .3, 40, "#00DD00", settings.normal_color, .05))
	},
	dodge : function(amount) {
		particles.push(new ParticleText("MISS", this.textX(), this.textY(), 0, .3, 40, "#4040FF", settings.normal_color, .05))
		this.animDodge();
	},
	die : function(ar) {
		if (ar == undefined)
			this.defeated = DEFEAT_INDICES.Dead;
		else if (typeof defeated == "object")
			this.defeated = ar.defeat;
		else
			this.defeated = ar;
		this.delay = 400;
		//this.hp = 0;
		//this.selectionButton.active = false;
		this.unClickHover();
		//this.components.splice(this.components.indexOf(this.imageHolder));
		//this.hpLabel.text = DEFEAT_NAMES[this.defeated];
	},
	flee : function() {
		this.die(DEFEAT_INDICES.Fled);
	},
	isActive : function() {
		return !this.defeated;
	},
	emptyEffects : function() {
		this.effects = [];
		this.ailments = {
			Stun : 0,
		};
	},
	addEffect : function(fect) {
		this.effects.push(fect);
	},
	hasSpells : function() {
		return (this.spells.length > 0);
	},
	avail : function() {
		this.availableTechniques = this.techniques.filter(tech => tech.isAvailable());
		this.availableSpells = this.spells.filter(spel => spel.isAvailable());
	},
	hpPortion : function() {
		return this.hp / this.maxhp;
	},
	allActions() {
		return this.techniques.concat(this.spells);
	},
	allAvailableActions() {
		this.avail();
		return this.availableTechniques.concat(this.availableSpells);
	},
	chooseAction : function() {
		var act = {};
		var choices = this.allAvailableActions();
		act.skill = randomTerm(choices);
		act.target = randomTerm(battle.membersOfSide(!this.side));
		return act;
	},
	getAttack : function() {
		return this.techniques[0];
	},
	getSpell : function(sp) {
		this.spells.forEach(oj => {
			if (oj instanceof sp && oj.isAvailable())
				return oj;
		});
		return false;
	},
	expYield : function() {
		return this.level * this.level * this.expMult * this.expMult;
	},
	expMult : 1,
	techYield : function() {
		return this.maxhp * this.techMult;
	},
	techMult : 1,
	moneyYield : function() {
		return (this.hp <= 0) * this.maxhp * this.cashMult;
	},
	cashMult : 1,
	itemYield : function() {
		var stuff = [];
		var thisser = this;
		this.dropTable.forEach(function(row) {
			//console.log(row);
			if (row.condition(thisser) && !(row.min > thisser.level) && !(row.max < thisser.level) && Math.random() <= row.chance) {
				stuff.push(new (row.item)());
			}
		});
		return stuff;
	},
	dropTable : [],
	
	
//------------------------------------------------------------------ INTERFACE ----------------------------------------
    
	makeComponents : function(x, y, width = 150, height = 100) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		/*this.selectionButton = new Button(x, y, width, height, "");
		this.nameLabel = new Label(x, y+2, width, 18, this.name, this.description, settings.normal_color);
		this.levelLabel = new Label(x, y+20, width, 14, "Lv "+this.level, "The overall measure of this individual's power.");
		this.hpLabel = new Label(x, y+33, width, 14, this.hp+"/"+this.maxhp, "If this reaches 0, this individual is defeated.");
		this.components = [this.selectionButton, this.nameLabel, this.levelLabel, this.hpLabel];*/
		this.animbaseX = x + width/2;
		this.animbaseY = mainHeight()/2 - 25;
	},
	setPosition : function(x, y) {
		this.x = x;
		this.y = y;
		//this.width = width;
		//this.height = height;
		/*this.selectionButton.x = x; this.selectionButton.y = y;
		this.nameLabel.x = x; this.nameLabel.y = y+2;
		this.levelLabel.x = x; this.levelLabel.y = y+20;
		this.hpLabel.x = x; this.hpLabel.y = y+33;*/
	},
	textX : function() {
		return this.x + this.width/2;
	},
	textY : function() {
		return this.y + this.height/2;
	},
	unClickHover : function() {
		this.clicked = false;
		this.hovered = false;
		/*this.selectionButton.clicked = false; this.selectionButton.hovered = false;
		this.nameLabel.clicked = false; this.nameLabel.hovered = false;
		this.levelLabel.clicked = false; this.levelLabel.hovered = false;
		this.hpLabel.clicked = false; this.hpLabel.hovered = false;*/
	},
	unHover : function() {
		this.hovered = false;
		/*this.components.forEach(function(obj){
			obj.hovered = false;
		});*/
	},
	update : function() {
		/*this.components.forEach(function(obj) {
			obj.update();
		});*/
		this.updateMouse();
		if (this.hovered)
			infoField.setText(this.description);
		//this.selectionButton.update();
		//this.clicked = this.selectionButton.clicked;
		
	},
	draw : function() {
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.font = 18 + "px "+settings.font;
		ctx.fillStyle = this.color;
		ctx.fillText(this.name, this.x+this.width/2, this.y+3);
		ctx.font = 13 + "px "+settings.font;
		ctx.fillText("Lv "+this.level, this.x+this.width/2, this.y+21);
		ctx.fillRect(this.x, this.y+35, this.width*Math.max(this.hpPortion(), 0), 10);
		ctx.lineWidth = 2;
		ctx.strokeStyle = this.clicked ? settings.click_color : this.hovered ? settings.hover_color : this.isActive() ? settings.normal_color : settings.disabled_color;
		ctx.strokeRect(this.x+1, this.y+1, this.width-2, this.height-2);
		/*this.selectionButton.draw();
		this.components.forEach(function(obj) {
			obj.draw();
		});*/
		this.drawField();
		//if (this.image)
			//ctx.drawImage(this.image, this.selectionButton.x + this.selectionButton.width/2 - this.image.width/2, 320 - this.image.height/2);
	},
	drawField : function() {
		if (this.team)
			return;
		var pic;
		if (!this.defeated) {
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
		drawSprite(pic, this.animbaseX + this.animoffX, this.animbaseY + this.animoffY, 1/2, 1/2);
	},
	animoffX : 0,
	animoffY : 0,
	animTime : 0,
	animState : "Normal",
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
Object.setPrototypeOf(Unit, UIObjectBase);