import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {FireSkill} from "./FireSkill";

export class Fire3 extends FireSkill {
    constructor() {
        super(SkillName.Fire3, ResourceType.cd_GCD, Aspect.Fire, true,
            3.5, 2000, 260, 1.292);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        if (game.resources.get(ResourceType.Firestarter).available(1)) {
            game.useInstantSkill({
                skillName: this.name,
                dealDamage: true,
                node: node
            });
            game.switchToAForUI(ResourceType.AstralFire, 3);
            game.startOrRefreshEnochian();
            game.resources.get(ResourceType.Firestarter).consume(1);
            game.resources.get(ResourceType.Firestarter).removeTimer();
        } else {
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
}
