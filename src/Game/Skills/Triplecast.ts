import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {Resource} from "../Resources";
import {AbstractSkill} from "../AbstractSkill";

export class Triplecast extends AbstractSkill {
    constructor() {
        super(SkillName.Triplecast, ResourceType.cd_Triplecast, Aspect.Other, false,
            0, 0, 0, 0);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            onCapture: () => {
                let triple = game.resources.get(ResourceType.Triplecast);
                if (triple.pendingChange) triple.removeTimer(); // should never need this, but just in case
                triple.gain(3);
                game.resources.addResourceEvent(
                    ResourceType.Triplecast,
                    "drop remaining Triple charges", game.config.extendedBuffTimes ? 15.7 : 15, (rsc: Resource) => {
                        rsc.consume(rsc.availableAmount());
                    });
                node.resolveAll(game.time);
            },
            dealDamage: false,
            node: node
        });
    }
}
