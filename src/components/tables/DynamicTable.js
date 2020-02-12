import React, { Component } from "react";

export default class DynamicTable extends Component {
	state = {
		highestPct: 0,
		lowestPct: 0,
	};
	render() {
		const hourly = this.props.hourly;
		let tableCont = {
			display: "flex",
			minHeight: "200px",
			maxWidth: "1200px",
			height: "300px",
			width: "90%",
			overflowX: "auto",
			overflowY: "hidden",
			alignItems: "flex-end",
			textalign: "center",
			paddingBottom: "20px",
		};
		return (
			<div style={tableCont}>
				{[...Array(24)].map((e, i) => {
					let pct = hourly[i].precipProbability;
					let pctCol = {
						backgroundImage: `linear-gradient(rgba(0,0,255,${pct * 1.5}), rgba(0,0,255,0))`,
						height: `${Math.round(pct * 100)}%`,
						textalign: "center",
						flex: "1 0 50px",
						display: "flex",
						flexFlow: "column nowrap",
						justifyContent: "flex-end",
						borderRadius: "10px 10px 0 0",
					};
					return (
						<div key={i} style={pctCol}>
							<span>
								<p>
									{this.props.displayDateHour(hourly[i].time)}
									{Math.round(pct * 100)}%
								</p>
							</span>
						</div>
					);
				})}
			</div>
		);
	}
}

//STYLES:
