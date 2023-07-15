import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class HighFire2 extends AbstractSkill {
    constructor() {
        super(SkillName.HighFire2, ResourceType.cd_GCD, Aspect.Fire, true,
            3, 1500, 140, 1.154);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        game.castSpell({
            skillName: this.name,
            onCapture: (cap: SkillCaptureCallbackInfo) => {
                game.switchToAForUI(ResourceType.AstralFire, 3);
                game.startOrRefreshEnochian();
            },
            onApplication: (app: SkillApplicationCallbackInfo) => {
            },
            node: node
        });
    }
}
