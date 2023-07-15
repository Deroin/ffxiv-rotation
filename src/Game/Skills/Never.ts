import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Never extends AbstractSkill {
    constructor() {
        super(SkillName.Never, ResourceType.Never, Aspect.Other, false, 0, 0, 0, 0);
    }

    available(game: GameState): boolean {
        return false;
    }

    use(game: GameState, node: ActionNode): void {
    }
}
