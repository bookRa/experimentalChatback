import React from 'react';

import './Ribbon.css';
import RibbonButton from './RibbonButton';

const ribbon = (props) => {
	var promptContainers = [];
	var prompts = props.prompts;
	var activePrompts = props.activePrompts;
	var finishedPrompts = props.finishedPrompts;
	for (var i = 0; i < activePrompts.length; i++) {
		var activePrompt = activePrompts[i];
		for (var j = 0; j < prompts.length; j++) {
			if (!finishedPrompts.includes(activePrompt)) {
				if (prompts[j].key === activePrompt) {
					promptContainers.push(
						<RibbonButton
							activePrompt={activePrompt}
							classes="promptButton ribbonButton btn"
							name={prompts[j].mainBtn.key}
							key={prompts[j].mainBtn.key}
							value={prompts[j].mainBtn.value}
							tooltip={prompts[j].mainBtn.tooltip}
							search={prompts[j].mainBtn.search}
							clicked={props.clicked}
							clickfunc={(e) => props.clicked(e)}
							submit={props.submit}
							exit={props.exit}
							btns={prompts[j].btns}
						/>
					);
				}
				if (prompts[j].response) {
					if (prompts[j].response.key === activePrompt) {
						promptContainers.push(
							<RibbonButton
								activePrompt={activePrompt}
								classes="responseButton ribbonButton btn"
								name={prompts[j].response.mainBtn.key}
								key={prompts[j].response.key}
								value={prompts[j].response.mainBtn.value}
								tooltip={prompts[j].response.mainBtn.tooltip}
								btns={prompts[j].response.btns}
								search={prompts[j].response.mainBtn.search}
								clicked={props.clicked}
								clickfunc={(e) => props.clicked(e)}
								submit={props.submit}
								exit={props.exit}
							/>
						);
					}
				}
				if (prompts[j].double) {
					if (prompts[j].double.key === activePrompt) {
						promptContainers.push(
							<RibbonButton
								activePrompt={activePrompt}
								classes="doubleButton ribbonButton btn"
								name={prompts[j].double.mainBtn.key}
								key={prompts[j].double.key}
								value={prompts[j].double.mainBtn.value}
								tooltip={prompts[j].double.mainBtn.tooltip}
								btns={prompts[j].double.btns}
								search={prompts[j].double.mainBtn.search}
								clicked={props.clicked}
								clickfunc={(e) => props.clicked(e)}
								submit={props.submit}
								exit={props.exit}
							/>
						);
					}
				}
			}
		}
	}
  	return promptContainers;
};

export default ribbon;