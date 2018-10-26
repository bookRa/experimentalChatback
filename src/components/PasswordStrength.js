import React from 'react';
import "./PasswordStrength.css"

const passwordStrength = (props) => {
	return (
		<div className="pwStrength-bar">      
			<div className="pwStrength-box1 pwStrength-box invisible"></div>
			<div className="pwStrength-box2 pwStrength-box invisible"></div>
			<div className="pwStrength-box3 pwStrength-box invisible"></div>
			<div className="pwStrength-box4 pwStrength-box invisible"></div>
			<div className="pwStrength-box5 pwStrength-box invisible"></div>
			<div className="pwStrength-box6 pwStrength-box invisible"></div>
			<div className="pwStrength-box7 pwStrength-box invisible"></div>
			<div className="pwStrength-box8 pwStrength-box invisible"></div>
			<div className="pwStrength-box9 pwStrength-box invisible"></div>
        </div>
	)
};

export default passwordStrength;