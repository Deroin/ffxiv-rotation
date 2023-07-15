import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {AbstractSkill} from "../AbstractSkill";

export class BetweenTheLines extends AbstractSkill {
    constructor() {
        super(SkillName.BetweenTheLines, ResourceType.cd_BetweenTheLines, Aspect.Other, false,
            0, 0, 0, 0);
    }

    available(game: GameState): boolean {
        let leyLines = game.resources.get(ResourceType.LeyLines);
        let cachedEnabled = leyLines.enabled;
        leyLines.enabled = true;
        let hasLeyLines = leyLines.available(1); // gets raw amount
        leyLines.enabled = cachedEnabled;

        return hasLeyLines;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            dealDamage: false,
            onCapture: () => {
                node.resolveAll(game.time)
            },
            node: node
        });
    }
}
