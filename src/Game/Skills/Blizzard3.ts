import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {Aspect, ResourceType, SkillName} from "../Common";
import {GameState} from "../GameState";
import {ActionNode} from "../../Controller/Record";
import {AbstractSkill} from "../AbstractSkill";

export class Blizzard3 extends AbstractSkill {

    constructor() {
        super(SkillName.Blizzard3, ResourceType.cd_GCD, Aspect.Ice, true,
            3.5, 800, 260, 0.89);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        game.castSpell({
            skillName: this.name,
            onCapture: (cap: SkillCaptureCallbackInfo) => {
                game.switchToAForUI(ResourceType.UmbralIce, 3);
                game.startOrRefreshEnochian();
            },
            onApplication: (app: SkillApplicationCallbackInfo) => {
            },
            node: node
        });
    }
}
