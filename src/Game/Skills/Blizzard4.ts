import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Blizzard4 extends AbstractSkill {
    constructor() {
        super(SkillName.Blizzard4, ResourceType.cd_GCD, Aspect.Ice, true,
            2.5, 800, 310, 1.156);
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
