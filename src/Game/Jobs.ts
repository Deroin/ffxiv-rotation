import {SkillName} from "./Common";

export enum Jobs {
    BLM = "Black Mage",
    RPR = "Reaper",
}

export const JobSkills: Map<Jobs, SkillName[]> = new Map<Jobs, SkillName[]>([
    [Jobs.BLM, [
        SkillName.Blizzard,
        SkillName.Fire,
        SkillName.Transpose,
        SkillName.Thunder3,
        SkillName.Manaward,
        SkillName.Manafont,
        SkillName.Fire3,
        SkillName.Blizzard3,
        SkillName.Freeze,
        SkillName.Flare,
        SkillName.LeyLines,
        SkillName.Sharpcast,
        SkillName.Blizzard4,
        SkillName.Fire4,
        SkillName.BetweenTheLines,
        SkillName.AetherialManipulation,
        SkillName.Triplecast,
        SkillName.Foul,
        SkillName.Despair,
        SkillName.UmbralSoul,
        SkillName.Xenoglossy,
        SkillName.HighFire2,
        SkillName.HighBlizzard2,
        SkillName.Amplifier,
        //SkillName.Paradox, // display paradox at F1/B1
        SkillName.Addle,
        SkillName.Swiftcast,
        SkillName.LucidDreaming,
        SkillName.Surecast,
        SkillName.Tincture,
        SkillName.Sprint,
    ]],
    [Jobs.RPR, [
        SkillName.Tincture,
        SkillName.Sprint,
    ]],
]);

