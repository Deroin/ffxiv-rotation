import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {FireSkill} from "./FireSkill";

export class Fire extends FireSkill {
    constructor() {
        super(SkillName.Fire, ResourceType.cd_GCD, Aspect.Fire, true,
            2.5, 800, 180, 1.871);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        if (game.getIceStacks() === 0) { // in fire or no enochian
            game.castSpell({
                skillName: this.name,
                onCapture: (cap: SkillCaptureCallbackInfo) => {
                    game.resources.get(ResourceType.AstralFire).gain(1);
                    game.startOrRefreshEnochian();
                    this.potentiallyGainFirestarter(game);
                },
                onApplication: (app: SkillApplicationCallbackInfo) => {
                },
                node: node
            });
        } else {
            game.castSpell({
                skillName: this.name,
                onCapture: (cap: SkillCaptureCallbackInfo) => {
                    game.resources.get(ResourceType.Enochian).removeTimer();
                    game.loseEnochian();
                    this.potentiallyGainFirestarter(game);
                },
                onApplication: (app: SkillApplicationCallbackInfo) => {
                },
                node: node
            });
        }
    }
}
