import React from "react";
import update from 'immutability-helper';
import CounterCreator from "./CounterCreator";
import CounterTable from "./CounterTable";
import CounterManager from "../lib/counterManager";
import {DragDropContext} from "react-beautiful-dnd";

export default class Counters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: [],
            draggingRowID: null
        };
        CounterManager.get().setDataChangeHandler((counters) => {
      // We need CounterManager.get().isMobile() to be defined, and this handler is called once on bridge ready.
         this.updateCounters();
    })

    CounterManager.get().setOnReady(() => {
      let platform = CounterManager.get().getPlatform();
      // add platform class to main <html> element
      var root = document.documentElement;
      root.className += platform;
      this.setState({ready: true})
    })
    }

  componentDidMount() {
    CounterManager.get().initiateBridge();
    this.updateCounters();
  }

  updateCounters() {
    this.setState({counters: CounterManager.get().getCounters()});
  }

    //Counter Management

    addCounter(counter) {
      CounterManager.get().addCounter(counter);
      this.updateCounters();
    }

    getIndex(counter) {
        return this.state.counters.indexOf(counter);
    }

    toggleEditable(counter) {
        const index = this.state.counters.indexOf(counter);
        this.setState({
            counters: update(this.state.counters, {[index]: {editable: {$set: !counter.editable}}})
        })
    }

    deleteCounter(counter) {
      CounterManager.get().deleteCounter(counter);
      this.updateCounters();
    }

    //Counter Actions

    increment(counter) {
      CounterManager.get().increment(counter);
      this.updateCounters();
    }

    decrement(counter) {
      CounterManager.get().decrement(counter);
      this.updateCounters();
    }

    editCounter(counter, newState) {
      CounterManager.get().editCounter(counter, newState);
      this.updateCounters();
    }

    //Dragging Methods

    onDragEnd(result) {
        const {destination, source, reason} = result;

        // Nothing to do
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

      CounterManager.get().rearrange(destination, source);
      this.updateCounters();
    }

    render() {
        const functions = {
            increment: this.increment.bind(this),
            decrement: this.decrement.bind(this),
            edit: this.editCounter.bind(this),
            onDragEnd: this.onDragEnd.bind(this),
            getIndex: this.getIndex.bind(this),
            toggleEditable: this.toggleEditable.bind(this),
            deleteCounter: this.deleteCounter.bind(this)
        };
        return (
            <div id="counters">
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
