import React, { Component } from "react";
import DynamicTable from "./tables/DynamicTable";
import Current from "./tables/Current";
import Hourly from "./tables/Hourly";

export default class Summary extends Component {
	iconToImg = icon => {
		//Icons by: https://erikflowers.github.io/weather-icons/
		switch (icon) {
			case "clear-day":
				return "wi-day-sunny"
			case "clear-night":
				return "wi-night-clear"
			case "rain":
				return "wi-rain";
			case "snow":
				return "wi-snow";
			case "sleet":
				return "wi-sleet";
			case "wind":
				return "wi-strong-wind";
			case "fog":
				return "wi-fog";
			case "partly-cloudy-day":
				return "wi-day-cloudy";
			case "partly-cloudy-night":
				return "wi-night-alt-cloudy";
			case "cloudy":
				return "wi-cloudy";
			default:
				return "wi-na";
		}
	};
	convertToCel(f) {//converts fah to Celsius 
		f = parseFloat(f);
		let c = ((f - 32) * 5) / 9; 
		return Math.round(c);
	}
	displayDateHour = (unix, index) => {
		let date = new Date(unix * 1000); //Creates date with Timecode
		let fullDate = date.getDate() + "/" + date.getMonth(); // DD/MM
		let hour = date.getHours(); // Gets 24 hr digit
		if (hour < 10) { // e.g. "01"
			hour = "0" + hour;
		}
		if (index === 0 || (index > 0 && hour === "00")) {
			//If its the first or after midnight, it adds the date.
			return (
				<div>
					<span>{fullDate}</span>
					<p>{hour}:00</p>
				</div>
			);
		}
		return <p>{hour}:00</p>;
	};
	render() {
		const currently = this.props.weatherData.currently
		const hourly = this.props.weatherData.hourly.data;
		return (
			<div>
				<h2>Summary:</h2>
				<h3>Rain'o'meter</h3>
				<DynamicTable hourly={hourly} displayDateHour={this.displayDateHour} />
				<h3>Current:</h3>
				<Current
					currently={currently}
					iconToImg={this.iconToImg}
					convertToCel={this.convertToCel}
				/>
				<h3>Next 48 hours:</h3>
				<Hourly
					hourly={hourly}
					displayDateHour={this.displayDateHour}
					iconToImg={this.iconToImg}
					convertToCel={this.convertToCel}
				/>
			</div>
		);
	}
}
