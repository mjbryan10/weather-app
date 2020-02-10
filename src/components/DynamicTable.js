import React, { Component } from "react";

export default class DynamicTable extends Component {
	state = {
		highestPct: 0,
		lowestPct: 0,
	};
	updateGrid = (val) => {
        this.setState({highestPct: val})
    }
	render() {
        const hourly = this.props.hourly;
		let tableCont = {
			display: "flex",
			minHeight: "200px",
			// minWidth: "400px",
			maxWidth: "1200px",
			maxHeight: "400px",
			height: "200px",
            width: "100%",
            overflowX: 'auto',
            overflowY: 'hidden',
            alignItems: 'flex-end',
            verticleAlign: 'bottom',
            paddingBottom: '20px'
			// gridTemplateColumns: "repeat(24, 1fr)",
			// gridTemplateRows: `repeat(${this.state.highestPct}, 1fr)`,
        };
		return (
			<div style={tableCont}>
				{[...Array(24)].map((e, i) => {
                    let pct = hourly[i].precipProbability;
                    let tableEntry = {
                        backgroundImage: `linear-gradient(rgba(0,0,255,${pct*1.5}), rgba(0,0,255,0))`,
                        height: `${Math.round(pct*100)}%`
                    }
                    return <span index={i} style={tableEntry} >{this.props.displayDateHour(hourly[i].time)}{Math.round(pct*100)}%</span>
                })}
			</div>
		);
	}
}

//STYLES: