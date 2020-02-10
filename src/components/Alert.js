import React from "react";

export default function Alert(props) {
    function toggleWarnings() {
        let warningArray = document.querySelectorAll('.alert-container');
        let warningBtn = document.querySelector('.warning-toggle');
        warningBtn.classList.remove('active');
        warningBtn.classList.toggle('rotate');
        for (warning of warningArray){
            warning.classList.toggle('hidden');
        }
    }
	return (
		<div>
            <div className="warning-toggle active" onClick={toggleWarnings}>&#9888;</div>
			{props.alerts.map((alert, index) => (
                <div className="alert-container hidden" style={{backgroundColor: (alert.severity === "warning") ? warning : info}} key={index}>
                    <p>
                        <span>{alert.severity.toUpperCase()}: </span>
                        {alert.description}
                        <a href={alert.uri}>More info...</a>
                    </p>
                </div>
			))}
		</div>
	);
}

//STYLES:
let warning = '#ff3646';
let info = '#3694ff;'
