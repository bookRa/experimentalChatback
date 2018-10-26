import React from 'react';
import "./Slider.css";

const slider = (props) => {
	return (
		<div id={props.id} className="slider">
			<div className="slidecontainer">
  				<input type="range" min="0" max="999" defaultValue="499" className="moodRange"/>
			</div>
			<div className="markerContainer">
			  <div className="slider-left">Very Troubled</div>
			  <div className="space"></div>
			  <div className="slider-right">Not Very Troubled</div>
			</div>
		</div>
	)
};

export default slider;