const MESSAGE_TIME = 30;

var BattleAction = {
	damageInflection : 1.0,
	cooldown : 0,
	defeat : DEFEAT_INDICES.Dead,
	execute : function(user, target) {
		this.addHit(user, target);
		if (this.splash) {
			var periphTarget;
			periphTarget = battle.leftOf(target);
			if (periphTarget != null && periphTarget.isActive()) {
				this.addHit(user, periphTarget, this.splash);
			}
			periphTarget = battle.rightOf(target);
			if (periphTarget != null && periphTarget.isActive()) {
				this.addHit(user, periphTarget, this.splash);
			}
		}
	},
	animate : function(user, target) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = 0; i < 15; i++) {
			let direction = randomDirection();
			let speed = i/5 + 2 * Math.random();
			let shade = 64 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = Math.cos(direction) * speed;
			let dy = Math.sin(direction) * speed;
			engine.particles.push(new Ember(x, y, dx, dy, 3, color, .03));
		}
	},
	addHit : function(attacker, defender, dmgMult = 1.0) {
		var hitrate = (this.getHitrate(attacker, defender));
		var hitroll = Math.random();
		if (hitroll < hitrate || attacker.team == defender.team) {
			if (this.power) {
				var dmg = PRound(this.getDamage(attacker, defender) * dmgMult);
				defender.takeDamage(dmg);
			}
			//messageList.push(new DialogLine("Battle", null, defender.name + " takes " + dmg + " damage.", MESSAGE_TIME));
			if (this.effect)
				this.tryEffects(attacker, defender, dmg);
		} else {
			defender.dodge(dmg);
			//messageList.push(new DialogLine("Battle", null, defender.name + " avoids the attack.", MESSAGE_TIME));
		}
	},
	getHitrate : function(attacker, defender) {
		var rate = this.hitrate;
		var acc = attacker.getStat(this.accuracyStat);
		var eva = defender.getStat(this.evasionStat);
		var truerate = rate * acc / (rate * acc + (1-rate) * eva);
		return truerate;
	},
	getDamage : function(attacker, defender) {
		var pow = this.power;
		var eff = defender.getEffectiveness(this.attribute);
		var atk = attacker.getStat(this.attackStat) + this.usesWeapon*attacker.getStat(STAT_INDICES.Weapon);
		var def = (eff >= 0 ? defender.getStat(this.defenseStat) + this.usesArmor*attacker.getStat(STAT_INDICES.Armor) : defender.getStat(STAT_INDICES.HReduce));
		var inf = this.damageInflection;
		var bon = this.damageBonus(attacker, defender);
		//console.log(pow, eff, atk, def, inf, bon);
		var dmg = pow * eff * Math.pow(atk / def, inf) * bon;
		return dmg;
	},
	damageBonus : function(attacker, defender) {
		return 1.0;
	},
	tryEffects : function(attacker, defender, dmg) {
		var fect = new this.effect(this);
		fect.attempt(attacker, defender, dmg);
	},
	/*hasEffect : function() {
		return (this.effectStat != undefined);
	},*/
	getProperty : function(nom) {
		if (this[nom])
			return this[nom]
	},
	isAvailable : function() {
		return !(this.cooldown > 0);
	},
	cooldownPortion : function() {
		return 1-(this.cooldown/this.maxCooldown);
	},
	expend : function() {
		this.cooldown = this.maxCooldown;
	},
	tick : function(user) {
		if (this.cooldown > 0) {
			this.cooldown = Math.max(0, this.cooldown - user.getStat(this.cooldownStat));
		}
	},
}

