import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class Manaward extends ResourceAbility {
    constructor() {
        super(SkillName.Manaward, 20, false, ResourceType.Manaward, ResourceType.cd_Manaward, 1.114);
    }
}
