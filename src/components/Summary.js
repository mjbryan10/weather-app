import React, { Component } from "react";
import DynamicTable from './DynamicTable';

export default class Summary extends Component {
	iconToImg = icon => {
		switch (icon) {
			case "rain":
				return "wi-rain";
			case "wind":
				return "wi-strong-wind";
			case "partly-cloudy-day":
				return "wi-day-cloudy";
			case "partly-cloudy-night":
                return "wi-night-alt-cloudy";
            case "cloudy":
                return "wi-cloudy"
			default:
				break;
		}
    }
	convertToCel(f) {
		f = parseFloat(f);
		let c = ((f - 32) * 5) / 9;
		// let c = (5(f - 32) / 9)
		return Math.round(c);
	}
	displayDateHour = (unix, index) => {
		let date = new Date(unix * 1000);
		let fullDate = date.getDate() + "/" + date.getMonth();
		let hour = date.getHours();
		if (hour < 10) {
			hour = "0" + hour;
		}
		if (index === 0 || (index > 0 && hour === "00")) {
			return (
				<div>
					<span>
						{fullDate}
					</span>
					<p>{hour}:00</p>
				</div>
			);
		}
		return <p>{hour}:00</p>;
	};
	render() {
		const { icon, temperature, summary, precipProbability } = this.props.weatherData.currently;
		const hourly = this.props.weatherData.hourly.data;
		return (
			<div>
                <h2>Summary:</h2>
                <h3>Rain'o'meter</h3>
                <DynamicTable hourly={hourly} displayDateHour={this.displayDateHour} />
				<h3>Currently:</h3>
				<table>
					<tbody>
						<tr>
							<td>
        <i className={"wi " + this.iconToImg(icon)}></i>
							</td>
                            <td>{this.convertToCel(temperature)}&#8451;</td>
							<td>{summary}</td>
                            <td>{Math.round(precipProbability * 100)}%</td>
						</tr>
					</tbody>
				</table>
				<h3>Next 48 hours:</h3>
				<table>
					<thead>
						<tr>
							<th>Time</th>
							<th></th>
							<th>Temp.</th>
							{/* <th>Description</th> */}
							<th>Rain %</th>
						</tr>
					</thead>
					<tbody>
						{hourly.map((hour, index) => (
							<tr index={index}>
								<td>{this.displayDateHour(hour.time, index)}</td>
								<td>
									<i className={"wi " + this.iconToImg(hour.icon)}></i>
								</td>
								<td>{this.convertToCel(hour.temperature)} &#8451;</td>
								{/* <td>{hour.summary}</td> */}
								<td>{Math.round(hour.precipProbability * 100)}%</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
