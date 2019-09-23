const MESSAGE_TIME = 30;

class BattleAction {
	constructor() {
		
	}
	getDescription(user) {
		var desc = this.name + " : level " + this.level;
		if (this instanceof Spell)
			desc += ", costs " + this.cost;
		desc += " <br> Delay: " + this.delay;
		if (this.maxCooldown == Infinity)
			desc += "; Ticket";
		else if (this.maxCooldown)
			desc += "; Cooldown: " + this.maxCooldown + " / " + STAT_ABBS[this.cooldownStat] + " (~" + this.estimateMaxCooldownTime(user) + ")";
		else
			desc += "; Cooldown: None";
		if (this.power)
			desc += " <br> Power: " + this.power + " " + (this.attribute == WEAPON_ATTRIBUTE ? (user ? user.weaponAttribute : "weapon's") : ATTRIBUTE_NAMES[this.attribute]) + "; " + STAT_ABBS[this.attackStat] + (this.attackStat2 ? " & " + STAT_ABBS[this.attackStat2] : "") + " vs. " + 
				STAT_ABBS[this.defenseStat] + (this.defenseStat2 ? " & " + STAT_ABBS[this.defenseStat2] : "") + (this.damageInflection != 1.0 ? " DI " + this.damageInflection : "");
		if (this.hitrate) {
			desc += " <br> Hitrate: " + asPercent(this.hitrate, 0);
			if (this.hitrate < 1.0)
				desc += " " + STAT_ABBS[this.accuracyStat] + " vs " + STAT_ABBS[this.evasionStat];
		}
		if (this.effect) {
			var fect = new this.effect(this);
			desc += " <br> Effect: " + fect.getDescription();
		}
		desc += " <br> " + this.flavor;
		return desc;
	}
	estimateMaxCooldownTime(user) {
		var divisor;
		if (user) {
			divisor = user.stats[this.cooldownStat];
		} else if (player.stats) {
			divisor = player.stats[this.cooldownStat];
		} else if (player.level) {
			divisor = player.level;
		} else {
			divisor = this.level;
		}
		var time = this.maxCooldown / divisor;
		return getShortDuration(time);
	}
	getCDDesc(user) {
		var cd = Math.ceil(this.cooldown / user.stats[this.cooldownStat]);
		if (this.isAvailable())
			return "";
		else if (cd >= Infinity)
			return "-";
		else
			return getShortDuration(cd);
	}
	execute(user, target) {
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
	}
	animate(user, target) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = 0; i < 15; i++) {
			let direction = randomDirection();
			let speed = i/5 + 2 * Math.random();
			let shade = 64 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = Math.cos(direction) * speed;
			let dy = Math.sin(direction) * speed;
			particles.push(new Ember(x, y, dx, dy, 3, color, .03));
		}
	}
	addHit(attacker, defender, dmgMult = 1.0) {
		var hitrate = (this.getHitrate(attacker, defender));
		var hitroll = Math.random();
		if (hitroll < hitrate || attacker.team == defender.team) {
			if (this.power) {
				var dmg = PRound(this.getDamage(attacker, defender) * dmgMult);
				battle.log(dmg + " damage to " + defender.name);
				defender.takeDamage(dmg, this, attacker);
			}
			//messageList.push(new DialogLine("Battle", null, defender.name + " takes " + dmg + " damage.", MESSAGE_TIME));
			if (this.effect)
				this.tryEffects(attacker, defender, dmg);
		} else {
			battle.log("Miss");
			defender.dodge(dmg);
			//messageList.push(new DialogLine("Battle", null, defender.name + " avoids the attack.", MESSAGE_TIME));
		}
	}
	getHitrate(attacker, defender) {
		var rate = this.hitrate;
		var acc = attacker.getStat(this.accuracyStat);
		var eva = defender.getStat(this.evasionStat);
		var truerate = rate * acc / (rate * acc + (1-rate) * eva);
		return truerate;
	}
	getDamage(attacker, defender) {
		var pow = this.power;
		var eff = defender.getEffectiveness(this.attribute == WEAPON_ATTRIBUTE ? attacker.weaponAttribute : this.attribute);
		var atk = attacker.getStat(this.attackStat);
		if (typeof this.attackStat2 == "number" && this.attackStat2 >= 0)
			atk = (atk + attacker.getStat(this.attackStat2)) / 2;
		var def = defender.getStat(this.defenseStat);
		if (eff < 0)
			def = defender.getStat(STAT_INDICES.HReduce);
		else if (typeof this.defenseStat2 == "number" && this.defenseStat2 >= 0)
			def = (def + defender.getStat(this.defenseStat2)) / 2;
		var inf = this.damageInflection;
		var bon = this.getConditionalMult(attacker, defender);
		//console.log(pow, eff, atk, def, inf, bon);
		var dmg = pow * eff * Math.pow(atk / def, inf) * bon;
		if (dmg != dmg) {
			throw "Returned NaN for damage. Params: pow="+pow+", eff="+eff+", atk="+atk+", def="+def+", inf="+inf+", bon="+bon+".";
		}
		return dmg;
	}
	getConditionalMult(attacker, defender) {
		return 1.0;
	}
	tryEffects(attacker, defender, dmg) {
		var fect = new this.effect(this);
		fect.attempt(attacker, defender, dmg);
	}
	isAvailable() {
		return !(this.cooldown > 0);
	}
	cooldownPortion() {
		return 1-(this.cooldown/this.maxCooldown);
	}
	expend() {
		this.cooldown = this.maxCooldown;
	}
	tick(user) {
		this.reduceCooldown(user.getStat(this.cooldownStat));
	}
	fieldTick(user, length) {
		this.reduceCooldown(user.getStat(this.cooldownStat) * length);
	}
	reduceCooldown(amount) {
		if (this.cooldown > 0 && this.cooldown < Infinity)
			this.cooldown = Math.max(0, this.cooldown - amount);
	}
}
BattleAction.prototype.damageInflection = 1.0;
BattleAction.prototype.cooldown = 0;
BattleAction.prototype.defeat = DEFEAT_INDICES.Dead;

class Wait extends BattleAction {
	constructor(duration) {
		super();
		this.delay = duration || 1;
		this.name = "Wait " + duration;
	}
	isAvailable() {
		return true;
	}
	execute() {
		
	}
}
Wait.prototype.name = "Wait";
Wait.prototype.selfOnly = true;
Wait.prototype.delay = 1;
Wait.prototype.maxCooldown = 0;