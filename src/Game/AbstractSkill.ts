import {Aspect, ResourceType, SkillName} from "./Common";
import {GameState} from "./GameState";
import {ActionNode} from "../Controller/Record";
import {SkillInfo} from "./Skills";

export abstract class AbstractSkill {
    readonly name: SkillName;

    abstract available(game: GameState): boolean;

    abstract use(game: GameState, node: ActionNode): void;

    info: SkillInfo;

    protected constructor(
        name: SkillName,
        resourceType: ResourceType,
        aspect: Aspect,
        isSpell: boolean,
        baseCastTime: number,
        baseManaCost: number,
        basePotency: number,
        skillApplicationDelay: number
    ) {
        this.name = name;
        this.info = new SkillInfo(name, resourceType, aspect, isSpell, baseCastTime, baseManaCost, basePotency, skillApplicationDelay);
    }
}
