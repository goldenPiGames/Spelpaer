const MESSAGE_TIME = 30;

class BattleAction {
	constructor() {
		
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
		var atk = attacker.getStat(this.attackStat) + this.usesWeapon*attacker.getStat(STAT_INDICES.Weapon);
		var def = (eff >= 0 ? defender.getStat(this.defenseStat) + this.usesArmor*attacker.getStat(STAT_INDICES.Armor) : defender.getStat(STAT_INDICES.HReduce));
		var inf = this.damageInflection;
		var bon = this.getConditionalMult(attacker, defender);
		//console.log(pow, eff, atk, def, inf, bon);
		var dmg = pow * eff * Math.pow(atk / def, inf) * bon;
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