/*class BattleActionC {
	execute (user, target) {
		this.addHit(user, target);
		if (this.splash) {
			var periphTarget;
			periphTarget = battle.leftOf(target);
			if (periphTarget != null) {
				if (periphTarget.alive) {
					this.addHit(user, periphTarget, this.splash);
				}
			}
			periphTarget = battle.rightOf(target);
			if (periphTarget != null) {
				if (periphTarget.alive) {
					this.addHit(user, periphTarget, this.splash);
				}
			}
		}
	}
	animate (user, target) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = 0; i < 15; i++) {
			let direction = randomDirection();
			let speed = i/5 + 2 * Math.random();
			let shade = 64 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = Math.cos(direction) * speed;
			let dy = Math.sin(direction) * speed;
			engine.particles.push(new Ember(x, y, dx, dy, 3, color, .03));
		}
	}
	addHit (attacker, defender, dmgMult = 1.0) {
		var hitrate = (this.getHitrate(attacker, defender));
		var hitroll = Math.random();
		if (hitroll < hitrate || attacker.team == defender.team) {
			if (this.power) {
				var dmg = PRound(this.getDamage(attacker, defender) * dmgMult);
				defender.takeDamage(dmg);
			}
			//messageList.push(new DialogLine("Battle", null, defender.name + " takes " + dmg + " damage.", MESSAGE_TIME));
			if (this.effect)
				this.tryEffects(attacker, defender, dmg);
		} else {
			defender.dodge(dmg);
			//messageList.push(new DialogLine("Battle", null, defender.name + " avoids the attack.", MESSAGE_TIME));
		}
	}
	getHitrate (attacker, defender) {
		var rate = this.hitrate;
		var acc = attacker.getStat(this.accuracyStat);
		var eva = defender.getStat(this.evasionStat);
		var truerate = rate * acc / (rate * acc + (1-rate) * eva);
		return truerate;
	}
	getDamage (attacker, defender) {
		var pow = this.power;
		var eff = defender.getEffectiveness(this.attribute);
		var atk = attacker.getStat(this.attackStat) + this.usesWeapon*attacker.getStat("Weapon");
		var def = (eff >= 1 ? defender.getStat(this.defenseStat) : defender.level) + this.usesArmor*attacker.getStat("Armor");
		var inf = this.damageInflection;
		var bon = this.damageBonus(attacker, defender);
		var dmg = pow * eff * Math.pow(atk / def, inf) * bon;
		return dmg;
	}
	damageBonus (attacker, defender) {
		return 1.0;
	}
	tryEffects (attacker, defender, dmg) {
		var fect = new this.effect(this);
		fect.attempt(attacker, defender, dmg);
	}
	hasEffect : function() {
		return (this.effectStat != undefined);
	}
	getProperty (nom) {
		if (this[nom])
			return this[nom]
	}
}*/
/*
function addHit(messageList, attacker, defender, skill, dmgMult = 1.0) {
	var hitrate = (skill.getHitrate(user, target));
	var dmg = PRound(skill.getDamage(user, target));
	var hit = (Math.random() < hitrate);
	if (dmg < 0) {
		messageList.push(function(){defender.heal(-dmg)});
		messageList.push(new DialogLine("Battle", null, defender.name + " heals " + -dmg + " damage.", MESSAGE_TIME));
		this.tryEffect(messageList, attacker, defender, dmg);
	} else if (hit) {
		messageList.push(function(){defender.takeDamage(dmg)});
		messageList.push(new DialogLine("Battle", null, defender.name + " takes " + dmg + " damage.", MESSAGE_TIME));
		if (defender.hp <= 0+dmg) {
			messageList.push(function(){defender.die("Dead");});
			messageList.push(new DialogLine("Battle", null, defender.name+" is killed.", MESSAGE_TIME));
		} else {
			this.tryEffect(messageList, attacker, defender, dmg);
		}
	} else {
		messageList.push(function(){defender.dodge(dmg)});
		messageList.push(new DialogLine("Battle", null, defender.name + " avoids the attack.", MESSAGE_TIME));
	}
}
*/

/*function executeSplashAttack(user, target) {
	//messageList = [new DialogLine("Battle", null, user.name+(this.isSpell?" casts ":" uses ")+this.name+".", MESSAGE_TIME+5)];
	if (this.isSpell)
		user.expendSpell(this);
	this.addHit(user, target);
	var periphTarget;
	periphTarget = battle.leftOf(target);
	if (periphTarget != null) {
		if (periphTarget.alive) {
			this.addHit(user, periphTarget, this.splash);
		}
	}
	periphTarget = battle.rightOf(target);
	if (periphTarget != null) {
		if (periphTarget.alive) {
			this.addHit(user, periphTarget, this.splash);
		}
	}
}*/

function executeLineAttack(user, target) {
	var thisser = this;
	//messageList = [new DialogLine("Battle", null, user.name+(this.isSpell?" casts ":" uses ")+this.name+".", MESSAGE_TIME+5)];
	if (this.isSpell)
		user.expendSpell(this);
	battle.membersOfSide(target.team).forEach(function(targeter) {
		thisser.addHit(user, targeter);
	});
}

function executeBuff(user, target) {
	var thisser = this;
	//messageList = [new DialogLine("Battle", null, user.name+(this.isSpell?" casts ":" uses ")+this.name+".", MESSAGE_TIME+5)];
	if (this.isSpell)
		user.expendSpell(this);
	this.tryEffect(user, target);
	//return messageList;
}

function executeMassBuff(user, target) {
	var thisser = this;
	//messageList = [new DialogLine("Battle", null, user.name+(this.isSpell?" casts ":" uses ")+this.name+".", MESSAGE_TIME+5)];
	if (this.isSpell)
		user.expendSpell(this);
	battle.membersOfSide(target.team).forEach(function(freal) {
		thisser.tryEffect(user, freal);
	});
	//return messageList;
}