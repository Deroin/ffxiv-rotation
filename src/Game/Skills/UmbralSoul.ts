import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class UmbralSoul extends AbstractSkill {
    constructor() {
        super(SkillName.UmbralSoul, ResourceType.cd_GCD, Aspect.Ice, true,
            0, 0, 0, 0);// ? (assumed to be instant)
    }

    available(game: GameState): boolean {
        return game.getIceStacks() > 0;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: SkillName.UmbralSoul,
            onCapture: () => {
                game.resources.get(ResourceType.UmbralIce).gain(1);
                game.resources.get(ResourceType.UmbralHeart).gain(1);
                game.startOrRefreshEnochian();
                node.resolveAll(game.time);
            },
            dealDamage: false,
            node: node
        });
    }
}
