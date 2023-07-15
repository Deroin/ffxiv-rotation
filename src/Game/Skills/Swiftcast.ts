import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class Swiftcast extends ResourceAbility {
    constructor() {
        super(SkillName.Swiftcast, 10, true, ResourceType.Swiftcast, ResourceType.cd_Swiftcast, 0);
    }
}
