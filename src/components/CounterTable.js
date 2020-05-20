import React from "react";
import CounterRow from "./CounterRow";
import EditorRow from "./EditorRow";
import {Droppable} from 'react-beautiful-dnd';

export default class CounterTable extends React.Component {
    onDragEnd(result) {
        this.props.functions.onDragEnd(result);
    }

   render() {
       let {counters, functions} = this.props;
       return (
           <Droppable droppableId="table">
               {(provided, snapshot) => (
                   <table style={{width: "100%"}} id="counter-table" ref={provided.innerRef} {...provided.droppableProps}>
                       <tbody>
                           {counters.map(counter => (counter.editable ? <EditorRow counter={counter} functions={functions} key={counter.id}/> : <CounterRow counter={counter} functions={functions} key={counter.id}/>))}
                           {provided.placeholder}
                       </tbody>
                   </table>
               )}
           </Droppable>
       )
   }
}
