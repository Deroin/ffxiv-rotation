import React, {ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler} from 'react'
import {Clickable, ContentNode, Help, parseTime} from "./Common";
import {Debug, ResourceType, SkillName, SkillReadyStatus} from "../Game/Common";
import {controller} from "../Controller/Controller";
import {Tooltip as ReactTooltip} from 'react-tooltip';
import {ActionType} from "../Controller/Record";
import {localize, localizeSkillName} from "./Localization";
import {updateTimelineView} from "./Timeline";
import * as ReactDOMServer from 'react-dom/server';
import {getCurrentThemeColors} from "./ColorTheme";
import {GameState} from "../Game/GameState";

// seems useful: https://na.finalfantasyxiv.com/lodestone/special/fankit/icon/
export const skillIcons = new Map();
skillIcons.set(SkillName.Blizzard, require("./Asset/blizzard.png"));
skillIcons.set(SkillName.Fire, require("./Asset/fire.png"));
skillIcons.set(SkillName.Transpose, require("./Asset/transpose.png"));
skillIcons.set(SkillName.Thunder3, require("./Asset/thunder3.png"));
skillIcons.set(SkillName.Manaward, require("./Asset/manaward.png"));
skillIcons.set(SkillName.Manafont, require("./Asset/manafont.png"));
skillIcons.set(SkillName.Fire3, require("./Asset/fire3.png"));
skillIcons.set(SkillName.Blizzard3, require("./Asset/blizzard3.png"));
skillIcons.set(SkillName.Freeze, require("./Asset/freeze.png"));
skillIcons.set(SkillName.AetherialManipulation, require("./Asset/aetherialManipulation.png"));
skillIcons.set(SkillName.Flare, require("./Asset/flare.png"));
skillIcons.set(SkillName.LeyLines, require("./Asset/leyLines.png"));
skillIcons.set(SkillName.Sharpcast, require("./Asset/sharpcast.png"));
skillIcons.set(SkillName.Blizzard4, require("./Asset/blizzard4.png"));
skillIcons.set(SkillName.Fire4, require("./Asset/fire4.png"));
skillIcons.set(SkillName.BetweenTheLines, require("./Asset/betweenTheLines.png"));
skillIcons.set(SkillName.Triplecast, require("./Asset/triplecast.png"));
skillIcons.set(SkillName.Foul, require("./Asset/foul.png"));
skillIcons.set(SkillName.Despair, require("./Asset/despair.png"));
skillIcons.set(SkillName.UmbralSoul, require("./Asset/umbralSoul.png"));
skillIcons.set(SkillName.Xenoglossy, require("./Asset/xenoglossy.png"));
skillIcons.set(SkillName.HighFire2, require("./Asset/highFire2.png"));
skillIcons.set(SkillName.HighBlizzard2, require("./Asset/highBlizzard2.png"));
skillIcons.set(SkillName.Amplifier, require("./Asset/amplifier.png"));
skillIcons.set(SkillName.Paradox, require("./Asset/paradox.png"));
skillIcons.set(SkillName.Addle, require("./Asset/addle.png"));
skillIcons.set(SkillName.Swiftcast, require("./Asset/swiftcast.png"));
skillIcons.set(SkillName.LucidDreaming, require("./Asset/lucidDreaming.png"));
skillIcons.set(SkillName.Surecast, require("./Asset/surecast.png"));
skillIcons.set(SkillName.Tincture, require("./Asset/tincture.png"));
skillIcons.set(SkillName.Sprint, require("./Asset/sprint.png"));

export const skillIconImages = new Map();
skillIcons.forEach((path, skillName) => {
    let imgObj = new Image();
    imgObj.src = path;
    imgObj.onload = function () {
        updateTimelineView();
    }
    skillIconImages.set(skillName, imgObj);
});

let setSkillInfoText = (text: string) => {
};

