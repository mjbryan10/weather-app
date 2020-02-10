import React, { Component } from "react";

export default class Question extends Component {
	state = {
		timeFrom: null,
		timeUntil: null,
	};
	updateTime = e => {
		let fromVal = document.getElementById("timeFrom").value;
        let untilVal = document.getElementById("timeUntil").value;
        let from = Math.round(new Date(fromVal).getTime()/1000)
        let until = Math.round(new Date(untilVal).getTime()/1000)
		this.setState({ timeFrom: from, timeUntil: until });
	};
	submitTime = () => {
		console.log(this.state);
    };
   
	render() {
		return (
			<div className="question-container">
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css"/> */}
                
				<form className="form-group">
					<p>Let us know when you'll be outside</p>
					<label htmlFor="when">
						<input
							type="datetime-local"
							name="when"
							id="timeFrom"
							// defaultValue="00:00"
							onChange={this.updateTime}
						/>
						<span> - </span>
						<input
							type="datetime-local"
							name="when"
							id="timeUntil"
							// defaultValue="00:00"
							onChange={this.updateTime}
						/>
					</label>
                    <p>Where?</p>
                    <label htmlFor="where">
                        <select name="location" id="locSelect">
                            <option value="AMS">Amsterdam</option>
                        </select>
                    </label>
				</form>
				<button type="submit" onClick={this.submitTime}>
					Lets go!
				</button>
        <p>{console.log(this.currentDateTime)}</p>
                {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script> */}
			</div>
		);
	}
}
