import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Flare extends AbstractSkill {
    constructor() {
        super(SkillName.Flare, ResourceType.cd_GCD, Aspect.Fire, true,
            4, 0, 280, 1.157);// mana is handled separately
    }

    available(game: GameState): boolean {
        return game.getFireStacks() > 0 && // in AF
            game.getMP() >= 800;
    }

    use(game: GameState, node: ActionNode): void {
        game.castSpell({
            skillName: this.name,
            onCapture: (cap: SkillCaptureCallbackInfo) => {
                let uh = game.resources.get(ResourceType.UmbralHeart);
                let mana = game.resources.get(ResourceType.Mana);
                let manaCost = uh.available(1) ? mana.availableAmount() * 0.66 : mana.availableAmount();
                // mana
                game.resources.get(ResourceType.Mana).consume(manaCost);
                uh.consume(uh.availableAmount());
                // +3 AF; refresh enochian
                game.resources.get(ResourceType.AstralFire).gain(3);
                game.startOrRefreshEnochian();
            },
            onApplication: (app: SkillApplicationCallbackInfo) => {
            },
            node: node
        });
    }
}
