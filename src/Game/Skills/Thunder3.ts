import {SkillApplicationCallbackInfo, SkillCaptureCallbackInfo} from "../Skills";
import {ActionNode} from "../../Controller/Record";
import {GameState} from "../GameState";
import {Aspect, ResourceType, SkillName} from "../Common";
import {controller} from "../../Controller/Controller";
import {DoTBuff} from "../Resources";
import {getPotencyModifiersFromResourceState, Potency} from "../Potency";
import {AbstractSkill} from "../AbstractSkill";

export class Thunder3 extends AbstractSkill {
    constructor() {
        super(SkillName.Thunder3, ResourceType.cd_GCD, Aspect.Lightning, true,
            2.5, 400, 50, 1.025);
    }

    available(game: GameState): boolean {
        return true;
    }

    use(game: GameState, node: ActionNode): void {
        if (game.resources.get(ResourceType.Thundercloud).available(1)) { // made instant via thundercloud
            // potency
            this.addT3Potencies(game, node, true); // should call on capture
            let p0 = node.getPotencies()[0];
            p0.base = 400;
            node.getPotencies().forEach(p => {
                p.snapshotTime = game.time;
            });

            // tincture
            if (game.resources.get(ResourceType.Tincture).available(1)) {
                node.addBuff(ResourceType.Tincture);
            }

            game.useInstantSkill({
                skillName: SkillName.Thunder3,
                onApplication: () => {
                    controller.resolvePotency(p0);
                    this.applyThunderDoT(game, node);
                },
                dealDamage: false,
                node: node
            });
            let thundercloud = game.resources.get(ResourceType.Thundercloud);
            thundercloud.consume(1);
            thundercloud.removeTimer();
            // if there's a sharpcast stack, consume it and gain (a potentially new) proc
            let sc = game.resources.get(ResourceType.Sharpcast);
            if (sc.available(1)) {
                game.gainThundercloudProc();
                sc.consume(1);
                sc.removeTimer();
            }
        } else {
            game.castSpell({
                skillName: this.name,
                onButtonPress: () => {
                    // nothing here really
                },
                onCapture: (cap: SkillCaptureCallbackInfo) => {
                    // potency
                    this.addT3Potencies(game, node, false);

                    // potency snapshot time
                    node.getPotencies().forEach(p => {
                        p.snapshotTime = game.time
                    });

                    // tincture
                    if (game.resources.get(ResourceType.Tincture).available(1)) {
                        node.addBuff(ResourceType.Tincture);
                    }
                    // if there's a sharpcast stack, consume it and gain (a potentially new) proc
                    let sc = game.resources.get(ResourceType.Sharpcast);
                    if (sc.available(1)) {
                        game.gainThundercloudProc();
                        sc.consume(1);
                        sc.removeTimer();
                    }
                },
                onApplication: (app: SkillApplicationCallbackInfo) => {
                    this.applyThunderDoT(game, node);
                },
                node: node
            });
        }
    }

    private applyThunderDoT(game: GameState, node: ActionNode) {
        let thunder = game.resources.get(ResourceType.ThunderDoT) as DoTBuff;
        if (thunder.available(1)) {
            thunder.overrideTimer(game, 30);
        } else {
            thunder.gain(1);
            game.resources.addResourceEvent(ResourceType.ThunderDoT, "drop thunder DoT", 30, rsc => {
                rsc.consume(1);
            });
        }
        thunder.node = node;
        thunder.tickCount = 0;
    }

    private addT3Potencies(game: GameState, node: ActionNode, includeInitial: boolean) {
        let mods = getPotencyModifiersFromResourceState(game.resources, Aspect.Lightning);
        if (includeInitial) {
            // initial potency
            let pInitial = new Potency({
                sourceTime: game.time,
                sourceSkill: SkillName.Thunder3,
                aspect: Aspect.Lightning,
                basePotency: 50,
                snapshotTime: undefined,
            });
            pInitial.modifiers = mods;
            node.addPotency(pInitial);
        }
        // dots
        for (let i = 0; i < 10; i++) {
            let pDot = new Potency({
                sourceTime: game.time,
                sourceSkill: SkillName.Thunder3,
                aspect: Aspect.Lightning,
                basePotency: game.config.adjustedDoTPotency(35),
                snapshotTime: undefined,
                description: "DoT " + (i + 1) + "/10"
            });
            pDot.modifiers = mods;
            node.addPotency(pDot);
        }
    }
}
