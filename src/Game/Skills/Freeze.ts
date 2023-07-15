import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Freeze extends AbstractSkill {
    constructor() {
        super(SkillName.Freeze, ResourceType.cd_GCD, Aspect.Ice, true,
            2.8, 1000, 120, 0.664);
    }

    available(game: GameState): boolean {
        return game.getIceStacks() > 0; // in UI
    }

    use(game: GameState, node: ActionNode): void {
        game.castSpell({
            skillName: this.name,
            onCapture: (cap: SkillCaptureCallbackInfo) => {
                game.resources.get(ResourceType.UmbralHeart).gain(3);
            },
            onApplication: (app: SkillApplicationCallbackInfo) => {
            },
            node: node
        });
    }
}
