import {ResourceAbility} from "./ResourceAbility";
import {ResourceType, SkillName} from "../Common";

export class LeyLines extends ResourceAbility {
    constructor() {
        super(SkillName.LeyLines, 30, false, ResourceType.LeyLines, ResourceType.cd_LeyLines, 0.49);
    }
}
