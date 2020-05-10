import React from "react";
import CounterRow from "./CounterRow";

export default class CounterTable extends React.Component {
   render() {
       let {counters, increment, decrement} = this.props;
       return (
           <table id="counter-table">
               {counters.map(counter => <CounterRow counter={counter} increment={increment} decrement={decrement}/>)}
           </table>
       )
   }
}