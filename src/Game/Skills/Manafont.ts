import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Manafont extends AbstractSkill {
    constructor() {
        super(SkillName.Manafont, ResourceType.cd_Manafont, Aspect.Other, false,
            0, 0, 0, 0.88);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            onApplication: () => {
                game.resources.get(ResourceType.Mana).gain(3000);
                node.resolveAll(game.time);
            },
            dealDamage: false,
            node: node
        });
    }
}
