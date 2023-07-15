import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {FireSkill} from "./FireSkill";

export class Paradox extends FireSkill {
    constructor() {
        super(SkillName.Paradox, ResourceType.cd_GCD, Aspect.Other, true,
            2.5, 1600, 500, 0.624);
    }

    available(game: GameState): boolean {
        return game.resources.get(ResourceType.Paradox).available(1);
    }

    use(game: GameState, node: ActionNode): void {
        game.castSpell({
            skillName: this.name,
            onCapture: (cap: SkillCaptureCallbackInfo) => {
                game.resources.get(ResourceType.Paradox).consume(1);
                // enochian (refresh only
                if (game.hasEnochian()) {
                    game.startOrRefreshEnochian();
                }
                if (game.getIceStacks() > 0) {
                    game.resources.get(ResourceType.UmbralIce).gain(1);
                }
                if (game.getFireStacks() > 0) {// firestarter proc
                    game.resources.get(ResourceType.AstralFire).gain(1);
                    this.potentiallyGainFirestarter(game);
                }
            },
            onApplication: (app: SkillApplicationCallbackInfo) => {
            },
            node: node
        });
    }
}
