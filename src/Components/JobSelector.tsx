import React from "react";
import {Jobs} from "../Game/Jobs";


type propsType = {
    onChange: (newJob: string) => void,
}

export class JobSelector extends React.Component<propsType> {

    constructor(props: propsType) {
        super(props);
    }

    enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
        return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    }

    render() {
        let options: JSX.Element[] = [];
        for (const value of this.enumKeys(Jobs)) {
            options.push(<option key={value} value={Jobs[value]}>{Jobs[value]}</option>)
        }

        return (
            <select onChange={event => this.props.onChange(event.target.value)}>
                ${options}
            </select>
        );
    }
}

export default JobSelector;
