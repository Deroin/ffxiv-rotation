import React, {ChangeEvent} from 'react';
import {controller} from '../Controller/Controller'
import {ButtonIndicator, Help, Input} from "./Common";
import {TickMode} from "../Controller/Common";
import {localize} from "./Localization";

type propsType = {}
type stateType = {
    tickMode: number,
    timeScale: number,
}

export default class PlaybackTimeControl extends React.Component<propsType, stateType> {

    constructor(props: propsType) {
        super(props);

        let settings = this.loadSettings();
        if (settings) {
            this.state = {
                tickMode: settings.tickMode,
                timeScale: settings.timeScale
            };
        } else {
            this.state = {
                tickMode: 1,
                timeScale: 2
            };
        }
    }

    private saveSettings(settings: stateType) {
        let str = JSON.stringify({
            tickMode: settings.tickMode,
            timeScale: settings.timeScale
        });
        localStorage.setItem("playbackSettings", str);
    }

    private loadSettings() {
        let str = localStorage.getItem("playbackSettings");
        if (str) {
            return JSON.parse(str);
        }
        return undefined;
    }

    private setTickMode(event: ChangeEvent<HTMLInputElement>) {
        if (!event || !event.target || isNaN(parseInt(event.target.value))) {
            return;
        }
        this.setState({tickMode: parseInt(event.target.value)});
        let numVal = parseInt(event.target.value);
        if (!isNaN(numVal)) {
            controller.setTimeControlSettings({
                tickMode: numVal,
                timeScale: this.state.timeScale
            });
            this.saveSettings({
                tickMode: numVal,
                timeScale: this.state.timeScale
            });
        }
    };

    private setTimeScale(value: string) {
        let numVal = parseFloat(value);

        if (!isNaN(numVal)) {
            this.setState({timeScale: numVal});
            controller.setTimeControlSettings({
                tickMode: this.state.tickMode,
                timeScale: numVal
            });
            this.saveSettings({
                tickMode: this.state.tickMode,
                timeScale: numVal
            });
        }
    };


    componentDidMount() {
        controller.setTimeControlSettings({tickMode: this.state.tickMode, timeScale: this.state.timeScale});
    }

    render() {
        //let colors = getCurrentThemeColors();
        let radioStyle = {
            position: "relative" as "relative",
            top: 3,
            marginRight: "0.25em"
        };
        let tickModeOptionStyle = {
            display: "inline-block",
            marginRight: "0.5em"
        };
        return <div style={{display: "inline-block", marginBottom: 15}}>
            <div style={{marginBottom: 5}}>
                <div style={{marginBottom: 5}}><b>{localize({en: "Control", zh: "战斗时间控制"})}</b></div>
                <label style={tickModeOptionStyle}>
                    <input style={radioStyle} type={"radio"} onChange={this.setTickMode}
                           value={TickMode.RealTime}
                           checked={this.state.tickMode === TickMode.RealTime}
                           name={"tick mode"}/>
                    {localize({
                        en: "real-time",
                        zh: "实时"
                    })}
                </label>
                <Help topic={"ctrl-realTime"} content={
                    <div className="toolTip">
                        {localize({
                            en: <div className="paragraph">- click to use a skill</div>,
                            zh: <div className="paragraph">- 点击图标使用技能</div>,
                        })}
                        {localize({
                            en: <div className="paragraph">- <ButtonIndicator text={"space"}/> to play/pause. game time
                                is elapsing when the main region has a green border</div>,
                            zh: <div className="paragraph">- 按 <ButtonIndicator
                                text={"空格"}/> 来暂停/继续战斗。操作区有绿色边框的时候代表时间轴正在实时前进。</div>
                        })}
                    </div>
                }/><br/>
                <label style={tickModeOptionStyle}>
                    <input style={radioStyle} type={"radio"} onChange={this.setTickMode}
                           value={TickMode.RealTimeAutoPause}
                           checked={this.state.tickMode === TickMode.RealTimeAutoPause}
                           name={"tick mode"}/>
                    {localize({
                        en: "real-time auto pause",
                        zh: "实时(带自动暂停）"
                    })}
                </label>
                <Help topic={"ctrl-realTimeAutoPause"} content={
                    <div className="toolTip">
                        {localize({
                            en: <div className="paragraph">*Recommended*</div>,
                            zh: <div className="paragraph">*推荐设置*</div>
                        })}
                        {localize({
                            en: <div className="paragraph">- click to use a skill. or if it's not ready, click again to
                                wait then retry</div>,
                            zh: <div className="paragraph">- 点击图标使用技能;
                                战斗时间会按下方设置的倍速自动前进直到可释放下一个技能。如果点击的技能CD没有转好，再次点击会快进到它CD转好并重试。</div>
                        })}
                    </div>
                }/><br/>
                <label style={tickModeOptionStyle}>
                    <input style={radioStyle} type={"radio"} onChange={this.setTickMode}
                           value={TickMode.Manual}
                           checked={this.state.tickMode === TickMode.Manual}
                           name={"tick mode"}/>
                    {localize({
                        en: "manual",
                        zh: "手动"
                    })}
                </label>
                <Help topic={"ctrl-manual"} content={
                    <div className="toolTip">
                        {localize({
                            en: <div className="paragraph">- click to use a skill. or if it's not ready, click again to
                                wait then retry</div>,
                            zh: <div className="paragraph">- 点击图标使用技能;
                                战斗时间会自动快进至可释放下一个技能。如果点击的技能CD没有转好，再次点击可以快进到它CD转好并重试。</div>
                        })}
                        {localize({
                            en: <div className="paragraph">- <ButtonIndicator text={"space"}/> to advance game time to
                                the earliest possible time for the next skill</div>,
                            zh: <div className="paragraph">- 点击 <ButtonIndicator text={"空格"}/> 来快进到下一个可释放技能的时间点。
                            </div>
                        })}
                    </div>
                }/><br/>
            </div>
            <Input defaultValue={this.state.timeScale.toString()}
                   description={<span>{localize({en: "time scale ", zh: "倍速 "})}<Help topic={"timeScale"} content={
                       <div>{localize({
                           en: "rate at which game time advances automatically (aka when in real-time)",
                           zh: "战斗时间自动前进的速度"
                       })}</div>
                   }/>: </span>} onChange={this.setTimeScale}/>
        </div>
    }
}
