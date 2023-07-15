import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class HighBlizzard2 extends AbstractSkill {
    constructor() {
        super(SkillName.HighBlizzard2, ResourceType.cd_GCD, Aspect.Ice, true,
            3, 800, 140, 1.158);
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
