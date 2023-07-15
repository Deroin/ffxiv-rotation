import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class Surecast extends ResourceAbility {
    constructor() {
        super(SkillName.Surecast, 10, true, ResourceType.Surecast, ResourceType.cd_Surecast, 0);
    }
}
