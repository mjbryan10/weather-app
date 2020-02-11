import React, { Component } from "react";

export default class Question extends Component {
	state = {
		timeFrom: null,
		timeUntil: null,
		today: new Date(),
		location: '52.3667,4.8945'
	};
	componentDidMount() {
		this.updateTime();
	}
	updateTime = e => {
		let originHour = this.state.today.getHours();
		let fromVal = new Date();
		let untilVal = new Date();
		//Reset seconds to avoid data confusion
		fromVal.setSeconds(0); untilVal.setSeconds(0);
		fromVal.setMilliseconds(0); untilVal.setMilliseconds(0);

		let fromHour = document.getElementById("fromHour").value;
		let fromMin = document.getElementById("fromMin").value;
		if (fromHour < originHour) {
			fromVal.setDate(this.state.today.getDate() + 1)
		}
		fromVal.setHours(fromHour); fromVal.setMinutes(fromMin);

		let untilHour = document.getElementById("untilHour").value;
		let untilMin = document.getElementById("untilMin").value;
		if (untilHour < originHour) {
			untilVal.setDate(this.state.today.getDate() + 1)
		}
		untilVal.setHours(untilHour); untilVal.setMinutes(untilMin);

		let from = Math.round(new Date(fromVal).getTime() / 1000);
		let until = Math.round(new Date(untilVal).getTime() / 1000);
		this.setState({ timeFrom: from, timeUntil: until });
	};
	updateLoc = (e) => {
		let coords = ";"
		switch (e.target.value) {
			case "AMS":
				coords = '52.3667,4.8945';
				break;
			case "ROT":
				coords = '51.9244,4.4777';
				break;
			default: coords = '52.3667,4.8945';
		}
		this.setState({ location: coords})
	}
	submitTime = () => {
		// let fromDate = new Date(this.state.timeFrom * 1000)
        // console.log("TCL: Question -> submitTime -> fromDate", fromDate);
		// let untilDate = new Date(this.state.timeUntil * 1000)
        // console.log("TCL: Question -> submitTime -> untilDate", untilDate);
		// console.log(this.state);

		let timeObj = {
			timeFrom: this.state.timeFrom,
			timeUntil: this.state.timeUntil,
			location: this.state.location
		}
        console.log("TCL: Question -> submitTime -> timeObj", timeObj);
		this.props.onTimeSubmit(timeObj)
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

						<select name="whenFrom" id="fromHour" onChange={this.updateTime}>
							{this.hourArray().map((e, i) => (
								<option name={e} index={i} key={i}>
									{e}
								</option>
							))}
						</select>
						<select name="whenFrom" id="fromMin" onChange={this.updateTime}>
							{this.minuteArray().map((e, i) => (
								<option name={e} index={i} key={i}>
									{e}
								</option>
							))}
						</select>
					</span>
					</label>

					<label htmlFor="whenUntil"> Until
					<span>
						<select name="whenUntil" id="untilHour" onChange={this.updateTime}>
							{this.hourArray().map((e, i) => (
								<option name={e} index={i} key={i}>
									{e}
								</option>
							))}
						</select>
						<select name="whenUntil" id="untilMin" onChange={this.updateTime}>
							{this.minuteArray(true).map((e, i) => (
								<option name={e} index={i} key={i}>
									{e}
								</option>
							))}
						</select>
					</span>
					</label>
					<p>Where?</p>
					<label htmlFor="where">
						<select name="location" id="locSelect" onChange={this.updateLoc}>
							<option value="AMS">Amsterdam</option>
							<option value="ROT">Rotterdam</option>
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
