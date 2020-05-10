import React from "react";

export default class CounterCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputTitle: "",
        };
    }

    handleTitleChange(e) {
        this.setState({inputTitle: e.target.value});
    }

    createCounter() {
        let counter = {title: this.state.inputTitle, value: 0, step: 1};
        this.props.addCounter(counter);
        this.setState({
            inputTitle: ""
        });
    }


    render() {
        return (
            <table id="counter-creator">
                <tr>
                    <tr>
                        <td>
                            <input
                                id="title"
                                type="text"
                                onChange={this.handleTitleChange.bind(this)}
                                placeholder="title"
                                value={this.state.inputTitle}/>
                        </td>
                    </tr>
                    <td>
                        <button onClick={this.createCounter.bind(this)}>
                            Submit
                        </button>
                    </td>
                </tr>
            </table>
        )
    }
}