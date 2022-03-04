export class GameConfig
{
	constructor()
	{
		this.casterTax = 0.06;
		this.slideCastDuration = 0.4;
		this.animationLock = 0.7;
		this.gcd = 2.5;
		this.longCastTime = 3.5;
		this.freezeCastTime = 2.8;

		this.timeTillFirstManaTick = 0.3;

		//==== DEBUG ====
		this.epsilon = 0.00001;
		this.disableManaAndThunderTicks = 0;
	}
}

export const Aspect = 
{
	Fire: "Fire",
	Ice: "Ice",
	Other: "Other"
};

export const SkillName = 
{
    Blizzard: "Blizzard",
    Fire: "Fire",
	Transpose: "Transpose",
	Thunder3: "Thunder 3",
	Manaward: "Manaward",
	Manafont: "Manafont",
	LeyLines: "Ley Lines",
	Fire3: "Fire 3",
	Blizzard3: "Blizzard 3",
	Freeze: "Freeze",

	Template: "(template)"
};

export const ResourceType =
{
	// hard resources
	Mana: "Mana", // [0, 10000]
	Polyglot: "Polyglot", // [0, 2]
	AstralFire: "AstralFire", // [0, 3]
	UmbralIce: "UmbralIce", // [0, 3]
	UmbralHeart: "UmbralHeart", // [0, 3]

	// binaries (buffs & states)
	LeyLines: "LeyLines", // [0, 1]
	Enochian: "Enochian", // [0, 1]
	Paradox: "Paradox", // [0, 1]
	Firestarter: "Firestarter", // [0, 1]
	Thundercloud: "Thundercloud", // [0, 1]
	ThunderDoT: "ThunderDoT", // [0, 1]
	Manaward: "Manaward", // [0, 1]

	Movement: "Movement", // [0, 1]
	NotAnimationLocked: "NotAnimationLocked", // [0, 1]
	// oGCDs
	cd_GCD: "cd_GCD", // [0, Constant.gcd]
	cd_Transpose: "cd_Transpose", // [0, 1x]
	cd_Sharpcast: "cd_Sharpcast", // [0, 2x] // TODO: figure out how this works
	cd_LeyLines: "cd_LeyLines", // [0, 1x]
	cd_Manaward: "cd_Manaward", // [0, 1x]
	cd_TripleCast: "cd_TripleCast", // [0, 2x]
	cd_Manafont: "cd_Manafont", // [0, 1x]
	cd_Amplifier: "cd_Amplifier" // [0, 1x]
};