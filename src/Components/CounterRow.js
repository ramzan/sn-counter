import React from "react";

export default class CounterRow extends React.Component {

    dec() {
        this.props.functions.decrement(this.props.counter);
    }

    inc() {
        this.props.functions.increment(this.props.counter);
    }

    edit() {
        this.props.functions.edit(this.props.counter);
    }

   render() {
       const {counter} = this.props;
       return (
           <tr>
               <td> {counter.title}</td>
               <td><button onClick={this.dec.bind(this)}> - </button> </td>
               <td> {counter.value} </td>
               <td> <button onClick={this.inc.bind(this)}> + </button> </td>
               <td> <button onClick={this.edit.bind(this)}> Edit </button> </td>
           </tr>
       )
   }
}