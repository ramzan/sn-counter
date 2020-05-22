import React from "react";
import {Draggable} from 'react-beautiful-dnd';
import {COLORS} from "../lib/helpers";

export default class EditorRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.counter.title,
            value: props.counter.value,
            valueValid: true,
            step: props.counter.step,
            stepValid: true,
            color: props.counter.color,
            editable: false
        };
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleValueChange(e) {
        this.setState({value: e.target.value, valueValid: e.target.validity.valid});
    }

    handleStepChange(e) {
        this.setState({step: e.target.value, stepValid: e.target.validity.valid});
    }

    handleColorChange(e) {
        this.setState({color: e.target.value});
    }

    save() {
        if (!(this.state.valueValid && this.state.stepValid)) return;
        let counter = {
            title: this.state.title,
            value: parseInt(this.state.value),
            step: parseInt(this.state.step),
            color: this.state.color,
            editable: false
        };
        this.props.functions.edit(this.props.counter, counter);
    }

    cancel() {
        this.props.functions.toggleEditable(this.props.counter);
    }

    render() {
        const {counter} = this.props;
        const buttonClass = `${this.state.color}-button`;
        return (
            <Draggable draggableId={counter.id} index={this.props.functions.getIndex(counter)}>
                {(provided, snapshot) => (
                    <tr ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="edit-row">

                        <td className={`${this.state.color} editor-inputs`} colSpan="3">
                            <label>Title</label>
                            <input
                                type="text"
                                onChange={this.handleTitleChange.bind(this)}
                                placeholder="title"
                                value={this.state.title}/>

                            <label>Value</label>
                            <input
                                type="number"
                                required={true}
                                min={Number.MIN_SAFE_INTEGER}
                                max={Number.MAX_SAFE_INTEGER}
                                onChange={this.handleValueChange.bind(this)}
                                value={this.state.value}/>

                            <label>Step</label>
                            <input
                                type="number"
                                required={true}
                                min={1}
                                max={Number.MAX_SAFE_INTEGER}
                                onChange={this.handleStepChange.bind(this)}
                                value={this.state.step}/>
                        </td>
                        <td className={`${this.state.color} color-editor-td`} colSpan="2">
                            <div className="color-editor">
                                {COLORS.map(color => (
                                    <button className={`${color}-color-selector-button focus-color`}
                                            value={color}
                                            onClick={this.handleColorChange.bind(this)}
                                            key={color}
                                    />
                                ))}
                            </div>

                            <button className={buttonClass} onClick={this.save.bind(this)}>Save</button>
                            <button className={buttonClass} onClick={this.cancel.bind(this)}>Cancel</button>
                        </td>

                    </tr>

                )}
            </Draggable>
        )
    }
}
