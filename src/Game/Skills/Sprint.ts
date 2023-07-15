import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class Sprint extends ResourceAbility {
    constructor() {
        super(SkillName.Sprint, 10, false, ResourceType.Sprint, ResourceType.cd_Sprint, 0.133);
    }
}
