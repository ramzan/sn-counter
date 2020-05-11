import React from "react";
import update from 'immutability-helper';
import CounterCreator from "./CounterCreator";
import CounterTable from "./CounterTable";
import {DragDropContext} from "react-beautiful-dnd";

let COUNTERS = [
    {title: "Ones", value: 1, step: 1, color: "red"},
    {title: "Twos", value: 2, step: 2, color: "green"},
    {title: "Threes", value: 3, step: 3, color: "blue"},
    {title: "Fours", value: 4, step: 4, color: "black"},
];

export default class CounterEditor extends React.Component {
    constructor(props) {
        super(props);
        let idCount = 0;
        for(let counter of COUNTERS) {
            counter.id = `${counter.title}-${idCount++}`;
        };
        this.state = {
            counters: COUNTERS,
            idCount,
            draggingRowID: null
        };
    }

    //Counter Management

    addCounter(counter) {
        counter.id = `${counter.title}-${this.state.idCount}`;
        this.setState({
            counters: [...this.state.counters, counter],
            idCount: this.state.idCount + 1
        });
    }

    getIndex(counter) {
        return this.state.counters.indexOf(counter);
    }

    //Counter Actions

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

    //Dragging Methods

    onDragEnd(result) {
        const { destination, source, reason } = result;

        // Not a thing to do...
        if (!destination || reason === 'CANCEL') {
            this.setState({
                draggingRowId: null,
            });
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const counters = Object.assign([], this.state.counters);
        const counter = this.state.counters[source.index];
        counters.splice(source.index, 1);
        counters.splice(destination.index, 0, counter);
        this.setState({
            counters
        });
    }

   render() {
        const functions = {
            increment: this.increment.bind(this),
            decrement: this.decrement.bind(this),
            edit: this.editCounter.bind(this),
            onDragEnd: this.onDragEnd.bind(this),
            getIndex: this.getIndex.bind(this)
       };
        return (
            <div id="counter-editor">
                <CounterCreator addCounter={this.addCounter.bind(this)}/>
                <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                    <CounterTable
                        counters={this.state.counters}
                        functions={functions}
                    />
                </DragDropContext>
            </div>
        );
   }
}