function ProgressCircle(props = {
    className: "",
    diameter: 50,
    progress: 0.7,
    color: "rgba(255,255,255,0.5)",
}) {
    let elemRadius = props.diameter / 2.0;
    let outRadius = props.diameter * 0.35;
    let outCircumference = 2 * Math.PI * outRadius;
    let outFillLength = outCircumference * props.progress;
    let outGapLength = outCircumference - outFillLength;
    let outDasharray = outFillLength + "," + outGapLength;
    let outlineCircle = <circle
        r={outRadius}
        cx={elemRadius}
        cy={elemRadius}
        fill="none"
        stroke={props.color}
        strokeWidth="6"
        strokeDasharray={outDasharray}
        strokeDashoffset={outCircumference / 4}/>

    return <svg className={props.className} width={props.diameter} height={props.diameter}>
        {outlineCircle}
    </svg>
}

type buttonProps = {
    skillName: SkillName,
    ready: boolean,
    cdProgress: number,
    highlight: boolean,
}

class SkillButton extends React.Component {
    props: buttonProps;
    state: {
        skillDescription: JSX.Element,
    }
    handleMouseEnter: () => void;

    constructor(props: buttonProps) {
        super(props);
        this.props = props;
        this.state = {
            skillDescription: <div/>
        };
        this.handleMouseEnter = (() => {
            let info = controller.getSkillInfo({
                game: controller.getDisplayedGame(),
                skillName: this.props.skillName
            });
            let colors = getCurrentThemeColors();
            let s: string | ContentNode = "";
            if (info.status === SkillReadyStatus.Ready) {
                let en = "ready (" + info.stacksAvailable;
                let zh = "可释放 (" + info.stacksAvailable;
                if (info.timeTillNextStackReady > 0) {
                    en += ") (next stack ready in " + info.timeTillNextStackReady.toFixed(2);
                    zh += ") (下一层" + info.timeTillNextStackReady.toFixed(2) + "秒后转好";
                }
                en += ")";
                zh += ")";
                s = localize({en: en, zh: zh});
            } else if (info.status === SkillReadyStatus.RequirementsNotMet) {
                s += localize({en: " skill requirement(s) not satisfied", zh: " 未满足释放条件"});
            } else if (info.status === SkillReadyStatus.NotEnoughMP) {
                s += localize({
                    en: " not enough MP (needs " + info.capturedManaCost + ")",
                    zh: " MP不足（需" + info.capturedManaCost + "）"
                });
            } else if (info.status === SkillReadyStatus.Blocked) {
                s += localize({
                    en: "possibly ready in " + info.timeTillAvailable.toFixed(2) + " (next stack ready in " + info.timeTillNextStackReady.toFixed(2) + ")",
                    zh: "预计" + info.timeTillAvailable.toFixed(2) + "秒后可释放（" + info.timeTillNextStackReady.toFixed(2) + "秒后转好下一层CD）"
                });
            }
            // if ready, also show captured cast time & time till damage application
            let actualCastTime = info.instantCast ? 0 : info.castTime;
            let infoString = "";
            if (info.status === SkillReadyStatus.Ready) {
                infoString += localize({en: "cast: ", zh: "读条："}) + actualCastTime.toFixed(2);
                if (info.llCovered && actualCastTime > Debug.epsilon) infoString += " (LL)";
                infoString += localize({
                    en: ", cast+delay: ",
                    zh: " 读条+生效延迟："
                }) + info.timeTillDamageApplication.toFixed(3);
            }
            let content = <div
                style={{color: controller.displayingUpToDateGameState ? colors.text : colors.historical}}>
                <div className="paragraph"><b>{localizeSkillName(this.props.skillName)}</b></div>
                <div className="paragraph">{s}</div>
                <div className="paragraph">{infoString}</div>
            </div>;
            this.setState({skillDescription: content});
        });
    }

