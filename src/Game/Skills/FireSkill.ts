import {GameState} from "../GameState";
import {Aspect, ProcMode, ResourceType, SkillName} from "../Common";
import {Resource} from "../Resources";
import {AbstractSkill} from "../AbstractSkill";

export abstract class FireSkill extends AbstractSkill {
    protected constructor(
        name: SkillName,
        resourceType: ResourceType,
        aspect: Aspect,
        isSpell: boolean,
        baseCastTime: number,
        baseManaCost: number,
        basePotency: number,
        skillApplicationDelay: number
    ) {
        super(name, resourceType, aspect, isSpell, baseCastTime, baseManaCost, basePotency, skillApplicationDelay);
    }

    protected potentiallyGainFirestarter(game: GameState) {
        // firestarter
        let sc = game.resources.get(ResourceType.Sharpcast);
        if (sc.available(1)) {
            this.gainFirestarterProc(game);
            sc.consume(1);
            sc.removeTimer();
        } else {
            let rand = game.rng(); // firestarter proc
            if (game.config.procMode === ProcMode.Always || (game.config.procMode === ProcMode.RNG && rand < 0.4)) this.gainFirestarterProc(game);
        }
    }

    private gainFirestarterProc(game: GameState) {
        let fs = game.resources.get(ResourceType.Firestarter);
        let duration = game.config.extendedBuffTimes ? 31 : 30;
        if (fs.available(1)) {
            fs.overrideTimer(game, duration);
        } else {
            fs.gain(1);
            game.resources.addResourceEvent(
                ResourceType.Firestarter,
                "drop firestarter proc", duration, (rsc: Resource) => {
                    rsc.consume(1);
                }
            );
        }
    }

}
