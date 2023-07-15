import {Aspect, ResourceType, SkillName} from './Common'
import {Blizzard} from "./Skills/Blizzard";
import {LeyLines} from "./Skills/LeyLines";
import {Addle} from "./Skills/Addle";
import {Manaward} from "./Skills/Manaward";
import {Sharpcast} from "./Skills/Sharpcast";
import {Surecast} from "./Skills/Surecast";
import {Sprint} from "./Skills/Sprint";
import {Tincture} from "./Skills/Tincture";
import {Swiftcast} from "./Skills/Swiftcast";
import {Fire} from "./Skills/Fire";
import {Transpose} from "./Skills/Transpose";
import {AetherialManipulation} from "./Skills/AetherialManipulation";
import {Amplifier} from "./Skills/Amplifier";
import {BetweenTheLines} from "./Skills/BetweenTheLines";
import {Blizzard3} from "./Skills/Blizzard3";
import {Blizzard4} from "./Skills/Blizzard4";
import {Despair} from "./Skills/Despair";
import {HighFire2} from "./Skills/HighFire2";
import {Fire3} from "./Skills/Fire3";
import {Fire4} from "./Skills/Fire4";
import {Flare} from "./Skills/Flare";
import {Foul} from "./Skills/Foul";
import {HighBlizzard2} from "./Skills/HighBlizzard2";
import {LucidDreaming} from "./Skills/LucidDreaming";
import {Manafont} from "./Skills/Manafont";
import {Paradox} from "./Skills/Paradox";
import {Thunder3} from "./Skills/Thunder3";
import {Triplecast} from "./Skills/Triplecast";
import {UmbralSoul} from "./Skills/UmbralSoul";
import {Never} from "./Skills/Never";
import {AbstractSkill} from "./AbstractSkill";
import {Freeze} from "./Skills/Freeze";
import {Xenoglossy} from "./Skills/Xenoglossy";

export interface SkillCaptureCallbackInfo {
    capturedManaCost: number
}

export interface SkillApplicationCallbackInfo {

}

export class SkillInfo {
    readonly name: SkillName;
    readonly cdName: ResourceType;
    readonly aspect: Aspect;
    readonly isSpell: boolean;
    readonly baseCastTime: number;
    readonly baseManaCost: number;
    readonly basePotency: number;
    readonly skillApplicationDelay: number;

    constructor(
        skillName: SkillName,
        cdName: ResourceType,
        aspect: Aspect,
        isSpell: boolean,
        baseCastTime: number,
        baseManaCost: number,
        basePotency: number,
        skillApplicationDelay: number = 0
    ) {
        this.name = skillName;
        this.cdName = cdName;
        this.aspect = aspect;
        this.isSpell = isSpell;
        this.baseCastTime = baseCastTime;
        this.baseManaCost = baseManaCost;
        this.basePotency = basePotency;
        this.skillApplicationDelay = skillApplicationDelay;
    }
}

// ref logs
// https://www.fflogs.com/reports/KVgxmW9fC26qhNGt#fight=16&type=summary&view=events&source=6
// https://www.fflogs.com/reports/rK87bvMFN2R3Hqpy#fight=1&type=casts&source=7
export class SkillsList extends Map<SkillName, AbstractSkill> {
    constructor() {
        super();

        let skillsList = this;

        let addSkill = function (skill: AbstractSkill) {
            skillsList.set(skill.name, skill);
        }

        addSkill(new Addle());
        addSkill(new AetherialManipulation());
        addSkill(new Amplifier());
        addSkill(new BetweenTheLines());
        addSkill(new Blizzard());
        addSkill(new Blizzard3());
        addSkill(new Blizzard4());
        addSkill(new Despair());
        addSkill(new Fire());
        addSkill(new Fire3());
        addSkill(new Fire4());
        addSkill(new Flare());
        addSkill(new Foul());
        addSkill(new Freeze());
        addSkill(new HighBlizzard2());
        addSkill(new HighFire2());
        addSkill(new LeyLines());
        addSkill(new LucidDreaming());
        addSkill(new Manafont());
        addSkill(new Manaward());
        addSkill(new Paradox());
        addSkill(new Sharpcast());
        addSkill(new Sprint());
        addSkill(new Surecast());
        addSkill(new Swiftcast());
        addSkill(new Thunder3());
        addSkill(new Tincture());
        addSkill(new Transpose());
        addSkill(new Triplecast());
        addSkill(new UmbralSoul());
        addSkill(new Xenoglossy());

        return skillsList;
    }

    get(key: SkillName): AbstractSkill {
        let skill = super.get(key);
        if (skill) {
            return skill;
        } else {
            console.assert(false);
            return new Never();
        }
    }
}
