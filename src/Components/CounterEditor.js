import React from "react";
import update from 'immutability-helper';
import CounterCreator from "./CounterCreator";
import CounterTable from "./CounterTable";

let COUNTERS = [
    {title: "Ones", value: 1, step: 1},
    {title: "Twos", value: 2, step: 2},
    {title: "Threes", value: 3, step: 3},
    {title: "Fours", value: 4, step: 4},
];

export default class CounterEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: COUNTERS
        };
    }

    addCounter(counter) {
        this.setState({
            counters: [...this.state.counters, counter]
        });
    }

    increment(counter) {
        const index = this.state.counters.indexOf(counter);
        this.setState({
            counters: update(this.state.counters, {[index]: {value: {$set: counter.value + counter.step}}})
        })
    }

    decrement(counter) {
        const index = this.state.counters.indexOf(counter);
        this.setState({
            counters: update(this.state.counters, {[index]: {value: {$set: counter.value - counter.step}}})
        })
    }

    editCounter(counter) {
       console.log("Editing", counter);
    }

   render() {
        const functions = {
            increment: this.increment.bind(this),
            decrement: this.decrement.bind(this),
            edit: this.editCounter.bind(this)
       };
        return (
            <div id="counter-editor">
                <CounterCreator addCounter={this.addCounter.bind(this)}/>
                <CounterTable
                    counters={this.state.counters}
                    functions={functions}
                />
            </div>
        );
   }
}