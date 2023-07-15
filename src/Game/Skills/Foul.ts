import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Foul extends AbstractSkill {
    constructor() {
        super(SkillName.Foul, ResourceType.cd_GCD, Aspect.Other, true,
            0, 0, 600, 1.158);
    }

    available(game: GameState): boolean {
        return game.resources.get(ResourceType.Polyglot).available(1);
    }

    use(game: GameState, node: ActionNode): void {
        game.resources.get(ResourceType.Polyglot).consume(1);
        game.useInstantSkill({
            skillName: SkillName.Foul,
            dealDamage: true,
            node: node
        });
    }
}
