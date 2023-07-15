import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class Transpose extends AbstractSkill {
    constructor() {
        super(SkillName.Transpose, ResourceType.cd_Transpose, Aspect.Other, false,
            0, 0, 0, 0);
    }

    available(game: GameState): boolean {
        return game.getFireStacks() > 0 || game.getIceStacks() > 0; // has UI or AF
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            onCapture: () => {
                if (game.getFireStacks() === 0 && game.getIceStacks() === 0) {
                    return;
                }
                if (game.getFireStacks() > 0) {
                    game.switchToAForUI(ResourceType.UmbralIce, 1);
                } else {
                    game.switchToAForUI(ResourceType.AstralFire, 1);
                }
                game.startOrRefreshEnochian();
            },
            dealDamage: false,
            node: node
        });
        node.resolveAll(game.time);
    }
}
