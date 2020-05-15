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
                <tr id="tvs">
                    <td> 
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            onChange={this.handleTitleChange.bind(this)}
                            value={this.state.title}/>
                    </td>

                    <td className="input-num-td">
                        <label>Value</label>
                        <input
                            type="number"
                            onKeyDown={checkInput}
                            onChange={this.handleValueChange.bind(this)}
                            value={this.state.value}/>
                    </td>

                    <td className="input-num-td">
                        <label>Step</label>
                        <input
                            type="number"
                            min={1}
                            onKeyDown={checkInput}
                            onChange={this.handleStepChange.bind(this)}
                            value={this.state.step}/>
                    </td>

                </tr>
                <tr>
                    <td colSpan="3">
                        {COLORS.map(color => (
                            <button className={`${color}-color-selector-button focus-color`}
                                    value={color}
                                    onClick={this.handleColorChange.bind(this)}
                                    key={color}
                            />
                        ))}
                    </td>
                </tr>

                <tr>
                    <td colSpan="3">
                        <button onClick={this.createCounter.bind(this)} className={`${this.state.color}-button create-button`}>
                            Create
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}
