import React from 'react';
import PwStrength from "./PasswordStrength";

var length = 0;

function detectPwStrength(e) {
	var curLength = e.target.value.length;
	if (length !== curLength) {
		var diff = curLength - length;
		if (diff > 0) {
			for (var i = 1; i < 10; i++) {
				if (i <= curLength) {
					var box1 = document.querySelector(".pwStrength-box" + i);
					box1.classList.remove("invisible");
				}
			}
		} else {
			for (var j = length; j > curLength; j--) {
				if (j <= length && j < 10) {
					var box2 = document.querySelector(".pwStrength-box" + j);
					box2.classList.add("invisible");
				}
			}
		}
	}
	length = curLength;
}

const formField = (props) => {
	return (
		<div className="group">
			{props.bar ? (
        		<input
					value={props.value}
					onChange={props.onChange}
					type={props.type}
					autoFocus={props.focus}
					required={props.req}
					onKeyUp={e => detectPwStrength(e)}
					aria-label={props.label}
				/>
      		) : (
        		<input
					value={props.value}
					onChange={props.onChange}
					type={props.type}
					autoFocus={props.focus}
					required={props.req}
					aria-label={props.label}
				/>
      		)}
      		<label className="form-label">{props.label}</label>
			<span className="highlight"></span>
			<span className="bar"></span>
			{props.bar ? (
        		<PwStrength />
      		) : (
        		<div></div>
      		)}
      		{props.helper !== null ? (
        		<span className="form-helper">{props.helper}</span>
      		) : (
        		<div></div>
      		)}
      		{props.error !== null ? (
        		<span className="form-helper">{props.error}</span>
      		) : (
        		<div></div>
      		)}
        </div>
	)
};

export default formField;