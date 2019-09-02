class Unit extends UIObject {
//------------------------------------------------------------------ CRUNCH --------------------------------------------
	constructor(level) {
		super(); //I'm still not sure whether or not Unit should extend UIObject
		this.level = level;
		this.stats = statsFromMults(this.statMults, this.level);
		this.maxhp = Math.floor(this.hpMult * this.stats[STAT_INDICES.Vitality]);
		this.hp = this.maxhp;
		this.techniques = [];
		this.techniqueTable.forEach(row => {
			if (typeof row == "function") {
				this.techniques.push(new row(this.level));
			} else {
				if ((!row.minLevel || this.level >= row.minLevel) && (!row.maxLevel || this.level <= row.maxLevel))
					this.techniques.push(new (row.technique)(Math.floor(this.level * (row.levelMult || 1.0))));
			}
		});
		this.spells = [];
		this.spellTable.forEach(row => {
			if (typeof row == "function") {
				if (this.level >= row.prototype.level)
					this.spells.push(new row());
			} else {
				if (this.level >= (row.minLevel || row.spell.prototype.level) && (!row.maxLevel || this.level <= row.maxLevel))
					this.spells.push(new (row.spell)());
			}
		});
		this.emptyEffects();
		this.color = settings.normal_color;
	}
	battleTick() {
		if (!this.defeated) {
			this.delay = Math.max(this.delay-1, 0)//PRound(battleSpeed * this.getStat("speed"), tickSeed);
		}
		this.effects = this.effects.filter(fmega => fmega.tick(this));
		this.allActions().forEach(quiche => quiche.tick(this));
	}
	fieldTick(length) {
		this.spells.forEach(quiche => quiche.fieldTick(this, length))
	}
	getStat(statIndex) {
		var base = this.stats[statIndex];
		var buff = 0;
		var nerf = 0;
		this.effects.forEach(oof => {
			var ton = oof.effectOnStat(statIndex, this);
			if (ton) {
				if (ton > buff)
					buff = ton;
				if (ton < nerf)
					nerf = ton;
			}
		});
		return Math.max(base, 1) * (base+buff) / Math.max((base-nerf), 1);
	}
	getEffectiveness(index) {
		//if (this.effectiveness[index] == undefined)
			//return 1.0;
		return this.effectiveness[index];
	}
	isReady() {
		return this.delay <= 0;
	}
	takeDamage(amount, source, attacker) {
		if (amount < 0) {
			return this.heal(-amount);
		}
		this.hp -= amount;
		//this.hpLabel.text = this.hp + "/" + this.maxhp;
		this.lastHitBy = attacker;
		particles.push(new ParticleText("-"+amount, this.textX(), this.textY(), 0, .3, 40, "#FF4040", settings.normal_color, .05));
		this.animHurt(amount);
		if (this.hp <= 0)
			this.die(source);
	}
	heal(amount, source) {
		if (amount < 0) {
			return this.takeDamage(-amount);
		}
		this.hp += amount;
		if (this.hp > this.maxhp) {
			this.hp = this.maxhp;
		}
		//this.hpLabel.text = this.hp + "/" + this.maxhp;
		particles.push(new ParticleText("+"+amount, this.textX(), this.textY(), 0, .3, 40, "#00DD00", settings.normal_color, .05))
	}
	dodge(amount) {
		particles.push(new ParticleText("MISS", this.textX(), this.textY(), 0, .3, 40, "#4040FF", settings.normal_color, .05))
		this.animDodge();
	}
	die(ar) {
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
	}
	flee() {
		this.die(DEFEAT_INDICES.Fled);
	}
	isActive() {
		return !this.defeated;
	}
	emptyEffects() {
		this.effects = [];
		this.ailments = {
			Stun : 0,
		};
	}
	addEffect(fect) {
		this.effects.push(fect);
	}
	hasSpells() {
		return (this.spells.length > 0);
	}
	avail() {
		this.availableTechniques = this.techniques.filter(tech => tech.isAvailable());
		this.availableSpells = this.spells.filter(spel => spel.isAvailable());
	}
	hpPortion() {
		return this.hp / this.maxhp;
	}
	allActions() {
		return this.techniques.concat(this.spells);
	}
	allAvailableActions() {
		this.avail();
		return this.availableTechniques.concat(this.availableSpells);
	}
	/*chooseAction() {
		var act = {};
		var choices = this.allAvailableActions();
		act.skill = randomTerm(choices);
		act.target = randomTerm(battle.membersOfSide(!this.side));
		return act;
	}*/
	pickRandomEnemy() {
		return randomTerm(battle.membersOfSide(!this.side, true));
	}
	pickEnemy(crit) {
		return maxTerm(battle.membersOfSide(!this.side, true), crit);
	}
	getAttack() {
		return this.techniques[0];
	}
	findTechnique(tech) {
		this.foundAction = this.techniques.find(oj => oj instanceof tech && oj.isAvailable());
		return this.foundAction;
	}
	findSpell(sp) {
		this.foundAction = this.spells.find(oj => oj instanceof sp && oj.isAvailable());
		return this.foundAction;
	}
	findEffect(f) {
		return this.effects.find(oj => oj instanceof f);
	}
	expYield() {
		return this.level * this.level * this.hpMult * this.expMult;
	}
	techYield() {
		return this.maxhp * this.techMult;
	}
	moneyYield() {
		return (this.hp <= 0) * this.maxhp * this.cashMult;
	}
	itemYield() {
		var stuff = [];
		this.dropTable.forEach(row => {
			if (row.condition(this) && !(row.minLevel > this.level) && !(row.maxLevel < this.level) && Math.random() <= row.chance) {
				stuff.push(new (row.item)());
			}
		});
		return stuff;
	}
	
//------------------------------------------------------------------ INTERFACE ----------------------------------------
    
	setDisplay(x, y, width = 150, height = 100, listener = undefined) {
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
		if (listener)
			this.setListener(listener)
		else
			this.handler = doNothing;
	}
	setPosition(x, y) {
		this.x = x;
		this.y = y;
		//this.width = width;
		//this.height = height;
		/*this.selectionButton.x = x; this.selectionButton.y = y;
		this.nameLabel.x = x; this.nameLabel.y = y+2;
		this.levelLabel.x = x; this.levelLabel.y = y+20;
		this.hpLabel.x = x; this.hpLabel.y = y+33;*/
	}
	textX() {
		return this.x + this.width/2;
	}
	textY() {
		return this.y + this.height/2;
	}
	unClickHover() {
		this.clicked = false;
		this.hovered = false;
		/*this.selectionButton.clicked = false; this.selectionButton.hovered = false;
		this.nameLabel.clicked = false; this.nameLabel.hovered = false;
		this.levelLabel.clicked = false; this.levelLabel.hovered = false;
		this.hpLabel.clicked = false; this.hpLabel.hovered = false;*/
	}
	unHover() {
		this.hovered = false;
		/*this.components.forEach(function(obj){
			obj.hovered = false;
		});*/
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			infoField.setText(this.description);
		if (this.clicked)
			this.handler();
	}
	setListener(listener) {
		//console.log(listener);
		this.handler = ()=>listener.unitClicked(this);
	}
	draw() {
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.font = 18 + "px "+settings.font;
		ctx.fillStyle = this.color;
		ctx.fillText(this.name, this.x+this.width/2, this.y+3);
		ctx.font = 13 + "px "+settings.font;
		ctx.fillText("Lv "+this.level, this.x+this.width/2, this.y+21);
		this.drawHPBar(this.x, this.y+35, this.width, 10);
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
	}
	drawHPBar(x, y, width, height) {
		ctx.fillStyle = this.color;
		ctx.fillRect(x, y, width * Math.max(this.hpPortion(), 0), height);
	}
	drawField() {
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
	}
	animDodge() {
		if (this.sprites && this.sprites.Dodge) {
			this.animState = "Dodge";
			this.animTime = 10;
		} else
			this.animoffX = 10;
	}
	animHurt(amount) {
		if (this.sprites && this.sprites.Hurt) {
			this.animState = "Hurt";
			this.animTime = 5;
		} else
			this.animoffY = -5;
	}
	animSkill(skill) {
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
	}
}
Unit.prototype.defeated = 0;
Unit.prototype.team = false;
Unit.prototype.techniqueTable = [
	{technique:BasicAttack},
]
Unit.prototype.spellTable = [];
Unit.prototype.expMult = 1;
Unit.prototype.techMult = 1;
Unit.prototype.cashMult = 1;
Unit.prototype.dropTable = [];
Unit.prototype.animoffX = 0;
Unit.prototype.animoffY = 0;
Unit.prototype.animTime = 0;
Unit.prototype.animState = "Normal";
Unit.prototype.waterbreathing = 0;