    render() {
        let iconPath = skillIcons.get(this.props.skillName);
        let iconStyle = {
            width: 48,
            height: 48,
            verticalAlign: "top",
            position: "relative" as "relative",
            display: "inline-block"
        };
        let iconImgStyle = {
            width: 40,
            height: 40,
            position: "absolute" as "absolute",
            top: 2,
            left: "50%",
            marginLeft: -20,
            //filter: this.props.ready ? "none" : "brightness(0.6)"
        };
        let readyOverlay = "transparent";
        if (!this.props.ready) {
            readyOverlay = "rgba(0, 0, 0, 0.6)";
        } else if (this.props.cdProgress !== 1) {
            //readyOverlay = "radial-gradient(40px, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1))";
            readyOverlay = "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 85%, rgba(0,0,0,0.6) 100%)"
        }
        let icon = <div onMouseEnter={this.handleMouseEnter}>
            <div className={"skillIcon"} style={iconStyle}>
                <img style={iconImgStyle} src={iconPath} alt={this.props.skillName}/>
                <div style={{ // skill icon border
                    position: "absolute",
                    width: 48,
                    height: 48,
                    background: "url('https://miyehn.me/ffxiv-blm-rotation/misc/skillIcon_overlay.png') no-repeat"
                }}></div>
                <div style={{ // grey out
                    position: "absolute",
                    width: 40,
                    height: 41,
                    top: 1,
                    left: "50%",
                    marginLeft: -20,
                    borderRadius: 3,
                    zIndex: 1,
                    background: readyOverlay
                }}></div>
            </div>
            <img hidden={!this.props.highlight} src="https://miyehn.me/ffxiv-blm-rotation/misc/proc.png" style={{
                position: "absolute",
                width: 44,
                height: 44,
                top: 0,
                left: 2,
                zIndex: 1
            }}/>
        </div>;
        let progressCircle = <ProgressCircle
            className="cdProgress"
            diameter={40}
            progress={this.props.cdProgress}
            color={this.props.ready ? "rgba(255, 255, 255, 0.7)" : "rgba(255,255,255,0.7)"}/>;
        return <span
            title={this.props.skillName}
            className={"skillButton"}
            data-tooltip-offset={3}
            data-tooltip-html={
                ReactDOMServer.renderToStaticMarkup(this.state.skillDescription)
            } data-tooltip-id={"skillButton-" + this.props.skillName}>
            <Clickable onClickFn={controller.displayingUpToDateGameState ? () => {
                controller.requestUseSkill({skillName: this.props.skillName});
                controller.updateAllDisplay();
            } : undefined} content={icon}
                       style={controller.displayingUpToDateGameState ? {} : {cursor: "not-allowed"}}/>
            {this.props.cdProgress === 1 ? undefined : progressCircle}
        </span>
    }
}

const WaitSince = {
    Now: "Now",
    LastSkill: "LastSkill"
};

type propsType = {
    availableSkills: SkillName[],
}
type stateType = {
    waitTime: string,
    waitSince: string,
    waitUntil: string,
    tooltipContent: string,
    statusList: any,
    paradoxInfo: any,
}

export var updateSkillButtons = (game: GameState) => {
}

export class SkillsWindow extends React.Component<propsType, stateType> {
    onWaitTimeChange: ChangeEventHandler<HTMLInputElement>;
    onWaitTimeSubmit: FormEventHandler<HTMLFormElement>;
    onWaitUntilChange: ChangeEventHandler<HTMLInputElement>;
    onWaitUntilSubmit: FormEventHandler<HTMLFormElement>;
    onWaitSinceChange: ChangeEventHandler<HTMLSelectElement>;
    onRemoveTrailingIdleTime: () => void;
    onWaitTillNextMpOrLucidTick: () => void;

