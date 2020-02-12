import React from "react";

export default function Hourly(props) {
    const hourly = props.hourly;
	return (
		<table>
			<thead>
				<tr>
					<th>Time</th>
					<th></th>
					<th>Temp.</th>
					<th>Rain %</th>
				</tr>
			</thead>
			<tbody>
				{hourly.map((hour, index) => (
					<tr key={index}>
						<td>{props.displayDateHour(hour.time, index)}</td>
						<td>
							<i className={"wi " + props.iconToImg(hour.icon)}></i>
						</td>
						<td>{props.convertToCel(hour.temperature)} &#8451;</td>
						<td>{Math.round(hour.precipProbability * 100)}%</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
