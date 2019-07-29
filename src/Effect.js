var Effect = {
	tick : function() {
		this.duration--;
		return (this.duration > 0);
	},
	attempt : function(user, target, dmg) {
		this.apply(user, target, dmg);
	},
	apply : function(user, target, dmg) {
		if (this.target)
			target.applyEffect(this);
		else
			user.applyEffect(this);
	},
	effectOn : function(statName) {
		return 0;
	},
}

/*BattleAction.tryEffect = function(messageList, attacker, defender, dmg) {
	if (!this.hasEffect())
		return;
	var thisser = this;
	var rate = this.hitrate;
	var acc = attacker.getStat(this.effectAccuracyStat);
	var eva = defender.getStat(this.effectEvasionStat);
	var truerate = rate * acc / (rate * acc + (1-rate) * eva);
	
	var hit = (Math.random() < truerate);
	if (Math.random() < truerate || attacker.team == defender.team) {
		this.applyEffect(messageList, attacker, defender, dmg);
	} else {
		//messageList.push(function(){target.dodge(0)});
		messageList.push(new DialogLine("Battle", null, "The effect fails to take hold on "+defender.name+".", MESSAGE_TIME));
	}
}

BattleAction.applyEffect = function(messageList, attacker, defender, dmg) {
	messageList.push(function(){defender.addEffect(new Effect(thisser, thisser.effectStat, thisser.effectAmount, thisser.effectDuration))});
	messageList.push(new DialogLine("Battle", null, defender.name + "'s " + thisser.effectStat + " is changed by " + thisser.effectStat + ".", MESSAGE_TIME));
}

BattleAction.getEffectRate = function(attacker, defender) {
	var rate = this.effectRate;
	var acc = attacker.getStat(this.effectAccuracyStat);
	var eva = defender.getStat(this.effectEvasionStat);
	var truerate = rate * acc / (rate * acc + (1-rate) * eva);
	return truerate;
}*/

SingleBuff = {
	__proto__ : Object.create(Effect),
	target : true,
	effectOn(stat) {
		if (stat == this.stat)
			return this.amount;
		else return 0;
	},
	getDescription : function() {
		return "Buffs "+(this.target?"target":"user")+"'s "+this.stat+" by "+this.amount+" for "+this.duration;
	}
}
SingleNerf = {
	__proto__ : Object.create(Effect),
	target : true,
	effectOn(stat) {
		if (stat == this.stat)
			return -this.amount;
		else return 0;
	},
	getDescription : function() {
		return "Nerfs "+(this.target?"target":"user")+"'s "+this.stat+" by "+this.amount+" for "+this.duration;
	}
}