import React from 'react';

export default function Square(props) {
 
    // let current=props.history[history.length-1];
    // let prev=props.history[history.length-2];
    // if(props.history[history.length-1]){

    // }
    return (
      <button className="square"
      onClick={props.onClick} style={{color: props.color}}>
      {props.value}
    </button>
    );
 
}