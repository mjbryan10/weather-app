import React, { Component } from "react";

export default class Question extends Component {
	state = {
		timeFrom: "00:00",
		timeUntil: "00:00",
	};
	updateTime = e => {
		let from = document.getElementById("timeFrom").value;
		let until = document.getElementById("timeUntil").value;
		this.setState({ timeFrom: from, timeUntil: until });
	};
	submitTime = () => {
		console.log(this.state);
	};
	render() {
		return (
			<div className="question-container">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css"></script>
				<form action="">
					<p>Let us know when you'll be outside</p>
					<label htmlFor="when">
						<input
							type="time"
							name="when"
							id="timeFrom"
							defaultValue="00:00"
							onChange={this.updateTime}
						/>
						<span> - </span>
						<input
							type="time"
							name="when"
							id="timeUntil"
							defaultValue="00:00"
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
			</div>
		);
	}
}
