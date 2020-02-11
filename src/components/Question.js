import React, { Component } from "react";

export default class Question extends Component {
	state = {
		timeFrom: null,
		timeUntil: null,
		currentDate: {
			minute: 0,
			hour: 0,
			day: 0,
			month: 0,
			year: 0,
			unix: 0,
		},
	};
	updateTime = e => {
		let fromVal = document.getElementById("timeFrom").value;
		let untilVal = document.getElementById("timeUntil").value;
		let from = Math.round(new Date(fromVal).getTime() / 1000);
		let until = Math.round(new Date(untilVal).getTime() / 1000);
		this.setState({ timeFrom: from, timeUntil: until });
	};
	submitTime = () => {
		console.log(this.state);
	};
	minuteArray = (plus5 = false) => {
		let today = new Date();
		let startMinute = Math.ceil(today.getMinutes() / 5) * 5;
		let minute = startMinute;
		(plus5) ? (minute += 5) : (minute += 0);
		let minuteString = "";
		let minutes = [];
		for (let i = 0; i < 12; i++) {
			if (minute > 55) {
				minute -= 60;
			}
			if (minute < 10) {
				minuteString = "0" + minute;
			} else {
				minuteString = `${minute}`;
			}
			minutes.push(minuteString);
			minute += 5;
		}
		return minutes;
	};
	hourArray = () => {
		let today = new Date();
		let hour = today.getHours();
		let minute = today.getMinutes();
		(minute > 50) ? hour += 1 : hour+=0 
		let hourString = "";
		let hours = [];
		for (let i = 0; i < 24; i++) {
			if (hour >= 24) {
				hour -= 24;
			}
			if (hour < 10) {
				hourString = "0" + hour;
			} else {
				hourString = `${hour}`;
			}
			hours.push(hourString);
			hour++;
		}
		return hours;
	};
	render() {
		// let minutes = minuteArray();
		return (
			<div className="question-container">
				<form className="form-group">
					<p>Let us know when you'll be outside</p>
					<label htmlFor="whenFrom"> From
					<span>

						<select name="whenFrom" id="fromHour">
							{this.hourArray().map((e, i) => (
								<option name={e} key={i}>
									{e}
								</option>
							))}
						</select>
						<select name="whenFrom" id="fromMin">
							{this.minuteArray().map((e, i) => (
								<option name={e} key={i}>
									{e}
								</option>
							))}
						</select>
					</span>
					</label>

					<label htmlFor="whenTil"> Until
					<span>
						<select name="whenFrom" id="fromHour">
							{this.hourArray().map((e, i) => (
								<option name={e} key={i}>
									{e}
								</option>
							))}
						</select>
						<select name="whenFrom" id="fromMin">
							{this.minuteArray(true).map((e, i) => (
								<option name={e} key={i}>
									{e}
								</option>
							))}
						</select>
					</span>
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
			</div>
		);
	}
}
