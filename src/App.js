import React, { Component, Fragment } from "react";

import "./App.scss";
import "./vendors/weather_icons/css/weather-icons.min.css";

// import Data from "./resources/data/data";

import Header from "./components/layout/Header";
import ScrollUp from "./components/layout/scroll/ScrollUp";
import Loader from "./components/loader/Loader";

import Alert from "./components/Alert";
import Question from "./components/Question";
import Summary from "./components/Summary";
import Result from "./components/Result";

export default class App extends Component {
	state = {
		data: {}, //= Data //FOR OFFLINE
		isLoading: false,
		hasLoaded: false,
		timeFrom: 0,
		timeUntil: 0,
		rainResult: "", //can be rain, chance, dry & sunny
		highestChance: 0, //precipitation % in float
	};
	handleTime = ({ timeFrom, timeUntil, location }) => {
		this.setState({ timeFrom, timeUntil });
		this.getData(location);
	};
	weatherChecker = (timeFrom, timeUntil) => {
		let min30 = 30 * 60; //30 min buffer to ensure results
		let data = this.state.data.hourly.data;
		let from = timeFrom - min30; //= 1581328800 //FOR OFFLINE
		let until = timeUntil + min30; //= 1581350400; //FOR OFFLINE
		let filtered = data.filter(el => el.time >= from && el.time <= until);
		//LOGIC: (using perc %) as per https://www.thoughtco.com/chance-of-rain-3444366
		let pctRain = 0;
		let result = "";
		if (filtered.length) {
			for (const hour of filtered) {
				pctRain = Math.max(pctRain, hour.precipProbability);
				if (hour.icon === "clear-day") {
					result = "sunny";
				}
			}
			switch (true) {
				case pctRain >= 0.5:
					result = "rain";
					break;
				case pctRain >= 0.2:
					result = "chance";
					break;
				case pctRain >= 0 && !(result === "sunny"):
					result = "dry";
					break;
				default:
					result = "";
					break;
			}
		}
		console.log("TCL: weatherChecker -> result", result);
		console.log("TCL: weatherChecker -> pctRain", pctRain);
		this.setState({ rainResult: result, highestChance: pctRain });
	};
	resetResult = e => {
		e.preventDefault();
		this.setState({ data: {}, hasLoaded: false, rainResult: "" });
	};
	getData = location => {
		this.setState({ hasLoaded: false, isLoading: true });
		const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
		const URL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${location}`; //https://cors-anywhere.herokuapp.com/
		fetch(URL)
			.then(response => response.json())
			.then(data => {
				this.setState({ data, hasLoaded: true, isLoading: false });
				this.weatherChecker(this.state.timeFrom, this.state.timeUntil);
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className="app-container">
				{this.state.data.alerts ? <Alert alerts={this.state.data.alerts}></Alert> : ""}
				<Header></Header>
				<div className="content-container">
					<Question onTimeSubmit={this.handleTime}></Question>
					{this.state.isLoading ? <Loader /> : null}
					{this.state.hasLoaded ? (
						<Fragment>
							{this.state.rainResult ? (
								<Result
									rainResult={this.state.rainResult}
									highestChance={this.state.highestChance}
									resetResult={this.resetResult}
								/>
							) : null}
							<Summary weatherData={this.state.data}></Summary>
						</Fragment>
					) : null}
				</div>
				<ScrollUp />

				<footer>
					<p>Created by Matthew James Bryan</p>
					<p>
						<a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
					</p>
				</footer>
			</div>
		);
	}
}
