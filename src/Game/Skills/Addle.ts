import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class Addle extends ResourceAbility {
    constructor() {
        super(SkillName.Addle, 10, false, ResourceType.Addle, ResourceType.cd_Addle, 0.621);
    }
}
