import React from "react";
import {checkInput, COLORS} from "./helpers";


export default class CounterCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            value: 0,
            step: 1,
            color: "light-blue",
            editable: false
        };
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleValueChange(e) {
        this.setState({value: e.target.value});
    }

    handleStepChange(e) {
        if (e.which < 48 || e.which > 57)
        {
            console.log("oi");
        }
        this.setState({step: e.target.value});
    }

    handleColorChange(e) {
        this.setState({color: e.target.value});
    }


    createCounter(e) {
        let counter = {
            title: this.state.title,
            value: parseInt(this.state.value),
            step: parseInt(this.state.step),
            color: this.state.color
        };
        this.props.addCounter(counter);
        this.setState({
            title: ""
        });
    }

    render() {
        return (
            <table id="counter-creator" className={this.state.color}>
                <tbody>
                <tr>
                    <td> Title
                        <input
                            type="text"
                            onChange={this.handleTitleChange.bind(this)}
                            placeholder="title"
                            value={this.state.title}/>
                    </td>

                    <td> Value
                        <input
                            type="number"
                            onKeyDown={checkInput}
                            onChange={this.handleValueChange.bind(this)}
                            value={this.state.value}/>
                    </td>
                    <td> Step
                        <input
                            type="number"
                            min={1}
                            onKeyDown={checkInput}
                            onChange={this.handleStepChange.bind(this)}
                            value={this.state.step}/>
                    </td>

                    <td>
                        <button onClick={this.createCounter.bind(this)} className={`${this.state.color}-button`}>
                            Submit
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3"> Color
                        {COLORS.map(color => (
                            <button className={`${color}-choose-button focus-color`}
                                    value={color}
                                    onClick={this.handleColorChange.bind(this)}
                                    key={color}
                            />
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}