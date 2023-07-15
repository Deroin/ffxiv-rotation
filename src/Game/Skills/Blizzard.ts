import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {Aspect, ResourceType, SkillName} from "../Common";
import {GameState} from "../GameState";
import {ActionNode} from "../../Controller/Record";
import {AbstractSkill} from "../AbstractSkill";

export class Blizzard extends AbstractSkill {

    constructor() {
        super(SkillName.Blizzard, ResourceType.cd_GCD, Aspect.Ice, true, 2.5, 400, 180, 0.846);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        if (game.getFireStacks() === 0) {// no AF
            game.castSpell({
                skillName: this.name,
                onCapture: (cap: SkillCaptureCallbackInfo) => {
                    game.resources.get(ResourceType.UmbralIce).gain(1);
                    game.startOrRefreshEnochian();
                },
                onApplication: (app: SkillApplicationCallbackInfo) => {
                },
                node: node
            });
        } else {// in AF
            game.castSpell({
                skillName: this.name,
                onCapture: (cap: SkillCaptureCallbackInfo) => {
                    game.resources.get(ResourceType.Enochian).removeTimer();
                    game.loseEnochian();
                },
                onApplication: (app: SkillApplicationCallbackInfo) => {
                },
                node: node
            });
        }
    }
}
