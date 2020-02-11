import React, { Component } from "react";
import "./App.scss";
import "./vendors/weather_icons/css/weather-icons.min.css";

import Data from "./resources/data/data";

import Header from "./components/layout/Header";
import ScrollUp from "./components/layout/scroll/ScrollUp";

import Alert from "./components/Alert";
import Question from "./components/Question";
import Summary from "./components/Summary";
import Result from "./components/Result";

export default class App extends Component {
	state = {
		// data: Data,
		data: {},
		datastate: "loading", //"ready", "loading", "none"
		timeFrom: 0,
		timeUntil: 0,
		hasRain: "", //can be rain, chance or none
		highestChance: 0,
	};
	handleTime = ({ timeFrom, timeUntil, location }) => {
		this.setState({ timeFrom, timeUntil });
		this.getData(location);
		if (this.state.datastate == "ready")
		this.weatherChecker(timeFrom, timeUntil);
	};
	weatherChecker = (timeFrom, timeUntil) => {
		let data = this.state.data.hourly.data;
		let from = timeFrom - 300000; //+/- 5 min buffer
		let until = timeUntil + 300000;
		// let from = 1581328800;
		// let until = 1581350400;
		let filtered = [];
		let breakOut = 0;
		while (!filtered.length && breakOut < 5) {
			filtered = [...data].filter(el => el.time > from && el.time < until);
			from -= 300000; // - 5 mins
			until += 300000; // + 5 mins
			breakOut++;
		}
		console.log("TCL: weatherChecker -> filtered", filtered);
		//Logic 1 (using icon if includes rain)
		/*
		for (const hour of filtered) {
			console.log(hour.icon);
			if (filtered.length && hour.icon.includes("rain")) {
				this.setState({ hasRain: "rain" });
			} else {
				console.log("TCL: weatherChecker -> else", "else");
				this.setState({ hasRain: "" });
			}
		}*/
		//LOGIC 2 (using perc %) as per https://www.thoughtco.com/chance-of-rain-3444366
		if (filtered.length) {
			let result = "";
			for (const hour of filtered) {
				if (result === "" && hour.icon.includes("clear-day")) {
					result = "sunny";
				}
				if (hour.precipProbability >= 0.2 && hour.precipProbability < 0.5) {
					result = "chance";
					if (hour.precipProbability > this.state.highestChance) {
						this.setState({ highestChance: hour.precipProbability });
					}
				} else if (hour.precipProbability >= 0.5) {
					result = "rain";
					break;
				}
			}
			this.setState({ hasRain: result });
		}
	};
	resetResult = e => {
		e.preventDefault();
		this.setState({ hasRain: "" });
	};
	componentDidMount() {
		const AMS = '52.3667,4.8945'
		this.getData(AMS)
	}
	getData = (location) => {
		const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        console.log("TCL: getData -> API_KEY", API_KEY);
		fetch(`https://api.darksky.net/forecast/${API_KEY}}/${location}`)
			.then(response => response.json())
			.then(data => this.setState({ data, datastate: "ready" }))
			.catch(err => console.log(err))
	}
	render() {
		return (
			<div className="app-container">
				{this.state.data.alerts ? <Alert alerts={this.state.data.alerts}></Alert> : ""}
				<Header></Header>
				<div className="content-container">
					<Question onTimeSubmit={this.handleTime}></Question>

					{this.state.hasRain ? (
						<Result
							rainResult={this.state.hasRain}
							highestChance={this.state.highestChance}
							resetResult={this.resetResult}
						/>
					) : null}
					{/* <Summary weatherData={this.state.data}></Summary> */}
				</div>
				<ScrollUp />

				<footer>
					<a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
				</footer>
			</div>
		);
	}
}
