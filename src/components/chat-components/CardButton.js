import React from "react";
import CardButtonInput from "./CardButtonInput"
//import classes from './Ribbon.css';

const cardButton = props => {
	return (
	  	<div className="prompt">
  			{props.tooltip !== undefined ? (
	          <button onClick={(e) => props.clicked(e)} className="cardButton btn" value={props.value} title={props.editable}>
	          	<b>{props.name}</b> {props.tooltip}
	          </button>
	        ) : (
	          <button onClick={(e) => props.clicked(e)} className="cardButton btn" value={props.value} title={props.editable}>
	          	{props.name}
	          </button>
	        )}
	        
	    </div>
	);
};

export default cardButton;
