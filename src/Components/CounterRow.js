import React from "react";
import kebab from '../kebab.svg';
import {Draggable} from 'react-beautiful-dnd';

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
       const buttonClass = `${counter.color}-button`;
       return (
           <Draggable draggableId={counter.id} index={this.props.functions.getIndex(counter)}>
               {(provided, snapshot) => (
                   <tr       ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}>
                   <td className={counter.color}> {counter.title}</td>
                   <td className={counter.color}><button className={buttonClass} onClick={this.dec.bind(this)}> - </button> </td>
                   <td className={counter.color}> {counter.value} </td>
                   <td className={counter.color}> <button className={buttonClass} onClick={this.inc.bind(this)}> + </button> </td>
                   <td className={counter.color}> <button className={`${buttonClass} editButton`} onClick={this.edit.bind(this)}> <img src={kebab} alt=""/> </button> </td>
                   {console.log(counter)}
               </tr>
               )}
           </Draggable>
       )
   }
}