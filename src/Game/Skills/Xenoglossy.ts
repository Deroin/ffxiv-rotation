import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Xenoglossy extends AbstractSkill {
    constructor() {
        super(SkillName.Xenoglossy, ResourceType.cd_GCD, Aspect.Other, true,
            0, 0, 880, 0.63);
    }

    available(game: GameState): boolean {
        return game.resources.get(ResourceType.Polyglot).available(1);
    }

    use(game: GameState, node: ActionNode): void {
        game.resources.get(ResourceType.Polyglot).consume(1);
        game.useInstantSkill({
            skillName: this.name,
            dealDamage: true,
            node: node
        });
    }
}
