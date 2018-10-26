import React from 'react';

const chatBubble = (props) => {
	return (
		<div timestamp={props.time} className={props.class}>
			{props.username}: {props.message} <br />

		</div>
	)
};

export default chatBubble;