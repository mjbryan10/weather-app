import React from "react";

export default function Current(props) {
    const {
        icon,
        temperature,
        summary,
        precipProbability,
    } = props.currently;
	return (
		<table>
			<tbody>
				<tr>
					<td>
						<i className={"wi " + props.iconToImg(icon)}></i>
					</td>
					<td>{props.convertToCel(temperature)}&#8451;</td>
					<td>{summary}</td>
					<td>{Math.round(precipProbability * 100)}%</td>
				</tr>
			</tbody>
		</table>
	);
}
