import React from "react";
import CardButton from "./CardButton";

//import classes from './Ribbon.css';

const buttonContainer = props =>
  props.btns.map((btn, index) => {
    return (
		<CardButton
			className="ribbonButton"
			name={props.btns[index].key}
			key={props.btns[index].key}
			value={props.btns[index].value}
			tooltip={props.btns[index].tooltip}
			editable={props.btns[index].editable}
			clicked={props.clicked}
		/>
    );
  });

export default buttonContainer;
