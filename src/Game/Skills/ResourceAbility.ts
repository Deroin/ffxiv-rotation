import {Aspect, ResourceType, SkillName} from "../Common";
import {GameState} from "../GameState";
import {ActionNode} from "../../Controller/Record";
import {Resource} from "../Resources";
import {AbstractSkill} from "../AbstractSkill";

export abstract class ResourceAbility extends AbstractSkill {

    instant: boolean;
    rscType: ResourceType;
    duration: number;

    protected constructor(
        name: SkillName,
        duration: number,
        instant: boolean,
        rscType: ResourceType,
        cdResourceType: ResourceType,
        skillApplicationDelay: number
    ) {
        super(name, cdResourceType, Aspect.Other, false, 0, 0, 0, skillApplicationDelay);
        this.instant = instant;
        this.rscType = rscType;
        this.duration = duration;
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        game.useInstantSkill({
            skillName: this.name,
            onCapture: this.instant ? () => this.takeEffect(node, game) : undefined,
            onApplication: this.instant ? undefined : () => this.takeEffect(node, game),
            dealDamage: false,
            node: node
        });
    }

    takeEffect(node: ActionNode, game: GameState) {
        let resource = game.resources.get(this.rscType);
        if (resource.available(1)) {
            resource.overrideTimer(game, this.duration);
        } else {
            resource.gain(1);
            game.resources.addResourceEvent(
                this.rscType,
                "drop " + this.rscType, this.duration, (rsc: Resource) => {
                    rsc.consume(1);
                });
        }
        node.resolveAll(game.time);
    };
}
