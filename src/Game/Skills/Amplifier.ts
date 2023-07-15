import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Amplifier extends AbstractSkill {
    constructor() {
        super(SkillName.Amplifier, ResourceType.cd_Amplifier, Aspect.Other, false,
            0, 0, 0, 0);// ? (assumed to be instant)
    }

    available(game: GameState): boolean {
        return game.getIceStacks() > 0 || game.getFireStacks() > 0;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            onCapture: () => {
                game.resources.get(ResourceType.Polyglot).gain(1);
            },
            dealDamage: false,
            node: node
        });
        node.resolveAll(game.time);
    }
}
