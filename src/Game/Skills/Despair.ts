import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Despair extends AbstractSkill {
    constructor() {
        super(SkillName.Despair, ResourceType.cd_GCD, Aspect.Fire, true,
            3, 0, 340, 0.556);
    }

    available(game: GameState): boolean {
        return game.getFireStacks() > 0 && // in AF
            game.getMP() >= 800;
    }

    use(game: GameState, node: ActionNode): void {
        game.castSpell({
            skillName: SkillName.Despair, onCapture: (cap: SkillCaptureCallbackInfo) => {
                let mana = game.resources.get(ResourceType.Mana);
                // mana
                mana.consume(mana.availableAmount());
                // +3 AF; refresh enochian
                game.resources.get(ResourceType.AstralFire).gain(3);
                game.startOrRefreshEnochian();
            }, onApplication: (app: SkillApplicationCallbackInfo) => {
            }, node: node
        });
    }
}
