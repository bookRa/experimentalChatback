import React from 'react';
import ButtonContainer from './ButtonContainer';
import SearchBar from './SearchBar';
import "./IndexCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const indexCard = (props) => {
	return (
		<div id={props.id + "Card"} className={props.classes}>
			<FontAwesomeIcon
          		icon={faTimesCircle}
         		className="exitBtn"
         		title="exit"
          		tabIndex="0"
          		onClick={props.exit}
        	/>
			{props.btns !== undefined ? (
				<div className="indexContainer">
					<h3>{props.tooltip}</h3>
					{props.search !== undefined ? (
        				<SearchBar />
      				) : (
        				<div></div>
      				)}
					
					<div className="buttonContainer">
		    			<ButtonContainer clicked={props.clicked} btns={props.btns} />
		    		</div>
		    		<button className="submitBtn btn" onClick={props.submit}>Submit</button>
	    		</div>
	  		) : (
	    		<div className="indexContainer">
	    			<h3>{props.tooltip}</h3>
	    		</div>
	  		)}
		</div>
	)
};

export default indexCard;