import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class AetherialManipulation extends AbstractSkill {
    constructor() {
        super(SkillName.AetherialManipulation, ResourceType.cd_AetherialManipulation, Aspect.Other, false,
            0, 0, 0, 0);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            dealDamage: false,
            onCapture: () => {
                node.resolveAll(game.time)
            },
            node: node
        });
    }
}
