import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Fire4 extends AbstractSkill {
    constructor() {
        super(SkillName.Fire4, ResourceType.cd_GCD, Aspect.Fire, true,
            2.8, 800, 310, 1.159);
    }

    available(game: GameState): boolean {
        return game.getFireStacks() > 0; // in AF
    }

    use(game: GameState, node: ActionNode): void {
        game.castSpell({
            skillName: this.name,
            onCapture: (cap: SkillCaptureCallbackInfo) => {
            },
            onApplication: (app: SkillApplicationCallbackInfo) => {
            },
            node: node
        });
    }
}
