var PC = {
	team : true,
	recalculateStats : function() {
		this.stats = this.baseStats.slice();
		this.stats[STAT_INDICES.Weapon] = this == player ? 0 : this.level;
		this.stats[STAT_INDICES.Armor] = this == player ? Math.floor(this.level/2) : this.level;
		this.effectiveness = this.baseEffectiveness.slice();
	}
}
Object.setPrototypeOf(PC, Unit);