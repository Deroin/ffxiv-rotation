import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class Tincture extends ResourceAbility {
    constructor() {
        super(SkillName.Tincture, 30, false, ResourceType.Tincture, ResourceType.cd_Tincture, 0.891);
    }
}
