import React from 'react';

function filterButtons(e) {
    var value = e.target.value.toLowerCase();
    var buttons = document.querySelectorAll(".cardButton");
    for (var i = 0; i < buttons.length; i++) {
    	var button = buttons[i];
    	if (button.innerHTML.toLowerCase().indexOf(value) > -1) {
            button.style.display = "";
        } else {
            button.style.display = "none";
        }
    }
}

const searchBar = (props) => {
	return (
		<input type="text" placeholder="Search..." className="searchBar" onKeyUp={filterButtons} />
	)
};

export default searchBar;