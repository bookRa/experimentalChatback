import React from 'react';

const stageHandler = (props) => {
	return (
		<div className="stageHandler" onClick={props.clicked}>
			Next
		</div>
	)
};

export default stageHandler;