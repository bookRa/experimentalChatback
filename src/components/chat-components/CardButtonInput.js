import React from "react";

//import classes from './Ribbon.css';

const cardButtonInput = props => {
	return (
	  	<div className="cardButtonInput">
  			{props.value !== undefined ? (
	          <input type="text" />
	        ) : (
	          <div></div>
	        )}
	    </div>
	);
};

export default cardButtonInput;