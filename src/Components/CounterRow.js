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
        this.props.functions.toggleEditable(this.props.counter);
    }

    deleteCounter() {
        this.props.functions.deleteCounter(this.props.counter);
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
                       <td className={`${counter.color} title-td`}> {counter.title}</td>
                       <td className={counter.color}><button className={buttonClass} onClick={this.dec.bind(this)}> - </button> </td>
                       <td className={counter.color} id="value-display"> {counter.value} </td>
                       <td className={counter.color}> <button className={buttonClass} onClick={this.inc.bind(this)}> + </button> </td>

                       <td className={`dropdown ${counter.color}`}> 
                         <img src={kebab} alt=""/>
                            <div className="dropdown-options-content">
                            <a id="edit-button" className={`${buttonClass} editButton`} onClick={this.edit.bind(this)}>Edit</a>
                            <a id="delete-button" className={buttonClass} onClick={this.deleteCounter.bind(this)}>Delete</a>
                            </div>
                        </td>

                   </tr>
               )}
           </Draggable>
       )
   }
}
