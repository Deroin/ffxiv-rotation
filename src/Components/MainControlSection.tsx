import React from "react";
import {StatusDisplay} from "./StatusDisplay";
import {SkillsWindow} from "./Skills";
import {Jobs, JobSkills} from "../Game/Jobs";
import {SkillName} from "../Game/Common";

type propsType = {
    job: Jobs,
    controlRegionRef: React.RefObject<HTMLDivElement>,
    gameplayKeyCapture: React.KeyboardEventHandler<HTMLDivElement>,
    gameplayMouseCapture: React.MouseEventHandler<HTMLDivElement>,
    borderColor: string,
}
type stateType = {
    availableSkills: SkillName[],
    hasFocus: boolean,
};

export class MainControlSection extends React.Component<propsType, stateType> {

    constructor(props: propsType) {
        super(props);

        this.state = {
            availableSkills: [],
            hasFocus: false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps: Readonly<propsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.job !== this.props.job)
            this.loadData();
    }

    loadData() {
        this.setState({
            availableSkills: JobSkills.get(this.props.job) ?? []
        })
    }

    render() {
        return <div style={{flex: 7, display: "inline-block", position: "relative"}}>
            <div
                onFocus={() => {
                    this.setState({hasFocus: true})
                }}
                onBlur={() => {
                    this.setState({hasFocus: false})
                }}
                style={{
                    display: "inline-block",
                    padding: 8,
                    outline: this.props.borderColor
                }}
                tabIndex={-1}
                ref={this.props.controlRegionRef}
                onKeyDown={this.props.gameplayKeyCapture}
                onClick={this.props.gameplayMouseCapture}
            >
                <StatusDisplay/>
                <SkillsWindow
                    availableSkills={this.state.availableSkills}
                />
            </div>
        </div>;
    }
}

export default MainControlSection;
