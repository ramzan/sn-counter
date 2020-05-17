import React from "react";
import {Draggable} from 'react-beautiful-dnd';
import {checkInput, COLORS} from "./helpers";

export default class EditorRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.counter.title,
            value: props.counter.value,
            step: props.counter.step,
            color: props.counter.color,
            editable: false
        };
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleValueChange(e) {
        this.setState({value: parseInt(e.target.value)});
    }

    handleStepChange(e) {
        this.setState({step: parseInt(e.target.value)});
    }

    handleColorChange(e) {
        this.setState({color: e.target.value});
    }

    save() {
        this.props.functions.edit(this.props.counter, this.state);
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

                        <td className={this.state.color} colSpan="3">
                            <label>Title</label>
                            <input
                                type="text"
                                onChange={this.handleTitleChange.bind(this)}
                                placeholder="title"
                                value={this.state.title}/>

                            <label>Value</label>
                            <input
                                type="number"
                                onKeyDown={checkInput}
                                onChange={this.handleValueChange.bind(this)}
                                value={this.state.value}/>

                            <label>Step</label>
                            <input
                                type="number"
                                min={1}
                                onKeyDown={checkInput}
                                onChange={this.handleStepChange.bind(this)}
                                value={this.state.step}/>
                        </td>

                        <td className={`dropdown ${this.state.color}`}>
                            <button className={`dropbtn ${this.state.color}-color-selector-button`}/>
                            <div className="dropdown-colors-content">
                            {COLORS.map(color => (
                                <button className={`${color}-color-selector-button focus-color`}
                                        value={color}
                                        onClick={this.handleColorChange.bind(this)}
                                        key={color}
                                />
                            ))}
                            </div>
                        </td>

                        <td className={this.state.color}>
                            <button className={buttonClass} onClick={this.save.bind(this)}>Save</button>
                            <button className={buttonClass} onClick={this.cancel.bind(this)}>Cancel</button>
                        </td>

                    </tr>

                )}
            </Draggable>
        )
    }
}