    constructor(props: propsType) {
        super(props);

        updateSkillButtons = ((game: GameState) => {
            let statusList = this.props.availableSkills.map((skillName: SkillName) => {
                return game.getSkillAvailabilityStatus(skillName);
            });

            this.setState({
                statusList: statusList,
                paradoxInfo: controller.getSkillInfo({
                    game: controller.getDisplayedGame(),
                    skillName: SkillName.Paradox
                }),
            });
        });

        setSkillInfoText = ((text: string) => {
            this.setState({tooltipContent: text});
        });

        this.onWaitTimeChange = ((event: ChangeEvent<HTMLInputElement>) => {
            if (!event || !event.target) {
                return;
            }
            this.setState({waitTime: event.target.value});
        });

        this.onWaitTimeSubmit = ((event: FormEvent<HTMLFormElement>) => {
            let waitTime = parseFloat(this.state.waitTime);
            if (!isNaN(waitTime)) {
                if (this.state.waitSince === WaitSince.Now) {
                    controller.step(waitTime);
                } else if (this.state.waitSince === WaitSince.LastSkill) {
                    let timeSinceLastSkill = 0;
                    let lastAction = controller.record.getLastAction(node => {
                        return node.type === ActionType.Wait || node.type === ActionType.Skill;
                    });
                    if (lastAction) {
                        timeSinceLastSkill = lastAction.waitDuration;
                    }
                    let stepTime = waitTime - timeSinceLastSkill;
                    if (stepTime <= 0) {
                        window.alert("Invalid input: trying to jump to " + waitTime +
                            "s since the last action, but " + timeSinceLastSkill +
                            "s has already elapsed.");
                    } else {
                        controller.step(stepTime);
                    }
                } else {
                    console.assert(false);
                }
                controller.autoSave();
            }
            event.preventDefault();
        });

        this.onWaitUntilChange = ((event: ChangeEvent<HTMLInputElement>) => {
            if (!event || !event.target) {
                return;
            }
            this.setState({waitUntil: event.target.value});
        });

        this.onWaitUntilSubmit = ((event: FormEvent<HTMLFormElement>) => {
            let targetTime = parseTime(this.state.waitUntil);
            if (!isNaN(targetTime)) {
                let currentTime = controller.game.getDisplayTime();
                if (targetTime > currentTime) {
                    let elapse = targetTime - currentTime;
                    controller.step(elapse);
                    controller.autoSave();
                } else {
                    window.alert("Can only jump to a time in the future!");
                }
            }
            event.preventDefault();
        });

        this.onWaitSinceChange = ((event: ChangeEvent<HTMLSelectElement>) => {
            this.setState({waitSince: event.target.value});
        });

        this.onRemoveTrailingIdleTime = (() => {
            controller.removeTrailingIdleTime();
        });

        this.onWaitTillNextMpOrLucidTick = (() => {
            controller.waitTillNextMpOrLucidTick();
        });

        this.state = {
            statusList: undefined,
            paradoxInfo: undefined,
            tooltipContent: "",
            waitTime: "1",
            waitSince: WaitSince.Now,
            waitUntil: "0:00",
        }
    }

    componentDidMount() {
        this.setState({
            statusList: this.props.availableSkills.map(skillName => {
                return controller.getSkillInfo({
                        game: controller.getDisplayedGame(), skillName: skillName
                    }
                );
            }),
            paradoxInfo: controller.getSkillInfo({
                game: controller.getDisplayedGame(),
                skillName: SkillName.Paradox
            }),
        });
    }

