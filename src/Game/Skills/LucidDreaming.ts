import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {DoTBuff, Resource} from "../Resources";
import {AbstractSkill} from "../AbstractSkill";

export class LucidDreaming extends AbstractSkill {
    constructor() {
        super(SkillName.LucidDreaming, ResourceType.cd_LucidDreaming, Aspect.Other,
            false, 0, 0, 0, 0.623);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            onApplication: () => {
                let lucid = game.resources.get(ResourceType.LucidDreaming) as DoTBuff;
                if (lucid.available(1)) {
                    lucid.overrideTimer(game, 21);
                } else {
                    lucid.gain(1);
                    game.resources.addResourceEvent(
                        ResourceType.LucidDreaming,
                        "drop lucid dreaming", 21, (rsc: Resource) => {
                            rsc.consume(1);
                        });
                }
                lucid.node = node;
                lucid.tickCount = 0;
            },
            dealDamage: false,
            node: node
        });
        node.resolveAll(game.time);
    }
}
