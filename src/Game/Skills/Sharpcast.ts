import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class Sharpcast extends ResourceAbility {
    constructor() {
        super(SkillName.Sharpcast, 30, true, ResourceType.Sharpcast, ResourceType.cd_Sharpcast, 0);
    }
}