    render() {
        let skillButtons = [];
        let para = controller.getResourceValue({rscType: ResourceType.Paradox});
        for (let i = 0; i < this.props.availableSkills.length; i++) {
            let isF1B1 = this.props.availableSkills[i] === SkillName.Fire || this.props.availableSkills[i] === SkillName.Blizzard;
            let skillName = (isF1B1 && para) ? SkillName.Paradox : this.props.availableSkills[i];
            let info = undefined;
            if (this.state.paradoxInfo) info = (isF1B1 && para) ? this.state.paradoxInfo : this.state.statusList[i];
            let btn = <SkillButton
                key={i}
                highlight={info ? info.highlight : false}
                skillName={skillName}
                ready={info ? info.status === SkillReadyStatus.Ready : false}
                cdProgress={info ? 1 - info.timeTillNextStackReady / info.cdRecastTime : 1}
            />
            skillButtons.push(btn);
        }

        let waitUntilHelp = <Help topic="waitUntilInputFormat" content={<div>
            <div className="paragraph">{localize({en: "Examples:", zh: "时间格式举例："})}</div>
            <div className="paragraph">
                12 <br/>
                1.5 <br/>
                10:04.2 <br/>
                -0:03
            </div>
        </div>}/>;

        let textInputStyle = {
            display: "inline-block",
            flex: "auto",
            //marginRight: 10,
            //border: "1px solid red",
        };

        let colors = getCurrentThemeColors();
        let textInputFieldStyle = {
            outline: "none",
            border: "none",
            borderBottom: "1px solid " + colors.text,
            borderRadius: 0,
            background: "transparent",
            color: colors.text
        };
        return <div className={"skillsWindow"}>
            <div className={"skillIcons"}>
                <style>{`
                    .info-tooltip {
                        color: ${colors.text};
                        background-color: ${colors.tipBackground};
                        opacity: 0.98;
                        max-width: 300px;
                        outline: 1px solid ${colors.bgHighContrast};
                        transition: none;
                        font-size: 100%;
                        z-index: 10;
                    }
                    .info-tooltip-arrow { display: none; }
                `}</style>
                {skillButtons}
                <ReactTooltip anchorSelect={".skillButton"} className={"info-tooltip"}
                              classNameArrow={"info-tooltip-arrow"}/>
                <div style={{margin: "10px 0"}}>
                    <div style={{display: "flex", flexDirection: "row", marginBottom: 6}}>

                        {localize({
                            en: <form onSubmit={this.onWaitTimeSubmit} style={textInputStyle}>
                                Wait until <input type={"text"} style={{
                                ...{width: 30}, ...textInputFieldStyle
                            }} value={this.state.waitTime} onChange={this.onWaitTimeChange}/> second(s) since <select
                                style={{display: "inline-block", outline: "none"}}
                                value={this.state.waitSince}
                                onChange={this.onWaitSinceChange}>
                                <option value={WaitSince.Now}>now</option>
                                <option value={WaitSince.LastSkill}>last action</option>
                            </select> <input type="submit" disabled={!controller.displayingUpToDateGameState}
                                             value="GO"/>
                            </form>,
                            zh: <form onSubmit={this.onWaitTimeSubmit} style={textInputStyle}>
                                快进至 <select
                                style={{display: "inline-block", outline: "none"}}
                                value={this.state.waitSince}
                                onChange={this.onWaitSinceChange}>
                                <option value={WaitSince.Now}>当前</option>
                                <option value={WaitSince.LastSkill}>上次操作</option>
                            </select> 后的 <input type={"text"} style={{
                                ...{width: 30}, ...textInputFieldStyle
                            }} value={this.state.waitTime} onChange={this.onWaitTimeChange}/> 秒 <input type="submit"
                                                                                                        disabled={!controller.displayingUpToDateGameState}
                                                                                                        value="GO"/>
                            </form>
                        })}

                        <form onSubmit={this.onWaitUntilSubmit} style={textInputStyle}>
                            {localize({en: "Wait until", zh: "快进至指定时间"})} {waitUntilHelp} <input type={"text"}
                                                                                                        style={{
                                                                                                            ...{width: 60}, ...textInputFieldStyle
                                                                                                        }}
                                                                                                        value={this.state.waitUntil}
                                                                                                        onChange={this.onWaitUntilChange}/>
                            <input type="submit" disabled={!controller.displayingUpToDateGameState} value="GO"/>
                        </form>

                    </div>
                    <button onClick={this.onWaitTillNextMpOrLucidTick}>{localize({
                        en: "Wait until next MP or lucid tick",
                        zh: "快进至下次跳蓝或跳醒梦"
                    })}</button>
                    <span> </span>
                    <button onClick={this.onRemoveTrailingIdleTime}>{localize({
                        en: "remove trailing idle time",
                        zh: "去除时间轴末尾的发呆时间"
                    })}</button>
                </div>
            </div>
        </div>
    }
}